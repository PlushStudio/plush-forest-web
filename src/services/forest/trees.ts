import { z } from 'zod'

const ApiTreesMySchema = z.object({
  treesCount: z.array(z.number()),
  treesPrice: z.array(z.number())
})

export type ApiTreesMy = z.infer<typeof ApiTreesMySchema>
