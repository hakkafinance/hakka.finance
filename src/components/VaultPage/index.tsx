/** @jsx jsx */
import { jsx } from 'theme-ui';
import {
  useEffect, useState, useMemo,
} from 'react';
import { Token } from '@uniswap/sdk';
import { AddressZero, WeiPerEther } from '@ethersproject/constants';
import { parseUnits } from '@ethersproject/units';
import BigNumber from 'bignumber.js';
import images from '../../images/index';
import styles from './styles';
import { MyButton } from '../Common';
import RewardListItem from './RewardListItem/index';
import NumericalInputField from '../NumericalInputField/index';
import NewTokenAddressInput from './NewTokenAddressInput';
import Web3Status from '../Web3Status';
import RewardValue from './RewardValue';
import { useActiveWeb3React } from '../../hooks/web3Manager';
import { useTokenApprove, ApprovalState } from '../../hooks/useTokenApprove';
import { useHakkaBurn, BurnState } from '../../hooks/guildbank/useHakkaBurn';
import { shortenAddress, getEtherscanLink } from '../../utils';
import { useTokenBalance, useTokenBalances, useETHBalances } from '../../state/wallet/hooks';
import { useTotalSupply } from '../../data/TotalSupply';
import { useWalletModalToggle } from '../../state/application/hooks';
import withConnectWalletCheckWrapper from '../../hoc/withConnectWalletCheckWrapper';
import withApproveTokenCheckWrapper from '../../hoc/withApproveTokenCheckWrapper';
import withWrongNetworkCheckWrapper from '../../hoc/withWrongNetworkCheckWrapper';

import {
  ChainId,
  HAKKA,
  BURNER_ADDRESS,
  VAULT_TOKENS,
  GUILDBANK,
  ETHADDRESS,
} from '../../constants';

const VaultPage = (props) => {
  const { account, library, chainId } = useActiveWeb3React();

  const hakkaBalance = useTokenBalance(
    account as string,
    HAKKA[chainId as ChainId],
  );

  // 1e18
  const bignumber1e18 = new BigNumber(WeiPerEther.toString());

  // burn amount
  const [inputAmount, setInputAmount] = useState('0');
  const [rewardTokens, setRewardTokens] = useState(VAULT_TOKENS[chainId || 1]);
  const [isShowNewTokenArea, setIsShowNewTokenArea] = useState(false);
  const [newRewardAddressInput, setNewRewardAddressInput] = useState<string>('');

  const [approveState, approve] = useTokenApprove(
    HAKKA[chainId as ChainId],
    BURNER_ADDRESS[chainId as ChainId],
    inputAmount,
  );

  // when chainId change, update rewardTokens value
  useEffect(() => {
    setRewardTokens(VAULT_TOKENS[chainId || 1]);
  }, [chainId]);

  // sort the reward tokens address
  const [pickedRewardTokensAddress, setPickedRewardTokensAddress] = useState([
    ...Object.keys(rewardTokens).sort((a, b) => parseInt(a) - parseInt(b)),
  ]);

  // when new token added sort again.
  useEffect(() => {
    const newSortedTokens = Object.keys(rewardTokens).sort(
      (a, b) => parseInt(a) - parseInt(b),
    );
    setPickedRewardTokensAddress(newSortedTokens);
  }, [rewardTokens]);

  // haddle checklist click
  const toggleToken = (tokenAddress: string) => {
    const selectedTokenList = pickedRewardTokensAddress.includes(tokenAddress)
      ? pickedRewardTokensAddress.filter((sortedAddress) => sortedAddress !== tokenAddress)
      : [...pickedRewardTokensAddress, tokenAddress];
    const sortedAddress = selectedTokenList.sort(
      (a, b) => parseInt(a) - parseInt(b),
    );
    setPickedRewardTokensAddress(sortedAddress);
  };

  const ethBalance = useETHBalances([GUILDBANK[chainId as ChainId]]);

  // get reward tokens balance in guild bank
  const [tokens, setTokens] = useState<Token[]>();
  useEffect(() => {
    const tokens: Token[] = [];
    Object.keys(rewardTokens).map((address) => {
      tokens.push(
        new Token(
          chainId,
          address,
          rewardTokens[address].decimals,
          rewardTokens[address].symbol,
          rewardTokens[address].name,
        ),
      );
    });
    setTokens(tokens);
  }, [rewardTokens, chainId, account]);

  const tokensBalanceInBank = useTokenBalances(
    GUILDBANK[chainId as ChainId],
    tokens,
  );

  // get HAKKA totalSupply
  const totalSupplyTokenAmount = useTotalSupply(HAKKA[chainId as ChainId]);
  const hakkaTotalSupply = new BigNumber(totalSupplyTokenAmount?.raw.toString());

  // calculate the rewardAmount
  const localRewardAmount: { [key: string]: BigNumber } = {};
  if (inputAmount && rewardTokens && hakkaTotalSupply) {
    const amountBigNumber = new BigNumber(inputAmount);
    Object.keys(rewardTokens).map((tokenAddress) => {
      // Input should not be greater than HAKKA totalSupply
      if (hakkaTotalSupply.div(bignumber1e18).isGreaterThanOrEqualTo(amountBigNumber)) {
        const balanceBigNumber = tokenAddress === ETHADDRESS
          ? new BigNumber(ethBalance[GUILDBANK[chainId as ChainId]]?.raw.toString())
          : new BigNumber(tokensBalanceInBank[tokenAddress]?.raw.toString());
        const decimalBigNumber = new BigNumber(10).pow(
          new BigNumber(rewardTokens[tokenAddress].decimals),
        );

        let num: BigNumber;
        num = amountBigNumber
          .multipliedBy(bignumber1e18)
          .div(hakkaTotalSupply)
          .multipliedBy(balanceBigNumber)
          .div(decimalBigNumber);
        localRewardAmount[tokenAddress] = num.isNaN() ? new BigNumber(0) : num;
      } else {
        localRewardAmount[tokenAddress] = new BigNumber(0);
      }
    });
  }

  const amountParsed = useMemo(() => {
    if (inputAmount) {
      return parseUnits(inputAmount.toString(), 18);
    }
    return null;
  }, [inputAmount]);

  const [burnState, burn] = useHakkaBurn(
    BURNER_ADDRESS[chainId as ChainId],
    account,
    amountParsed,
    pickedRewardTokensAddress,
  );

  const toggleWalletModal = useWalletModalToggle();

  const BurnButton = withApproveTokenCheckWrapper(
    withWrongNetworkCheckWrapper(
      withConnectWalletCheckWrapper(MyButton)
    )
  )

  const isCorrectNetwork = useMemo<boolean>(() => {
    if(chainId) { 
      return BURNER_ADDRESS[chainId as ChainId] !== AddressZero;
    }
    return true;
  }, [chainId])

  // error message
  const noTokenError = useMemo(() => !pickedRewardTokensAddress.length, [pickedRewardTokensAddress]);
  const [isCorrectInput, setIsCorrectInput] = useState<boolean>(true);

  const errorStatus = noTokenError
    || !isCorrectInput

  return (
    <div sx={styles.container}>
      <div sx={styles.vaultPageWrapper}>
        <div sx={styles.header}>
          <h1 sx={styles.title}>Guild Bank</h1>
          <Web3Status unsupported={!isCorrectNetwork} />
        </div>
        <div sx={styles.body}>
          <div sx={styles.infomationContainer}>
            <h3 sx={styles.subTitle}>Burn to get value</h3>
            <div sx={styles.contract}>
              <span>Guild Bank Contract</span>
              <a
                sx={!isCorrectNetwork ? styles.contractAddressDisabled : styles.contractAddress}
                href={getEtherscanLink(chainId, GUILDBANK[chainId], 'address')}
                target={"_blank"}
              >
                {(!chainId || !isCorrectNetwork)
                  ? '-'
                  : shortenAddress(GUILDBANK[chainId]) 
                }
              </a>
            </div>
            <p>An interface for Hakka holders to call ragequit() function to burn their HAKKA and draw funds from Guild Bank proportionally.</p>
            <div sx={styles.hakkaBalance}>
              <span>Burn</span>
              <span>
                HAKKA Balance:
                {' '}
                {isCorrectNetwork 
                  ? (hakkaBalance?.toSignificant(10) || '0.00')
                  : '-'}
              </span>
            </div>
            <NumericalInputField
              value={inputAmount}
              onUserInput={setInputAmount}
              tokenBalance={hakkaBalance}
              approve={approve}
              approveState={approveState}
              setIsCorrectInput={setIsCorrectInput}
            />
          </div>
          <div sx={styles.formContainer}>
            <div sx={styles.formTitleArea}>
              <span sx={styles.formTitle}>You wish to receive</span>
              <div
                sx={styles.addTokenButton}
                onClick={() => setIsShowNewTokenArea(!isShowNewTokenArea)}
              >
                {isShowNewTokenArea
                  ? <img src={images.iconDeleteRound} alt="Close the address input window" />
                  : (
                    <div sx={styles.addTokenButton}>
                      <span sx={{ paddingBottom: '2px' }}>Add token</span>
                      <img style={styles.addIcon} src={images.iconAdd} alt="add new token" />
                    </div>
                  )}
              </div>
            </div>
            {/* add new token input area */}
            {isShowNewTokenArea
              ? (
                <NewTokenAddressInput
                  rewardTokens={rewardTokens}
                  addressInputValue={newRewardAddressInput}
                  setAddressInputValue={setNewRewardAddressInput}
                  setIsShowNewTokenArea={setIsShowNewTokenArea}
                  setRewardTokens={setRewardTokens}
                />
              )
              : ''}
            <div sx={styles.rewardListContainer}>
              {Object.keys(rewardTokens).map((tokenAddress) => (
                <RewardListItem
                  key={tokenAddress}
                  tokenAddress={tokenAddress}
                  tokenName={rewardTokens[tokenAddress].symbol}
                  receiveAmount={localRewardAmount[tokenAddress] || new BigNumber(0)}
                  bankBalance={tokenAddress === ETHADDRESS
                    ? ethBalance[GUILDBANK[chainId as ChainId]]?.toFixed(4)
                    : tokensBalanceInBank[tokenAddress]?.toFixed(4) || '0'}
                  isDefaultToken={Object.keys(VAULT_TOKENS[chainId || 1]).includes(tokenAddress)} // chainId
                  checked={pickedRewardTokensAddress.includes(tokenAddress)}
                  onChange={() => { toggleToken(tokenAddress); }}
                  rewardTokens={rewardTokens}
                  setRewardTokens={setRewardTokens}
                />
              ))}
            </div>
            <hr sx={styles.hr2} />
            {/* total value */}
            <RewardValue
              localRewardAmount={localRewardAmount}
              pickedRewardTokensAddress={pickedRewardTokensAddress}
              inputAmount={inputAmount}
              newRewardAddressInput={newRewardAddressInput}
            />
            <div>
              <BurnButton
                styleKit={'green'}
                isDisabledWhenNotPrepared={false}
                onClick={burn}
                isConnected={!!account}
                connectWallet={toggleWalletModal}
                isApproved={approveState === ApprovalState.APPROVED}
                approveToken={approve}
                disabled={ errorStatus || burnState === BurnState.PENDING}
                isCorrectNetwork={isCorrectNetwork}
              >
                Burn
              </BurnButton>
            </div>
          </div>
        </div>
        <div sx={styles.knowMoreWrapper}>
          <hr sx={styles.hr} />
          <div sx={styles.knowMoreRow}>
            <span sx={styles.knowMoreTitle}>More Information</span>
            <div sx={styles.wikiLinkArea} onClick={() => { window.open('https://hakka-finance.gitbook.io/hakka-wiki', '_blank').focus(); }}>
              <span sx={styles.visitWikiLink}>Visit Wiki</span>
              <img src={images.iconForwardGreen} alt="link" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultPage;
