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
import useMetamaskWallet from '@/hooks/useMetamaskWallet'
import {Category, MatomoEvent, trackEvent} from "@/utils/matomo";
import useMetamaskAuth from "@/hooks/useMetamaskAuth";

const VITE_NETWORK_ID = window.config.NETWORK_ID ?? '4'

const treeNames = ['SHIHUAHUACO', 'CACAO', 'GUABA', 'CAOBA']

export const PlantPage = () => {
  const [isPlanting, setIsPlanting] = useState(false)
  const [plantingStatus, setPlantingStatus] = useState<string>('Confirmation')
  const [nameFrom, setNameFrom] = useState<string>('')
  const [treeImage, setTreeImage] = useState(plantingTree0)
  const [userDetails, setUserDetails] = useContext(userDetailsContext)
  const plantingTrees = [plantingTree0, plantingTree1, plantingTree2, plantingTree3]
  const history = useHistory()
  const { getBuyAllowance, getApprove } = usePLAIContract()
  const { mintATree } = useTreeContract()
  const { getPLAIBalance, walletConnected } = useMetamaskWallet()
  const {login} = useMetamaskAuth()

  useEffect(() => {
    setTreeImage(plantingTrees[userDetails.treeTypeIdToPlant])
    if (userDetails.name === '') {
      getUserData()
    }
  }, [userDetails.treeTypeIdToPlant, userDetails.name])

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
                  setIsPlanting(false)
                }
              }
            }, 7000)
          }
        } catch (e) {
          setIsPlanting(false)
        }
      }
    }
  }

  const getUserData = () => {
    api.user.users.profile.request()
        .then(response => {
          return response.data
        }).then((r) => {
      console.log(r)
      setUserDetails({
        ...userDetails,
        name: r.name
      })
    })
  }

  const startMintProcess = async () => {
      if (walletConnected) {
        getPLAIBalance().then(async (balance: number) => {
          if (balance !== 0 &&
            userDetails.address !== 'disconnected' &&
            window.ethereum.networkVersion === VITE_NETWORK_ID
          ) {
            if (userDetails.name == '') {
              trackEvent(Category.Action, MatomoEvent.ButtonPressed, 'Login');
              try {
                await login(
                    new URL(`${api.url}/${api.user.auth.nonce.url}`),
                    new URL(`${api.url}/${api.user.auth.login.url}`)
                )
              } catch {
                // TODO Handle errors. Now do nothing (perfect scenario)
              }
            }
            await plantTreeHandler()
          } else {
            setUserDetails({
              ...userDetails,
              isOpenDropdownByError: true,
              isOpenDropdown: !userDetails.isOpenDropdown
            })
          }
        })
      } else {
        trackEvent(Category.Action, MatomoEvent.ButtonPressed, 'Login');
        try {
          await login(
              new URL(`${api.url}/${api.user.auth.nonce.url}`),
              new URL(`${api.url}/${api.user.auth.login.url}`)
          )
        } catch {
          // TODO Handle errors. Now do nothing (perfect scenario)
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
