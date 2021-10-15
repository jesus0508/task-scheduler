import { Role } from "./Role";

export interface User {
    token: string,
    name: string
    user: string,
    role: Role
}