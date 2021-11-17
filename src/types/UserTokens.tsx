export type UserTokens = {
  items: [{
    token: number
  }],
  meta: {
    currentPage: number,
    itemCount: number,
    itemsPerPage: number,
    totalItems: number,
    totalPages: number,
  }
}