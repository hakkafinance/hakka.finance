import { chainsInfo } from "../constants/tokenMetrics"
import images from "../images"

export const getTransactionAmountInfo = (usedDApp: string[], transactionAmount: number) => {
  if (usedDApp.length === 0) {
    return
  }
  const DAPP_DISPLAY_UPPER_LIMIT = 5
  const transactionPerformance = `${usedDApp.join(', ')} total for ${transactionAmount} USD`
  const transactionShortContent = usedDApp.slice(0, DAPP_DISPLAY_UPPER_LIMIT).join(', ')
  const isUsedDAppLgThanLimit = usedDApp.length >= DAPP_DISPLAY_UPPER_LIMIT
  const transactionAmountInfo = {
    transactionAmount: {
      title: 'Your total transaction amount and products you have used on Hakka last year:',
      icon: images.iconReview1,
      performance: transactionPerformance,
      shortContent: `Used ${transactionShortContent} ${isUsedDAppLgThanLimit ? ', etc.' : ''}`,
      comment: '',
  }}

  return transactionAmountInfo
}

export const getGasInfo = (gasData: {
  eth: number | string;
  bsc: number | string;
  polygon: number | string;
  ftm: number | string;
}) => {
  // This is a temporary function, the api data should be changed to chainId as key
  const apiKeyToChainIdIndex = { eth: 1, bsc: 56, polygon: 137, ftm: 250 }
  const gasDataByChainId = {}
  Object.keys(gasData).map((ele) => {
    const chainId = apiKeyToChainIdIndex[ele]
    gasDataByChainId[chainId] = parseFloat(parseFloat(gasData[ele]).toFixed(4))
  })
  // -- end --

  let gasPerformance = ''
  let gasShortContent = ''
  let usedChainCounter = 0
  Object.keys(gasDataByChainId).map((chainId) => {
    if (gasDataByChainId[chainId] > 0) {
      const targetChainInfo = chainsInfo.find(chainInfo => chainInfo.chainId === parseInt(chainId))
      const comma = usedChainCounter > 0 ? ',' : ''
      gasPerformance += `${comma} ${targetChainInfo?.shortName}: ${gasDataByChainId[chainId]} ${targetChainInfo?.nativeTokenSymbol}`
      gasShortContent += `${comma} ${gasDataByChainId[chainId]} ${targetChainInfo?.nativeTokenSymbol} `
      usedChainCounter += 1
    }
  })

  if (usedChainCounter === 0) {
    return 
  }

  const gasInfo = {
    gas: {
      title: 'Gas you have burned for Hakka last year:',
      icon: images.iconReview2,
      performance: gasPerformance,
      shortContent: `Used ${gasShortContent} as gas`,
      comment: '',
  }}

  return gasInfo
}

export const getOatsInfo = (oatsAmount: number) => {
  if (oatsAmount === 0) {
    return
  }
  const oatsInfo = {
    oats: {
      title: 'OATs you have claimed from Hakka last year:',
      icon: images.iconReview3,
      performance: `${oatsAmount} of 33 OATs`,
      shortContent: `Got ${oatsAmount} OATs`,
      comment: 'Our respects to you, loyal Hakkafan!',
  },}
  return oatsInfo
}

export const getFirstProductInfo = (firstMetHakkaDate: number, firstDApp: string) => {
  const date = new Date(firstMetHakkaDate * 1000);
  const formattedDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()

  const firstProductInfo = {
    firstProduct: {
      title: 'Your first Hakka product:',
      icon: images.iconReview4,
      performance: `${firstDApp}, ${formattedDate}`,
      shortContent: `${formattedDate} was my first day meeting Hakka`,
      comment: 'Thanks for your loyalty and patience dear Hakka rancher!',
  }}
  return firstProductInfo
}