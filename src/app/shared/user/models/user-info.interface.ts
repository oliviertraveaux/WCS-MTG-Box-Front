import { UserRole } from '../enums/user-role.enum';

export interface UserInfo {
    id: number;
    username: string;
    email: string;
    isActive: boolean;
    isBanned: boolean;
    department: number;
    city: string;
    lastConnectionDate: Date;
    creationDate: Date;
    role: {
        id: number;
        type: UserRole;
    };
    avatar: any;
}
