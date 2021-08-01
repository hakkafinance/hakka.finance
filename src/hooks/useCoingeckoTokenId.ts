import useSWR from 'swr';

export function useCoingeckoTokenId(address: string | null) {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  if (!address) {
    return "";
  }
  
  const { data } = useSWR(
    `https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}`,
    fetcher,
  );
  return data ? data : "";
}
