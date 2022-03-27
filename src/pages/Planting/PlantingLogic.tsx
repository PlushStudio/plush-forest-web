import React, { MouseEvent, useContext, useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import shihuahuacoTreeImage from '@/assets/images/planting-tree/shihuahuaco.png'
import cacaoTreeImage from '@/assets/images/planting-tree/cacao.png'
import guabaTreeImage from '@/assets/images/planting-tree/guaba.png'
import caobaImage from '@/assets/images/planting-tree/caoba.png'
import { userDetailsContext } from '@/context/UserDetailsProvider'
import usePLAIContract from '@/hooks/usePLUSHContract'
import useTreeContract from '@/hooks/useTreeContract'
import api from '@/api/api'
import { UserTokens } from '@/types/UserTokens'
import { useHistory } from "react-router";
import routes from "@/components/Router/routes";
import { errors } from "@/hooks/useMetamaskWallet";
import axios from "axios";

export const treeNames = ['SHIHUAHUACO', 'CACAO', 'GUABA', 'CAOBA']

export const PlantingLogic = () => {
  const input = useRef<HTMLInputElement>(null)
  const [isVisited, setIsVisited] = useState<boolean>(false)
  const [isPlanting, setIsPlanting] = useState<boolean>(false)
  const [plantingStatus, setPlantingStatus] = useState<string>('Confirmation')
  const [nameFrom, setNameFrom] = useState<string>('')
  const [treeImage, setTreeImage] = useState(shihuahuacoTreeImage)
  const [userDetails] = useContext(userDetailsContext)
  const { getBuyAllowance, getApprove } = usePLAIContract()
  const { mintTree, getSafeBalance, deposit } = useTreeContract()
  const history = useHistory()

  const plantingTreeImages = [shihuahuacoTreeImage, cacaoTreeImage, guabaTreeImage, caobaImage]

  useEffect(() => {
    setTreeImage(plantingTreeImages[userDetails.treeTypeIdToPlant])
  }, [userDetails.treeTypeIdToPlant])

  const checkTokenAvailability = async () => {
    //empty message for Pilot
    const treeMintingResult = await mintTree(userDetails.address,
      treeNames[userDetails.treeTypeIdToPlant],
      String(userDetails.treesPrice[userDetails.treeTypeIdToPlant] * 10 ** 18),
      nameFrom,
      userDetails.childName,
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
    }
  }
  const startAllowanceLoop = async (delay: number = 7000) => {
    const updateBuyAllowance = setInterval(async function () {
      const allowance = await getBuyAllowance(userDetails.address, String(userDetails.treesPrice[userDetails.treeTypeIdToPlant] * 10 ** 18))
      if (allowance) {
        setPlantingStatus('Planting your tree')
        clearInterval(updateBuyAllowance)
        await deposit(userDetails.address, String(userDetails.treesPrice[userDetails.treeTypeIdToPlant] * 10 ** 18))
        await checkTokenAvailability()
      }
    }, delay)
  }

  const plantTreeHandler = async () => {
    const myTokens: UserTokens = await api.user.users.tokens.request()
    if (!myTokens.tokens.length) {
      setIsPlanting(true)
      try {
        const safeBalance = await getSafeBalance(userDetails.address)
        if (safeBalance !== undefined) {
          if (safeBalance >= Number(userDetails.treesPrice[userDetails.treeTypeIdToPlant])) {
            await checkTokenAvailability()
          } else {
            const allowance = await getBuyAllowance(userDetails.address, String(userDetails.treesPrice[userDetails.treeTypeIdToPlant] * 10 ** 18))
            if (allowance) {
              setPlantingStatus('Planting your tree')
              await deposit(userDetails.address, String(userDetails.treesPrice[userDetails.treeTypeIdToPlant] * 10 ** 18))
              await checkTokenAvailability()
            } else {
              const updateBuyAllowance = setInterval(async function () {
                const allowancePromise = getBuyAllowance(userDetails.address, String(userDetails.treesPrice[userDetails.treeTypeIdToPlant] * 10 ** 18))
                if (await allowancePromise) {
                  clearInterval(updateBuyAllowance)
                  setPlantingStatus('Planting your tree')
                  await deposit(userDetails.address, String(userDetails.treesPrice[userDetails.treeTypeIdToPlant] * 10 ** 18))
                  await checkTokenAvailability()
                } else {
                  setPlantingStatus('Confirmation')
                  clearInterval(updateBuyAllowance)
                  try {
                    await getApprove(String(userDetails.treesPrice[userDetails.treeTypeIdToPlant] * 10 ** 18))
                    await startAllowanceLoop()
                  } catch (e) {
                    setIsPlanting(false)
                  }
                }
              }, 7000)
            }
          }
        }
      } catch (e: any) {
        setIsPlanting(false)
        throw errors.walletNotConnected
      }
    } else {
      history.push(`${routes.token}/${myTokens.tokens[0].token_id}`)
    }
  }

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
      }
      catch (e: any) {
        throw Error(e.message)
      }
    }, delay)

    return checkTokenBackendInterval
  }

  const startMintProcess = async (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    if (!nameFrom?.length) {
      input.current?.focus()
      setIsVisited(true)
    } else {
      await plantTreeHandler()
    }
  }

  const nameFromHandler = (e: any) => {
    setIsVisited(true)
    setNameFrom(e.target.value)
  }

  return {
    nameFromHandler,
    startMintProcess,
    setIsPlanting,
    setPlantingStatus,
    setIsVisited,
    setNameFrom,
    setTreeImage,
    isPlanting,
    isVisited,
    treeImage,
    nameFrom,
    plantingStatus
  }
}
