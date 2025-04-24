export interface IUser {
    [x: string]: any;
    _id?: string;
    name: string;
    email: string;
    role: "admin" | "customer";
    status: "active" | "inactive";
    needsPasswordChange?: boolean;
    passwordChangedAt?: string;
    createdAt?: string;
    updatedAt?: string;
    image?: string;
    iat?: number;
    exp?: number;
}
