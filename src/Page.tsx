import React, { ReactNode } from 'react'
import { Header } from '@/components/App/layout-components/Header/Header'

type Props = {
  children: ReactNode
  headerMessage?: string
  headerComponent?: ReactNode
  footerComponent?: ReactNode
  contentClass?: string
}

export const Page = (props: Props) => {
  return <>
    <Header />
    {!!props.headerComponent &&
      props.headerComponent
    }
    <div className={`${props.contentClass}`}>
      {props.children}
    </div>
    {!!props.footerComponent &&
      props.footerComponent
    }
  </>
}