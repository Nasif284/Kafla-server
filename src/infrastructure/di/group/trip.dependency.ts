import { container } from 'tsyringe';
import { TOKENS } from '../tokens';
import { CreateGroup } from '../../../application/use-cases/trip/create-group.usecase';
import { UpdateTripGroup } from '../../../application/use-cases/trip/update-trip-group.usecase';
import { DeleteTripGroup } from '../../../application/use-cases/trip/delete-trip-group.usecase';
import { GetActiveGroups } from '../../../application/use-cases/trip/get-active-groups.usecase';
import { GetPastGroups } from '../../../application/use-cases/trip/get-past-groups.usecase';
import { AddMembers } from '../../../application/use-cases/trip/add-members.usecase';
import { GetMembers } from '../../../application/use-cases/trip/get-members.usecase';
import { GetGroup } from '../../../application/use-cases/trip/get-group.usecase';
import { GetInviteCode } from '../../../application/use-cases/trip/get-invite-code.usecase';
import { SendInvite } from '../../../application/use-cases/trip/send-invite.usecase';
import { JoinWithLink } from '../../../application/use-cases/trip/join-with-link.usecase';
import { GetInvites } from '../../../application/use-cases/trip/get-invites.usecase';
import { RemoveMember } from '../../../application/use-cases/trip/remove-member.usecase';
import { ChangeMemberRole } from '../../../application/use-cases/trip/change-member-role.usecase';
import { GetTripWeather } from '../../../application/use-cases/trip/trip-weather.usecase';
import { GetAllTripGroups } from '../../../application/use-cases/trip/get-all-groups.usecase';
import { GetUserGroups } from '../../../application/use-cases/trip/get-user-groups.usecase';

export function registerTripDependency() {
  container.registerSingleton<CreateGroup>(TOKENS.ICreateGroup, CreateGroup);
  container.registerSingleton<UpdateTripGroup>(
    TOKENS.IUpdateTripGroup,
    UpdateTripGroup,
  );
  container.registerSingleton<DeleteTripGroup>(
    TOKENS.IDeleteTripGroup,
    DeleteTripGroup,
  );
  container.registerSingleton<GetActiveGroups>(
    TOKENS.IGetActiveGroups,
    GetActiveGroups,
  );
  container.registerSingleton<GetPastGroups>(
    TOKENS.IGetPastGroups,
    GetPastGroups,
  );
  container.registerSingleton<AddMembers>(TOKENS.IAddMembers, AddMembers);
  container.registerSingleton<GetMembers>(TOKENS.IGetMembers, GetMembers);
  container.registerSingleton<GetGroup>(TOKENS.IGetGroup, GetGroup);
  container.registerSingleton<GetInviteCode>(
    TOKENS.IGetInviteCode,
    GetInviteCode,
  );
  container.registerSingleton<SendInvite>(TOKENS.ISendInvite, SendInvite);
  container.registerSingleton<JoinWithLink>(TOKENS.IJoinWithLink, JoinWithLink);
  container.registerSingleton<GetInvites>(TOKENS.IGetInvites, GetInvites);
  container.registerSingleton<RemoveMember>(TOKENS.IRemoveMember, RemoveMember);
  container.registerSingleton<ChangeMemberRole>(
    TOKENS.IChangeRole,
    ChangeMemberRole,
  );
  container.registerSingleton<GetTripWeather>(
    TOKENS.IGetWeather,
    GetTripWeather,
  );
  container.registerSingleton<GetAllTripGroups>(
    TOKENS.IGetAllTripGroups,
    GetAllTripGroups,
  );
  container.registerSingleton<GetUserGroups>(
    TOKENS.IGetUserGroups,
    GetUserGroups,
  );
}
