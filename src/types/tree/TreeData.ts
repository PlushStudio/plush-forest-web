import { TreeDataInfo } from '@/types/tree/TreeDataInfo'
import { TreeDataSubInfo } from '@/types/tree/TreeDataSubInfo'

export type TreeData = {
  name: string,
  desc: string,
  treeType: string,
  info: TreeDataInfo[],
  age: string,
  height: string,
  co2: string,
  subInfo: TreeDataSubInfo[],
  firstBlockInfo: {
    message: string,
    date: string
  },
  secondBlockInfo: {
    message: string,
    date: string
  },
  imageLink: string,
  planterOrganization: string,
  planterPhoto: string,
  planterBio: string,
  planterName: string,
}