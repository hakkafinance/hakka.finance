import { useCallback, useEffect, useState } from 'react';
import { useActiveWeb3React } from '../../hooks/web3Manager';
import useDebounce from '../../hooks/useDebounce';
import { useApplicationContext } from './hooks';

export default function Updater(): null {
  const { provider: library, chainId } = useActiveWeb3React();
  const { updateBlockNumber } = useApplicationContext();

  const [state, setState] = useState<{
    chainId: number | undefined;
    blockNumber: number | null;
  }>({
    chainId,
    blockNumber: null,
  });

  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      setState((state) => {
        if (chainId === state.chainId) {
          if (typeof state.blockNumber !== 'number') return { chainId, blockNumber };
          return {
            chainId,
            blockNumber: Math.max(blockNumber, state.blockNumber),
          };
        }
        return state;
      });
    },
    [chainId, setState],
  );

  // attach/detach listeners
  useEffect(() => {
    if (!library || !chainId) return undefined;

    setState({ chainId, blockNumber: null });

    library
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch((error) => console.error(
        `Failed to get block number for chainId: ${chainId}`,
        error,
      ));

    library.on('block', blockNumberCallback);
    return () => {
      library.removeListener('block', blockNumberCallback);
    };
  }, [updateBlockNumber, chainId, library, blockNumberCallback]);

  const debouncedState = useDebounce(state, 100);

  useEffect(() => {
    if (
      !debouncedState.chainId
      || !debouncedState.blockNumber
    ) return;
    updateBlockNumber({
      chainId: debouncedState.chainId,
      blockNumber: debouncedState.blockNumber,
    });
  }, [
    updateBlockNumber,
    debouncedState.blockNumber,
    debouncedState.chainId,
  ]);

  return null;
}
