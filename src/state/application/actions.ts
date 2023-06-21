const UPDATE_BLOCK_NUMBER = 'UPDATE_BLOCK_NUMBER';
const TOGGLE_WALLET_MODAL = 'TOGGLE_WALLET_MODAL';
const TOGGLE_INFO_MODAL = 'TOGGLE_INFO_MODAL';
const TOGGLE_CLAIM_MODAL = 'TOGGLE_CLAIM_MODAL';
const TOGGLE_REDEEM_MODAL = 'TOGGLE_REDEEM_MODAL';
const TOGGLE_RESTAKE_MODAL = 'TOGGLE_RESTAKE_MODAL';
const TOGGLE_PLAY_TO_EARN_LEVEL_UP_MODAL = 'TOGGLE_PLAY_TO_EARN_LEVEL_UP_MODAL';
const TOGGLE_YEARLY_REVIEW_SCORE_MODAL = 'TOGGLE_YEARLY_REVIEW_SCORE_MODAL';
const ADD_POPUP = 'ADD_POPUP';
const REMOVE_POPUP = 'REMOVE_POPUP';

export interface PopupContent {
  txn: {
    hash: string;
    success: boolean;
    summary?: string;
  };
}

export interface UpdateBlockNumberPayload {
  chainId: number;
  blockNumber: number;
}

export interface AddPopupPayload {
  content: PopupContent;
  key?: string;
  removeAfterMs?: number | null;
}

export interface RemovePopupPayload {
  key: string;
}

export interface UpdateBlockNumberAction {
  type: 'UPDATE_BLOCK_NUMBER';
  payload: UpdateBlockNumberPayload;
}

export interface ToggleWalletModalAction {
  type: 'TOGGLE_WALLET_MODAL';
}

export interface ToggleInfoModalAction {
  type: 'TOGGLE_INFO_MODAL';
}

export interface ToggleClaimModalAction {
  type: 'TOGGLE_CLAIM_MODAL';
}

export interface ToggleRedeemModalAction {
  type: 'TOGGLE_REDEEM_MODAL';
}

export interface ToggleRestakeModalAction {
  type: 'TOGGLE_RESTAKE_MODAL';
}
export interface TogglePlayToEarnLevelUpModalAction {
  type: 'TOGGLE_PLAY_TO_EARN_LEVEL_UP_MODAL';
}

export interface ToggleYearlyReviewScoreModalAction {
  type: 'TOGGLE_YEARLY_REVIEW_SCORE_MODAL';
}

export interface AddPopupAction {
  type: 'ADD_POPUP';
  payload: AddPopupPayload;
}

export interface RemovePopupAction {
  type: 'REMOVE_POPUP';
  payload: RemovePopupPayload;
}

const updateBlockNumberAction = (
  payload: UpdateBlockNumberPayload,
): UpdateBlockNumberAction => ({
  type: UPDATE_BLOCK_NUMBER,
  payload,
});

const toggleWalletModalAction = (): ToggleWalletModalAction => ({
  type: TOGGLE_WALLET_MODAL,
});

const toggleInfoModalAction = (): ToggleInfoModalAction => ({
  type: TOGGLE_INFO_MODAL,
});

const toggleClaimModalAction = (): ToggleClaimModalAction => ({
  type: TOGGLE_CLAIM_MODAL,
});

const toggleRedeemModalAction = (): ToggleRedeemModalAction => ({
  type: TOGGLE_REDEEM_MODAL,
});

const toggleRestakeModalAction = (): ToggleRestakeModalAction => ({
  type: TOGGLE_RESTAKE_MODAL,
});

const togglePlayToEarnLevelUpModalAction = (): TogglePlayToEarnLevelUpModalAction => ({
  type: TOGGLE_PLAY_TO_EARN_LEVEL_UP_MODAL,
});

const toggleYearlyReviewScoreModalAction = (): ToggleYearlyReviewScoreModalAction => ({
  type: TOGGLE_YEARLY_REVIEW_SCORE_MODAL,
});

const addPopupAction = (payload: AddPopupPayload): AddPopupAction => ({
  type: ADD_POPUP,
  payload,
});

const removePopupAction = (payload: RemovePopupPayload): RemovePopupAction => ({
  type: REMOVE_POPUP,
  payload,
});

export {
  UPDATE_BLOCK_NUMBER,
  TOGGLE_WALLET_MODAL,
  TOGGLE_INFO_MODAL,
  TOGGLE_CLAIM_MODAL,
  TOGGLE_REDEEM_MODAL,
  TOGGLE_RESTAKE_MODAL,
  TOGGLE_PLAY_TO_EARN_LEVEL_UP_MODAL,
  TOGGLE_YEARLY_REVIEW_SCORE_MODAL,
  ADD_POPUP,
  REMOVE_POPUP,
  updateBlockNumberAction,
  toggleWalletModalAction,
  toggleInfoModalAction,
  toggleClaimModalAction,
  toggleRedeemModalAction,
  toggleRestakeModalAction,
  togglePlayToEarnLevelUpModalAction,
  toggleYearlyReviewScoreModalAction,
  addPopupAction,
  removePopupAction,
};
