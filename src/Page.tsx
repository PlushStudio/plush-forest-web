import React, {ReactNode, useContext, useEffect, useState} from 'react'
import {Header} from '@/components/App/layout-components/Header/Header'
import NoPlushTokenModal from "@/components/App/shared-components/NoPlushTokenModal/NoPlushTokenModal";
import {userDetailsContext} from "@/context/UserDetailsProvider";
import {CircleLoader} from "@/components/App/shared-components/Loader/CircleLoader";

type Props = {
  children: ReactNode
  headerMessage?: string
  headerComponent?: ReactNode
  footerComponent?: ReactNode
  contentClass?: string
}

export const Page = (props: Props) => {
  const [userDetails] = useContext(userDetailsContext)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!userDetails.name) {
      setIsLoading(false)
    } else {
      setIsLoading(!userDetails.address)
    }

  }, [userDetails.address, userDetails.name])

  return <>
    <Header/>
    {!!props.headerComponent &&
      props.headerComponent
    }
    {!isLoading ?
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