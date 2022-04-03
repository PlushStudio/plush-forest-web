import { z } from "zod";
import { get } from "../api/methods";
import { toNullableDate } from "../api/transforms";

const ApiTokensMySchema = z.object({
  total: z.number().nonnegative(),
  page: z.number().nonnegative(),
  page_size: z.number().nonnegative(),
  result: z.array(z.object({
    token_address: z.string(),
    token_id: z.string(),
    block_number_minted: z.string(),
    owner_of: z.string(),
    block_number: z.string(),
    amount: z.string(),
    contract_type: z.string(),
    name: z.string(),
    symbol: z.string(),
    token_uri: z.string(),
    metadata: z.string().nullable(),
    synced_at: z.nullable(z.string()).transform(toNullableDate)
  }))
})

export type ApiTokensMy = z.infer<typeof ApiTokensMySchema>

export const urls = {
  tokensMy: 'forest/tokens/my'
}

export const endpoints = {
  getTokens: () => get(urls.tokensMy, ApiTokensMySchema)
}
