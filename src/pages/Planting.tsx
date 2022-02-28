import React, { MouseEvent, useContext, useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import shihuahuacoTreeImage from '@/assets/images/planting-tree/shihuahuaco.png'
import cacaoTreeImage from '@/assets/images/planting-tree/cacao.png'
import guabaTreeImage from '@/assets/images/planting-tree/guaba.png'
import caobaImage from '@/assets/images/planting-tree/caoba.png'
import { CustomInput } from '@/components/App/shared-components/CustomInput/CustomInput'
import s from './Planting.module.scss'
import { MainActionButton } from '@/components/App/shared-components/MainActionButton/MainActionButton'
import { CustomSelect } from '@/components/App/shared-components/CustomSelect/CustomSelect'
import { userDetailsContext } from '@/context/UserDetailsProvider'
import usePLAIContract from '@/hooks/usePLUSHContract'
import useTreeContract from '@/hooks/useTreeContract'
import { PlantingModal } from '@/components/App/shared-components/PlantingModal/PlantingModal'
import api from '@/api/api'
import { UserTokens } from '@/types/UserTokens'
import { useHistory } from "react-router";
import routes from "@/components/Router/routes";
import shihuahuacoIcon from "@/assets/images/tree-icon-selector/shihuahuaco.png";
import cacaoIcon from "@/assets/images/tree-icon-selector/cacao.png";
import guabaIcon from "@/assets/images/tree-icon-selector/guaba.png";
import caobaIcon from "@/assets/images/tree-icon-selector/caoba.png";
import { treesInfo } from "@/assets/data/Trees";
import { errors } from "@/hooks/useMetamaskWallet";

export const treeNames = ['SHIHUAHUACO', 'CACAO', 'GUABA', 'CAOBA']

const treeTypeSelectorImages = [shihuahuacoIcon, cacaoIcon, guabaIcon, caobaIcon]
const plantingTreeImages = [shihuahuacoTreeImage, cacaoTreeImage, guabaTreeImage, caobaImage]

export const PlantPage = () => {
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
          history.push(`${routes.token}/${myTokens.tokens[0].token_id}`)
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
        await deposit(String(userDetails.treesPrice[userDetails.treeTypeIdToPlant] * 10 ** 18))
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
              await deposit(String(userDetails.treesPrice[userDetails.treeTypeIdToPlant] * 10 ** 18))
              await checkTokenAvailability()
            } else {
              const updateBuyAllowance = setInterval(async function () {
                const allowancePromise = getBuyAllowance(userDetails.address, String(userDetails.treesPrice[userDetails.treeTypeIdToPlant] * 10 ** 18))
                if (await allowancePromise) {
                  clearInterval(updateBuyAllowance)
                  setPlantingStatus('Planting your tree')
                  await deposit(String(userDetails.treesPrice[userDetails.treeTypeIdToPlant] * 10 ** 18))
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

  return (
    <div className={s.backgroundContainer}>
      <div className={s.container}>
        {isPlanting ? (
          <PlantingModal status={plantingStatus} />
        ) : (
          <div className={s.plantingFormWrapper}>
            <Form className={s.plantingForm}>
              <Form.Group controlId="treeName" className={s.formHeader}>
                <Form.Label className={s.formLabel}>
                  To {userDetails.childName}
                </Form.Label>
                <CustomSelect currency={userDetails.currency}
                  itemsInfo={treesInfo}
                  icons={treeTypeSelectorImages}
                  prices={[1,2,3,4]}/>
              </Form.Group>
              <Form.Group controlId="treeName" className={s.inputWrapper}>
                <Form.Label className={s.formLabel}>
                  From
                </Form.Label>
                <CustomInput
                  input={input}
                  onChange={(e: any) => {
                    nameFromHandler(e)
                  }}
                  value={nameFrom}
                  type="text"
                  placeholder="Your name"
                  readonly={isPlanting}
                  status={nameFrom || !isVisited ? 'isTyping' : 'error'}
                  message={!nameFrom && isVisited ? 'Your name is required to plant a tree' : ''}
                />
              </Form.Group>
              {userDetails.balance < 5 && (
                <span className={s.statusText}>
                  You need more plush tokens to perform this operation
                </span>
              )}
              {!isPlanting && (
                <MainActionButton
                  onClick={(e: MouseEvent<HTMLButtonElement>) => startMintProcess(e)}
                  text="Plant your tree"
                  variant="small"
                  image="tree"
                />
              )}
              {isPlanting && (
                <MainActionButton
                  loading={isPlanting}
                  text="Planting..."
                  variant="small"
                  image="tree"
                />
              )}
            </Form>
            <img src={treeImage} className="planting-tree-image" alt="logo" />
          </div>
        )}
      </div>
    </div>
  )
}
