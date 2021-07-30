import useSWR from 'swr';

export default function useTokenPrice(token: string) {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data } = useSWR(
    `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd`,
    fetcher,
  );

  return data ? data[token].usd : 0;
}
