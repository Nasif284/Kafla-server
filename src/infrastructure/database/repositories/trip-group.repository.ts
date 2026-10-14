import { inject, injectable } from "tsyringe";
import { PrismaClient, Prisma } from "@prisma/client";
import { TOKENS } from "../../di/tokens";
import { ITripGroupRepository, CreateGroupRepoDTO, UpdateGroupRepoDTO } from "../../../application/interfaces/repositories/group.repository";
import { CreateDestinationRequestDTO, Destination } from "../../../application/dtos/group/request/destination.dto";
import { GetGroupsRequestDTO } from "../../../application/dtos/group/request/get-all-groups.dto";
import { GetAllGroupsResponseDTO } from "../../../application/dtos/group/responce/get-all-groups.dto";
import { GetGroupsResponseDTO, GroupData } from "../../../application/dtos/group/responce/get-groups.dto";
import { GetGroupInvitesResponse } from "../../../application/dtos/group/responce/get-invites.dto";
import { TripDestination } from "../../../application/dtos/group/responce/get-weather.dto";
import { TripMemberRole, TripInviteStatus } from "../../../domain/enums";
import { GroupNotFound, UserAlreadyExistInTheGroupError, OnlyAdminCanModifyTripError } from "../../../domain/errors/trip.error";

@injectable()
export class TripGroupRepository implements ITripGroupRepository {
  constructor(@inject(TOKENS.PrismaClient) private readonly prisma: PrismaClient) {}

  async findDestinationByPlaceId(placeId: string): Promise<Destination | null> {
    const result = await this.prisma.destination.findFirst({
      where: {
        placeId,
      },
    });
    if (!result) {
      return null;
    }
    return {
      ...result,
      latitude: Number(result.latitude),
      longitude: Number(result.longitude),
    };
  }

  async createDestination(payload: CreateDestinationRequestDTO): Promise<Destination> {
    if (payload.countryCode) {
      await this.prisma.country.upsert({
        where: { code: payload.countryCode },
        update: {},
        create: {
          code: payload.countryCode,
          name: payload.countryCode,
        },
      });
    }

    const result = await this.prisma.destination.create({
      data: {
        ...payload,
      },
    });
    return {
      ...result,
      latitude: Number(result.latitude),
      longitude: Number(result.longitude),
    };
  }

  async updateDestinationCover(id: string, coverUrl: string): Promise<void> {
    await this.prisma.destination.update({
      where: { id },
      data: { coverUrl },
    });
  }

  async createGroup(payload: CreateGroupRepoDTO): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const data: Prisma.TripGroupUncheckedCreateInput = {
        name: payload.name,
        destinationId: payload.destinationId,
        dateFrom: payload.dateFrom,
        dateTo: payload.dateTo,
        description: payload.description,
        coverUrl: payload.coverUrl,
        currencyCode: payload.currencyCode ?? "INR",
        createdBy: payload.userId,
        inviteCode: payload.inviteCode,
      };

      const group = await tx.tripGroup.create({ data });
      await tx.tripGroupMember.create({
        data: {
          groupId: group.id,
          userId: payload.userId,
          roleCode: TripMemberRole.ADMIN,
        },
      });
    });
  }

  async updateGroup(
    groupId: string,
    userId: string,
    payload: UpdateGroupRepoDTO,
  ): Promise<GroupData> {
    const group = await this.prisma.tripGroup.findUnique({
      where: { id: groupId },
      include: {
        destination: true,
        members: {
          include: {
            user: {
              select: {
                id: true,
                avatarUrl: true,
                fullName: true,
              },
            },
          },
        },
      },
    });

    if (!group) throw new GroupNotFound();

    const currentMember = group.members.find(
      (m) => m.userId === userId && m.isActive && m.roleCode === TripMemberRole.ADMIN,
    );
    if (!currentMember && group.createdBy !== userId) {
      throw new OnlyAdminCanModifyTripError();
    }

    const oldDateFrom = new Date(group.dateFrom);
    const oldDateTo = new Date(group.dateTo);
    const newDateFrom = payload.dateFrom ? new Date(payload.dateFrom) : oldDateFrom;
    const newDateTo = payload.dateTo ? new Date(payload.dateTo) : oldDateTo;

    const datesChanged =
      oldDateFrom.toISOString().split("T")[0] !== newDateFrom.toISOString().split("T")[0] ||
      oldDateTo.toISOString().split("T")[0] !== newDateTo.toISOString().split("T")[0];

    await this.prisma.$transaction(async (tx) => {
      if (datesChanged) {
        const existingDays = await tx.itineraryDay.findMany({
          where: { groupId },
          orderBy: { date: "asc" },
          include: { activities: true },
        });

        if (existingDays.length > 0) {
          const newDates: Date[] = [];
          const curr = new Date(newDateFrom);
          while (curr <= newDateTo) {
            newDates.push(new Date(curr));
            curr.setUTCDate(curr.getUTCDate() + 1);
          }

          const oldDaysCount = existingDays.length;
          const newDaysCount = newDates.length;
          const mapCount = Math.min(oldDaysCount, newDaysCount);

          // 1. Temporary dates to prevent @@unique([groupId, date]) collisions
          for (let i = 0; i < existingDays.length; i++) {
            const tempD = new Date(Date.UTC(1970, 0, 1 + i));
            await tx.itineraryDay.update({
              where: { id: existingDays[i].id },
              data: { date: tempD },
            });
          }

          // 2. Map existing days to target new calendar dates
          for (let i = 0; i < mapCount; i++) {
            await tx.itineraryDay.update({
              where: { id: existingDays[i].id },
              data: { date: newDates[i] },
            });
          }

          // 3. If trip extended, scaffold trailing empty days
          if (newDaysCount > oldDaysCount) {
            const creatorId = currentMember?.id || existingDays[0].createdBy;
            for (let i = oldDaysCount; i < newDaysCount; i++) {
              await tx.itineraryDay.create({
                data: {
                  groupId,
                  date: newDates[i],
                  createdBy: creatorId,
                },
              });
            }
          }

          // 4. If trip shortened, migrate activities from trimmed days to last valid day, then delete
          if (newDaysCount < oldDaysCount) {
            const lastValidDayId = existingDays[mapCount - 1].id;
            for (let i = mapCount; i < oldDaysCount; i++) {
              const truncatedDay = existingDays[i];
              if (truncatedDay.activities.length > 0) {
                await tx.itineraryActivity.updateMany({
                  where: { dayId: truncatedDay.id },
                  data: { dayId: lastValidDayId },
                });
              }
              await tx.itineraryDay.delete({
                where: { id: truncatedDay.id },
              });
            }
          }
        }
      }

      await tx.tripGroup.update({
        where: { id: groupId },
        data: {
          name: payload.name || group.name,
          description: payload.description !== undefined ? payload.description : group.description,
          destinationId: payload.destinationId || group.destinationId,
          coverUrl: payload.coverUrl !== undefined ? payload.coverUrl : group.coverUrl,
          currencyCode: payload.currencyCode || group.currencyCode,
          dateFrom: newDateFrom,
          dateTo: newDateTo,
        },
      });
    });

    return await this.getGroupWithDetails(groupId);
  }

  async deleteGroup(groupId: string, userId: string): Promise<void> {
    const group = await this.prisma.tripGroup.findUnique({
      where: { id: groupId },
      include: {
        members: {
          where: {
            userId,
            isActive: true,
            roleCode: TripMemberRole.ADMIN,
          },
        },
      },
    });

    if (!group) throw new GroupNotFound();
    if (group.members.length === 0 && group.createdBy !== userId) {
      throw new OnlyAdminCanModifyTripError();
    }

    await this.prisma.tripGroup.delete({
      where: { id: groupId },
    });
  }

  async getActiveGroups(userId: string): Promise<GroupData[]> {
    const groups = await this.prisma.tripGroup.findMany({
      where: {
        members: {
          some: {
            userId,
            isActive: true,
          },
        },
        dateTo: { gte: new Date() },
      },
      orderBy: {
        dateFrom: "asc",
      },
      include: {
        destination: true,
        members: {
          include: {
            user: {
              select: {
                id: true,
                avatarUrl: true,
                fullName: true,
              },
            },
          },
        },
      },
    });
    return groups.map((group) => {
      return {
        id: group.id,
        name: group.name,
        dateFrom: group.dateFrom,
        dateTo: group.dateTo,
        destination: group.destination.name,
        coverUrl: group.coverUrl ?? group.destination.coverUrl ?? "",
        members: group.members.map((m) => ({
          id: m.user.id,
          name: m.user.fullName,
          avatarUrl: m.user.avatarUrl!,
          role: m.roleCode,
        })),
      };
    });
  }

  async getPastGroups(userId: string): Promise<GroupData[]> {
    const groups = await this.prisma.tripGroup.findMany({
      where: {
        members: {
          some: {
            userId,
            isActive: true,
          },
        },
        dateTo: { lt: new Date() },
      },
      orderBy: {
        dateTo: "desc",
      },
      include: {
        destination: true,
        members: {
          include: {
            user: {
              select: {
                id: true,
                avatarUrl: true,
                fullName: true,
              },
            },
          },
        },
      },
    });
    return groups.map((group) => {
      return {
        id: group.id,
        name: group.name,
        dateFrom: group.dateFrom,
        dateTo: group.dateTo,
        destination: group.destination.name,
        coverUrl: group.coverUrl ?? group.destination.coverUrl ?? "",
        members: group.members.map((m) => ({
          id: m.user.id,
          name: m.user.fullName,
          avatarUrl: m.user.avatarUrl!,
          role: m.roleCode,
        })),
      };
    });
  }

  async getInviteCode(groupId: string): Promise<{ inviteCode: string }> {
    const group = await this.prisma.tripGroup.findFirst({
      where: {
        id: groupId,
      },
    });
    if (!group) {
      throw new GroupNotFound();
    }
    return { inviteCode: group.inviteCode };
  }

  async joinGroupByInviteCode(payload: { inviteCode: string; userId: string }): Promise<{ groupId: string; alreadyMember: boolean }> {
    const group = await this.prisma.tripGroup.findUnique({
      where: {
        inviteCode: payload.inviteCode,
      },
      select: {
        id: true,
      },
    });

    if (!group) {
      throw new Error("invalid invite link");
    }

    const existingMember = await this.prisma.tripGroupMember.findUnique({
      where: {
        groupId_userId: {
          groupId: group.id,
          userId: payload.userId,
        },
      },
    });

    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.tripGroupMember.upsert({
          where: {
            groupId_userId: {
              groupId: group.id,
              userId: payload.userId,
            },
          },
          create: {
            groupId: group.id,
            userId: payload.userId,
            roleCode: TripMemberRole.MEMBER,
          },
          update: {
            isActive: true,
            leftAt: null,
            roleCode: TripMemberRole.MEMBER,
          },
        });

        const user = await tx.user.findUnique({
          where: { id: payload.userId },
          select: { email: true },
        });

        if (user?.email) {
          await tx.tripGroupInvite.updateMany({
            where: {
              groupId: group.id,
              invitedUserEmail: user.email,
              statusCode: TripInviteStatus.PENDING,
            },
            data: {
              statusCode: TripInviteStatus.ACCEPTED,
              respondedAt: new Date(),
            },
          });
        }
      });
    } catch (error: any) {
      if (error?.code === "P2002") {
        // Idempotent join: Member already added concurrently by parallel request
        return { groupId: group.id, alreadyMember: true };
      }
      throw error;
    }

    return { groupId: group.id, alreadyMember: Boolean(existingMember) };
  }

  async GetGroupWithDetails(groupId: string): Promise<GroupData> {
    const group = await this.prisma.tripGroup.findUnique({
      where: {
        id: groupId,
      },
      include: {
        destination: {
          include: {
            country: true,
          },
        },
        members: {
          where: {
            isActive: true,
          },
          include: {
            user: {
              select: {
                id: true,
                avatarUrl: true,
                fullName: true,
              },
            },
          },
        },
      },
    });
    if (!group) {
      throw new GroupNotFound();
    }
    return {
      id: group.id,
      name: group.name,
      description: group.description,
      dateFrom: group.dateFrom,
      dateTo: group.dateTo,
      destination: group.destination.name,
      coverUrl: group.coverUrl ?? group.destination.coverUrl ?? "",
      inviteCode: group.inviteCode,
      statusCode: group.statusCode,
      currencyCode: group.currencyCode,
      destinationDetails: {
        id: group.destination.id,
        placeId: group.destination.placeId,
        name: group.destination.name,
        city: group.destination.city,
        state: group.destination.state,
        country: group.destination.country.name,
        latitude: Number(group.destination.latitude),
        longitude: Number(group.destination.longitude),
        coverUrl: group.destination.coverUrl,
      },
      members: group.members.map((m) => ({
        id: m.user.id,
        name: m.user.fullName,
        avatarUrl: m.user.avatarUrl!,
        role: m.roleCode,
        joinedAt: m.joinedAt,
      })),
    };
  }

  async getGroupWithDetails(groupId: string): Promise<GroupData> {
    return this.GetGroupWithDetails(groupId);
  }

  async createGroupInvite(payload: { groupId: string; invitedBy: string; invitedUserEmail: string }): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: payload.invitedUserEmail,
      },
      select: {
        id: true,
      },
    });
    if (user?.id) {
      const existingMember = await this.prisma.tripGroupMember.findUnique({
        where: {
          groupId_userId: {
            groupId: payload.groupId,
            userId: user.id,
          },
          isActive: true,
        },
      });
      if (existingMember) {
        throw new UserAlreadyExistInTheGroupError();
      }
    }

    const invite = await this.prisma.tripGroupInvite.findFirst({
      where: {
        invitedUserEmail: payload.invitedUserEmail,
        groupId: payload.groupId,
      },
    });
    if (invite?.id) {
      await this.prisma.tripGroupInvite.update({
        where: {
          id: invite.id,
        },
        data: {
          statusCode: TripInviteStatus.PENDING,
          createdAt: new Date(),
        },
      });
    } else {
      await this.prisma.tripGroupInvite.create({
        data: {
          ...payload,
        },
      });
    }
  }

  async getGroupInvites(groupId: string): Promise<GetGroupInvitesResponse> {
    const invites = await this.prisma.tripGroupInvite.findMany({
      where: {
        groupId,
        statusCode: TripInviteStatus.PENDING,
      },
    });
    return {
      invites: invites.map((i) => {
        return {
          id: i.id,
          groupId: i.groupId,
          invitedUserEmail: i.invitedUserEmail!,
          invitedBy: i.invitedBy,
          statusCode: i.statusCode,
          createdAt: i.createdAt,
        };
      }),
    };
  }

  async getAllTripGroups(payload: GetGroupsRequestDTO): Promise<GetAllGroupsResponseDTO> {
    const { page = 1, limit = 10, tripStatus, search, sortBy = "createdAt", sortOrder = "desc", budgetStyle } = payload;

    const where: Prisma.TripGroupWhereInput = {};

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          destination: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ];
    }

    const now = new Date();

    switch (tripStatus) {
      case "upcoming":
        where.dateFrom = {
          gt: now,
        };
        break;

      case "active":
        where.AND = [
          {
            dateFrom: {
              lte: now,
            },
          },
          {
            dateTo: {
              gte: now,
            },
          },
        ];
        break;

      case "completed":
        where.dateTo = {
          lt: now,
        };
        break;
    }

    const [groups, total] = await this.prisma.$transaction([
      this.prisma.tripGroup.findMany({
        where,
        include: {
          destination: true,
          trip: {
            select: {
              budgetStyleCode: true,
            },
          },
          members: {
            where: {
              isActive: true,
            },
            include: {
              user: {
                select: {
                  id: true,
                  fullName: true,
                },
              },
            },
          },
        },
        orderBy:
          sortBy === "dateFrom"
            ? {
                dateFrom: sortOrder,
              }
            : {
                createdAt: sortOrder,
              },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.tripGroup.count({
        where,
      }),
    ]);

    return {
      groups: groups.map((group) => ({
        id: group.id,
        name: group.name,
        dateFrom: group.dateFrom,
        dateTo: group.dateTo,
        destination: group.destination.name,
        coverUrl: group.coverUrl ?? group.destination.coverUrl ?? "",
        budgetStyle: "standard",
        members: group.members.map((m) => ({
          id: m.user.id,
          name: m.user.fullName,
          role: m.roleCode,
        })),
      })),
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getUserTripGroups(userId: string): Promise<GetGroupsResponseDTO> {
    const groups = await this.prisma.tripGroup.findMany({
      where: {
        members: {
          some: {
            userId,
            isActive: true,
          },
        },
      },
      orderBy: {
        dateFrom: "asc",
      },
      include: {
        destination: true,
        members: {
          include: {
            user: {
              select: {
                id: true,
                avatarUrl: true,
                fullName: true,
              },
            },
          },
        },
      },
    });
    return {
      groups: groups.map((group) => {
        return {
          id: group.id,
          name: group.name,
          dateFrom: group.dateFrom,
          dateTo: group.dateTo,
          destination: group.destination.name,
          coverUrl: group.coverUrl ?? group.destination.coverUrl ?? "",
          budgetStyle: "standard",
          members: group.members.map((m) => ({
            id: m.user.id,
            name: m.user.fullName,
            avatarUrl: m.user.avatarUrl!,
            role: m.roleCode,
          })),
        };
      }),
    };
  }

  async getTripDestination(groupId: string): Promise<TripDestination | null> {
    const group = await this.prisma.tripGroup.findUnique({
      where: { id: groupId },
      include: {
        destination: {
          include: { country: true },
        },
      },
    });

    if (!group) return null;

    return {
      destinationId: group.destination.id,
      city: group.destination.city ?? group.destination.name,
      state: group.destination.state,
      country: group.destination.country.name,
      latitude: Number(group.destination.latitude),
      longitude: Number(group.destination.longitude),
    };
  }
}
