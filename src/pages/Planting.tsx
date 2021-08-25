import React, {FormEvent, useCallback, useState} from 'react'
import {Form, Button, Spinner} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import plantingTree from '../assets/images/group-5.png'
import {useHistory} from 'react-router'
import {CustomInput} from "@/components/common/App/shared-components/CustomInput";
import {Header} from "@/components/common/App/layout-components/Header";
import s from './Planting.module.scss'
import {GetStartedBtn} from "@/components/common/App/shared-components/GetStartedBtn";

export const PlantPage = () => {
    const [isPlanting, setIsPlanting] = useState(false)
    const history = useHistory()

    const submit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsPlanting(true)

        setTimeout(() => {
            history.push('/tree/699c5780-8015-47e2-ad3c-e1f160458593/info')
        }, 2000)

    }, [history])

    return (
        <div className={s.container}>
            <Header/>
            <div className={s.plantingFormWrapper}>
                <Form className={s.plantingForm} onSubmit={submit}>
                    <Form.Group className={s.select} controlId='treeName'>
                        <Form.Label>Tree type</Form.Label>
                        <Form.Control className={s.select} as="select" custom>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="black">Black</option>
                            <option value="orange">Orange</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='treeName'>
                        <Form.Label>Name of your daughter’s tree</Form.Label>
                        <CustomInput type='text' as="input" placeholder="Tree Name" readonly={isPlanting}/>
                    </Form.Group>
                    <Form.Group controlId='parent'>
                        <Form.Label>From</Form.Label>
                        <CustomInput type='text' as="input" placeholder="Parent's Name" readonly={isPlanting}/>
                    </Form.Group>
                    <Form.Group controlId='secretNote'>
                        <Form.Label>Message</Form.Label>
                        <CustomInput type='text' as="textarea" placeholder="Placer" readonly={isPlanting}/>
                    </Form.Group>
                    {!isPlanting &&
                    <GetStartedBtn onClick={(e: any) => submit(e)} text="Continue" variant='success' type='submit'/>}
                    {isPlanting &&
                    <GetStartedBtn onClick={(e: any) => submit(e)} loading={isPlanting} text="Planting..."
                                   variant='success' type='submit'/>}
                </Form>
                <img src={plantingTree} className='planting-tree-image' alt='logo'/>
            </div>
        </div>
    )
}
