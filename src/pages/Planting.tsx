import React, { useContext, useEffect, useState } from 'react'
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

export const treeNames = ['SHIHUAHUACO', 'CACAO', 'GUABA', 'CAOBA']

export const PlantPage = () => {
  const [isPlanting, setIsPlanting] = useState<boolean>(false)
  const [plantingStatus, setPlantingStatus] = useState<string>('Confirmation')
  const [helperText, setHelperText] = useState<string>('')
  const [nameFrom, setNameFrom] = useState<string>('')
  const [treeImage, setTreeImage] = useState(shihuahuacoTreeImage)
  const [userDetails] = useContext(userDetailsContext)
  const plantingTreeImages = [shihuahuacoTreeImage, cacaoTreeImage, guabaTreeImage, caobaImage]
  const { getBuyAllowance, getApprove } = usePLAIContract()
  const { mintATree } = useTreeContract()

  useEffect(() => {
    setTreeImage(plantingTreeImages[userDetails.treeTypeIdToPlant])
  }, [userDetails.treeTypeIdToPlant])

  const startAllowanceLoop = (delay: number = 7000) => {
    const updateBuyAllowance = setInterval(async function () {
      const allowance = await getBuyAllowance(userDetails.address)
      if (allowance) {
        setPlantingStatus('Planting your tree')
        clearInterval(updateBuyAllowance)
        //empty message for Pilot
        const treeMintingResult = await mintATree(userDetails.address, treeNames[userDetails.treeTypeIdToPlant], nameFrom, userDetails.childName, '')
        if (treeMintingResult) {
          const getMyTokensInterval = setInterval(async function () {
            await api.user.users.tokens.request(getMyTokensInterval)
          }, 5000)
        } else {
          setIsPlanting(false)
        }
      }
    }, delay)
  }

  const plantTreeHandler = async () => {
    const myTokens: UserTokens = await api.user.users.tokens.request()
    if (!myTokens.items.length) {
      setIsPlanting(true)
      try {
        const allowance = await getBuyAllowance(userDetails.address)
        if (allowance) {
          setPlantingStatus('Planting your tree')
          //empty message for Pilot
          try {
            const treeMintingResult = await mintATree(userDetails.address, treeNames[userDetails.treeTypeIdToPlant], nameFrom, userDetails.childName, '')

            if (treeMintingResult) {
              const getMyTokensInterval = setInterval(async function () {
                await api.user.users.tokens.request(getMyTokensInterval)
              }, 5000)
            }
          } catch (e) {
            setIsPlanting(false)
          }
        } else {
          const updateBuyAllowance = setInterval(async function () {
            const allowanceResult = getBuyAllowance(userDetails.address)
            if (await allowanceResult) {
              clearInterval(updateBuyAllowance)
              setPlantingStatus('Planting your tree')
              const treeMintingResult = await mintATree(userDetails.address, treeNames[userDetails.treeTypeIdToPlant], nameFrom, userDetails.childName, '')
              if (treeMintingResult) {
                const getMyTokensInterval = setInterval(async function () {
                  await api.user.users.tokens.request(getMyTokensInterval)
                }, 5000)
              }
            } else {
              setPlantingStatus('Confirmation')
              clearInterval(updateBuyAllowance)
              try {
                await getApprove().then(async () => {
                  startAllowanceLoop()
                })
              } catch (e) {
                setIsPlanting(false)
              }
            }
          }, 7000)
        }
      } catch (e: any) {
        setIsPlanting(false)
        console.log(e.message)
      }
    }
  }

  const startMintProcess = async () => {
    if (nameFrom === '') {
      setHelperText('The name cannot be empty')
    } else {
      await plantTreeHandler()
    }
  }

  return (
    <div className={s.backgroundContainer}>
      <div className={s.container}>
        {isPlanting ? <PlantingModal status={plantingStatus} /> :
          <div className={s.plantingFormWrapper}>
            <Form className={s.plantingForm}>
              <Form.Group controlId='treeName'>
                <Form.Label className={s.formLabel}>To {userDetails.childName}</Form.Label>
                <CustomSelect />
              </Form.Group>
              <Form.Group controlId='treeName'>
                <Form.Label className={s.formLabel}>From</Form.Label>
                <CustomInput onChange={(e: any) => setNameFrom(e.target.value)}
                  value={nameFrom}
                  type='text'
                  as='input'
                  placeholder='Your name'
                  readonly={isPlanting} />
              </Form.Group>
              <span className={s.statusText}>
                {helperText}
              </span> <br />
              {userDetails.balance < 5 && <span className={s.statusText}>
                You need more plush tokens to perform this operation
              </span>}
              {!isPlanting &&
                <MainActionButton onClick={() => startMintProcess()}
                  text='Plant your tree'
                  variant='success'
                  image='tree' />}

              {isPlanting &&
                <MainActionButton
                  loading={isPlanting}
                  text='Planting...'
                  variant='success'
                  image='tree' />}
            </Form>
            <img src={treeImage} className='planting-tree-image' alt='logo' />
          </div>
        }
      </div>
    </div>
  )
}
