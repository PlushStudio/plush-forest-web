import { Gender } from "@/types/Gender";

export interface User {
  address: string,
  email: string,
  name: string,
  dateOfBirth: Date | null,
  country: string,
  state: string,
  city: string,
  gender: Gender | null
}