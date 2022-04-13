import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CustomInput } from '@/components/CustomInput/CustomInput'
import s from './Planting.module.scss'
import { MainActionButton } from '@/components/MainActionButton/MainActionButton'
import { CustomSelect } from '@/components/CustomSelect/CustomSelect'
import { PlantingModal } from '@/components/PlantingModal/PlantingModal'
import shihuahuacoIcon from '@/assets/images/tree-icon-selector/shihuahuaco.png'
import cacaoIcon from '@/assets/images/tree-icon-selector/cacao.png'
import guabaIcon from '@/assets/images/tree-icon-selector/guaba.png'
import caobaIcon from '@/assets/images/tree-icon-selector/caoba.png'
import { treesInfo } from '@/assets/data/Trees'
import { PlantingLogic } from '@/pages/Planting/PlantingLogic'
import { useStore } from 'effector-react'
import { $user } from '@/store/user'
import { $forest, getForestDataFx } from '@/store/forest'
import { $walletStore } from '@/store/wallet'
import { CircleLoader } from '@/components/Loader/CircleLoader'
import { $app } from '@/store/app'

const treeTypeSelectorImages = [shihuahuacoIcon, cacaoIcon, guabaIcon, caobaIcon]

const FAUCET_LINK = window.config.FAUCET_URL ?? import.meta.env.VITE_FAUCET_URL

export const Planting = () => {
  const input = useRef<HTMLInputElement>(null)
  const {
    startMintProcess,
    nameFromHandler,
    isPlanting,
    isPlantBtnLoading,
    isVisited,
    nameFrom,
    plantingStatus,
    treeImage,
    isBalanceHintVisible
  } = PlantingLogic()

  const { childs } = useStore($user)
  const { treesPrice, treesCount } = useStore($forest)
  const walletStore = useStore($walletStore)
  const { currency } = useStore($app)

  const [isReady, setIsReady] = useState<boolean>(false)

  useEffect(() => {
    if (treesPrice.length > 0 && treesCount.length > 0) {
      setIsReady(true)
    }
  }, [treesPrice, treesCount])

  useEffect(() => {
    if (walletStore) {
      getForestDataFx(walletStore)
    }
  }, [walletStore])

  return (
    isReady
      ? <div className={s.backgroundContainer}>
        <div className={s.container}>
          {isPlanting
            ? (
              <PlantingModal status={plantingStatus} />
              )
            : (
              <div className={s.plantingFormWrapper}>
                <Form className={s.plantingForm}>
                  <Form.Group controlId="treeName" className={s.formHeader}>
                    <Form.Label className={s.formLabel}>
                      To {childs[0].name}
                    </Form.Label>
                    <CustomSelect currency={currency}
                      itemsInfo={treesInfo}
                      icons={treeTypeSelectorImages} />
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
                  {isBalanceHintVisible && (
                    <div className={s.statusText}>
                      Not enough {currency}.
                      <span> Get {currency} at </span>
                      <a href={FAUCET_LINK} target="_blank" className={s.faucetLink} rel="noreferrer">faucet.plush.dev</a>
                    </div>
                  )}
                  <MainActionButton
                    onClick={(e: MouseEvent<HTMLButtonElement>) => startMintProcess(e)}
                    text="Plant your tree"
                    variant="small"
                    image="tree"
                    disabled={isBalanceHintVisible || !nameFrom?.length || isPlantBtnLoading}
                    loading={isPlantBtnLoading}
                  />
                </Form>
                <img src={treeImage} className={s.treeImage} alt="logo" />
              </div>
              )}
        </div>
      </div>
      : <CircleLoader />
  )
}
