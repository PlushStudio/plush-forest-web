import { FormEvent, useCallback, useState } from "react"
import { Row, Col, Form, Button, Spinner } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import plantingTree from './images/plantingTree.png';
import { Page } from "./Page"
import { useHistory } from "react-router"

export const PlantPage = () => {
  const [isPlanting, setIsPlanting] = useState(false)
  const history = useHistory()
  const submit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPlanting(true)
    setTimeout(() => {
      history.push("/tree/699c5780-8015-47e2-ad3c-e1f160458593/info")
    }, 2000)
  }, [])
  return <Page headerMessage="Celebrate Jenny by planting a tree in her honor.">
    <Row>
      <Col md="7">
        <Form onSubmit={submit}>
          <Form.Group controlId="treeName">
            <Form.Label>Let's name your tree</Form.Label>
            <Form.Control type="text" placeholder="Tree Name" readOnly={isPlanting}/>
          </Form.Group>
          <Form.Group controlId="parent">
            <Form.Label>Dedicated by:</Form.Label>
            <Form.Control type="text" placeholder="Parent's Name" readOnly={isPlanting}/>
          </Form.Group>
          <Form.Group controlId="secretNote">
            <Form.Label>Add a secret note to Jenny (Optional. You can also add one later)</Form.Label>
            <Form.Control as="textarea" type="text" placeholder="Your Message" readOnly={isPlanting}/>
          </Form.Group>
          {!isPlanting && <PlantButton/>}
          {isPlanting && <IsPlantingButton/>}
        </Form>
      </Col>
      <Col />
      <Col md="4">
        <img src={plantingTree} className="App-logo" alt="logo"/>
      </Col>
    </Row>
  </Page>
}

const PlantButton = () => (
  <Button variant="success" type="submit">
    Plant
  </Button>
)

const IsPlantingButton = () => (
  <Button variant="success" type="submit" disabled>
    Planting...
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
  </Button>
)