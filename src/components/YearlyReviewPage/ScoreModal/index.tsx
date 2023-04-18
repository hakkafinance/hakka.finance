/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react'
import Modal from '../../Modal';
import {
  useYearlyReviewScoreModalOpen,
  useYearlyReviewScoreModalToggle,
} from '../../../state/application/hooks';
import styles from './styles';
import images from '../../../images';
import { MyButton } from '../../Common';
import useHtmlToImage from '../../../hooks/useHtmlToImage';

type Props = {
  p2eLevel: string
  performanceList: {icon: string, shortContent: string}[]
}

const ScoreModal = ({ p2eLevel, performanceList }: Props) => {
  const scoreModalOpen = useYearlyReviewScoreModalOpen()
  const toggleScoreModal = useYearlyReviewScoreModalToggle()
  const { eleRef, downloadImage } = useHtmlToImage()

  const urlStr = new URLSearchParams()
  urlStr.set('text', 'Take a look at annual achievements on Hakka Finance ')
  urlStr.set('url', 'https://hakka.finance/yearly-review')
  const encodedShareToTwitterUri = 'http://twitter.com/share?' + urlStr.toString()
  const encodedShareToTelegramUri = 'https://t.me/share/url?' + urlStr.toString()

  return (
    <Modal isOpen={scoreModalOpen} onDismiss={toggleScoreModal}>
      <div sx={styles.container}>
        <div sx={styles.titleContainer}>
          <p sx={styles.title}>Your score</p>  
          <img src={images.iconDeleteRound} onClick={toggleScoreModal} sx={styles.closeBtn} />
        </div>
        <div sx={styles.shareCard} ref={eleRef}>
          {/* TODO: check user rank */}
          <img src={images.iconRankS} sx={styles.rankIconWrapper} />
          <div sx={styles.modalTitleWrapper}>
            <img src={images.logoGreen} />
            <img src={images.iconYearlyReviewTitle} sx={styles.modalTitle} />
            <div sx={styles.dateWrapper}>
              <p>2022</p>
              <img src={images.iconArrowRightGreen} />
              <p>2023 April 01</p>
            </div>
          </div>
          <div sx={styles.p2eWrapper}>
            {/* TODO: check the profile follow the user level */}
            <img src={images.profileLv1} /> 
            <span>P2E Lv{p2eLevel} player</span>
          </div>
          <div sx={styles.shareCardPerformanceContainer}>
            {performanceList.map((ele, index) => (
              <div key={index} sx={styles.shareCardPerformanceWrapper}>
                <img src={ele.icon} />
                <span style={index === 0 ? { maxWidth: '180px' } : {}}>{ele.shortContent}</span>
              </div>
            ))}
          </div>
        </div>
        <div sx={styles.saveBtn}>
          <MyButton onClick={downloadImage} styleKit='green'>Save</MyButton>
        </div>
        <div sx={styles.shareSection}>
          <span>Share to</span>
          <img src={images.iconTelegram} onClick={() => { window.open(encodedShareToTelegramUri, '_blank').focus(); }} />
          <img src={images.iconTwitter} onClick={() => { window.open(encodedShareToTwitterUri, '_blank').focus(); }} />
        </div>
      </div>
    </Modal>
  )
}

export default ScoreModal