/** @jsx jsx */
import { jsx } from "theme-ui";
import { useState, useMemo, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { AddressZero } from "@ethersproject/constants";
import ReactTooltip from "react-tooltip";
import { navigate } from "gatsby";
import { isMobile } from "react-device-detect";
import images from "../../images";
import styles from "./styles-v1";
import Web3Status from "../Web3Status";
import { useStakingData } from "../../data/StakingData";
import StakePositionItem from "./StakePositionItem/index";
import {
  ChainId,
  STAKING_ADDRESSES,
} from "../../constants";
import VotingPowerContainer, { StakingVersion } from "../../containers/VotingPowerContainer";
import { botSideBarItems } from '../../containers/SideBar';
import NavigateLink from './NavigateLink';

interface StakingInfoItemProps {
  title: string;
  content: string;
};

const StakingInfoItem = ({title, content}: StakingInfoItemProps) => {
  return (
    <div sx={styles.stakingInfoItemWrapper}>
      <p className='title'>{title}</p>
      <p className='content'>{content}</p>
    </div>
  );
}; 

const Staking = () => {
  const { chainId } = useWeb3React();
  const [isShowArchived, setIsShowArchived] = useState<boolean>(true);
  const [isSortByUnlockTime, setIsSortByUnlockTime] = useState<boolean>(false);

  const {
    stakingBalance,
    sHakkaBalance,
    vaults,
  } = useStakingData();

  const isCorrectNetwork = useMemo<boolean>(() => {
    if (chainId) {
      return STAKING_ADDRESSES[chainId as ChainId] !== AddressZero;
    }
    return true;
  }, [chainId]);

  const governanceLink = useMemo(() => {
    return botSideBarItems.find((ele) => ele.name === 'governance').href;
  }, []);

  const [unarchivePosition, archivedPosition] = useMemo(() => {
    let archivedPosition = [];
    let unarchivePosition = [];

    vaults.forEach((vault, index) => {
      if (vault?.result?.hakkaAmount.isZero()) {
        archivedPosition.push({ ...vault, index: index });
      } else {
        unarchivePosition.push({ ...vault, index: index });
      }
    });

    archivedPosition = archivedPosition.reverse();
    return [unarchivePosition, archivedPosition];
  }, [vaults]);

  const sortedUnarchivePosition = useMemo(() => {
    if (isSortByUnlockTime) {
      unarchivePosition.sort(function(a, b) {
        return a?.result?.unlockTime - b?.result?.unlockTime;
      });
      return unarchivePosition;
    } else {
      unarchivePosition.sort(function(a, b) {
        return b?.index - a?.index;
      });
      return unarchivePosition;
    }
  }, [isSortByUnlockTime, unarchivePosition]);

  const handleSortBtnClick = useCallback(
    () => setIsSortByUnlockTime(!isSortByUnlockTime),
    [isSortByUnlockTime]
  );

  return (
    <div sx={styles.container}>
      <div sx={styles.stakingPageWrapper}>
        <div sx={styles.heading}>
          <h1>Staking</h1>
          {isMobile && (
          <div sx={styles.btnBack} onClick={() => navigate(`/staking`)}>
            <img src={images.iconBack} />
            <span>Back to V2</span>
          </div>
        )}
          <Web3Status unsupported={!isCorrectNetwork} />
        </div>
        <div sx={styles.body}>
          <div>
            <NavigateLink />
          </div>
          {!isMobile && (
            <div sx={styles.btnBack} onClick={() => navigate(`/staking`)}>
              <img src={images.iconBack} />
              <span>Back to V2</span>
            </div>
          )}
          <div sx={styles.votingPowerWrapper}>
            <VotingPowerContainer stakingVersion={StakingVersion.V1} />
            {!isMobile && (
              <div>
                <a
                  data-tip
                  data-for="governance"
                  className="ml-auto"
                  href={governanceLink}
                  rel="noreferrer"
                  target="_blank"
                  sx={styles.governanceButton}
                >
                  <img src={images.iconToGovernance} />
                </a>
                <ReactTooltip
                  place="bottom"
                  id="governance"
                  effect="solid"
                  backgroundColor="#253E47"
                >
                  <span>Go to governance</span>
                </ReactTooltip>
              </div>
            )}
          </div>
          {/* infoPart */}
          <div sx={styles.infoArea}>
            <div sx={styles.titleWrapper}>
              <h4>Staking status</h4>
              <span>Only position redemption available on V1</span>
            </div>
            <div sx={styles.stakingInfoContainer}>
              <StakingInfoItem title='Wallet sHAKKA (V1) balance' content={sHakkaBalance?.toFixed(2)} />
              <StakingInfoItem title='Staked HAKKA amount' content={stakingBalance?.toFixed(2)} />
            </div>
          </div>
        </div>
        <div sx={styles.positionContainer}>
          <div sx={styles.positionHeader}>
            <h2 sx={styles.positionTitle}>Stake position</h2>
            <button
              sx={
                isSortByUnlockTime
                  ? { ...styles.sortBtn, ...styles.activeSortBtn }
                  : { ...styles.sortBtn, ...styles.inactiveSortBtn }
              }
              onClick={handleSortBtnClick}
            >
              <img
                sx={!isSortByUnlockTime ? styles.inactiveSVG : {}}
                src={images.iconSort}
              />
              <span>Sort by expiry date</span>
            </button>
          </div>
          {sortedUnarchivePosition.map((vault, index) => {
            return (
              <StakePositionItem
                key={index}
                sHakkaBalance={sHakkaBalance}
                index={vault.index}
                stakedHakka={vault?.result?.hakkaAmount}
                sHakkaReceived={vault?.result?.wAmount}
                until={vault?.result?.unlockTime}
              />
            );
          })}
          <div sx={{ display: "inline-block" }}>
            <div
              onClick={() => setIsShowArchived(!isShowArchived)}
              sx={styles.archivedTitle}
            >
              <p>Archived</p>
              <img src={isShowArchived ? images.iconUp : images.iconDown} />
            </div>
          </div>
          {isShowArchived &&
            archivedPosition.map((vault, index) => {
              return (
                <StakePositionItem
                  key={index}
                  sHakkaBalance={sHakkaBalance}
                  index={vault.index}
                  stakedHakka={vault?.result?.hakkaAmount}
                  sHakkaReceived={vault?.result?.wAmount}
                  until={vault?.result?.unlockTime}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Staking;
