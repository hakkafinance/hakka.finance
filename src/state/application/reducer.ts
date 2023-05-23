import { nanoid } from 'nanoid';
import {
  PopupContent,
  UpdateBlockNumberAction,
  ToggleWalletModalAction,
  ToggleInfoModalAction,
  ToggleClaimModalAction,
  ToggleRedeemModalAction,
  ToggleRestakeModalAction,
  TogglePlayToEarnLevelUpModalAction,
  ToggleYearlyReviewScoreModalAction,
  AddPopupAction,
  RemovePopupAction,
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
  readonly infoModalOpen: boolean;
  readonly claimModalOpen: boolean;
  readonly redeemModalOpen: boolean;
  readonly restakeModalOpen: boolean;
  readonly playToEarnLevelUpModalOpen: boolean;
  readonly yearlyReviewScoreModalOpen: boolean;
}

export const initialApplicationState: ApplicationState = {
  blockNumber: {},
  popupList: [],
  walletModalOpen: false,
  infoModalOpen: false,
  claimModalOpen: false,
  redeemModalOpen: false,
  restakeModalOpen: false,
  playToEarnLevelUpModalOpen: false,
  yearlyReviewScoreModalOpen: false,
};

type ApplicationAction =
  | UpdateBlockNumberAction
  | ToggleWalletModalAction
  | ToggleInfoModalAction
  | ToggleClaimModalAction
  | ToggleRedeemModalAction
  | ToggleRestakeModalAction
  | TogglePlayToEarnLevelUpModalAction
  | ToggleYearlyReviewScoreModalAction
  | AddPopupAction
  | RemovePopupAction;

export default function reducer(
  state: ApplicationState,
  action: ApplicationAction,
): ApplicationState {
  const _state = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case UPDATE_BLOCK_NUMBER: {
      const { payload } = action as UpdateBlockNumberAction;
      const { chainId } = payload;
      const { blockNumber } = payload;

      if (typeof state.blockNumber[chainId] !== 'number') {
        _state.blockNumber[chainId] = blockNumber;
      } else {
        _state.blockNumber[chainId] = Math.max(
          blockNumber,
          state.blockNumber[chainId],
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
    case TOGGLE_INFO_MODAL: {
      return {
        ..._state,
        infoModalOpen: !state.infoModalOpen,
      };
    }
    case TOGGLE_CLAIM_MODAL: {
      return {
        ..._state,
        claimModalOpen: !state.claimModalOpen,
      };
    }
    case TOGGLE_REDEEM_MODAL: {
      return {
        ..._state,
        redeemModalOpen: !state.redeemModalOpen,
      };
    }
    case TOGGLE_RESTAKE_MODAL: {
      return {
        ..._state,
        restakeModalOpen: !state.restakeModalOpen,
      };
    }
    case TOGGLE_PLAY_TO_EARN_LEVEL_UP_MODAL: {
      return {
        ..._state,
        playToEarnLevelUpModalOpen: !state.playToEarnLevelUpModalOpen,
      };
    }
    case TOGGLE_YEARLY_REVIEW_SCORE_MODAL: {
      return {
        ..._state,
        yearlyReviewScoreModalOpen: !state.yearlyReviewScoreModalOpen,
      };
    }
    case ADD_POPUP: {
      const { payload } = action as AddPopupAction;
      const { key } = payload;
      const { content } = payload;
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
      const { payload } = action as RemovePopupAction;
      const { key } = payload;
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
        `Unexpected action type in ApplicationContext reducer: '${action}'.`,
      );
    }
  }
}
