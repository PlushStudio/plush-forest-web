import React, { useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import plantingTree0 from '@/assets/images/planting-tree/shihuahuaco.png'
import plantingTree1 from '@/assets/images/planting-tree/cacao.png'
import plantingTree2 from '@/assets/images/planting-tree/guaba.png'
import plantingTree3 from '@/assets/images/planting-tree/caoba.png'
import { useHistory } from 'react-router'
import { CustomInput } from '@/components/App/shared-components/CustomInput/CustomInput'
import { Header } from '@/components/App/layout-components/Header/Header'
import s from './Planting.module.scss'
import { MainActionButton } from '@/components/App/shared-components/MainActionButton/MainActionButton'
import { CustomSelect } from '@/components/App/shared-components/CustomSelect/CustomSelect'
import { userDetailsContext } from '@/context/UserDetailsProvider'
import usePLAIContract from '@/hooks/usePLAIContract'
import useTreeContract from '@/hooks/useTreeContract'
import { PlantingModal } from '@/components/App/shared-components/PlantingModal/PlantingModal'
import api from '@/api/api'
import { UserTokens } from '@/types/UserTokens'

const treeNames = ['SHIHUAHUACO', 'CACAO', 'GUABA', 'CAOBA']

export const PlantPage = () => {
  const [isPlanting, setIsPlanting] = useState(false)
  const [plantingStatus, setPlantingStatus] = useState<string>('Confirmation')
  const [nameFrom, setNameFrom] = useState('')
  const [treeImage, setTreeImage] = useState(plantingTree0)
  const history = useHistory()
  const [userDetails] = useContext(userDetailsContext)
  const plantingTrees = [plantingTree0, plantingTree1, plantingTree2, plantingTree3]
  const { getBuyAllowance, getApprove } = usePLAIContract()
  const { mintATree } = useTreeContract()

  useEffect(() => {
    setTreeImage(plantingTrees[userDetails.treeTypeIdToPlant])
  }, [userDetails.treeTypeIdToPlant])

  const startAllowanceLoop = (delay: number = 7000) => {
    const updateBuyAllowance = setInterval(async function() {
      const allowance = await getBuyAllowance(userDetails.address)
      if (allowance) {
        setPlantingStatus('Planting your tree')
        clearInterval(updateBuyAllowance)
        //empty message for Pilot
        const treeMintingResult = await mintATree(userDetails.address, treeNames[userDetails.treeTypeIdToPlant], nameFrom, userDetails.childName, '')
        if (treeMintingResult) {
          const getMyTokensInterval = setInterval(async function() {
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
    if (myTokens.items.length > 0) {
      history.push(`/token/${myTokens?.items[0].token}`)
    } else {
      setIsPlanting(true)
      if (userDetails.address) {
        try {
          const allowance = await getBuyAllowance(userDetails.address)
          if (allowance) {
            //empty message for Pilot
            try {
              const treeMintingResult = await mintATree(userDetails.address, treeNames[userDetails.treeTypeIdToPlant], nameFrom, userDetails.childName, '')

              if (treeMintingResult) {
                const getMyTokensInterval = setInterval(async function() {
                  await api.user.users.tokens.request(getMyTokensInterval)
                }, 5000)
              }
            } catch (e) {
              setIsPlanting(false)
            }
          } else {
            const updateBuyAllowance = setInterval(async function() {
              const allowanceResult = getBuyAllowance(userDetails.address)
              if (await allowanceResult) {
                clearInterval(updateBuyAllowance)
                setPlantingStatus('Planting your tree')
                const treeMintingResult = await mintATree(userDetails.address, treeNames[userDetails.treeTypeIdToPlant], nameFrom, userDetails.childName, '')
                if (treeMintingResult) {
                  const getMyTokensInterval = setInterval(async function() {
                    await api.user.users.tokens.request(getMyTokensInterval)
                  }, 5000)
                }
              } else {
                setPlantingStatus('Getting allowance to pay')
                clearInterval(updateBuyAllowance)
                try {
                  await getApprove().then(async () => {
                    startAllowanceLoop()
                  })
                } catch (e) {
                  console.log(e.message)
                  setIsPlanting(false)
                }
              }
            }, 7000)
          }
        } catch (e) {
          console.error(e.message)
          setIsPlanting(false)
        }
      }
    }
  }

  return (
    <div className={s.backgroundContainer}>
      <div className={s.container}>
        <Header />
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
              {!isPlanting &&
              <MainActionButton onClick={() => plantTreeHandler()}
                                text='Plant your tree'
                                variant='success'
                                image='tree' />}
              {isPlanting &&
              <MainActionButton onClick={(e: any) => e.preventDefault()}
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
