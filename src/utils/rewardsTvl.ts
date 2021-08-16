import { JsonRpcProvider } from '@ethersproject/providers'
import { WeiPerEther } from '@ethersproject/constants'
import { parseEther } from '@ethersproject/units'
import { BigNumber } from '@ethersproject/bigNumber'
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
import { Contract } from '@ethersproject/contracts'

const ethProvider = new JsonRpcProvider('https://cloudflare-eth.com')
const bscProvider = new JsonRpcProvider('https://bsc-dataseed1.ninicoin.io')

function getTokenPrice(source: any, tokenSlug: string): BigNumber {
  return parseEther(source[tokenSlug] ? source[tokenSlug].usd.toString() : '0')
}

export async function balancer4tokenTvl(tokenPrice: any) {
  const hakkaContract = new Contract(HAKKA[ChainId.MAINNET].address, ERC20_ABI, ethProvider)
  const bhsContract = new Contract(BHS_ADDRESS, ERC20_ABI, ethProvider)
  const daiContract = new Contract(DAI_ADDRESS, ERC20_ABI, ethProvider)
  const usdcContract = new Contract(USDC_ADDRESS, ERC20_ABI, ethProvider)
  const bptContract = new Contract(BHS_USDC_DAI_HAKKA_BPT, ERC20_ABI, ethProvider)

  const [
    hakkaBalance,
    daiBalance,
    usdcBalance,
    bhsBalance,
    bptSupply,
    poolBpt,
  ] = await Promise.all([
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
  const hakkaContract = new Contract(HAKKA[ChainId.MAINNET].address, ERC20_ABI, ethProvider)
  const bhsContract = new Contract(BHS_ADDRESS, ERC20_ABI, ethProvider)
  const bptContract = new Contract(BHS_HAKKA_BPT, ERC20_ABI, ethProvider)
    
  const [
    hakkaBalance,
    bhsBalance,
    bptSupply,
    poolBpt,
  ] = await Promise.all([
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
