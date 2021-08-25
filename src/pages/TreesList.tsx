import React from "react"
import { Page } from '@/Page'
import { ProgressBar } from "react-bootstrap"

export const TreesListPage = () => {
  return <Page headerMessage="My Trees">
    The page is being constructed...
    <ProgressBar now={10} label="10%" />
  </Page>
}