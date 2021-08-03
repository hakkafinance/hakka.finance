/** @jsx jsx */
import { jsx } from "theme-ui";
import images from "../../../images";
import React, { useState } from "react";
import styles from "./styles";
import MyButton from "../../Common/MyButton/index";
import NumericalInputCard from "../../VaultPage/NumericalInputCard";
import { useTokenBalance } from "../../../state/wallet/hooks";
import { useActiveWeb3React } from "../../../hooks/index";
import { useApproveCallback } from "../../../hooks/useApproveCallback";
import { ChainId, HAKKA, BURNER_ADDRESS } from "../../../constants";

// interface StakePositionProps {
//   stakedHakka: string;
//   getsSHakka: string;
//   until: string;
//   DetailLInk?: string;
// }

const StakePositionItem = () => {
  const { account, library, chainId } = useActiveWeb3React();
  const [inputAmount, setInputAmount] = useState<string>();

  // !!change to sHAKKA balance
  const hakkaBalance = useTokenBalance(
    account as string,
    HAKKA[chainId as ChainId]
  );

  const [approveInfo, approveCallback] = useApproveCallback(
    HAKKA[chainId as ChainId],
    // just for test. Wrong address!
    BURNER_ADDRESS[chainId as ChainId]
  );

  const [isShowRedeem, setIsShowRedeem] = useState<boolean>(false);

  return (
      <div sx={styles.positionFormWrapper}>
        <span sx={styles.positionNumber}>1</span>
        <div sx={styles.positionCard}>
          <div sx={styles.positionItem}>
            <div sx={styles.stackedHakkaWrapper}>
              <p>Staked HAKKA</p>
              <p sx={styles.amountFontColor}>12,520</p>
            </div>
            <div sx={styles.stackedHakkaWrapper}>
              <p>Get sHAKKA</p>
              <p sx={styles.amountFontColor}>1,005</p>
            </div>
            <div sx={styles.stackInfo}>
              <div sx={styles.untilWrapper}>
                <p>Until</p>
                <p sx={styles.amountFontColor}>07/12/2020 15:35</p>
              </div>
              <div sx={styles.DetailLink}>
                <span>Detail</span>
                <img src={images.iconLinkNormal} />
              </div>
            </div>
            <div
              sx={styles.redeemToggleBtn}
              onClick={() => setIsShowRedeem(!isShowRedeem)}
            >
              <span>Redeem</span>
              <img src={isShowRedeem ? images.iconTop : images.iconDown} />
            </div>
          </div>
          {isShowRedeem && (
            <div sx={styles.redeemContainer}>
              <div sx={styles.inputArea}>
                <div sx={styles.balance}>
                  <span>Burn</span>
                  <span>sHAKKA Balance: 5699.3228</span>
                </div>
                <NumericalInputCard
                  value={inputAmount}
                  onUserInput={setInputAmount}
                  hakkaBalance={hakkaBalance}
                  approveCallback={approveCallback}
                  approveState={approveInfo.state}
                />
              </div>
              <div sx={styles.receiveAmountWrapper}>
                <img src={images.iconBecome} sx={styles.iconBecome}/>
                <div>
                  <p sx={{ fontWeight: "normal" }}>Receive HAKKA</p>
                  <p>12.520</p>
                </div>
              </div>
              <div sx={styles.redeemBtn}>
                <MyButton type={"green"}>Redeem</MyButton>
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

export default StakePositionItem;
