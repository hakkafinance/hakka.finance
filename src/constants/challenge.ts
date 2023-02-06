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

export enum MissionOptions {
  MISSION1_1,
  MISSION1_2,
  MISSION1_3,
  MISSION1_4,
  MISSION1_5,
  MISSION1_6,
  MISSION1_7,
  MISSION2_1,
  MISSION2_2,
  MISSION2_3,
  MISSION2_4,
  MISSION2_5,
}

export const MISSION_CAMPAIGN_ID: {[key in MissionOptions]: string} = {
  [MissionOptions.MISSION1_1]: 'GCGnZUtqDE',
  [MissionOptions.MISSION1_2]: 'GCr8yUtQN5',
  [MissionOptions.MISSION1_3]: 'GCBryUtyo7',
  [MissionOptions.MISSION1_4]: 'GCBCyUtZRy',
  [MissionOptions.MISSION1_5]: 'GCdueUtHjz',
  [MissionOptions.MISSION1_6]: 'GCD5yUt73A',
  [MissionOptions.MISSION1_7]: 'GCxTdUwieL',
  [MissionOptions.MISSION2_1]: 'GCv7dUwr2V',
  [MissionOptions.MISSION2_2]: 'GCfzYUwL4v',
  [MissionOptions.MISSION2_3]: 'GCAQRUwKaU',
  [MissionOptions.MISSION2_4]: 'GCpPdU4V8t',
  [MissionOptions.MISSION2_5]: 'GC8tjU4Cc5',
}

export const OAT_INFO: {[key: string]: { 
  missionIndex?: number,
  img: string, 
  reward?: string, 
  describeTitle?: string, 
  describeContent: string,
  hint?: string[],
  missionLink?: string,
  claimLink?: string,
  priority: PriorityOptions,
}} = {
  [MISSION_CAMPAIGN_ID[MissionOptions.MISSION1_1]]: {
    missionIndex: 1,
    img: 'mission1_1',
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
  [MISSION_CAMPAIGN_ID[MissionOptions.MISSION1_2]]: {
    missionIndex: 2,
    img: 'mission1_2',
    reward: '', 
    describeTitle: 'Stake At Least 1,000 HAKKA!', 
    describeContent: `Alright! You're gonna be part of this interplanetary space journey with Hakka thanks to your new rocket! \n
    But to take off, your engine needs fuel... 🛢 \n
    That's right, joining a DAO was the first step. But to be able to vote and make your voice count, you need voting power! \n
    How to obtain it? By acquiring some HAKKA tokens and staking it to prove your long-term involvment in the project (and be rewarded with more tokens in the process)! \n
    The more sHAKKA (staked HAKKA) you have, the more voting power your get! And the longer you stake, the more voting power you get too!`,
    hint: [
      'Use your wallet to acquire at least 1,000 HAKKA tokens on the network of your choice (Ethereum Mainnet, Polygon or BNB),\
      and then stake it for the amount of time you prefer, from 3 months to 4 years! After staking, you will automatically be \
      able to claim the NFT! You will even make some money if you farm your staked HAKKA! Amazing!'
    ],
    missionLink: 'https://hakka.finance/staking?utm_source=galaxy&utm_medium=nft&utm_campaign=play2earn_1_2',
    claimLink: 'https://galaxy.eco/hakkafinance/campaign/GCr8yUtQN5',
    priority: PriorityOptions.REQUIRED,
  },
  [MISSION_CAMPAIGN_ID[MissionOptions.MISSION1_3]]: {
    missionIndex: 3,
    img: 'mission1_3',
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
  [MISSION_CAMPAIGN_ID[MissionOptions.MISSION1_4]]: {
    missionIndex: 4,
    img: 'mission1_4',
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
  [MISSION_CAMPAIGN_ID[MissionOptions.MISSION1_5]]: {
    missionIndex: 5,
    img: 'mission1_5',
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
  [MISSION_CAMPAIGN_ID[MissionOptions.MISSION1_6]]: {
    missionIndex: 6,
    img: 'mission1_6',
    reward: '', 
    describeTitle: 'Participate In At Least 1 AMA!', 
    describeContent: `You're all set to take off with your brand new rocket and your DAO crew! 🚀\n
    Or are you? Before leaving, you must have an idea of who is part of the broader community by attending or\
    even asking questions during one of the Hakka Finance AMAs! 📢\n
    Since a DAO is decentralized, with members from worldwide, it is crucial the community meets on a regular basis\
    to discuss on the future of the project, the suggestions you can bring to improve it, or simply learn from the core team!\n
    In the amazing world of blockchain, it is possible to reliably prove and identify who has attended events, thanks to Galaxy\
    OAT NFTs! The more OATs you collect, the more you can prove your involvement in the Hakka community!`,
    hint: [
      `Collect at least 1 Hakka AMA OAT (internal or with a partner) to complete this mission!`,
      `Click on "Start Now", if you own any of the AMA-related NFTs on the list, you are eligible for this one. Some of them require that you connect your Discord account to Galaxy.`,
      `If you don't have any, don't sweat it! At least 1 AMA is organized every month around the 15th on the Hakka Finance Discord server. Don't miss out!`
    ],
    missionLink: 'https://galaxy.eco/hakkafinance',
    claimLink: 'https://galxe.com/hakkafinance/campaign/GCD5yUt73A',
    priority: PriorityOptions.REQUIRED,
  },
  [MISSION_CAMPAIGN_ID[MissionOptions.MISSION1_7]]: {
    missionIndex: 7,
    img: 'mission1_7',
    reward: '', 
    describeTitle: 'Provide Liquidity On iGain IRS!', 
    describeContent: `Are you ready to leave your native planet? Are you sure you haven’t forgotten anything? 🤔\n
    That’s right. Something’s missing.\n
    Since DeFi products are by nature… decentralized, they can’t rely on a central party to provide the liquidity users can\
    expect at any time and keep the platform stable. That liquidity comes from other users themselves. Otherwise, users will\
    be subject to price slippages and lack of liquidity.
    In return, those liquidity providers are rewarded and earn transaction fees paid by other users using their liquidity!\n
    Therefore, to make sure your DAO doesn’t overheat, you need some cooling liquidity!\n
    On iGain IRS, there is a “Pool” section where users can provide liquidity in the stablecoin of their choice and help other\
    users with access to liquidity they need (to sell Long/Short tokens for example), in exchange of their transaction fees.`,
    hint: [
      `Go to the iGain liquidity pool page, and provide at least $10 of liquidity, which will be converted into LP tokens 🔵.`,
      `Holding those tokens will make you earn transaction fees paid by other users until the iGain term has reached maturity. You can sell later if you need your liquidity back.`,
      `If you have at least $10 of LP tokens on your wallet address, this NFT will be yours!`
    ],
    missionLink: 'https://igain.finance/irs/fixed-apy?utm_source=galaxy&utm_medium=nft&utm_campaign=play2earn_1_4',
    claimLink: 'https://galxe.com/hakkafinance/campaign/GCxTdUwieL',
    priority: PriorityOptions.REQUIRED,
  },
  [MISSION_CAMPAIGN_ID[MissionOptions.MISSION2_1]]: {
    missionIndex: 1,
    img: 'mission2_1',
    reward: '', 
    describeTitle: 'Follow Hakka Finance On Twitter!',
    describeContent: `So cool! You have landed on a brand new planet! You also look different!\n
    Your new environment somehow looks familiar, but you have no idea where to go… How about following a guide?\n
    This chirping blue bird seems to know his way around, let's follow him! 🐦`,
    hint: [
      `First, congrats for leveling up!`,
      `This first mission will be easy: all you need is to follow @hakkafinance on Twitter (and make sure to sync your account to your Project Galaxy account on the Account Settings section)!`,
    ],
    missionLink: 'https://twitter.com/hakkafinance',
    claimLink: 'https://galxe.com/hakkafinance/campaign/GCv7dUwr2V',
    priority: PriorityOptions.REQUIRED,
  },
  [MISSION_CAMPAIGN_ID[MissionOptions.MISSION2_2]]: {
    missionIndex: 2,
    img: 'mission2_2',
    reward: '', 
    describeTitle: 'Farm Some HAKKA Tokens!',
    describeContent: `That little blue bird has been showing you around for a while now. What a gorgeous planet!\n
    So much arable land... a Hakka farmer's paradise! 🥰\n
    Remember that sHAKKA fuel you put on your rocket in Level 1 Mission 2? It is a token that can actually be used\
    to farm and generate even more HAKKA, at triple-digit annual returns, just by planting them in farming pools! 🚜`,
    hint: [
      `Farm some HAKKA from a sHAKKA farming pool (on Ethereum ⚫️, Polygon 🟣, or BNB 🟡)!`,
      `Your sHAKKA farming deposit must be at least of 1,000 to claim your NFT!`,
      `Warning: For Mainnet, only sHAKKA v2 will make this NFT claimable!`,
    ],
    missionLink: 'https://hakka.finance/farms/?utm_source=galaxy&utm_medium=nft&utm_campaign=play2earn_2_2',
    claimLink: 'https://galxe.com/hakkafinance/campaign/GCfzYUwL4v',
    priority: PriorityOptions.REQUIRED,
  },
  [MISSION_CAMPAIGN_ID[MissionOptions.MISSION2_3]]: {
    missionIndex: 3,
    img: 'mission2_3',
    reward: '', 
    describeTitle: 'Bet On Hakka Intelligence!',
    describeContent: `Done farming? Great! Now you have a playground to bet on anything! 🏟\n
    Hakka Finance has a betting/prediction platform called Hakka Intelligence. It can be used to predict baskets of\
    crypto prices, sports events, or, in fact, any real-world event traceable by a blockchain oracle! The Hakka\
    community has the possibility to decide together!\n
    On Hakka Intelligence, the more accurate your predictions compared to other users, the more you earn!`,
    hint: [
      `Go to Hakka Intelligence, choose an open round if there is any (otherwise, ask for one on Twitter or Discord).`,
      `Bet at least 5,000 HAKKA tokens, and you should be eligible to complete this mission!`,
    ],
    missionLink: 'https://intelligence.hakka.finance/',
    claimLink: 'https://galxe.com/hakkafinance/campaign/GCAQRUwKaU',
    priority: PriorityOptions.REQUIRED,
  },
  [MISSION_CAMPAIGN_ID[MissionOptions.MISSION2_4]]: {
    missionIndex: 4,
    img: 'mission2_4',
    reward: '', 
    describeTitle: 'Get Insured On 3F Mutual!',
    describeContent: `As you enjoyed your life on the blue planet, farming and betting, you never could have predicted\
    the disaster that was about to strike! ☄️😱\n
    Without warning, stablecoin asteroids de-pegged out of their orbit and began falling from the sky, crashing down onto\
    the planet and the market! 😨\n
    Don't panic! You gotta act fast and protect yourself! 🛡\n
    Luckily, you can run to the powerful field force of 3F Mutual, a decentralized insurance pool with the energy of thousands\
    of ETH (!), to shield you from the impending danger and see the stablecoin asteroids bouncing harmlessly off the field force 💥`,
    hint: [
      `Go to 3F Mutual and invest at least 0.001 ETH into the pool (regardless of the number of insurance units and days of protection) and the NFT is yours!`,
      `💰 Your wallet and ALL the active insured will automatically receive thousands of ETH if MakerDAO, one of the building blocks of DeFi and creator of the DAI stablecoin, shuts down.`,
      `PS: a small percentage of the ETH invested goes to the Hakka Guild Bank, collectively owned by all HAKKA token holders, giving it intrinsic value!
      Bonus: 15% of the premium paid by users after you will be distributed to all those who previously bought insurance units, including you!`
    ],
    missionLink: 'https://3fmutual.com/',
    claimLink: 'https://galxe.com/hakkafinance/campaign/GCpPdU4V8t',
    priority: PriorityOptions.REQUIRED,
  },
  [MISSION_CAMPAIGN_ID[MissionOptions.MISSION2_5]]: {
    missionIndex: 5,
    img: 'mission2_5',
    reward: '', 
    describeTitle: 'Claim Your Farmed HAKKA tokens!',
    describeContent: `Remember? In Mission 2, you were farming from the soil of this blue planet thanks to your staked HAKKA or your LP tokens. 🌱\n
    Now, time to reap what you have sown! With your trusty tools, a wealth of DeFi knowledge and armed with some patience, you are always looking\
    for the best farming opportunities! 💰 \n
    As you harvest, you're earning rewards and watching your crypto stash pile up. Congrats! You can be proud of your gains! 👏\n`,
    hint: [
      `First, make sure to head to your farming pool. Click on "Deposit/Withdraw."`,
      `Once there, withdraw your farming rewards from the pool by clicking on the green button.`,
      `Then, check out the "Vesting" page. You will be able to see your Vesting Balance, also known as the tokens promised to you! 💵`,
      `However, to stabilize the supply of circulating HAKKA tokens, 17.38% of the vesting balance can be claimed every 19 days. Being a farmer requires patience ⏳`,
      `To complete this mission, claim at least 500 HAKKA tokens (on any chain) from your Vesting Balance! 🏁`,
    ],
    missionLink: 'https://hakka.finance/vesting',
    claimLink: 'https://galxe.com/hakkafinance/campaign/GC8tjU4Cc5',
    priority: PriorityOptions.REQUIRED,
  },
}

export const notificationMissionAddresses = [
  MISSION_CAMPAIGN_ID[MissionOptions.MISSION2_4],
  MISSION_CAMPAIGN_ID[MissionOptions.MISSION2_5],
]

export interface LevelInfoType {
  title: string; 
  introduction: string;
  missionList: string[];
  expectedMissionAmount: number;
  profile: string;
  levelColor: string;
  levelContainerBgColor: string;
  characterPanelBorderColor: string;
}


export const LevelInfo: {[level: number]: LevelInfoType} = {
  1: {
    title: 'Newbie DeFi Farmer',
    introduction: 'Your DeFi journey across the Galaxy starts here, young farmer! Before taking off, prepare yourself by learning the basics of DAOs and DeFi!',
    missionList: [
      MISSION_CAMPAIGN_ID[MissionOptions.MISSION1_1],
      MISSION_CAMPAIGN_ID[MissionOptions.MISSION1_2],
      MISSION_CAMPAIGN_ID[MissionOptions.MISSION1_3],
      MISSION_CAMPAIGN_ID[MissionOptions.MISSION1_4],
      MISSION_CAMPAIGN_ID[MissionOptions.MISSION1_5],
      MISSION_CAMPAIGN_ID[MissionOptions.MISSION1_6],
      MISSION_CAMPAIGN_ID[MissionOptions.MISSION1_7],
    ],
    expectedMissionAmount: 7,
    profile: 'profileLv1',
    levelColor: 'rgba(108, 232, 180, 0.13)',
    levelContainerBgColor: '#0B555A',
    characterPanelBorderColor: 'rgba(108, 232, 180, 0.13)'
  },
  2: {
    title: 'Humble Hakka Rancher',
    introduction: 'Congrats and welcome to the Hakka family! You have now landed on a new DeFi planet with massive harvesting potential. Time to farm and sharpen your skills!',
    missionList: [
      MISSION_CAMPAIGN_ID[MissionOptions.MISSION2_1], 
      MISSION_CAMPAIGN_ID[MissionOptions.MISSION2_2], 
      MISSION_CAMPAIGN_ID[MissionOptions.MISSION2_3], 
      MISSION_CAMPAIGN_ID[MissionOptions.MISSION2_4],
      MISSION_CAMPAIGN_ID[MissionOptions.MISSION2_5],
    ],
    expectedMissionAmount: 7,
    profile: 'profileLv2',
    levelColor: 'rgba(73, 144, 235, 0.13)',
    levelContainerBgColor: '#033361',
    characterPanelBorderColor: 'rgba(82, 102, 109, 0.3)'
  },
}

export const DECORATIVE_THREAD_COLOR_LIST = [
  '#FF8F91',
  '#EE98E0', 
  '#D5A0F9', 
  '#A6ABF6', 
  '#61BAE3', 
  '#4ABDBE',
  '#3FBE94',
]