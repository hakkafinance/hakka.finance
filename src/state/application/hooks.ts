import { useCallback, useContext, useMemo } from 'react';
import { useActiveWeb3React } from '../../hooks/web3Manager';
import { ApplicationContext } from './context';
import { PopupContent } from './actions';
import { PopupList, ApplicationState } from './reducer';
import { useContextStateSelector } from '../index';

export function useApplicationContextStateSelector<
  K extends keyof ApplicationState
>(selector: K): ApplicationState[K] {
  return useContextStateSelector(ApplicationContext, selector);
}

export function useApplicationContext() {
  return useContext(ApplicationContext);
}

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React();
  const blockNumber = useApplicationContextStateSelector('blockNumber');
  return blockNumber[chainId ?? -1];
}

export function useWalletModalOpen(): boolean {
  const walletModalOpen = useApplicationContextStateSelector('walletModalOpen');
  return walletModalOpen;
}

export function useWalletModalToggle(): () => void {
  const { toggleWalletModal } = useApplicationContext();
  return toggleWalletModal;
}

export function useInfoModalOpen(): boolean {
  const infoModalOpen = useApplicationContextStateSelector('infoModalOpen');
  return infoModalOpen;
}

export function useInfoModalToggle(): () => void {
  const { toggleInfoModal } = useApplicationContext();
  return toggleInfoModal;
}

export function useClaimModalOpen(): boolean {
  const claimModalOpen = useApplicationContextStateSelector('claimModalOpen');
  return claimModalOpen;
}

export function useClaimModalToggle(): () => void {
  const { toggleClaimModal } = useApplicationContext();
  return toggleClaimModal;
}

export function useRedeemModalOpen(): boolean {
  const redeemModalOpen = useApplicationContextStateSelector('redeemModalOpen');
  return redeemModalOpen;
}

export function useRedeemModalToggle(): () => void {
  const { toggleRedeemModal } = useApplicationContext();
  return toggleRedeemModal;
}

export function useRestakeModalOpen(): boolean {
  const restakeModalOpen = useApplicationContextStateSelector('restakeModalOpen');
  return restakeModalOpen;
}

export function useRestakeModalToggle(): () => void {
  const { toggleRestakeModal } = useApplicationContext();
  return toggleRestakeModal;
}

export function usePlayToEarnLevelUpModalOpen(): boolean {
  const playToEarnLevelUpModalOpen = useApplicationContextStateSelector('playToEarnLevelUpModalOpen');
  return playToEarnLevelUpModalOpen;
}

export function usePlayToEarnLevelUpModalToggle(): () => void {
  const { togglePlayToEarnLevelUpModal } = useApplicationContext();
  return togglePlayToEarnLevelUpModal;
}

export function useYearlyReviewScoreModalOpen(): boolean {
  const yearlyReviewScoreModalOpen = useApplicationContextStateSelector('yearlyReviewScoreModalOpen');
  return yearlyReviewScoreModalOpen;
}

export function useYearlyReviewScoreModalToggle(): () => void {
  const { toggleYearlyReviewScoreModal } = useApplicationContext();
  return toggleYearlyReviewScoreModal;
}

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string) => void {
  const { addPopup } = useApplicationContext();

  return useCallback(
    (content: PopupContent, key?: string) => {
      addPopup({ content, key });
    },
    [addPopup],
  );
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
  const { removePopup } = useApplicationContext();
  return useCallback(
    (key: string) => {
      removePopup({ key });
    },
    [removePopup],
  );
}

// get the list of active popups
export function useActivePopups(): PopupList {
  const list = useApplicationContextStateSelector('popupList');
  return useMemo(() => list.filter((item) => item.show), [list]);
}
