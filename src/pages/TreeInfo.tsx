import React from 'react'
import { Row, Col } from 'react-bootstrap'
import s from './TreeInfo.module.scss'
import { Header } from '@/components/App/layout-components/Header/Header'
import Timeline from '@/components/App/shared-components/Timeline/Timeline'
import locationImg from '@/assets/images/tree-location.png'
import weatherImg from '@/assets/images/tree-weather.png'
import heightImg from '@/assets/images/tree-height.png'
import TreeInfoBlock from '@/components/App/shared-components/TreeInfoBlock/TreeInfoBlock'

export interface ITreeData {
  name: string,
  desc: string,
  age: string,
  height: string,
  co2: string,
  info: ITreeInfo[],
  subInfo: ITreeSubInfo[]
}

interface ITreeInfo {
  title: string,
  desc: string
}

interface ITreeSubInfo {
  title: string,
  desc: string,
  img: string
}

export const TreeInfoPage: React.FC = () => {
  const treeData: ITreeData = {
    name: 'Jasmin’s cacao tree',
    desc: 'Cacao - the Amazon’s tree of life.',
    info: [
      { title: 'Age', desc: '1 Year, 2 Months' },
      { title: 'Height', desc: '5.2 Inches' },
      { title: 'CO2', desc: '2.5 Kg' }

    ],
    age: '1 Year, 2 Months',
    height: '5.2 Inches',
    co2: '2.5 Kg',
    subInfo: [
      { title: 'Location', desc: 'Campoverde, Peru.', img: locationImg },
      { title: 'Weather', desc: 'Scattered thunderstorms.', img: weatherImg },
      { title: 'Tree height', desc: 'Your tree grew 1.1cm since your last visit on Oct 12, 2021.', img: heightImg }
    ]
  }

  return (
    <div className={s.backgroundContainer}>
      <div className={s.container}>
        <Header />
        <Row>
          <Col>
            <TreeInfoBlock treeData={treeData} />
            <Timeline />
          </Col>
        </Row>
      </div>
      <div className={s.footer} />
    </div>
  )
}