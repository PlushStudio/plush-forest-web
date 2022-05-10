import { z } from 'zod'

const ApiTreesMySchema = z.object({
  treesInfo: z.array(z.object({
    treeType: z.string(),
    price: z.number(),
    count: z.number()
  }))
})

export type ApiTreesMy = z.infer<typeof ApiTreesMySchema>
