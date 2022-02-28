import { Token } from "@/types/Token";

export type UserTokens = {
  total: number,
  tokens: Token[],
  pageKey?: string,
}
