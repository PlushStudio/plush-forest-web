export type UserTokens = {
  result: [{
    token_id: string;
  }],
  meta: {
    currentPage: number,
    itemCount: number,
    itemsPerPage: number,
    totalItems: number,
    totalPages: number,
  }
}
