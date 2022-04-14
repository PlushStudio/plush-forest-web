import React, { useCallback } from 'react'
import logo from '../assets/images/smallTreeIcon/smallTreeIcon.svg'
import { Page } from '@/layouts/Page'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'

export const PageNotFound = () => {
  const history = useHistory()
  const goToPlanting = useCallback(() => {
    history.push('/planting')
  }, [history])

  return <Page headerMessage="Page Not Found">
        <Row>
            <Col />
            <Col md={4}>
                <Card>
                    <Card.Img variant="top" src={logo} />
                    <Card.Body>
                        <Card.Title>Page Not Found</Card.Title>
                        <Button onClick={goToPlanting} variant="primary">Let&apos;s Plant a Tree</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col />
        </Row>
    </Page>
}
