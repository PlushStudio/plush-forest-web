import s from "../../assets/styles/general/GetStartedBtn.module.scss"
import arrow from "../../assets/images/24-px-1-outlined-arrow-right.svg"

export const GetStartedBtn = () => {
    return (
        <div className={s.container}>
            <div className={s.btnPrimary}>
                Get started
                <img alt="get started arrow" className={s.arrow} width={24} src={arrow}/>
            </div>
        </div>
    )
}