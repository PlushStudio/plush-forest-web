export const toNotNullableString = (value: string | null): string => {
  return value ? value : ''
}

export const toNullableDate = (value: string | null): Date | null => {
  return value ? new Date(value) : null
}