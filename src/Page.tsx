import React, {ReactNode} from "react"
import {Container, Row, Col} from "react-bootstrap"

type Props = {
    children: ReactNode
    headerTitle?: string
    headerMessage?: string
    headerComponent?: ReactNode
    footerComponent?: ReactNode
    contentClass?: string
}

export const Page = (props: Props) => {
    return <Container fluid>
        <Row className="top-bar">
            <Col/>
            <Col md={8} className="header-bar px-5 py-2">
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