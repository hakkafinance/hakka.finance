/** @jsx jsx */
import { jsx } from 'theme-ui'
import images from '../../images'
import styles from './styles'
import RewardsPoolCard from './RewardsPoolCard'
import PoolDetail from './PoolDetail'
import Web3Status from '../Web3Status'
import { useState } from 'react'
import { ChainId } from '../../constants/index'

const RewardsPage = () => {
  const [whichChain, setWhichChain] = useState<ChainId>(ChainId.MAINNET);
  const [isShowArchived, setIsShowArchived] = useState<boolean>(true);

  return (
    <div sx={styles.container}>
      <div sx={styles.rewardsPageWrapper}>
        <div sx={styles.header}>
          <p>Rewards</p>
          <Web3Status />
        </div>
        
        <PoolDetail />

        {/* pool portals  */}
        {/* <div sx={styles.chainSwitch}>
          <div onClick={() => setWhichChain(ChainId.MAINNET)} sx={whichChain === ChainId.MAINNET ? styles.chainActive : ''}>Ethereum</div>
          <div onClick={() => setWhichChain(ChainId.BSC)} sx={whichChain === ChainId.BSC ? styles.chainActive : ''}>Binance Smart Chain</div>
        </div>
        <div>
          <p sx={styles.activeTitle}>Active (2)</p>
          <div sx={styles.poolContainer}>
            <RewardsPoolCard
              apiPercentage={'125%'}
              tokenImage={images.icon4Tokens}
              title={'BHS-USDC-DAI-HAKKA'}
              linkContent={'Balancer LP token'}
              btnContent={'Deposit / Withdraw'}
              depositedTokenSymbol={'BHSc$'}
            />
            <RewardsPoolCard
              apiPercentage={'100%'}
              tokenImage={images.icon4Tokens}
              title={'BHS-USDC-DAI-HAKKA'}
              linkContent={'Balancer LP token'}
              btnContent={'Deposit / Withdraw'}
              depositedTokenSymbol={'BHSc$'}
            />
          </div>
        </div>
        <div>
          <div sx={{ display: 'inline-block' }}>
            <div onClick={() => setIsShowArchived(!isShowArchived)} sx={styles.archivedTitle}>
              <p>Archived (4)</p>
              <img src={isShowArchived ? images.iconUp : images.iconDown} />
            </div>
          </div>
          {isShowArchived &&
            <div sx={styles.poolContainer}>
              <RewardsPoolCard
                apiPercentage={'100%'}
                tokenImage={images.icon4Tokens}
                title={'BHS-USDC-DAI-HAKKA'}
                linkContent={'Balancer LP token'}
                btnContent={'Deposit / Withdraw'}
                depositedTokenSymbol={'BHSc$'}
              />
              <RewardsPoolCard
                apiPercentage={'100%'}
                tokenImage={images.icon2TokensCompHakka}
                title={'BHS-USDC-DAI-HAKKA'}
                linkContent={'Balancer LP token'}
                btnContent={'Deposit / Withdraw'}
                depositedTokenSymbol={'BHSc$'}
              />
              <RewardsPoolCard
                apiPercentage={'100%'}
                tokenImage={images.icon2TokensMkrHakka}
                title={'BHS-USDC-DAI-HAKKA'}
                linkContent={'Balancer LP token'}
                btnContent={'Deposit / Withdraw'}
                depositedTokenSymbol={'BHSc$'}
              />
              <RewardsPoolCard
                apiPercentage={'100%'}
                tokenImage={images.icon4Tokens}
                title={'BHS-USDC-DAI-HAKKA'}
                linkContent={'Balancer LP token'}
                btnContent={'Deposit / Withdraw'}
                depositedTokenSymbol={'BHSc$'}
              />
            </div>
          }
        </div> */}
        
      </div>
    </div>
  )
}

export default RewardsPage