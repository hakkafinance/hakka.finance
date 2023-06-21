import UAuth from '@uauth/js';
import { useEffect, useState } from 'react';
import { uauthOptions } from '../connectors';
import { isAddress } from '../utils';
import useDebounce from './useDebounce';

export default function useUnstoppableDomains (
  address?: string
): { unstoppableDomain: string | null; loading: boolean } {
  const debouncedAddress = useDebounce(address, 200);
  const username = window.localStorage.getItem('username');
  const changed = debouncedAddress !== address;
  const [domain, setDomain] = useState('');
  useEffect(() => {
    if (
      !debouncedAddress ||
      !isAddress(debouncedAddress) ||
      !username ||
      changed
    ) {
      setDomain('');
      return;
    }
    try {
      new UAuth(uauthOptions).user().then((user) => {
        setDomain(user.sub || '');
      });
    } catch (error) {
      setDomain('');
    }
  }, [debouncedAddress, username, changed]);

  return {
    unstoppableDomain: changed || !domain ? null : domain,
    loading: changed || domain === null,
  };
}
