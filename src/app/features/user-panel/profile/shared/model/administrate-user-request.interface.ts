import { UserRole } from '../../../../../shared/user/enums/user-role.enum';

export interface AdministrateUserRequest {
    isBanned: boolean;
    role: UserRole;
}
