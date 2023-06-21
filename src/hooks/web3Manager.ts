import { useWeb3React as useWeb3ReactCore } from '@web3-react/core';
import { useEffect, useState } from 'react';

export const useActiveWeb3React = useWeb3ReactCore;

export function useEagerConnect () {
  const { connector, isActive, account, chainId } = useWeb3ReactCore(); // specifically using useWeb3ReactCore because of what this hook does
  const [tried, setTried] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if(!account){
          await connector.connectEagerly?.();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setTried(true);
      }
    })();
  }, [chainId, account]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (isActive) {
      setTried(true);
    }
  }, [isActive]);

  return tried;
}

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
export function useInactiveListener(suppress = false) {
  const { isActive: active, connector } = useWeb3ReactCore(); // specifically using useWeb3React because of what this hook does
  const activate = connector.activate;
  const error = false;
  useEffect(() => {
    const { ethereum } = window;

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = () => {
        // eat errors
        activate()?.catch((error) => {
          console.error('Failed to activate after chain changed', error);
        });
      };

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          // eat errors
          activate()?.catch((error) => {
            console.error('Failed to activate after accounts changed', error);
          });
        }
      };

      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
    return undefined;
  }, [active, error, suppress, activate]);
}
