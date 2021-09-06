import { Child } from "./child"
import { Gender } from "./gender"
import { Role } from "./role"

export type User = {
    address: string,
    gender: Gender,
    email: string,
    role: Role,
    childs?: Array<Child>
}