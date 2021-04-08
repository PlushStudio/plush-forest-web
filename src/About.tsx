import { Page } from "./Page"
import { ProgressBar } from "react-bootstrap"

export const AboutPage = () => {
  return <Page headerMessage="A pager for new users">
    The page is being constructed...
    <ProgressBar now={10} label="10%" />
  </Page>
}