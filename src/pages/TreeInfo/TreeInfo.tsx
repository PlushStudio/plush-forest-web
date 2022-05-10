import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import s from './TreeInfo.module.scss'
import Timeline from '@/components/Timeline/Timeline'
import locationImg from '@/assets/images/widgets/location-widget.png'
import heightImg from '@/assets/images/widgets/tree-height-widget.png'
import TreeInfoBlock from '@/components/TreeInfoBlock/TreeInfoBlock'
import axios from 'axios'
import api from '@/api/api'
import { useParams } from 'react-router-dom'
import { TreeData } from '@/types/tree/TreeData'
import { treeDefault } from '@/context/DefaultValues'
import moment from 'moment'
import { Category, MatomoEvent, trackEvent } from '@/utils/matomo'
import TreeNotAvailable from '@/components/Modals/TreeNotAvailable/TreeNotAvailable'
import classNames from 'classnames'

export const TreeInfoPage: React.FC = () => {
  const params = useParams<{ id?: string }>()
  const [treeData, setTreeData] = useState<TreeData>(treeDefault)
  const [userHasToken, setUserHasToken] = useState<boolean | undefined>(undefined)

  const backgroundStyles = classNames(
    s.backgroundContainer,
    { [s.backgroundImg]: userHasToken }
  )

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${api.url}/forest/tokens/token/${params.id}`,
          { withCredentials: true }
        )

        setTreeData({
          ...treeData,
          name: response.data.name.split('tree')[0],
          treeType: response.data.attributes[2].value,
          subInfo: [
            {
              title: 'Location',
              desc: response.data.attributes[3].value,
              img: locationImg
            },
            { title: 'Tree height', desc: '5.2 Inches', img: heightImg }
          ],
          firstBlockInfo: {
            message: response.data.description,
            date: moment.unix(response.data.attributes[1].value).format('ll')
          },
          planterOrganization: response.data.attributes[5].value,
          planterName: response.data.attributes[4].value,
          planterBio: response.data.farmer_bio,
          planterPhoto: response.data.farmer_photo,
          secondBlockInfo: {
            message: `${response.data.attributes[2].value} seedling was planted in ${response.data.attributes[3].value}.`,
            date: moment.unix(response.data.attributes[0].value).format('ll')
          },
          imageLink: response.data.image
        })
        setUserHasToken(true)
      } catch (error) {
        setUserHasToken(false)
      }
    })()
  }, [params.id])

  useEffect(() => {
    trackEvent(Category.Info, MatomoEvent.PageVisited, 'Tree info')
  }, [])

  return (
    <div className={backgroundStyles}>
      <div className={classNames(s.treeInfoContainer, 'container')}>
        {userHasToken !== false
          ? <Row>
            <Col>
              <TreeInfoBlock treeData={treeData} />
              <Timeline
                timelineInfo={{
                  firstBlockInfo: treeData.firstBlockInfo.message,
                  secondBlockInfo: treeData.secondBlockInfo.message,
                  imageLink: treeData.imageLink,
                  planterName: treeData.planterName,
                  planterOrganization: treeData.planterOrganization,
                  planterPhoto: treeData.planterPhoto,
                  dedicatedDate: treeData.firstBlockInfo.date,
                  plantedDate: treeData.secondBlockInfo.date,
                  planterBio: treeData.planterBio
                }}
              />
            </Col>
          </Row>
          : <TreeNotAvailable />}
      </div>
      <div className={s.footer} />
    </div>
  )
}
