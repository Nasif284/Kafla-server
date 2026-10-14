import { ChecklistItem, Prisma } from '@prisma/client';
import { IChecklistRepository } from '../../../application/interfaces/repositories/checklist.repository';
import { BaseRepository } from './base.repository';
import { inject, injectable } from 'tsyringe';
import { TOKENS } from '../../di/tokens';
import { PrismaClient } from '@prisma/client/extension';
import { ChecklistRepositoryResult } from '../../../application/dtos/checklist/respose/get-checklist.dto';
import { AddTaskToChecklistRequestDTO } from '../../../application/dtos/checklist/request/add-task.dto';
import { EditChecklistTaskRequestDTO } from '../../../application/dtos/checklist/request/edit-task.dto';
import { ChecklistCategory, ChecklistPriority, ChecklistActivityType } from '../../../domain/enums';

@injectable()
export class ChecklistRepository
  extends BaseRepository<
    ChecklistItem,
    Prisma.ChecklistItemCreateInput,
    Prisma.ChecklistItemUpdateInput
  >
  implements IChecklistRepository
{
  constructor(@inject(TOKENS.PrismaClient) prisma: PrismaClient) {
    super(prisma, prisma.checklist);
  }
  async getChecklist(groupId: string): Promise<ChecklistRepositoryResult> {
    const categories = [
      { code: ChecklistCategory.ESSENTIALS, name: 'Essentials' },
      { code: ChecklistCategory.CLOTHING, name: 'Clothing' },
      { code: ChecklistCategory.DOCUMENTS, name: 'Documents' },
      { code: ChecklistCategory.ELECTRONICS, name: 'Electronics' },
      { code: ChecklistCategory.TOILETRIES, name: 'Toiletries' },
      { code: ChecklistCategory.OTHER, name: 'Other' },
    ];

    const items = await this.prisma.checklistItem.findMany({
      where: {
        groupId,
      },
      include: {
        assignee: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return {
      categories,
      items: items.map((i) => ({
        ...i,
        categoryCode: i.categoryCode as ChecklistCategory,
        priorityCode: i.priorityCode as ChecklistPriority,
        assignee: i.assignee
          ? {
              id: i.assignee.id,
              userId: i.assignee.user.id,
              fullName: i.assignee.user.fullName,
              avatarUrl: i.assignee.user.avatarUrl,
            }
          : null,
      })),
    };
  }
  async addTask(payload: AddTaskToChecklistRequestDTO): Promise<void> {
    await this.prisma.checklistItem.create({
      data: {
        title: payload.title,
        assignedTo: payload.assignedTo,
        categoryCode: payload.categoryCode,
        priorityCode: payload.priorityCode,
        createdBy: payload.createdBy,
        groupId: payload.groupId,
        notes: payload.notes || null,
      },
    });
  }
  async editTask(payload: EditChecklistTaskRequestDTO): Promise<void> {
    await this.prisma.checklistItem.update({
      where: {
        id: payload.id,
      },
      data: {
        title: payload.title,
        notes: payload.notes || null,
        assignedTo: payload.assignedTo,
        categoryCode: payload.categoryCode,
        priorityCode: payload.priorityCode,
      },
    });
  }

  async deleteTask(id: string): Promise<void> {
    await this.prisma.checklistItem.delete({
      where: {
        id,
      },
    });
  }

  async completeTask(id: string): Promise<void> {
    const item = await this.prisma.checklistItem.findUnique({
      where: { id },
      select: { isCompleted: true },
    });
    const nextState = !item?.isCompleted;
    await this.prisma.checklistItem.update({
      where: {
        id,
      },
      data: {
        isCompleted: nextState,
        completedAt: nextState ? new Date() : null,
      },
    });
  }
}
