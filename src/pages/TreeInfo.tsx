import React, {useEffect} from "react";
import {NavMenu} from "@/components/App/shared-components/NavMenu/NavMenu";
import {Row, Col} from 'react-bootstrap';
import s from './TreeInfo.module.scss'
import {Header} from "@/components/App/layout-components/Header/Header";
import {useParams, useHistory} from "react-router-dom";
import Timeline from "@/components/App/shared-components/Timeline/Timeline";


export const TreeInfoPage: React.FC = () => {

    const {currentLocation, id} = useParams<{ currentLocation?: string, id?: string}>();
    let history = useHistory();

    useEffect(() => {
        currentLocation !== 'tree' && history.push(`/tree/${id}/tree`)
    }, []);

    return (
        <div className={s.backgroundContainer}>
            <div className={s.container}>
                <Header/>
                <Row>
                    <Col sm={1}>
                        <NavMenu/>
                    </Col>
                    <Col>
                        <div className={s.mockInfo}/>
                        {currentLocation === 'tree' && <Timeline/>}
                    </Col>
                </Row>
            </div>
        </div>
    )
};