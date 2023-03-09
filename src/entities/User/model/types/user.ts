export interface User {
    id: number;
    username: string;
    role?: string;
    balance?: number;
}

export interface UserSchema {
    authData?: User;

    _inited?: boolean;
}
