import { useEffect, useState, useMemo } from 'react';
import { ChainId } from '../constants';
import { getFirstProductInfo, getGasInfo, getOatsInfo, getTransactionAmountInfo } from '../utils/yearlyReviewDetailInfo';

interface ReviewDataType {
  first_met_hakka: string
  gas: { [chainId in ChainId]: number }
  oats: number
  usedDApp: string
  valued: number
  rank: string
  level: number
  tx_pr: number
  gas_pr: number
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

  const {reviewResult, userRank, p2eLv} = useMemo<{ reviewResult: ReviewResultType[], userRank: string | undefined, p2eLv: number}>(() => {
    if (!apiResponse) {
      return {
        reviewResult: [],
        userRank: undefined,
        p2eLv: 1
      }
    }

    let reviewResult = {}
    const [firstDApp, firstMetHakkaDate] = apiResponse.first_met_hakka.split(', ')
    const transactionAmount = apiResponse.valued
    const transactionAmountInfo = getTransactionAmountInfo(apiResponse.usedDApp, transactionAmount, apiResponse.tx_pr)
    const gasInfo = getGasInfo(apiResponse.gas, apiResponse.gas_pr)
    const oatsInfo = getOatsInfo(apiResponse.oats)
    const firstProductInfo = getFirstProductInfo(firstMetHakkaDate, firstDApp)
    Object.assign(reviewResult, transactionAmountInfo, gasInfo, oatsInfo, firstProductInfo);

    return {
      reviewResult: Object.values(reviewResult),
      userRank: apiResponse.rank,
      p2eLv: apiResponse.level
    }
  }, [apiResponse])
  
  return { reviewResult, isLoading, p2eLv, userRank }
}
