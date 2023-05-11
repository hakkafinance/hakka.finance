import { ChainId } from "../constants"
import { chainsInfo } from "../constants/tokenMetrics"
import images from "../images"

export const getTransactionAmountInfo = (usedDApp: string, transactionAmount: number, transactionPr: number ) => {
  if (usedDApp.length === 0) {
    return
  }

  const usedDAppList = usedDApp.split(',')
  const DAPP_DISPLAY_UPPER_LIMIT = 5
  const transactionPerformance = `${usedDAppList.join(', ')} total for ${transactionAmount.toFixed(2)} USD`
  const transactionShortContent = usedDAppList.slice(0, DAPP_DISPLAY_UPPER_LIMIT).join(', ')
  const isUsedDAppLgThanLimit = usedDAppList.length >= DAPP_DISPLAY_UPPER_LIMIT
  const transactionComment = transactionPr > 90 
    ? `What a productive farmer! You are in the top ${100 - transactionPr}% users!`
    : ''
  const transactionAmountInfo = {
    transactionAmount: {
      title: 'Your total transaction amount and products you have used on Hakka last year:',
      icon: images.iconReview1,
      performance: transactionPerformance,
      shortContent: `Used ${transactionShortContent} ${isUsedDAppLgThanLimit ? ', etc.' : ''}`,
      comment: transactionComment,
  }}

  return transactionAmountInfo
}

export const getGasInfo = (gasData: { [chainId in ChainId]: number }, gasPr: number) => {
  let gasPerformance = ''
  let gasShortContent = ''
  let usedChainCounter = 0
  Object.keys(gasData).map((chainId) => {
    if (gasData[chainId] > 0) {
      const targetChainInfo = chainsInfo.find(chainInfo => chainInfo.chainId === parseInt(chainId))
      const comma = usedChainCounter > 0 ? ',' : ''
      gasPerformance += `${comma} ${targetChainInfo?.shortName}: ${gasData[chainId].toFixed(2)} USD`
      gasShortContent += `${comma} ${gasData[chainId].toFixed(2)} USD `
      usedChainCounter += 1
    }
  })

  if (usedChainCounter === 0) {
    return 
  }

  const gasInfoComment = gasPr > 90 
    ? `Such a hard worker! Your activity requires more gas than ${gasPr}% of users.`
    : ''

  const gasInfo = {
    gas: {
      title: 'Gas you have burned for Hakka last year:',
      icon: images.iconReview2,
      performance: gasPerformance,
      shortContent: `Used ${gasShortContent} as gas`,
      comment: gasInfoComment
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

export const getFirstProductInfo = (firstMetHakkaDate: string, firstDApp: string) => {
  const date = new Date(parseInt(firstMetHakkaDate) * 1000);
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