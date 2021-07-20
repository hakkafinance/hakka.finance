const UPDATE_BLOCK_NUMBER = 'UPDATE_BLOCK_NUMBER';
const TOGGLE_WALLET_MODAL = 'TOGGLE_WALLET_MODAL';
const TOGGLE_SETTINGS_MENU = 'TOGGLE_SETTINGS_MENU';
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

export interface ToggleSettingsMenuAction {
  type: 'TOGGLE_SETTINGS_MENU';
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
  payload: UpdateBlockNumberPayload
): UpdateBlockNumberAction => ({
  type: UPDATE_BLOCK_NUMBER,
  payload,
});

const toggleWalletModalAction = (): ToggleWalletModalAction => ({
  type: TOGGLE_WALLET_MODAL,
});

const toggleSettingsMenuAction = (): ToggleSettingsMenuAction => ({
  type: TOGGLE_SETTINGS_MENU,
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
  TOGGLE_SETTINGS_MENU,
  ADD_POPUP,
  REMOVE_POPUP,
  updateBlockNumberAction,
  toggleWalletModalAction,
  toggleSettingsMenuAction,
  addPopupAction,
  removePopupAction,
};
