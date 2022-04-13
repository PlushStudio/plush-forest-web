export const networks = [
  {
    id: '1',
    name: 'Ethereum mainnet'
  },
  {
    id: '80001',
    name: 'Mumbai'
  },
  {
    id: '3',
    name: 'Ropsten Test Network'
  },
  {
    id: '42',
    name: 'Kovan Test Network'
  },
  {
    id: '4',
    name: 'Rinkeby Test Network'
  },
  {
    id: '5',
    name: 'Goerli Test Network'
  }
]

export interface EthereumNetwork {
  id: string,
  name: string
}
