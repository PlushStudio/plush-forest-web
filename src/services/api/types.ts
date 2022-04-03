import { z } from "zod";

export const ApiErrorSchema = z.object({
  statusCode: z.number(),
  message: z.string()
})

export class ApiError {
  statusCode: number
  message: string

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode,
      this.message = message
  }
}