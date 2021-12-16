export function ucFirst(str: string) {
  if (!str) return str

  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

export const cutWalletPublicId = (id: string) => {
  return `${id.substr(0, 6)}...${id.substr(id.length - 4, 4)}`
}