import useSWR from 'swr';

export default function useTokensPrice(tokensId:{[address:string]:string}) {
  const addressArray = Object.keys(tokensId);
  const idArray = Object.values(tokensId);

  // for coingecko api ex: ethereum%2Cdai%2Cusd-coin%2Ccompound-governance-token%2Cuniswap%2Cnexo
  let tokenUrl = '';
  for (let i = 0; i < idArray.length; i++) {
    tokenUrl += `${String(idArray[i])}%2C`;
  }

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data } = useSWR(
    `https://api.coingecko.com/api/v3/simple/price?ids=${tokenUrl}&vs_currencies=usd`,
    fetcher,
  );

  const tokensPrice: { [address: string]: number } = {};
  if (data) {
    for (let i = 0; i < idArray.length; i++) {
      tokensPrice[addressArray[i]] = data[idArray[i]]?.usd;
    }
  }

  return data ? tokensPrice : {};
}
