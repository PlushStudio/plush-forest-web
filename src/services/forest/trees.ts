import { z } from 'zod'

const ApiTreesMySchema = z.object({
  treesInfo: z.array(z.object({
    type: z.string(),
    price: z.number().nonnegative(),
    count: z.number().nonnegative()
  }))
})

export type ApiTreesMy = z.infer<typeof ApiTreesMySchema>
