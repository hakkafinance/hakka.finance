import React, { ReactNode } from 'react'
import { isMobile } from 'react-device-detect';
import images from '../../../images';
import styles from './styles'
type Props = {
  totalStakedHakka?: string;
  totalSHakkaObtained?: string;
  farmingSHakka?: string;
  sHakkaBalance?: string;
}

type InfoItemProps = {
  icon: any;
  title: ReactNode;
  value?: string;
}

const InfoItem = ({ icon, title, value }: InfoItemProps) => (
  <div style={styles.infoItemWrapper}>
    <div style={styles.titleWrapper}>
      <img style={styles.icon} src={icon} />
      <span>{title}</span>
    </div>
    <span style={!parseFloat(value) ? { color: 'rgba(37, 62, 71, 0.5)' } : {}}>{value || '0.00'}</span>
  </div>
);

const StakeInfo = ({ totalStakedHakka, totalSHakkaObtained, farmingSHakka, sHakkaBalance  }: Props) => {
  return (
    <div>
      <span style={{ fontSize: '24px', fontWeight: 'bold', display: isMobile ? 'none' : 'inline' }}>Stake to increase power</span>
      <div style={{ marginTop: isMobile ? '28px' : '40px' }}>
        <InfoItem icon={images.iconHakkaCoinSmall} value={totalStakedHakka} title={<p style={styles.title}>Total <span style={{ fontWeight: 'bold' }}>HAKKA</span> staked</p>} />
        <InfoItem icon={images.iconShakkaCoin} value={totalSHakkaObtained} title={<p style={styles.title}>Total <span style={{ fontWeight: 'bold' }}>sHAKKA</span> obtained</p>} />
        <InfoItem icon={images.iconFarmsSmall} value={farmingSHakka} title={<p style={styles.title}>Farming  <span style={{ fontWeight: 'bold' }}>sHAKKA</span></p>} />
        <InfoItem icon={images.iconWallet} value={sHakkaBalance} title={<p style={styles.title}>Wallet  <span style={{ fontWeight: 'bold' }}>sHAKKA</span></p>} />
      </div>
    </div>
  )
}

export default StakeInfo;
