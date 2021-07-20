import {
  toCallKey,
  AddMulticallListenersAction,
  RemoveMulticallListenersAction,
  FetchingMulticallResultsAction,
  ErrorFetchingMulticallResultsAction,
  UpdateMulticallResultsAction,
  ADD_MULTICALL_LISTENERS,
  REMOVE_MULTICALL_LISTENERS,
  FETCHING_MULTICALL_RESULTS,
  ERROR_FETCHING_MULTICALL_RESULTS,
  UPDATE_MULTICALL_RESULTS,
} from './actions';

export interface MulticallState {
  readonly callListeners?: {
    // on a per-chain basis
    readonly [chainId: number]: {
      // stores for each call key the listeners' preferences
      readonly [callKey: string]: {
        // stores how many listeners there are per each blocks per fetch preference
        readonly [blocksPerFetch: number]: number;
      };
    };
  };

  readonly callResults: {
    readonly [chainId: number]: {
      readonly [callKey: string]: {
        readonly data?: string | null;
        readonly blockNumber?: number;
        readonly fetchingBlockNumber?: number;
      };
    };
  };
}

export const initialMulticallState: MulticallState = {
  callResults: {},
};

type MulticallAction =
  | AddMulticallListenersAction
  | RemoveMulticallListenersAction
  | FetchingMulticallResultsAction
  | ErrorFetchingMulticallResultsAction
  | UpdateMulticallResultsAction;

export default function reducer(
  state: MulticallState,
  action: MulticallAction
): MulticallState {
  const _state = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case ADD_MULTICALL_LISTENERS: {
      const payload = (action as AddMulticallListenersAction).payload;
      const chainId = payload.chainId;
      const calls = payload.calls;
      const options = payload.options ?? {};
      const blocksPerFetch = options.blocksPerFetch ?? 1;

      const listeners = state.callListeners
        ? _state.callListeners
        : (_state.callListeners = {});

      listeners[chainId] = listeners[chainId] ?? {};
      calls.forEach((call) => {
        const callKey = toCallKey(call);
        listeners[chainId][callKey] = listeners[chainId][callKey] ?? {};
        listeners[chainId][callKey][blocksPerFetch] =
          (listeners[chainId][callKey][blocksPerFetch] ?? 0) + 1;
      });

      return {
        ..._state,
      };
    }
    case REMOVE_MULTICALL_LISTENERS: {
      const payload = (action as RemoveMulticallListenersAction).payload;
      const chainId = payload.chainId;
      const calls = payload.calls;
      const options = payload.options ?? {};
      const blocksPerFetch = options.blocksPerFetch ?? 1;

      const listeners = state.callListeners
        ? _state.callListeners
        : (_state.callListeners = {});

      if (listeners[chainId]) {
        calls.forEach((call) => {
          const callKey = toCallKey(call);
          if (!listeners[chainId][callKey]) return;
          if (!listeners[chainId][callKey][blocksPerFetch]) return;

          if (listeners[chainId][callKey][blocksPerFetch] === 1) {
            delete listeners[chainId][callKey][blocksPerFetch];
          } else {
            listeners[chainId][callKey][blocksPerFetch]--;
          }
        });
      }

      return {
        ..._state,
      };
    }
    case FETCHING_MULTICALL_RESULTS: {
      const payload = (action as FetchingMulticallResultsAction).payload;
      const chainId = payload.chainId;
      const calls = payload.calls;
      const fetchingBlockNumber = payload.fetchingBlockNumber;

      _state.callResults[chainId] = _state.callResults[chainId] ?? {};
      calls.forEach((call) => {
        const callKey = toCallKey(call);
        const current = _state.callResults[chainId][callKey];
        if (!current) {
          _state.callResults[chainId][callKey] = {
            fetchingBlockNumber,
          };
        } else {
          if ((current.fetchingBlockNumber ?? 0) >= fetchingBlockNumber) return;
          _state.callResults[chainId][
            callKey
          ].fetchingBlockNumber = fetchingBlockNumber;
        }
      });

      return {
        ..._state,
      };
    }
    case ERROR_FETCHING_MULTICALL_RESULTS: {
      const payload = (action as ErrorFetchingMulticallResultsAction).payload;
      const chainId = payload.chainId;
      const calls = payload.calls;
      const fetchingBlockNumber = payload.fetchingBlockNumber;

      _state.callResults[chainId] = _state.callResults[chainId] ?? {};
      calls.forEach((call) => {
        const callKey = toCallKey(call);
        const current = _state.callResults[chainId][callKey];
        if (!current) return; // only should be dispatched if we are already fetching
        if (current.fetchingBlockNumber === fetchingBlockNumber) {
          delete current.fetchingBlockNumber;
          current.data = null;
          current.blockNumber = fetchingBlockNumber;
        }
      });

      return {
        ..._state,
      };
    }
    case UPDATE_MULTICALL_RESULTS: {
      const payload = (action as UpdateMulticallResultsAction).payload;
      const chainId = payload.chainId;
      const blockNumber = payload.blockNumber;
      const results = payload.results;

      _state.callResults[chainId] = _state.callResults[chainId] ?? {};
      Object.keys(results).forEach((callKey) => {
        const current = _state.callResults[chainId][callKey];
        if ((current?.blockNumber ?? 0) > blockNumber) return;
        _state.callResults[chainId][callKey] = {
          data: results[callKey],
          blockNumber,
        };
      });

      return {
        ..._state,
      };
    }
    default: {
      throw Error(
        `Unexpected action type in MulticallContext reducer: '${action}'.`
      );
    }
  }
}
