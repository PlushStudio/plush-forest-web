import React, {FormEvent, MouseEventHandler} from "react"
import s from "@/components/common/App/shared-components/GetStartedBtn.module.scss"
import arrow from "@/assets/images/24-px-1-outlined-arrow-right.svg"
import {Link} from "react-router-dom";
import {Button, Spinner} from "react-bootstrap";

interface IGetStartedBtn {
    text: string,
    variant?: string,
    type?: string,
    onClick?: MouseEventHandler<HTMLElement>,
    loading?: boolean
}
export const GetStartedBtn = ({text, variant, loading, type, onClick}: IGetStartedBtn) => {
    return (

        <div className={s.container}>
            <Link style={{ textDecoration: 'none' }} to="/plant">
                <Button onClick={onClick} className={s.btnPrimary}>
                    {text}
                    <img alt="get started arrow" className={s.arrow} width={24} src={arrow}/>
                    {loading && <Spinner
                        as='span'
                        animation='grow'
                        size='sm'
                        role='status'
                        aria-hidden='true'
                    />}
                </Button>
            </Link>
        </div>
    )
}