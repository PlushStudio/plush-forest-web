import { Gender } from '@/types/Gender'

export interface UserDefault {
  address: string | undefined,
  treeTypeIdToPlant: number,
  name: string | undefined,
  gender: null | Gender,
  isOpenDropdown: boolean | null,
  hasToken: undefined
}

export const userDefault: UserDefault = {
  address: undefined,
  treeTypeIdToPlant: 0,
  name: undefined,
  gender: null,
  isOpenDropdown: false,
  hasToken: undefined
}

export const treeDefault = {
  name: '',
  desc: '',
  type: '',
  info: [
    { title: 'Age', desc: '1 month' },
    { title: 'Height', desc: '5.2 Inches' },
    { title: 'CO2', desc: '2.5 Kg' }
  ],
  age: '1 month',
  height: '5.2 Inches',
  co2: '2.5 Kg',
  subInfo: [
    { title: 'Location', desc: '', img: '' },
    { title: 'tree height', desc: '', img: '' }
  ],
  firstBlockInfo: {
    message: '',
    date: '11.22.22'
  },
  secondBlockInfo: {
    message: '',
    date: '11.22.22'
  },
  imageLink: '',
  planterName: '',
  planterOrganization: '',
  planterBio: '',
  planterPhoto: ''
}
