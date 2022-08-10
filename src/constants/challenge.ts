export enum MissionStatusOptions {
  UNFINISHED,
  FINISHED,
  COMPLETED,
  UPCOMING,
}

export const MISSION_STATUS: {[key in MissionStatusOptions]: { content: string, color: string, btnContent: string }} = {
  [MissionStatusOptions.UNFINISHED]: {
    content: 'Unfinished',
    color: '#FFFCC0',
    btnContent: 'Start Now'
  },
  [MissionStatusOptions.FINISHED]: {
    content: 'Finished',
    color: 'rgba(62, 189, 147, 0.3)',
    btnContent: 'Claim NFT',
  },
  [MissionStatusOptions.COMPLETED]: {
    content: 'Completed',
    color: '#B3BFC2',
    btnContent: 'View',
  },
  [MissionStatusOptions.UPCOMING]: {
    content: '',
    color: '',
    btnContent: 'Soon',
  },
}

export enum PriorityOptions {
  REQUIRED = 'Required',
  BONUS = 'Bonus',
}

export const PriorityInfo: {[key in PriorityOptions]: { content: string, color: string }} = {
  [PriorityOptions.REQUIRED]: {
    content: 'Required',
    color: '#F86A6A'
  },
  [PriorityOptions.BONUS]: {
    content: 'Bonus',
    color: '#004B4F'
  },
}

export const OAT_INFO: {[address: string]: { 
  name?: string,
  missionIndex?: number,
  stage?: number,
  img?: string, 
  reward?: string, 
  describeTitle?: string, 
  describeContent: string,
  hint?: string[],
  missionLink?: string,
  claimLink?: string,
  priority: PriorityOptions,
}} = {
  '0x1': {
    name: 'Golden Hoe',
    missionIndex: 1,
    stage: 1,
    img: '',
    reward: '250 HAKKA', 
    describeTitle: 'Join The Hakka DAO Snapshot!', 
    describeContent: 
      'gm Hakka Farmer and welcome to your native planet! 🪐 To be able to rule and explore the DeFi space, you will need an engine called a DAO! A DAO is a Decentralized Autonomous Organization, a project controlled by all its members and that is not influenced by any central entity. It is the DeFi equivalent of a company in Traditional Finance, with the notable difference that anyone, anywhere with a wallet address can transparently join in to develop it together!'
    ,
    hint: [
      'Hakka Finance is one example of DAO. Its major decisions are taken via proposals its members can vote on in a website called Snapshot!', 
      'To complete this mission, go to the Hakka Snapshot page and click on the "Join" button! Then, you will automatically be able to claim the NFT!',
    ],

    // TODO: fake link
    missionLink: '/staking',
    claimLink: 'https://galaxy.eco/',
    priority: PriorityOptions.REQUIRED,
  },
  '0x2': {
    name: 'Golden Hat',
    missionIndex: 2,
    stage: 1,
    img: '',
    reward: '500 HAKKA', 
    describeTitle: 'Stake At Least 1,000 HAKKA!', 
    describeContent: "Alright! You're gonna be part of this interplanetary space journey with Hakka thanks to your new rocket! But to take off,\
    your engine needs fuel... 🛢 That's right, joining a DAO is the first step. But to be able to vote and make your voice count,\
    you need voting power! How to obtain it? By acquiring some HAKKA tokens and staking it to prove your long-term involvment in\
    the project (and be rewarded with more tokens in the process)! The more sHAKKA (staked HAKKA) you have, the more voting power\
    your get! And the longer you stake, the more you are rewarded!",
    hint: [
      'Use your wallet to acquire at least 1,000 HAKKA tokens on the network of your choice (Ethereum Mainnet, Polygon or BNB),\
      and then stake it for the amount of time you prefer, from 3 months to 4 years! After staking, you will automatically be \
      able to claim the NFT!'
    ],
    // TODO: fake link
    missionLink: '/staking',
    claimLink: 'https://galaxy.eco/',
    priority: PriorityOptions.REQUIRED,
  },
  '0x3': {
    name: '',
    missionIndex: 3,
    stage: 1,
    img: '',
    reward: '', 
    describeTitle: 'Complete The Hakka Exam!', 
    describeContent: "All good! You have your rocket, and your fuel... but do you even know the basics of how to pilot a DeFi rocket?\
      That's okay, we've got you, young Hakka Farmer. Let's have an accelerated course on the basics of DeFi with a very short quiz, so\
      you can obtain your rocket license and fly 'to the moon'! 🚀",
    hint: [
      "Complete the Hakka Quiz Google Form to learn the basic terms of DeFi so it won't have any secret for you!",
      "After completing the quiz correctly, you will be able to claim the NFT the next Monday!"
    ],
    // TODO: fake link
    missionLink: '/staking',
    claimLink: 'https://galaxy.eco/',
    priority: PriorityOptions.REQUIRED,
  },
  '0x4': {
    name: '',
    missionIndex: 4,
    stage: 1,
    img: '',
    reward: '', 
    describeTitle: 'Lend At Least $10 With iGain IRS!', 
    describeContent: "It's dangerous to go alone! Take this! 🛡 The world of crypto and DeFi can be dangerous at times. Bear markets and\
      volatility-induced turbulences in the DeFi outer space can cause your portfolio a great deal of trouble! Tokens and lending markets\
      can go up and down, but there's a way to be protected against fluctuations! Remember the Hakka Exam mission when we mentioned the concept\
      of 'financial derivative'? It's time to use your newly acquired tool, the Short token, to protect the gains from your stablecoins!",
    hint: [
      "Go to the 'Fixed-APY' section of iGain IRS, one of Hakka's products, and lend at least $10 of stablecoins, with a corresponding amount of Short tokens to protect yourself against interest rate decrease!",
      "After the transaction is confirmed, you will automatically be able to claim the NFT!",
    ],
    // TODO: fake link
    missionLink: '/staking',
    claimLink: 'https://galaxy.eco/',
    priority: PriorityOptions.REQUIRED,
  }
}