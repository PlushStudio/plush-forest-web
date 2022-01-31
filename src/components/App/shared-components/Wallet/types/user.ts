import { Gender } from '@/types/Gender'

export type User = {
  address: string,
  treeTypeToPlant: string,
  name: string,
  gender: Gender
  childs: [{
    name: string
  }]
}