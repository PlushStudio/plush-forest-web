import {FC, useState} from "react";
import {SoilFooterWithContacts} from './SoilFooterWithContacts'
import s from "../../assets/styles/layout/Footer.module.scss";
import {Accordion, Card} from "react-bootstrap";
import accordionPlus from "../../assets/images/16-px-1-outlined-plus.svg"
import accordionMinus from "../../assets/images/16-px-1-outlined-minus.svg"

export const Footer: FC = () => {

    const [isOpenTabId, setIsOpenTabId] = useState(0);

    const handleTabClick = (tabId: number) => {
        // @ts-ignore
        isOpenTabId === tabId ? setIsOpenTabId(null) : setIsOpenTabId(tabId);
    }
    return (
        <>
            <div className={s.footerContainer}>
                <div className={s.footerContent}>
                    <div className={s.footerTitle}>Learn more</div>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Accordion.Toggle onClick={() => handleTabClick(0)} as={Card.Header} eventKey="0">
                                How it works
                                {isOpenTabId === 0 && <img alt="show more" src={accordionMinus}/>}
                                {isOpenTabId !== 0 && <img alt="show more" src={accordionPlus}/>}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body className="accordionText">
                                    To bring this forest to Plush family, we have partnered with Ecomatcher - a
                                    blockchain
                                    organization that has developed a unique
                                    technology to facilitate transparent tree planting between NGOs who plant and
                                    maintain
                                    the trees, and the people who want to support this initiative.
                                    By working with Ecomatcher we are able to provide precise tree tracking and
                                    ownership
                                    verification with blockchain technology.
                                </Card.Body>

                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle onClick={() => handleTabClick(1)} as={Card.Header} eventKey="1">
                                Why its important
                                {isOpenTabId === 1 && <img alt="show more" src={accordionMinus}/>}
                                {isOpenTabId !== 1 && <img alt="show more" src={accordionPlus}/>}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>Hello! I'm another body</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle onClick={() => handleTabClick(2)} as={Card.Header} eventKey="2">
                                How much does it cost?
                                {isOpenTabId === 2 && <img alt="show more" src={accordionMinus}/>}
                                {isOpenTabId !== 2 && <img alt="show more" src={accordionPlus}/>}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>Hello! I'm another body</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle onClick={() => handleTabClick(3)} as={Card.Header} eventKey="3">
                                About Plant Your Future NGO
                                {isOpenTabId === 3 && <img alt="show more" src={accordionMinus}/>}
                                {isOpenTabId !== 3 && <img alt="show more" src={accordionPlus}/>}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="3">
                                <Card.Body>Hello! I'm another body</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
            </div>
            <SoilFooterWithContacts/>
        </>
    )
}