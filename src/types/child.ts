import { Gender } from "./gender"

export type Child = {
    name: string,
    dateOfBirth: string,
    gender: Gender,
    country: string,
    state?: string,
    city?: string
}