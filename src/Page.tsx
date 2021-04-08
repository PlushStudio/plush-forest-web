import React, { ReactNode } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

type Props = {
  children: ReactNode
  headerTitle?: string
  headerMessage?: string
  headerComponent?: ReactNode
  footerComponent?: ReactNode
  contentClass?: string
}

export const Page = (props: Props) => {
  const title = props.headerTitle ? props.headerTitle : "Treelife"
  return <Container fluid>
    <Row className="top-bar">
      <Col/>
      <Col md={8} className="header-bar px-5 py-2">
        <Row>
          <Col><h3>{title}</h3></Col>
        </Row>
        <Row>
          <Col>{!!props.headerMessage && (<p>{props.headerMessage}</p>)}</Col>
        </Row>
      </Col>
      <Col/>
    </Row>
    {!!props.headerComponent && (
      <Row>
        <Col/>
        <Col md={8}>
          {props.headerComponent}
        </Col>
        <Col/>
      </Row>
    )}
    <Row>
      <Col>
        <ul className="float-right">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/plant">Plant a new Tree</Link>
          </li>
          <li>
            <Link to="/tree/699c5780-8015-47e2-ad3c-e1f160458593/info">Tree Info</Link>
          </li>
          <li>
            <Link to="/trees">My Trees</Link>
          </li>
          <li>
            <Link to="/page-not-found">Page Not Found</Link>
          </li>
        </ul>
      </Col>
      <Col md={8} className={`page-content px-5 py-5 ${props.contentClass}`}>
        {props.children}
      </Col>
      <Col/>
    </Row>
    {!!props.footerComponent && (
      <Row>
        <Col/>
        <Col md={8}>
          {props.footerComponent}
        </Col>
        <Col/>
      </Row>
    )}
  </Container>
}