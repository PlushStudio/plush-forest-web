import { z } from "zod";
import { toNotNullableString } from "@/services/api/transforms";

const ApiTreesMySchema = z.object({
  treesCount: z.array(z.number()),
  treesPrice: z.array(z.number()),
  selectedTreeType: z.nullable(z.string()).transform(toNotNullableString),
})

export type ApiTreesMy = z.infer<typeof ApiTreesMySchema>
