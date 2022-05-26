import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import { CustomInput } from '@/components/CustomInput/CustomInput'
import s from './Planting.module.scss'
import { MainActionButton } from '@/components/MainActionButton/MainActionButton'
import { CustomSelect } from '@/components/CustomSelect/CustomSelect'
import { PlantingModal } from '@/components/PlantingModal/PlantingModal'
import shihuahuacoIcon from '@/assets/images/treeIconSelector/shihuahuaco-selector.png'
import cacaoIcon from '@/assets/images/treeIconSelector/cacao-selector.png'
import guabaIcon from '@/assets/images/treeIconSelector/guaba-selector.png'
import caobaIcon from '@/assets/images/treeIconSelector/caoba-selector.png'
import { PlantingLogic } from '@/pages/Planting/PlantingLogic'
import { useStore } from 'effector-react'
import { $user } from '@/store/user'
import { $forest, getForestDataFx } from '@/store/forest'
import { $walletStore } from '@/store/wallet'
import { CircleLoader } from '@/components/Loader/CircleLoader'
import { $app } from '@/store/app'
import { useTranslation } from 'react-i18next'

const treeTypeSelectorImages = [shihuahuacoIcon, cacaoIcon, guabaIcon, caobaIcon]

const DISCORD_CHANNEL_LINK = window.config.DISCORD_CHANNEL_LINK ?? import.meta.env.VITE_DISCORD_CHANNEL_LINK

export const Planting = () => {
  const input = useRef<HTMLInputElement>(null)
  const {
    startMintProcess,
    nameFromHandler,
    isPlanting,
    isPlantBtnLoading,
    isVisited,
    nameFrom,
    plantingStep,
    treeImage,
    isBalanceHintVisible
  } = PlantingLogic()

  const { childs } = useStore($user)
  const { treesInfo } = useStore($forest)
  const walletStore = useStore($walletStore)
  const { currency } = useStore($app)
  const { t } = useTranslation()

  const [isReady, setIsReady] = useState<boolean>(false)

  useEffect(() => {
    if (treesInfo.length > 0) {
      setIsReady(true)
    }
  }, [treesInfo])

  useEffect(() => {
    if (walletStore) {
      if (treesInfo.length === 0) {
        getForestDataFx(walletStore)
      }
    }
  }, [walletStore])

  return (
    isReady
      ? <div className={s.backgroundContainer}>
        <div className={'container'}>
          {isPlanting
            ? <PlantingModal step={plantingStep} />
            : <div className={s.plantingFormWrapper}>
              <Form className={s.plantingForm}>
                <Form.Group controlId="treeName" className={s.formHeader}>
                  <Form.Label className={s.formLabel}>
                    {t('PlantingPage.plantTo')} {childs[0].name}
                  </Form.Label>
                  <CustomSelect currency={currency}
                                icons={treeTypeSelectorImages} />
                </Form.Group>
                <Form.Group controlId="treeName" className={s.inputWrapper}>
                  <Form.Label className={s.formLabel}>
                    {t('PlantingPage.plantFrom')}
                  </Form.Label>
                  <CustomInput
                    input={input}
                    onChange={(e: any) => {
                      nameFromHandler(e)
                    }}
                    value={nameFrom}
                    type="text"
                    placeholder={t('PlantingPage.plantingInputPlaceholder')}
                    readonly={isPlanting}
                    status={nameFrom || !isVisited ? 'isTyping' : 'error'}
                    message={!nameFrom && isVisited ? t('PlantingPage.plantingInputError') : ''}
                  />
                  <div className={s.treeImageContainerMobile}>
                    <img src={treeImage}
                         className={s.treeImageMobile}
                         alt="tree" />
                  </div>
                </Form.Group>
                {isBalanceHintVisible && (
                  <div className={s.statusText}>
                      <span>Sorry, you don’t have enough PLSH to dedicate
                        this tree to child. Please drop us a line in&nbsp;
                        <a href={DISCORD_CHANNEL_LINK}
                           rel="noreferrer"
                           target={'_blank'}
                           className={s.linked}>
                          Plush Forest channel
                        </a>
                        &nbsp;of our Discord server and we’ll transfer you PLSH to finish the process.
                      </span>
                  </div>
                )}
                <MainActionButton
                  onClick={(e: MouseEvent<HTMLButtonElement>) => startMintProcess(e)}
                  text={t('PlantingPage.PlantYourTreeButton')}
                  image="tree"
                  disabled={isBalanceHintVisible || !nameFrom?.length || isPlantBtnLoading}
                  loading={isPlantBtnLoading}
                  className={s.mainActionButton}
                />
              </Form>
              <div className={s.treeImageContainer}>
                <img src={treeImage}
                     className={s.treeImage}
                     alt="tree" />
              </div>
            </div>
          }
        </div>
      </div>
      : <CircleLoader />
  )
}
