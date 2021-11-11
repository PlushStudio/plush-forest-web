import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import s from './TreeInfo.module.scss'
import { Header } from '@/components/App/layout-components/Header/Header'
import Timeline from '@/components/App/shared-components/Timeline/Timeline'
import locationImg from '@/assets/images/tree-location.png'
import weatherImg from '@/assets/images/tree-weather.png'
import heightImg from '@/assets/images/tree-height.png'
import TreeInfoBlock from '@/components/App/shared-components/TreeInfoBlock/TreeInfoBlock'
import axios from 'axios'
import api from '@/api/api'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'

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
  const params = useParams<any>()
  const history = useHistory()
  const [treeData, setTreeData] = useState<any>({
    name: '',
    desc: '',
    treeType: '',
    info: [
      { title: 'Age', desc: '1 month' },
      { title: 'Height', desc: '5.2 Inches' },
      { title: 'CO2', desc: '2.5 Kg' }
    ],
    age: '1 month',
    height: '5.2 Inches',
    co2: '2.5 Kg',
    subInfo: [
      { title: 'Location', desc: '', img: locationImg },
      { title: 'Weather', desc: '', img: weatherImg },
      { title: 'Tree height', desc: '', img: heightImg }
    ],
    firstBlockInfo: {
      message: '',
      date: '11.22.22'
    },
    secondBlockInfo: {
      message: '',
      date: '11.22.22'
    },
    imageLink: ''
  })

  useEffect(() => {
    axios.get(`${api.url}/forest/tokens/token/${params.id}`, { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          setTreeData({
            ...treeData,
            name: response.data.name,
            treeType: response.data.attributes[2].value,
            subInfo: [
              { title: 'Location', desc: response.data.attributes[4].value, img: locationImg },
              { title: 'Weather', desc: 'Scattered thunderstorms.', img: weatherImg },
              { title: 'Tree height', desc: '5.2 Inches', img: heightImg }],
            firstBlockInfo: {
              message: response.data.description,
              date: '11.22.22'
            },
            secondBlockInfo: {
              message: `${response.data.attributes[2].value} seedling was planted in ${response.data.attributes[4].value}.`,
              date: '11.22.22'
            },
            imageLink: response.data.image
          })
        } else {
          history.push('/404')
        }
      }).catch(() => {
      history.push('/404')
    })
  }, [params.id])

  return (
    <div className={s.backgroundContainer}>
      <div className={s.container}>
        <Header />
        <Row>
          <Col>
            <TreeInfoBlock treeData={treeData} />
            <Timeline
              timelineInfo={{
                firstBlockInfo: treeData.firstBlockInfo.message,
                secondBlockInfo: treeData.secondBlockInfo.message,
                imageLink: treeData.imageLink
              }} />
          </Col>
        </Row>
      </div>
      <div className={s.footer} />
    </div>
  )
}