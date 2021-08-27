import React from "react";
import {NavMenu} from "@/components/common/App/shared-components/NavMenu";
import {Row, Col} from 'react-bootstrap';
import s from './TreeInfo.module.scss'
import {Header} from "@/components/common/App/layout-components/Header";

export const TreeInfoPage = () => {
    return (
        <div className={s.container}>
            <Header/>
            <Row>
                <Col sm={1}>
                    <NavMenu/>
                </Col>
                <Col>
                    <div className={s.mockInfo}/>
                </Col>
            </Row>
        </div>
    )
};