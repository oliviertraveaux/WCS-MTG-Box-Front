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
        type: string;
    };
    avatar: any;
}
