import { MouseEvent, useEffect, useRef, useState } from 'react'
import shihuahuacoTreeImage from '@/assets/images/plantingTree/tree-shihuahuaco.png'
import cacaoTreeImage from '@/assets/images/plantingTree/tree-cacao.png'
import guabaTreeImage from '@/assets/images/plantingTree/tree-guaba.png'
import caobaImage from '@/assets/images/plantingTree/tree-caoba.png'
import api from '@/api/api'
import { UserTokens } from '@/types/UserTokens'
import { useHistory } from 'react-router'
import routes from '@/Router/routes'
import axios from 'axios'
import { useStore } from 'effector-react'
import { $walletStore } from '@/store/wallet'
import { $forest } from '@/store/forest'
import { $user } from '@/store/user'
import { $app } from '@/store/app'

export const treeNames = ['SHIHUAHUACO', 'CACAO', 'GUABA', 'CAOBA']

export const PlantingLogic = () => {
  const input = useRef<HTMLInputElement>(null)
  const [isVisited, setIsVisited] = useState<boolean>(false)
  const [isPlanting, setIsPlanting] = useState<boolean>(false)
  const [isPlantBtnLoading, setIsPlantBtnLoading] = useState<boolean>(false)
  const [currentTreePrice, setCurrentTreePrice] = useState<string>('')
  const [plantingStep, setPlantingStep] = useState<number>(0)
  const [nameFrom, setNameFrom] = useState<string>('')
  const [treeImage, setTreeImage] = useState<string>(shihuahuacoTreeImage)
  const [isBalanceHintVisible, setIsBalanceHintVisible] = useState<boolean>(false)
  const history = useHistory()

  const walletStore = useStore($walletStore)
  const { treesPrice } = useStore($forest)
  const { selectedTreeType } = useStore($app)
  const user = useStore($user)
  const { userBalance, safeBalance } = useStore($app)

  const plantingTreeImages = [shihuahuacoTreeImage, cacaoTreeImage, guabaTreeImage, caobaImage]

  useEffect(() => {
    setTreeImage(plantingTreeImages[treeNames.indexOf(selectedTreeType)])
    setCurrentTreePrice(String(treesPrice[treeNames.indexOf(selectedTreeType)] * 10 ** 18))
  }, [selectedTreeType, treesPrice])

  useEffect(() => {
    if (userBalance < treesPrice[treeNames.indexOf(selectedTreeType)] &&
      safeBalance < treesPrice[treeNames.indexOf(selectedTreeType)]) {
      setIsBalanceHintVisible(true)
    }
  }, [safeBalance, userBalance])

  const isTokenBackendAvailable = async (tokenId: string, delay: number) => {
    const checkTokenBackendInterval = setInterval(async () => {
      try {
        const tokenAvailabilityResult = await axios.get(
          `${api.url}/forest/tokens/token/${tokenId}`,
          { withCredentials: true }
        )
        if (tokenAvailabilityResult) {
          history.push(`${routes.token}/${tokenId}`)
          clearInterval(checkTokenBackendInterval)
        }
      } catch (e: any) {
        throw Error(e.message)
      }
    }, delay)

    return checkTokenBackendInterval
  }

  const checkTokenAvailability = async () => {
    // empty message for Pilot
    const treeMintingResult = await walletStore?.treeContractManager.mintTree(user.address,
      selectedTreeType,
      nameFrom,
      user.childs[0].name,
      '')
    if (treeMintingResult) {
      const getMyTokensInterval = setInterval(async () => {
        const myTokens: UserTokens = await api.user.users.tokens.request(getMyTokensInterval)
        if (myTokens.total > 0) {
          await isTokenBackendAvailable(myTokens.tokens[0].token_id, 5000)
        }
      }, 5000)
    } else {
      setIsPlanting(false)
      setIsPlantBtnLoading(false)
    }
  }
  const startAllowanceLoop = async (delay: number = 7000) => {
    const updateBuyAllowance = setInterval(async function () {
      const allowance = await walletStore?.plushContractManager.getBuyAllowance(user.address, currentTreePrice)
      if (allowance) {
        try {
          setPlantingStep(1)
          clearInterval(updateBuyAllowance)
          await walletStore?.plushCoinWalletsContractManager.deposit(user.address, currentTreePrice)
          await checkTokenAvailability()
        } catch (e: any) {
          clearInterval(updateBuyAllowance)
          setIsPlanting(false)
          setIsPlantBtnLoading(false)
          throw Error(e.message)
        }
      }
    }, delay)
  }

  const plantTreeHandler = async () => {
    const myTokens: UserTokens = await api.user.users.tokens.request()
    if (!myTokens.tokens.length) {
      setIsPlanting(true)
      try {
        const safeBalance = await walletStore?.plushCoinWalletsContractManager.getBalance(user.address)
        if (safeBalance !== undefined) {
          if (safeBalance >= Number(treesPrice[treeNames.indexOf(selectedTreeType)])) {
            await checkTokenAvailability()
          } else {
            const allowance = await walletStore?.plushContractManager.getBuyAllowance(user.address, currentTreePrice)
            if (allowance) {
              setPlantingStep(1)
              await walletStore?.plushCoinWalletsContractManager.deposit(user.address, currentTreePrice)
              await checkTokenAvailability()
            } else {
              const updateBuyAllowance = setInterval(async function () {
                const allowancePromise = walletStore?.plushContractManager.getBuyAllowance(user.address, currentTreePrice)
                if (await allowancePromise) {
                  clearInterval(updateBuyAllowance)
                  setPlantingStep(1)
                  await walletStore?.plushCoinWalletsContractManager.deposit(user.address, currentTreePrice)
                  await checkTokenAvailability()
                } else {
                  setPlantingStep(0)
                  clearInterval(updateBuyAllowance)
                  try {
                    await walletStore?.plushContractManager.getApprove(currentTreePrice)
                    await startAllowanceLoop()
                  } catch (e) {
                    setIsPlanting(false)
                    setIsPlantBtnLoading(false)
                  }
                }
              }, 7000)
            }
          }
        }
      } catch (e: any) {
        setIsPlanting(false)
        setIsPlantBtnLoading(false)
        throw new Error(e.message)
      }
    } else {
      history.push(`${routes.token}/${myTokens.tokens[0].token_id}`)
    }
  }

  const startMintProcess = async (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    if (!isBalanceHintVisible) {
      if (!nameFrom?.length) {
        input.current?.focus()
        setIsVisited(true)
      } else {
        setIsPlantBtnLoading(true)
        await plantTreeHandler()
      }
    }
  }

  const nameFromHandler = (e: any) => {
    setIsVisited(true)
    setNameFrom(e.target.value)
  }

  return {
    nameFromHandler,
    startMintProcess,
    isPlanting,
    isPlantBtnLoading,
    isVisited,
    treeImage,
    nameFrom,
    plantingStep,
    isBalanceHintVisible
  }
}
