import { Child } from '../child/types'
import { User } from '../user/types'

export interface Parent extends User {
  childs: Array<Child>
}
