import React from 'react'
import s from './WalletMain.module.scss'
import { cutWalletPublicId } from '@/utils/utils'
import arrowBottomIcon from '@/assets/images/wallet/arrow-bottom.svg'

interface WalletMain {
  setModalVisibility: (modalVisibility: boolean) => void,
  modalVisibility: boolean | null,
  name: string,
  address: string
}

const WalletMain = ({ modalVisibility, setModalVisibility, name, address }: WalletMain) => {
  return (
    <div onClick={() => setModalVisibility(!modalVisibility)}
         className={s.mainContainer}>
      <div className={s.topPull}>
        <div className={s.name}>
          {name}
        </div>
        <div className={s.address}>
          {name !== 'Hey,' && name !== 'No account' ? address && cutWalletPublicId(address) : ''}
        </div>
        <div className={s.arrowBottom}>
          <img alt={'arrow-bottom'} src={arrowBottomIcon} />
        </div>
      </div>
      <div className={s.bottomPull}>
        <span
          className={`${s.bottomPullText} ${name === 'Hey,' ? s.errorText : ''}`}>{name === 'Hey,' ? 'Wrong network!' :
          'Connected to Rinkeby'}</span>
      </div>
    </div>
  )
}

export default WalletMain
