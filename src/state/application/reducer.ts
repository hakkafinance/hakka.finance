import { nanoid } from 'nanoid';
import {
  PopupContent,
  UpdateBlockNumberAction,
  ToggleWalletModalAction,
  ToggleSettingsMenuAction,
  AddPopupAction,
  RemovePopupAction,
  UPDATE_BLOCK_NUMBER,
  TOGGLE_WALLET_MODAL,
  TOGGLE_SETTINGS_MENU,
  ADD_POPUP,
  REMOVE_POPUP,
} from './actions';

type Popup = {
  key: string;
  show: boolean;
  content: PopupContent;
  removeAfterMs: number | null;
};

export type PopupList = Array<Popup>;

export interface ApplicationState {
  readonly blockNumber: { readonly [chainId: number]: number };
  readonly popupList: PopupList;
  readonly walletModalOpen: boolean;
  readonly settingsMenuOpen: boolean;
}

export const initialApplicationState: ApplicationState = {
  blockNumber: {},
  popupList: [],
  walletModalOpen: false,
  settingsMenuOpen: false,
};

type ApplicationAction =
  | UpdateBlockNumberAction
  | ToggleWalletModalAction
  | ToggleSettingsMenuAction
  | AddPopupAction
  | RemovePopupAction;

export default function reducer(
  state: ApplicationState,
  action: ApplicationAction
): ApplicationState {
  const _state = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case UPDATE_BLOCK_NUMBER: {
      const payload = (action as UpdateBlockNumberAction).payload;
      const chainId = payload.chainId;
      const blockNumber = payload.blockNumber;

      if (typeof state.blockNumber[chainId] !== 'number') {
        _state.blockNumber[chainId] = blockNumber;
      } else {
        _state.blockNumber[chainId] = Math.max(
          blockNumber,
          state.blockNumber[chainId]
        );
      }

      return {
        ..._state,
      };
    }
    case TOGGLE_WALLET_MODAL: {
      return {
        ..._state,
        walletModalOpen: !state.walletModalOpen,
      };
    }
    case TOGGLE_SETTINGS_MENU: {
      return {
        ..._state,
        settingsMenuOpen: !state.settingsMenuOpen,
      };
    }
    case ADD_POPUP: {
      const payload = (action as AddPopupAction).payload;
      const key = payload.key;
      const content = payload.content;
      const removeAfterMs = payload.removeAfterMs ?? 1500;

      _state.popupList = (key
        ? state.popupList.filter((popup) => popup.key !== key)
        : state.popupList
      ).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs,
        },
      ]);

      return {
        ...state,
      };
    }
    case REMOVE_POPUP: {
      const payload = (action as RemovePopupAction).payload;
      const key = payload.key;
      _state.popupList.forEach((p: Popup) => {
        if (p.key === key) {
          p.show = false;
        }
      });

      return {
        ...state,
      };
    }
    default: {
      throw Error(
        `Unexpected action type in ApplicationContext reducer: '${action}'.`
      );
    }
  }
}