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
  describeContent?: string,
  hint?: string[],
  missionLink?: string,
  claimLink?: string,
  priority: PriorityOptions,
}}  = {
  '0x1': {
    name: 'Golden Hoe',
    missionIndex: 1,
    stage: 1,
    img: '',
    reward: '250 HAKKA', 
    describeTitle: 'Get some HAKKA', 
    describeContent: 'go buy some hakka. go buy some hakka. go buy some hakka.',
    hint: ['go buy some hakka', 'go buy some hakka', 'go buy some hakka'],
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
    describeTitle: 'Stake some HAKKA', 
    describeContent: 'go stake some HAKKA. go stake some HAKKA. go stake some HAKKA.',
    hint: ['go stake some HAKKA'],
    // TODO: fake link
    missionLink: '/staking',
    claimLink: 'https://galaxy.eco/',
    priority: PriorityOptions.BONUS,
  }
}