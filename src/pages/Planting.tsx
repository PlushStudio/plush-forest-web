import React, { FormEvent, useCallback, useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import plantingTree1 from '../assets/images/planting-tree-01.png'
import plantingTree2 from '../assets/images/planting-tree-02.png'
import plantingTree3 from '../assets/images/planting-tree-03.png'
import plantingTree4 from '../assets/images/planting-tree-04.png'
import { useHistory } from 'react-router'
import { CustomInput } from '@/components/App/shared-components/CustomInput/CustomInput'
import { Header } from '@/components/App/layout-components/Header/Header'
import s from './Planting.module.scss'
import { MainActionButton } from '@/components/App/shared-components/MainActionButton/MainActionButton'
import { CustomSelect } from '@/components/App/shared-components/CustomSelect/CustomSelect'
import { userDetailsContext } from '@/context/UserDetailsProvider'

export const PlantPage = () => {
  const [isPlanting, setIsPlanting] = useState(false)
  const [treeImage, setTreeImage] = useState(plantingTree1)
  const history = useHistory()
  const [userDetails] = useContext(userDetailsContext)
  const plantingTrees = [plantingTree1, plantingTree2, plantingTree3, plantingTree4]

  const submit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPlanting(true)

    setTimeout(() => {
      history.push('/tree/699c5780-8015-47e2-ad3c-e1f160458593/tree')
    }, 2000)

  }, [history])

  useEffect(() => {
    setTreeImage(plantingTrees[userDetails.treeTypeIdToPlant])
  }, [userDetails.treeTypeIdToPlant])

  return (
    <div className={s.backgroundContainer}>
      <div className={s.container}>
        <Header />
        <div className={s.plantingFormWrapper}>
          <Form className={s.plantingForm} onSubmit={submit}>
            <Form.Group controlId='treeName'>
              <Form.Label className={s.formLabel}>To Jasmin</Form.Label>
              <CustomSelect />
            </Form.Group>
            <Form.Group controlId='treeName'>
              <Form.Label className={s.formLabel}>From</Form.Label>
              <CustomInput type='text' as='input' placeholder='Your name' readonly={isPlanting} />
            </Form.Group>
            {!isPlanting &&
            <MainActionButton onClick={(e: any) => submit(e)} text='Plant your tree' variant='success'
                              image='tree' />}
            {isPlanting &&
            <MainActionButton onClick={(e: any) => submit(e)} loading={isPlanting} text='Planting...'
                              variant='success' image='tree' />}
          </Form>
          <img src={treeImage} className='planting-tree-image' alt='logo' />
        </div>
      </div>
    </div>
  )
}
