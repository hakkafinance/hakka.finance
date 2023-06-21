import React, { useCallback, useMemo, useReducer } from 'react';
import { createContext } from 'use-context-selector';
import reducer, { initialApplicationState, ApplicationState } from './reducer';
import {
  UpdateBlockNumberPayload,
  AddPopupPayload,
  RemovePopupPayload,
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
} from './actions';

interface ApplicationContextProps {
  state: ApplicationState;
  updateBlockNumber: (payload: UpdateBlockNumberPayload) => void;
  toggleWalletModal: () => void;
  toggleInfoModal: () => void;
  toggleClaimModal: ()=> void;
  toggleRedeemModal: ()=> void;
  toggleRestakeModal: ()=> void;
  togglePlayToEarnLevelUpModal: ()=> void;
  toggleYearlyReviewScoreModal: ()=> void;
  addPopup: (payload: AddPopupPayload) => void;
  removePopup: (payload: RemovePopupPayload) => void;
}

const ApplicationContext = createContext<ApplicationContextProps>(
  {} as ApplicationContextProps,
);

const ApplicationContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialApplicationState);

  const updateBlockNumber = useCallback((payload) => {
    dispatch(updateBlockNumberAction(payload));
  }, []);

  const toggleWalletModal = useCallback(() => {
    dispatch(toggleWalletModalAction());
  }, []);

  const toggleInfoModal = useCallback(() => {
    dispatch(toggleInfoModalAction());
  }, []);

  const toggleClaimModal = useCallback(() => {
    dispatch(toggleClaimModalAction());
  }, []);

  const toggleRedeemModal = useCallback(() => {
    dispatch(toggleRedeemModalAction());
  }, []);

  const toggleRestakeModal = useCallback(() => {
    dispatch(toggleRestakeModalAction());
  }, []);

  const togglePlayToEarnLevelUpModal = useCallback(() => {
    dispatch(togglePlayToEarnLevelUpModalAction());
  }, []);

  const toggleYearlyReviewScoreModal = useCallback(() => {
    dispatch(toggleYearlyReviewScoreModalAction());
  }, []);

  const addPopup = useCallback((payload) => {
    dispatch(addPopupAction(payload));
  }, []);

  const removePopup = useCallback((payload) => {
    dispatch(removePopupAction(payload));
  }, []);

  return (
    <ApplicationContext.Provider
      value={useMemo(
        () => ({
          state,
          updateBlockNumber,
          toggleWalletModal,
          toggleInfoModal,
          toggleClaimModal,
          toggleRedeemModal,
          toggleRestakeModal,
          togglePlayToEarnLevelUpModal,
          toggleYearlyReviewScoreModal,
          addPopup,
          removePopup,
        }),
        [
          state,
          updateBlockNumber,
          toggleWalletModal,
          toggleInfoModal,
          toggleClaimModal,
          toggleRedeemModal,
          toggleRestakeModal,
          togglePlayToEarnLevelUpModal,
          toggleYearlyReviewScoreModal,
          addPopup,
          removePopup,
        ],
      )}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export { ApplicationContext };
export default ApplicationContextProvider;
