export type ModalContent = {
  [key: string]: ModalObject
}
export type ModalObject = {
  step?: string,
  title: string,
  timing: string,
  content: string,
}