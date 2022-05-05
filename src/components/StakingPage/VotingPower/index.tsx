/** @jsx jsx */
import { jsx } from 'theme-ui';
import styles from './style';
import images from '../../../images/index';
import ReactTooltip from 'react-tooltip';

interface VotingPowerAreaProps {
  totalVotingPower?: string;
  v1VotingPowerProportion?: string;
  v2VotingPowerProportion?: string;
  ethProportion?: string;
  bscProportion?: string;
  polygonProportion?: string;
}

interface ProportionItemProps {
  proportionValue?: string;
  img?: any;
}

const ProportionItem = ({ proportionValue, img }: ProportionItemProps) => { 
  return(
    <div sx={styles.proportionItem}>
      <img src={img} />
      <p>{proportionValue}%</p>
    </div>
  )
};

const VotingPowerArea = (props: VotingPowerAreaProps) => {
  const { totalVotingPower, v1VotingPowerProportion, v2VotingPowerProportion, ethProportion, bscProportion, polygonProportion } = props;

  return(
    <div sx={styles.main}>
      <div sx={styles.votingPowerContainer}>
        <div sx={styles.votingPowerTitle}>
          <p>Voting Power</p>
          <img src={images.iconQuestion} data-tip data-for='votingPower' />
          <ReactTooltip id='votingPower' effect='solid' backgroundColor='#253E47'>
            <span>Due to the version upgrade, the new <br /> voting power is derived from V1 x 0.8 + V2 x 1</span>
          </ReactTooltip>
        </div> 
        <div sx={styles.votingPowerValueWrapper}>
          <p>{totalVotingPower ? totalVotingPower : '-'}</p>
          <img src={images.iconProportion} data-tip data-for='votingPowerValue' />
          <ReactTooltip id='votingPowerValue' place='bottom' effect='solid' backgroundColor='#253E47'>
            <span>proportion V1:{v1VotingPowerProportion || 0}% V2:{v2VotingPowerProportion || 0}%</span>
          </ReactTooltip>
        </div>
      </div>
      <div>
        <p>Proportion</p>
        <div sx={styles.proportionItemContainer}>
          <ProportionItem proportionValue={ethProportion || '-'} img={images.iconEthereumDarkBg} />
          <ProportionItem proportionValue={bscProportion || '-'} img={images.iconBSCDarkBg} />
          <ProportionItem proportionValue={polygonProportion || '-'} img={images.iconPolygonDarkBg} />
        </div>
      </div>
    </div>
  )
} ;

export default VotingPowerArea;
