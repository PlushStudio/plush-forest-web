import React, {ReactNode, useContext, useEffect, useState} from 'react'
import {Header} from '@/components/App/layout-components/Header/Header'
import NoPlushTokenModal from "@/components/App/shared-components/NoPlushTokenModal/NoPlushTokenModal";
import {userDetailsContext} from "@/context/UserDetailsProvider";
import {CircleLoader} from "@/components/App/shared-components/Loader/CircleLoader";
import {useParams} from "react-router-dom";

type Props = {
  children: ReactNode
  headerMessage?: string
  headerComponent?: ReactNode
  footerComponent?: ReactNode
  contentClass?: string
}

export const Page = (props: Props) => {
  const [userDetails] = useContext(userDetailsContext)
  const [isReady, setIsReady] = useState<boolean>(false)
  const params = useParams<{id?: string}>();

  useEffect(() => {
    switch (window.location.pathname) {
      case'/planting' :
        setIsReady(userDetails.address !== undefined && userDetails.name !== '' && userDetails.treesCount.length !== 0)
        break
      case '/about' :
        setIsReady(true)
        break
      case `/token/${params.id}` :
        setIsReady(true)
        break
      default:
        setIsReady(true)
    }
  }, [window.location.pathname, userDetails.address, userDetails.name, userDetails.treesCount])

  return <>
    <Header/>
    {!!props.headerComponent &&
      props.headerComponent
    }
    {isReady ?
      <div className={`${props.contentClass}`}>
        {userDetails.hasToken !== false ? props.children :
          <NoPlushTokenModal redirectTo={'https://plush.family/'}/>
        }
      </div> : <CircleLoader/>}
    {!!props.footerComponent &&
      props.footerComponent
    }
  </>
}