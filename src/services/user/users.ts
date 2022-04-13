import { z } from 'zod'
import { get } from '../api/methods'
import { ApiGenderSchema } from '../api/schemas/ApiGenderShema'
import { ApiRoleSchema } from '../api/schemas/ApiRoleSchema'
import { toNotNullableString, toNullableDate } from '../api/transforms'

const ApiProfileSchema = z.object({
  id: z.string(),
  address: z.nullable(z.string()).transform(toNotNullableString),
  email: z.nullable(z.string()).transform(toNotNullableString),
  name: z.nullable(z.string()).transform(toNotNullableString),
  role: ApiRoleSchema,
  dateOfBirth: z.nullable(z.string()).transform(toNullableDate),
  country: z.nullable(z.string()).transform(toNotNullableString),
  state: z.nullable(z.string()).transform(toNotNullableString),
  city: z.nullable(z.string()).transform(toNotNullableString),
  gender: ApiGenderSchema,
  isActive: z.boolean(),
  childs: z.array(z.object({
    address: z.nullable(z.string()).transform(toNotNullableString),
    email: z.nullable(z.string()).transform(toNotNullableString),
    name: z.nullable(z.string()).transform(toNotNullableString),
    dateOfBirth: z.nullable(z.string()).transform(toNullableDate),
    country: z.nullable(z.string()).transform(toNotNullableString),
    state: z.nullable(z.string()).transform(toNotNullableString),
    city: z.nullable(z.string()).transform(toNotNullableString),
    gender: ApiGenderSchema
  }))
})

export type ApiProfile = z.infer<typeof ApiProfileSchema>

export const urls = {
  profile: 'user/users/profile'
}

export const endpoints = {
  getProfile: () => get(urls.profile, ApiProfileSchema)
}
