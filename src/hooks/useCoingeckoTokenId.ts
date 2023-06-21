import useSWR from 'swr';

export function useCoingeckoTokenId(address: string) {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data } = useSWR(
    `https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}`,
    fetcher,
  );
  return data || '';
}
