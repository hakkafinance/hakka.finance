import { useEffect, useState, useMemo } from 'react';
import { getFirstProductInfo, getGasInfo, getOatsInfo, getTransactionAmountInfo } from '../utils/yearlyReviewDetailInfo';

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
  const [apiResponse, setApiResponse] = useState<ReviewDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // TODO: api data is not ready
  const [p2eLv, setP2eLv] = useState(1);

  useEffect(() => {
    if (!account) {
      setApiResponse(null);
      setIsLoading(false);
      return
    }
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

  const reviewResult = useMemo<ReviewResultType[]>(() => {
    if (!apiResponse) {
      return []
    }

    let reviewResult = {}
    // TODO: mock data. The api data is not ready
    const mockFirstDApp = 'project A'
    const mockTransactionAmount = 999999
    const transactionAmountInfo = getTransactionAmountInfo(apiResponse.usedDApp, mockTransactionAmount)
    const gasInfo = getGasInfo(apiResponse.gas)
    const oatsInfo = getOatsInfo(apiResponse.oats)
    const firstProductInfo = getFirstProductInfo(apiResponse.first_met_hakka, mockFirstDApp)
    Object.assign(reviewResult, transactionAmountInfo, gasInfo, oatsInfo, firstProductInfo);
    return Object.values(reviewResult)
  }, [apiResponse])
  
  return { reviewResult, isLoading, p2eLv }
}
