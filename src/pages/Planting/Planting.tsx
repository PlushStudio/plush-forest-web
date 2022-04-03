import React, { MouseEvent, useRef } from 'react'
import { Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CustomInput } from '@/components/CustomInput/CustomInput'
import s from './Planting.module.scss'
import { MainActionButton } from '@/components/MainActionButton/MainActionButton'
import { CustomSelect } from '@/components/CustomSelect/CustomSelect'
import { PlantingModal } from '@/components/PlantingModal/PlantingModal'
import shihuahuacoIcon from "@/assets/images/tree-icon-selector/shihuahuaco.png";
import cacaoIcon from "@/assets/images/tree-icon-selector/cacao.png";
import guabaIcon from "@/assets/images/tree-icon-selector/guaba.png";
import caobaIcon from "@/assets/images/tree-icon-selector/caoba.png";
import { treesInfo } from "@/assets/data/Trees";
import { PlantingLogic } from "@/pages/Planting/PlantingLogic";
import { useStore } from "effector-react";
import { $user } from "@/store/user";

const treeTypeSelectorImages = [shihuahuacoIcon, cacaoIcon, guabaIcon, caobaIcon]

export const Planting = () => {
  const input = useRef<HTMLInputElement>(null)
  const {
    startMintProcess,
    nameFromHandler,
    isPlanting,
    isVisited,
    nameFrom,
    plantingStatus,
    treeImage
  } = PlantingLogic()

  const { childs } = useStore($user)

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
                  To {childs[0].name}
                </Form.Label>
                <CustomSelect currency={"PLSH"}
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
              {4 < 5 && (
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
