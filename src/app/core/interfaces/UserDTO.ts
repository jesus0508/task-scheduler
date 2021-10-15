import { Role } from "./Role";

export interface UserDTO {
    id: number,
    names: string
    firstSurname?: string
    lastSurname?: string,
    username: string,
    role: Role,
    registrationDate?: Date,
    active?: boolean,
}