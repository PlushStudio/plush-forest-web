export function ucFirst (str: string) {
  if (!str) return str

  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

export const cutWalletPublicId = (id: string) => {
  if (id) {
    return `${id.substr(0, 6)}...${id.substr(id.length - 4, 4)}`
  }
}

export const getLinkNameByURL = (URL: string) => {
  if (URL) {
    return URL.split('https://')[1]
  }
}
