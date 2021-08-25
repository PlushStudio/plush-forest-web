import React from "react"
import { Page } from '@/Page'
import { Col, Nav, Row } from "react-bootstrap"
import { useParams } from "react-router"
import treeInfoPicture from "../assets/images/treeInfo.png"

export const TreeInfoPage = () => {
  return <Page headerComponent={<Menu/>} headerTitle="Jenny's Tree"
               headerMessage="The Ancient Shihuahuaco: the Amazon's tree of life."
               contentClass="tree-info" footerComponent={<FooterBar/>}>

    <Row>
      <Col>
        <p>
          Planted Aug 12, 2021 in Nueva Esperanza, Peru.
        </p>
        <p>
          CO2 Sequestered: 2.5 kg
        </p>
        <p>
          Height: 5.5 cm
        </p>
      </Col>
      <Col>
        <img className="tree-info-image" src={treeInfoPicture} alt="logo"/>
      </Col>
    </Row>
    <Row>
      <Col>
        <h5>Did you know?</h5>
        <p>
          The Amazon rainforest absorbs about 2 billion tons of CO2 per year, about 5% of global annual emissions.
        </p>
      </Col>
    </Row>
  </Page>
}

const Menu = () => {
  const {id} = useParams<{ id: string }>()
  return <Row className="px-4 py-2 tree-info-menu">
    <Col>
      <Nav>
        <Nav.Item>
          <Nav.Link href={`/tree/${id}/info`}>Info</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link disabled href="/#">Location</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link disabled href="/#">Caretaker</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link disabled href="/#">Gallery</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link disabled href="/#">Note</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
  </Row>
}

const FooterBar = () => (<Row className="locate-on-blockchain-bar py-4 px-4">
  <Col>
    <a href="https://metamask.io">Location on blockchain</a>
  </Col>
  <Col>
    <div className={"float-right"}>
      Tree ID: PYF100569578
    </div>
  </Col>
</Row>)