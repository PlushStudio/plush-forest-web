export type UserToken = [{
  description: string,
  external_url: string,
  image: string,
  name: string,
  attributes: [{
    display_type?: string,
    trait_type: string,
    value: string,
  }
  ]
}]