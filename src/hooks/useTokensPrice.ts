import useSWR from 'swr';
import { TOKEN_PRICE_SLUGS } from '../constants';

export default function useTokensPrice() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data } = useSWR(
    `https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=${TOKEN_PRICE_SLUGS.toString()}`,
    fetcher,
  );

  return data ? data : null;
}
