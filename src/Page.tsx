import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { Header } from '@/components/App/layout-components/Header/Header'
import NoPlushTokenModal from "@/components/App/shared-components/NoPlushTokenModal/NoPlushTokenModal";
import { userDetailsContext } from "@/context/UserDetailsProvider";
import { CircleLoader } from "@/components/App/shared-components/Loader/CircleLoader";
import { useParams } from "react-router-dom";

type Props = {
  children: ReactNode
  headerMessage?: string
  headerComponent?: ReactNode
  footerComponent?: ReactNode
  contentClass?: string
}

export const Page = (props: Props) => {
  const [userDetails] = useContext(userDetailsContext)
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)
  const params = useParams<{ id?: string }>();

  useEffect(() => {
    if (!isDataLoaded) {
      switch (window.location.pathname) {
        case '/planting':
          setIsDataLoaded(userDetails.address !== undefined
            && userDetails.name !== ''
            && userDetails.treesCount.length !== 0)
          break
        case '/about':
          setIsDataLoaded(true)
          break
        case `/token/${params.id}`:
          setIsDataLoaded(true)
          break
        default:
          setIsDataLoaded(true)
      }
    }
  }, [userDetails.address, userDetails.name, userDetails.treesCount])

  console.log(userDetails)
  return <>
    <Header />
    {!!props.headerComponent &&
      props.headerComponent
    }
    {isDataLoaded ?
      <div className={`${props.contentClass}`}>
        {userDetails.hasToken !== false ? props.children :
          <NoPlushTokenModal redirectTo={'https://plush.family/'} />
        }
      </div> : <CircleLoader />}
    {!!props.footerComponent &&
      props.footerComponent
    }
  </>
}