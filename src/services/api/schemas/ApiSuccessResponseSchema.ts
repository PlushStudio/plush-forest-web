import { z } from "zod";

export const ApiSuccessResponseSchema = z.object({
  done: z.boolean()
})

export type ApiSuccessResponse = typeof ApiSuccessResponseSchema