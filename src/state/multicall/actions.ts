const ADD_MULTICALL_LISTENERS = 'ADD_MULTICALL_LISTENERS';
const REMOVE_MULTICALL_LISTENERS = 'REMOVE_MULTICALL_LISTENERS';
const FETCHING_MULTICALL_RESULTS = 'FETCHING_MULTICALL_RESULTS';
const ERROR_FETCHING_MULTICALL_RESULTS = 'ERROR_FETCHING_MULTICALL_RESULTS';
const UPDATE_MULTICALL_RESULTS = 'UPDATE_MULTICALL_RESULTS';

export interface Call {
  address: string;
  callData: string;
}

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
const LOWER_HEX_REGEX = /^0x[a-f0-9]*$/;
export function toCallKey(call: Call): string {
  if (!ADDRESS_REGEX.test(call.address)) {
    throw new Error(`Invalid address: ${call.address}`);
  }
  if (!LOWER_HEX_REGEX.test(call.callData)) {
    throw new Error(`Invalid hex: ${call.callData}`);
  }
  return `${call.address}-${call.callData}`;
}

export function parseCallKey(callKey: string): Call {
  const pcs = callKey.split('-');
  if (pcs.length !== 2) {
    throw new Error(`Invalid call key: ${callKey}`);
  }
  return {
    address: pcs[0],
    callData: pcs[1],
  };
}

export interface ListenerOptions {
  // how often this data should be fetched, by default 1
  readonly blocksPerFetch?: number;
}

export interface AddMulticallListenersPayload {
  chainId: number;
  calls: Call[];
  options?: ListenerOptions;
}

export interface RemoveMulticallListenersPayload {
  chainId: number;
  calls: Call[];
  options?: ListenerOptions;
}

export interface FetchingMulticallResultsPayload {
  chainId: number;
  calls: Call[];
  fetchingBlockNumber: number;
}

export interface ErrorFetchingMulticallResultsPayload {
  chainId: number;
  calls: Call[];
  fetchingBlockNumber: number;
}

export interface UpdateMulticallResultsPayload {
  chainId: number;
  blockNumber: number;
  results: {
    [callKey: string]: string | null;
  };
}

export interface AddMulticallListenersAction {
  type: 'ADD_MULTICALL_LISTENERS';
  payload: AddMulticallListenersPayload;
}

export interface RemoveMulticallListenersAction {
  type: 'REMOVE_MULTICALL_LISTENERS';
  payload: RemoveMulticallListenersPayload;
}

export interface FetchingMulticallResultsAction {
  type: 'FETCHING_MULTICALL_RESULTS';
  payload: FetchingMulticallResultsPayload;
}

export interface ErrorFetchingMulticallResultsAction {
  type: 'ERROR_FETCHING_MULTICALL_RESULTS';
  payload: ErrorFetchingMulticallResultsPayload;
}

export interface UpdateMulticallResultsAction {
  type: 'UPDATE_MULTICALL_RESULTS';
  payload: UpdateMulticallResultsPayload;
}

const addMulticallListenersAction = (
  payload: AddMulticallListenersPayload,
): AddMulticallListenersAction => ({
  type: ADD_MULTICALL_LISTENERS,
  payload,
});

const removeMulticallListenersAction = (
  payload: RemoveMulticallListenersPayload,
): RemoveMulticallListenersAction => ({
  type: REMOVE_MULTICALL_LISTENERS,
  payload,
});

const fetchingMulticallResultsAction = (
  payload: FetchingMulticallResultsPayload,
): FetchingMulticallResultsAction => ({
  type: FETCHING_MULTICALL_RESULTS,
  payload,
});

const errorFetchingMulticallResultsAction = (
  payload: ErrorFetchingMulticallResultsPayload,
): ErrorFetchingMulticallResultsAction => ({
  type: ERROR_FETCHING_MULTICALL_RESULTS,
  payload,
});

const updateMulticallResultsAction = (
  payload: UpdateMulticallResultsPayload,
): UpdateMulticallResultsAction => ({
  type: UPDATE_MULTICALL_RESULTS,
  payload,
});

export {
  ADD_MULTICALL_LISTENERS,
  REMOVE_MULTICALL_LISTENERS,
  FETCHING_MULTICALL_RESULTS,
  ERROR_FETCHING_MULTICALL_RESULTS,
  UPDATE_MULTICALL_RESULTS,
  addMulticallListenersAction,
  removeMulticallListenersAction,
  fetchingMulticallResultsAction,
  errorFetchingMulticallResultsAction,
  updateMulticallResultsAction,
};
