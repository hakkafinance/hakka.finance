export const OAT_INFO: {[address: string]: { 
  name?: string, 
  img?: string, 
  reward?: string, 
  describeTitle?: string, 
  describeContent?: string,
  hint?: string[],
  missionLink?: string,
  claimLink?: string,
}}  = {
  '0x1': {
    name: 'Golden Hoe',
    img: '',
    reward: '250 HAKKA', 
    describeTitle: 'Get some HAKKA', 
    describeContent: 'go buy some hakka. go buy some hakka. go buy some hakka.',
    hint: ['go buy some hakka'],
    missionLink: '',
    claimLink: '',
  },
  '0x2': {
    name: 'Golden Hat',
    img: '',
    reward: '500 HAKKA', 
    describeTitle: 'Stake some HAKKA', 
    describeContent: 'go stake some HAKKA. go stake some HAKKA. go stake some HAKKA.',
    hint: ['go stake some HAKKA'],
    missionLink: '',
    claimLink: '',
  }
}