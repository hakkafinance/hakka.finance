/** @jsx jsx */
import { jsx } from "theme-ui";
import images from "../../images";
import React, { useState } from "react";
import styles from "./styles";
import MyButton from "../../components/Common/MyButton/index";
import Web3Status from "../Web3Status";
import NumericalInputCard from "../VaultPage/NumericalInputCard";
import { useTokenBalance } from "../../state/wallet/hooks";
import { useActiveWeb3React } from "../../hooks/index";
import { useApproveCallback } from "../../hooks/useApproveCallback";
import StakePositionItem from "./StakePositionItem/index";
import { ChainId, HAKKA, BURNER_ADDRESS } from "../../constants";

const Staking = () => {
  const { account, library, chainId } = useActiveWeb3React();

  const [inputAmount, setInputAmount] = useState<string>();

  const hakkaBalance = useTokenBalance(
    account as string,
    HAKKA[chainId as ChainId]
  );

  const [approveInfo, approveCallback] = useApproveCallback(
    HAKKA[chainId as ChainId],
    // just for test. Wrong address!
    BURNER_ADDRESS[chainId as ChainId]
  );

  const [lockTime, setLockTime] = useState<string>("12");
  const lockTimeArray = ["12", "6", "3", "1"];

  return (
    <div sx={styles.container}>
      <div sx={styles.stakingPageWrapper}>
        <div sx={styles.heading}>
          <h1>Staking</h1>
          <Web3Status />
        </div>
        <div sx={styles.body}>
          {/* infoPart */}
          <div>
            <div sx={styles.infoArea}>
              <div sx={styles.amountArea}>
                <h4>Stake to increase power</h4>
                <div sx={styles.valueWrapper}>
                  <span>Wallet sHAKKA balance</span>
                  <span sx={styles.amountBold}>0</span>
                </div>
                <div sx={styles.valueWrapper}>
                  <span>Staked HAKKA amount</span>
                  <span sx={styles.amountBold}>0</span>
                </div>
              </div>
              <div sx={styles.votingPowerCard}>
                <div sx={styles.powerContent}>
                  <div>
                    <span>Voting Power</span>
                    <p>0.0</p>
                  </div>
                  <img src={images.iconVotingPower} sx={styles.iconPower} />
                </div>
                <div sx={styles.viewGovernance}>
                  <span>View governance</span>
                  <img src={images.iconLinkNormal} />
                </div>
              </div>
            </div>
          </div>
          {/* stakingForm */}
          <div sx={styles.stakingCard}>
            <div sx={styles.hakkaBalanceWrapper}>
              <span>Amount</span>
              <span>HAKKA Balance: 5699.3228</span>
            </div>
            <NumericalInputCard
              value={inputAmount}
              onUserInput={setInputAmount}
              hakkaBalance={hakkaBalance}
              approveCallback={approveCallback}
              approveState={approveInfo.state}
              //  amountError={amountError}
              //  totalSupplyError={totalSupplyError}
            />
            <p sx={{ margin: "20px 0 8px 0" }}>Lock time (month)</p>
            <div sx={styles.optionContainer}>
              <div sx={styles.optionWrapper}>
                {lockTimeArray.map((month) => (
                  <div
                    onClick={() => setLockTime(month)}
                    sx={
                      lockTime === month
                        ? styles.optionItemActive
                        : styles.optionItem
                    }
                    key={month}
                  >
                    {month}
                  </div>
                ))}
              </div>
              <span sx={styles.lockTimeUntil}>until 10/14/2021</span>
            </div>
            <div sx={styles.getsHakkaWrapper}>
              <span sx={{ fontWeight: "normal" }}>
                Get sHAKKA (voting power)
              </span>
              <span>0</span>
            </div>
            <div sx={styles.stakeBtn}>
              <MyButton type={"green"}>Stake</MyButton>
            </div>
          </div>
        </div>

        {/* link area */}
        <div sx={styles.sHakkaRewardLinkArea}>
          <hr sx={styles.hr} />
          <div sx={styles.sHakkaRewardLinkWrapper}>
            <span>Earn more Hakka</span>
            <div sx={styles.sHakkaRewardLinkBtn}>
              <span>sHAKKA Reward</span>
              <img src={images.iconForwardGreen} />
            </div>
          </div>
        </div>
        <div sx={styles.positionContainer}>
          <h2 sx={styles.positionHeading}>Stake position</h2>
          <StakePositionItem />
          <StakePositionItem />
        </div>
      </div>
    </div>
  );
};

export default Staking;
