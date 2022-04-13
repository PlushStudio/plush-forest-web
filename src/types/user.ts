import { Gender } from '@/types/Gender'

export type User = {
  address: string,
  name: string,
  gender: Gender
  childs: [{
    name: string
  }]
}
