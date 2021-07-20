import React, { createContext, useCallback, useMemo, useReducer } from 'react';

import reducer, { initialMulticallState, MulticallState } from './reducer';

import {
  AddMulticallListenersPayload,
  RemoveMulticallListenersPayload,
  FetchingMulticallResultsPayload,
  ErrorFetchingMulticallResultsPayload,
  UpdateMulticallResultsPayload,
  addMulticallListenersAction,
  removeMulticallListenersAction,
  fetchingMulticallResultsAction,
  errorFetchingMulticallResultsAction,
  updateMulticallResultsAction,
} from './actions';

interface MulticallContextProps {
  state: MulticallState;
  addMulticallListeners: (payload: AddMulticallListenersPayload) => void;
  removeMulticallListeners: (payload: RemoveMulticallListenersPayload) => void;
  fetchingMulticallResults: (payload: FetchingMulticallResultsPayload) => void;
  errorFetchingMulticallResults: (
    payload: ErrorFetchingMulticallResultsPayload
  ) => void;
  updateMulticallResults: (payload: UpdateMulticallResultsPayload) => void;
}

const MulticallContext = createContext<MulticallContextProps>(
  {} as MulticallContextProps
);

const MulticallContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialMulticallState);

  const addMulticallListeners = useCallback((payload) => {
    dispatch(addMulticallListenersAction(payload));
  }, []);

  const removeMulticallListeners = useCallback((payload) => {
    dispatch(removeMulticallListenersAction(payload));
  }, []);

  const fetchingMulticallResults = useCallback((payload) => {
    dispatch(fetchingMulticallResultsAction(payload));
  }, []);

  const errorFetchingMulticallResults = useCallback((payload) => {
    dispatch(errorFetchingMulticallResultsAction(payload));
  }, []);

  const updateMulticallResults = useCallback((payload) => {
    dispatch(updateMulticallResultsAction(payload));
  }, []);

  return (
    <MulticallContext.Provider
      value={useMemo(
        () => ({
          state,
          addMulticallListeners,
          removeMulticallListeners,
          fetchingMulticallResults,
          errorFetchingMulticallResults,
          updateMulticallResults,
        }),
        [
          state,
          addMulticallListeners,
          removeMulticallListeners,
          fetchingMulticallResults,
          errorFetchingMulticallResults,
          updateMulticallResults,
        ]
      )}
    >
      {children}
    </MulticallContext.Provider>
  );
};

export { MulticallContext };
export default MulticallContextProvider;
