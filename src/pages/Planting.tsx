import React, { FormEvent, useCallback, useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import plantingTree1 from '@/assets/images/planting-tree-02.png'
import plantingTree2 from '@/assets/images/planting-tree-01.png'
import plantingTree3 from '@/assets/images/planting-tree-03.png'
import plantingTree4 from '@/assets/images/planting-tree-04.png'
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

const treeNames = ['SHIHUAHUACO', 'CACAO', 'GUABA', 'CAOBA']

export const PlantPage = () => {
  const [isPlanting, setIsPlanting] = useState(true)
  const [plantingStatus, setPlantingStatus] = useState<string>('Confirmation')
  const [nameFrom, setNameFrom] = useState('')
  const [treeImage, setTreeImage] = useState(plantingTree1)
  const history = useHistory()
  const [userDetails] = useContext(userDetailsContext)
  const plantingTrees = [plantingTree1, plantingTree2, plantingTree3, plantingTree4]
  const { getBuyAllowance, getApprove } = usePLAIContract()
  const { mintATree } = useTreeContract()

  const submit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setTimeout(() => {
      history.push('/tree/699c5780-8015-47e2-ad3c-e1f160458593/tree')
    }, 1500)

  }, [history])

  useEffect(() => {
    setTreeImage(plantingTrees[userDetails.treeTypeIdToPlant])
  }, [userDetails.treeTypeIdToPlant])

  const plantTreeHandler = async () => {
    setIsPlanting(true)

    const updateBuyAllowance = setInterval(async function() {
      const allowanceResult = getBuyAllowance(userDetails.address)
      if (await allowanceResult) {
        setPlantingStatus('Planting your tree')
        const treeMintingResult = await mintATree(userDetails.address, treeNames[userDetails.treeTypeIdToPlant], nameFrom, userDetails.childName, '')
        console.log(treeMintingResult)
        clearInterval(updateBuyAllowance)
      }
    }, 7000)

    if (userDetails.address) {
      try {
        const allowance = await getBuyAllowance(userDetails.address)
        if (allowance) {
          //empty message for Pilot
          await mintATree(userDetails.address, treeNames[userDetails.treeTypeIdToPlant], nameFrom, userDetails.childName, '')
          clearInterval(updateBuyAllowance)
        } else {
          setPlantingStatus('Getting allowance to pay')
          await getApprove()
        }

      } catch (e) {
        console.error(e.message)
        setIsPlanting(false)
        clearInterval(updateBuyAllowance)
      }
    }
  }

  return (
    <div className={s.backgroundContainer}>
      <div className={s.container}>
        <Header />
        {isPlanting ? <PlantingModal status={plantingStatus}/> :
        <div className={s.plantingFormWrapper}>
          <Form className={s.plantingForm} onSubmit={submit}>
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
