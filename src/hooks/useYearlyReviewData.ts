import { useEffect, useState } from 'react';
import images from '../images';
import { chainsInfo } from '../constants/tokenMetrics';

interface ReviewDataType {
  first_met_hakka: number
  gas: { eth: number, bsc: number, polygon: number, ftm: number }
  oats: number
  usedDApp: string[]
}

export interface ReviewResultType {
  title: string
  icon: string
  comment: string
  performance: string
  shortContent: string
}

export default function useYearlyReviewData(account: string | null | undefined) {
  if (!account) {
    return { reviewResult: [], isLoading: false, p2eLv: 1 }
  }
  
  const [apiResponse, setApiResponse] = useState<ReviewDataType | null>(null);
  const [reviewResult, setReviewResult] = useState<ReviewResultType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // TODO: api data is not ready
  const [p2eLv, setP2eLv] = useState(1);

  useEffect(() => {
    fetch(`https://achievement.hakka.finance/${account}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json()
    })
    .then((actualData) => setApiResponse(actualData))
    .catch((err) => {
      console.log(err.message);
      setApiResponse(null);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [account]);
 
  useEffect(() => {
    if (!apiResponse) {
      setReviewResult([])
      return
    }

    let reviewResult = {}
 
    if (apiResponse.usedDApp) {
      const DAPP_DISPLAY_UPPER_LIMIT = 5
      // TODO: mock data, the api is not ready
      const mockTransactionAmount = 999999
      const transactionPerformance = `${apiResponse.usedDApp.join(', ')} total for ${mockTransactionAmount} USD`
      const transactionShortContent = apiResponse.usedDApp.slice(0, DAPP_DISPLAY_UPPER_LIMIT).join(', ')
      const isUsedDAppLgThanLimit = apiResponse.usedDApp.length >= DAPP_DISPLAY_UPPER_LIMIT
      const transactionAmountInfo = {
        transactionAmount: {
          title: 'Your total transaction amount and products you have used on Hakka last year:',
          icon: images.iconReview1,
          performance: transactionPerformance,
          shortContent: `Used ${transactionShortContent} ${isUsedDAppLgThanLimit ? ', etc.' : ''}`,
          comment: '',
      },}
      Object.assign(reviewResult, transactionAmountInfo);
    }
 
    if (apiResponse.gas) {
      let gasPerformance = ''
      let gasShortContent = ''

      // This is a temporary function, the api data should be changed to chainId as key
      const apiKeyToChainIdIndex = { eth: 1, bsc: 56, polygon: 137, ftm: 250 }
      const gasDataByChainId = {}
      Object.keys(apiResponse.gas).map((ele) => {
        const chainId = apiKeyToChainIdIndex[ele]
        gasDataByChainId[chainId] = parseFloat(parseFloat(apiResponse.gas[ele]).toFixed(4))
      })
      // -- end --

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
 
      const gasInfo = {
        gas: {
          title: 'Gas you have burned for Hakka last year:',
          icon: images.iconReview2,
          performance: gasPerformance,
          shortContent: `Used ${gasShortContent} as gas`,
          comment: '',
      },}
      Object.assign(reviewResult, gasInfo);
    }
 
    if (apiResponse.oats) {
      const oatsInfo = {
        oats: {
          title: 'OATs you have claimed from Hakka last year:',
          icon: images.iconReview3,
          performance: `${apiResponse.oats} of 33 OATs`,
          shortContent: `Got ${apiResponse.oats} OATs`,
          comment: 'Our respects to you, loyal Hakkafan!',
      },}
      Object.assign(reviewResult, oatsInfo);
    }
 
    if (apiResponse.first_met_hakka) {
      const date = new Date(apiResponse.first_met_hakka * 1000);
      const formattedDate = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDay()

      const firstProductInfo = {
        firstProduct: {
          title: 'Your first Hakka product:',
          icon: images.iconReview4,
          // TODO: first dapp is not ready
          performance: `Project A, ${formattedDate}`,
          shortContent: `${formattedDate} was my first day meeting Hakka`,
          comment: 'Thanks for your loyalty and patience dear Hakka rancher!',
      },}
      Object.assign(reviewResult, firstProductInfo);
    }

    setReviewResult(Object.values(reviewResult))
  }, [apiResponse])
  
  return { reviewResult, isLoading, p2eLv }
}
