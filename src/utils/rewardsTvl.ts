import { JsonRpcProvider } from '@ethersproject/providers'
import { WeiPerEther } from '@ethersproject/constants'
import { parseEther } from '@ethersproject/units'
import { BigNumber } from '@ethersproject/bigNumber'
import {
  Contract as MulticallContract,
  Provider as MulticallProvider,
} from './stateless-multicall'
import ERC20_ABI from '../constants/abis/erc20.json'
import {
  HAKKA,
  ChainId,
  BHS_ADDRESS,
  DAI_ADDRESS,
  USDC_ADDRESS,
  BHS_USDC_DAI_HAKKA_BPT,
  BHS_USDC_DAI_HAKKA_POOL,
  BHS_HAKKA_BPT,
  BHS_HAKKA_POOL,
} from '../constants'

const ethProvider = new JsonRpcProvider(process.env.REACT_APP_NETWORK_URL)
const ethMulticallProvider = new MulticallProvider(ethProvider, 1)
// const bscProvider = new JsonRpcProvider(process.env.REACT_APP_BSC_NETWORK_URL)
// const bscMulticallProvider = new MulticallProvider(bscProvider, 56)

function getTokenPrice(source: any, tokenSlug: string): BigNumber {
  return parseEther(source[tokenSlug] ? source[tokenSlug].usd.toString() : '0')
}

export async function balancer4tokenTvl(tokenPrice: any) {
  const hakkaContract = new MulticallContract(HAKKA[ChainId.MAINNET].address, ERC20_ABI)
  const bhsContract = new MulticallContract(BHS_ADDRESS, ERC20_ABI)
  const daiContract = new MulticallContract(DAI_ADDRESS, ERC20_ABI)
  const usdcContract = new MulticallContract(USDC_ADDRESS, ERC20_ABI)
  const bptContract = new MulticallContract(BHS_USDC_DAI_HAKKA_BPT, ERC20_ABI)

  const [
    hakkaBalance,
    daiBalance,
    usdcBalance,
    bhsBalance,
    bptSupply,
    poolBpt,
  ] = await ethMulticallProvider.all([
    hakkaContract.balanceOf(BHS_USDC_DAI_HAKKA_BPT),
    daiContract.balanceOf(BHS_USDC_DAI_HAKKA_BPT),
    usdcContract.balanceOf(BHS_USDC_DAI_HAKKA_BPT),
    bhsContract.balanceOf(BHS_USDC_DAI_HAKKA_BPT),
    bptContract.totalSupply(),
    bptContract.balanceOf(BHS_USDC_DAI_HAKKA_POOL),
  ])
  const hakkaPrice = getTokenPrice(tokenPrice, 'hakka-finance')
  const daiPrice = getTokenPrice(tokenPrice, 'dai')
  const usdcPrice = getTokenPrice(tokenPrice, 'usd-coin')
  const bhsPrice = getTokenPrice(tokenPrice, 'blackholeswap-compound-dai-usdc')
  const hakkaValue = hakkaBalance.mul(hakkaPrice)
  const daiValue = daiBalance.mul(daiPrice)
  const usdcValue = usdcBalance.mul(usdcPrice)
  const bhsValue = bhsBalance.mul(bhsPrice)
  const pricePerBpt = hakkaValue.add(daiValue).add(usdcValue).add(bhsValue).div(bptSupply)

  // console.log(formatUnits(pricePerBpt.mul(poolBpt).div(WeiPerEther)))
  return pricePerBpt.mul(poolBpt).div(WeiPerEther)
}

export async function balancer2tokenTvl(tokenPrice: any) {
  const hakkaContract = new MulticallContract(HAKKA[ChainId.MAINNET].address, ERC20_ABI)
  const bhsContract = new MulticallContract(BHS_ADDRESS, ERC20_ABI)
  const bptContract = new MulticallContract(BHS_HAKKA_BPT, ERC20_ABI)
    
  const [
    hakkaBalance,
    bhsBalance,
    bptSupply,
    poolBpt,
  ] = await ethMulticallProvider.all([
    hakkaContract.balanceOf(BHS_HAKKA_BPT),
    bhsContract.balanceOf(BHS_HAKKA_BPT),
    bptContract.totalSupply(),
    bptContract.balanceOf(BHS_HAKKA_POOL),
  ])
  const hakkaPrice = getTokenPrice(tokenPrice, 'hakka-finance')
  const bhsPrice = getTokenPrice(tokenPrice, 'blackholeswap-compound-dai-usdc')
  const hakkaValue = hakkaBalance.mul(hakkaPrice)
  const bhsValue = bhsBalance.mul(bhsPrice)
  const pricePerBpt = hakkaValue.add(bhsValue).div(bptSupply)

  // console.log(formatUnits(pricePerBpt.mul(poolBpt).div(WeiPerEther)))
  return pricePerBpt.mul(poolBpt).div(WeiPerEther)
}
