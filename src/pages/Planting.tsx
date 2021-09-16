import React, {FormEvent, useCallback, useState} from 'react'
import {Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import plantingTree from '../assets/images/group-5.png'
import {useHistory} from 'react-router'
import {CustomInput} from "@/components/App/shared-components/CustomInput/CustomInput";
import {Header} from "@/components/App/layout-components/Header";
import s from './Planting.module.scss'
import {MainActionButton} from "@/components/App/shared-components/MainActionButton/MainActionButton";
import {CustomSelect} from "@/components/App/shared-components/CustomSelect/CustomSelect";

export const PlantPage = () => {
    const [isPlanting, setIsPlanting] = useState(false);
    const history = useHistory();

    const submit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPlanting(true);

        setTimeout(() => {
            history.push('/tree/699c5780-8015-47e2-ad3c-e1f160458593/tree')
        }, 2000)

    }, [history]);

    return (
        <div className={s.backgroundContainer}>
            <div className={s.container}>
                <Header/>
                <div className={s.plantingFormWrapper}>
                    <Form className={s.plantingForm} onSubmit={submit}>
                        <Form.Group controlId='treeName'>
                            <Form.Label className={s.formLabel}>Tree type</Form.Label>
                            <CustomSelect/>
                        </Form.Group>
                        <Form.Group controlId='treeName'>
                            <Form.Label className={s.formLabel}>Name of your daughter’s tree</Form.Label>
                            <CustomInput type='text' as="input" placeholder="Tree Name" readonly={isPlanting}/>
                        </Form.Group>
                        <Form.Group controlId='parent'>
                            <Form.Label className={s.formLabel}>From</Form.Label>
                            <CustomInput type='text' as="input" placeholder="Parent's Name" readonly={isPlanting}/>
                        </Form.Group>
                        <Form.Group controlId='secretNote'>
                            <Form.Label className={s.formLabel}>Message</Form.Label>
                            <CustomInput className={s.textarea} type='text' as="textarea"
                                         placeholder="Your message to Jasmin" readonly={isPlanting}/>
                        </Form.Group>
                        {!isPlanting &&
                        <MainActionButton onClick={(e: any) => submit(e)} text="Continue" variant='success'
                                          type='submit'/>}
                        {isPlanting &&
                        <MainActionButton onClick={(e: any) => submit(e)} loading={isPlanting} text="Planting..."
                                          variant='success' type='submit'/>}
                    </Form>
                    <img src={plantingTree} className='planting-tree-image' alt='logo'/>
                </div>
            </div>
        </div>

    )
}
