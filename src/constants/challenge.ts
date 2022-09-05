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
    btnContent: 'Soon™️',
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
  img: string, 
  reward?: string, 
  describeTitle?: string, 
  describeContent: string,
  hint?: string[],
  missionLink?: string,
  claimLink?: string,
  priority: PriorityOptions,
}} = {
  'GCGnZUtqDE': {
    name: '',
    missionIndex: 1,
    stage: 1,
    img: 'mission1',
    reward: '', 
    describeTitle: 'Join The Hakka DAO Snapshot!', 
    describeContent: 
      `gm Hakka Farmer and welcome to your native planet! 🪐  \n
      To be able to rule and explore the DeFi space on your rocket, you will need an engine called a DAO!  \n
      A DAO is a Decentralized Autonomous Organization, a project controlled by all its members and that is not influenced by any central entity.  \n
      It is the DeFi equivalent of a company in Traditional Finance, with the notable difference that anyone, anywhere with a wallet address can transparently join in to develop it together!`
    ,
    hint: [
      'Hakka Finance is one example of DAO. Its major decisions are taken via proposals its members can vote on in a website called Snapshot!', 
      'To complete this mission, go to the Hakka Snapshot page (Click on "Start Here" above) and click on the "Join" button! Then, you will automatically be able to claim the NFT!',
    ],
    missionLink: 'https://snapshot.org/#/hakka.eth/',
    claimLink: 'https://galaxy.eco/hakkafinance/campaign/GCGnZUtqDE',
    priority: PriorityOptions.REQUIRED,
  },
  'GCr8yUtQN5': {
    name: '',
    missionIndex: 2,
    stage: 1,
    img: 'mission2',
    reward: '', 
    describeTitle: 'Stake At Least 1,000 HAKKA!', 
    describeContent: `Alright! You're gonna be part of this interplanetary space journey with Hakka thanks to your new rocket! \n
    But to take off, your engine needs fuel... 🛢 \n
    That's right, joining a DAO was the first step. But to be able to vote and make your voice count, you need voting power! \n
    How to obtain it? By acquiring some HAKKA tokens and staking it to prove your long-term involvment in the project (and be rewarded with more tokens in the process)! \n
    The more sHAKKA (staked HAKKA) you have, the more voting power your get! And the longer you stake, the more you are rewarded!`,
    hint: [
      'Use your wallet to acquire at least 1,000 HAKKA tokens on the network of your choice (Ethereum Mainnet, Polygon or BNB),\
      and then stake it for the amount of time you prefer, from 3 months to 4 years! After staking, you will automatically be \
      able to claim the NFT! You will even make some money with your staking rewards! Amazing!'
    ],
    missionLink: 'https://hakka.finance/staking?utm_source=galaxy&utm_medium=nft&utm_campaign=play2earn_1_2',
    claimLink: 'https://galaxy.eco/hakkafinance/campaign/GCr8yUtQN5',
    priority: PriorityOptions.REQUIRED,
  },
  'GCBryUtyo7': {
    name: '',
    missionIndex: 3,
    stage: 1,
    img: 'mission3',
    reward: '', 
    describeTitle: 'Complete The Hakka Exam!', 
    describeContent: `All good! You have your rocket, and your fuel... but do you even know the basics of how to pilot a DeFi rocket? \n
      That's okay, we've got you, young Hakka Farmer. \n
      Let's have an accelerated course on the basics of DeFi with a very short quiz, so\
      you can obtain your rocket license and fly "to the moon!" 🚀`,
    hint: [
      `Complete the Hakka Quiz Google Form (Click on "Start Here" above) to learn the basic terms of DeFi so it won't have any secret for you!`,
      `After completing the quiz correctly with at least 7 right answers, you will be able to claim the NFT up to the next 12 hours!`
    ],
    missionLink: 'https://forms.gle/aDE2N375rW2Zwyyf6',
    claimLink: 'https://galaxy.eco/hakkafinance/campaign/GCBryUtyo7',
    priority: PriorityOptions.REQUIRED,
  },
  'GCBCyUtZRy': {
    name: '',
    missionIndex: 4,
    stage: 1,
    img: 'mission4',
    reward: '', 
    describeTitle: 'Lend At Least $10 With iGain IRS!', 
    describeContent: `It's dangerous to go alone! Take this! 🛡 \n
      The world of crypto and DeFi can be dangerous for beginners. \n
      Bear markets and volatility-induced turbulences 📉 in the DeFi outer space can cause your portfolio a great deal of trouble! \n
      Token prices and DeFi lending markets can go up and down, but there's a way to be protected against fluctuations! \n
      Remember the Hakka Exam mission when we mentioned the concept of 'financial derivative'? It's time to use your newly acquired tool, the Short token 🔴, to protect the gains from your stablecoins!`,
    hint: [
      `Go to the 'Fixed-APY' section of iGain IRS (Click on "Start Here" above), one of Hakka's products, and lend at least $10 of stablecoins, with a corresponding amount of Short tokens to protect yourself against interest rate decrease!`,
      `After the transaction is confirmed, you will automatically be able to claim the NFT! You will even make some money from your stablecoins after depositing!`,
    ],
    missionLink: 'https://igain.finance/irs/fixed-apy?utm_source=galaxy&utm_medium=nft&utm_campaign=play2earn_1_4',
    claimLink: 'https://galaxy.eco/hakkafinance/campaign/GCBCyUtZRy',
    priority: PriorityOptions.REQUIRED,
  },
  'GCdueUtHjz': {
    name: '',
    missionIndex: 5,
    stage: 1,
    img: 'mission5',
    reward: '', 
    describeTitle: 'Vote On A Governance Proposal!', 
    describeContent: `Okay! The DAO rocket is almost ready to take off.. 🛫 \n
      However, you are not the only one piloting it. In fact, the rocket is controlled collectively by other pilots of the DAO (remember Mission #1?),\
      who, just like you, have contributed by adding voting power fuel to it! ⬆️ \n
      In other words, it means that every decision on the direction the DAO rocket must be taken together in the Snapshot control room, using your voting power.\
      The DAO Rocket will automatically take the direction decided by the majority. What will be the first decision you will take part of? \n` ,
    hint: [
      `Click on “Start Here” and head to the Hakka Finance DAO Snapshot page. If a proposal vote is open, make your voice heard and vote with your sHAKKA! If not, wait for the next one,\
       or propose on the Hakka Finance Forum/Discord a suggestion relevant to vote on to improve the ecosystem!`,
      `After voting at least once, you will be able to claim the NFT!`,
    ],
    missionLink: 'https://snapshot.org/#/hakka.eth/',
    claimLink: 'https://galaxy.eco/hakkafinance/campaign/GCdueUtHjz',
    priority: PriorityOptions.REQUIRED,
  },
  'GCTANUUJkf': {
    name: 'Golden Hoe',
    missionIndex: 1,
    stage: 1,
    img: '',
    reward: '', 
    describeTitle: 'Test 1', 
    describeContent: 
      'gm Hakka Farmer and welcome to your native planet! 🪐 To be able to rule and explore the DeFi space, you will need an engine called a DAO! A DAO is a Decentralized Autonomous Organization, a project controlled by all its members and that is not influenced by any central entity. It is the DeFi equivalent of a company in Traditional Finance, with the notable difference that anyone, anywhere with a wallet address can transparently join in to develop it together!'
    ,
    hint: [
      'Hakka Finance is one example of DAO. Its major decisions are taken via proposals its members can vote on in a website called Snapshot!', 
      'To complete this mission, go to the Hakka Snapshot page and click on the "Join" button! Then, you will automatically be able to claim the NFT!',
    ],
    missionLink: '/staking',
    claimLink: 'https://galaxy.eco/hakkafinance/campaign/GCTANUUJkf/',
    priority: PriorityOptions.REQUIRED,
  },
  'GCSH6Utrps': {
    name: 'Golden Hat',
    missionIndex: 2,
    stage: 1,
    img: '',
    reward: '', 
    describeTitle: 'Test 2', 
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
    missionLink: '/staking',
    claimLink: 'https://galaxy.eco/hakkafinance/campaign/GCSH6Utrps/',
    priority: PriorityOptions.REQUIRED,
  },
  'GCuq6UU5zS': {
    name: 'Golden Hat',
    missionIndex: 2,
    stage: 1,
    img: '',
    reward: '', 
    describeTitle: 'Test 3', 
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
    missionLink: '/staking',
    claimLink: 'https://galaxy.eco/alpacafinance/campaign/GCuq6UU5zS',
    priority: PriorityOptions.REQUIRED,
  },
}

const testMissionList = ['GCTANUUJkf', 'GCSH6Utrps','GCuq6UU5zS']
export const notificationMissionAddresses = ['GCdueUtHjz']

export const LevelInfo = {
  1: {
    title: 'Newbie DeFi Farmer',
    introduction: 'Your DeFi journey across the Galaxy starts here, young farmer! Before taking off, prepare yourself by learning the basics of DAOs and DeFi!',
    missionList: process.env.GATSBY_ENV === 'development' 
      ? ['GCGnZUtqDE', 'GCr8yUtQN5', 'GCBryUtyo7', 'GCBCyUtZRy', 'GCdueUtHjz', ...testMissionList] 
      : ['GCGnZUtqDE', 'GCr8yUtQN5', 'GCBryUtyo7', 'GCBCyUtZRy', 'GCdueUtHjz'],
    expectedMissionAmount: 7,
    profile: 'profileLv1',
  },
}