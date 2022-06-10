import React, { useEffect, useState } from 'react'
import s from './TreeInfo.module.scss'
import Timeline from '@/components/Timeline/Timeline'
import locationImg from '@/assets/images/widgets/location-widget.svg'
import heightImg from '@/assets/images/widgets/tree-height-widget.svg'
import TreeInfoBlock from '@/components/TreeInfoBlock/TreeInfoBlock'
import api from '@/api/api'
import { useParams } from 'react-router-dom'
import { TreeData } from '@/types/tree/TreeData'
import { treeDefault } from '@/pages/TreeInfo/TreeDefault'
import moment from 'moment'
import { Category, MatomoEvent, trackEvent } from '@/utils/matomo'
import TreeNotAvailable from '@/components/Modals/TreeNotAvailable/TreeNotAvailable'
import classNames from 'classnames'
import { CircleLoader } from '@/components/Loader/CircleLoader'

export const TreeInfoPage: React.FC = () => {
  const params = useParams<{ id?: string }>()
  const [treeData, setTreeData] = useState<TreeData>(treeDefault)
  const [dataFetched, setDataFetched] = useState<boolean>(false)
  const [tokenNotFound, setTokenNotFound] = useState<boolean>(false)

  const backgroundStyles = classNames(
    s.backgroundContainer,
    { [s.backgroundImg]: dataFetched }
  )

  const setTreeInfo = async () => {
    try {
      const response = await api.forest.token.request(params.id)
      setTreeData({
        ...treeData,
        name: response.data.name.split('tree')[0],
        type: response.data.attributes[2].value,
        subInfo: [
          {
            title: 'Location',
            desc: response.data.attributes[3].value,
            img: locationImg
          },
          {
            title: 'Tree height',
            desc: '5.2 Inches',
            img: heightImg
          }
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
    } catch (e: any) {
      setTokenNotFound(true)
      // TODO: HANDLE NETWORK ERRORS CORRECTLY
    } finally {
      setDataFetched(true)
    }
  }

  useEffect(() => {
    setTreeInfo()
  }, [params.id])

  useEffect(() => {
    trackEvent(Category.Info, MatomoEvent.PageVisited, 'Tree info')
  }, [])

  return (
    dataFetched
      ? <div className={backgroundStyles}>
        <div className={classNames(s.treeInfoContainer, 'container')}>
          {!tokenNotFound
            ? <>
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
            </>
            : <TreeNotAvailable />}
        </div>
        <div className={s.footer} />
      </div>
      : <CircleLoader />
  )
}
