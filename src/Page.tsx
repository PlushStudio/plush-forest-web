import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { Header } from '@/components/App/layout-components/Header/Header'
import NoPlushTokenModal from "@/components/App/shared-components/NoPlushTokenModal/NoPlushTokenModal";
import { userDetailsContext } from "@/context/UserDetailsProvider";
import { CircleLoader } from "@/components/App/shared-components/Loader/CircleLoader";
import useMetamaskWallet from "@/hooks/useMetamaskWallet";

type Props = {
  children: ReactNode
  headerMessage?: string
  headerComponent?: ReactNode
  footerComponent?: ReactNode
  contentClass?: string
}

export const Page = (props: Props) => {
  const [userDetails] = useContext(userDetailsContext)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { isConnected } = useMetamaskWallet()

  useEffect(() => {
    const checkInitialValues = async () => {
      const walletConnected = isConnected();
      if (await walletConnected && isLoading) {
        if (userDetails.name && userDetails.address) {
          setIsLoading(false)
        } else {
          setIsLoading(!userDetails.address)
        }
      } else {
        setIsLoading(false)
      }
    }
    checkInitialValues()
  }, [userDetails.address, userDetails.name])

  return <>
    <Header />
    {!!props.headerComponent &&
      props.headerComponent
    }
    {!isLoading ?
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