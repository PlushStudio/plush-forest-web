import React, { useCallback } from 'react'
import logo from '../assets/images/smallTreeIcon/smallTreeIcon.svg'
import { Page } from '@/layouts/Page'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'

export const PageNotFound = () => {
  const { t } = useTranslation()
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
            <Card.Title>{t('NotFoundPage.notFoundText')}</Card.Title>
            <Button onClick={goToPlanting} variant="primary">{t('NotFoundPage.plantTreeBtnText')}</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col />
    </Row>
  </Page>
}
