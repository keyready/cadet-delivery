export interface User {
    id: number;
    username: string;
    role?: string;
    paymentLink?: string;
}

export interface UserSchema {
    authData?: User;

    _inited?: boolean;
}
