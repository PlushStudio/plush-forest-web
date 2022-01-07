import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import s from './TreeInfo.module.scss'
import { Header } from '@/components/App/layout-components/Header/Header'
import Timeline from '@/components/App/shared-components/Timeline/Timeline'
import locationImg from '@/assets/images/widgets/rectangle-4.png'
import heightImg from '@/assets/images/widgets/group-18.png'
import TreeInfoBlock from '@/components/App/shared-components/TreeInfoBlock/TreeInfoBlock'
import axios from 'axios'
import api from '@/api/api'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'
import { TreeData } from '@/types/tree/TreeData'
import { treeDefault } from '@/context/DefaultValue'
import moment from 'moment'
import { Category, MatomoEvent, trackEvent } from '@/utils/matomo'

export const TreeInfoPage: React.FC = () => {
  const params = useParams<any>()
  const history = useHistory()
  const [treeData, setTreeData] = useState<TreeData>(treeDefault)

  useEffect(() => {
    axios.get(`${api.url}/forest/tokens/token/${params.id}`, { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          setTreeData({
            ...treeData,
            name: response.data.name.split('tree')[0],
            treeType: response.data.attributes[2].value,
            subInfo: [
              { title: 'Location', desc: response.data.attributes[4].value, img: locationImg },
              { title: 'Tree height', desc: '5.2 Inches', img: heightImg }],
            firstBlockInfo: {
              message: response.data.description,
              date: moment.unix(response.data.attributes[1].value).format('ll')
            },
            planter: response.data.attributes[5].value,
            secondBlockInfo: {
              message: `${response.data.attributes[2].value} seedling was planted in ${response.data.attributes[4].value}.`,
              date: moment.unix(response.data.attributes[0].value).format('ll')
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

  useEffect(() => {
    trackEvent(Category.Info, MatomoEvent.PageVisited, 'Tree info')
  }, [])

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
                imageLink: treeData.imageLink,
                planter: treeData.planter,
                dedicatedDate: treeData.firstBlockInfo.date,
                plantedDate: treeData.secondBlockInfo.date
              }} />
          </Col>
        </Row>
      </div>
      <div className={s.footer} />
    </div>
  )
}