/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Box, Flex, Link, Text,
} from 'rebass';
import { navigate } from 'gatsby';
import { get } from 'lodash';
import styles from './styles';
import images from '../../images';
import SideBarItem from './SideBarItem';
import { MyButton } from '../../components/Common';
import { notificationMissionAddresses } from '../../constants/challenge';

const topSideBarItems = [
  {
    name: 'home',
    icon: images.iconHome,
    path: '',
  },
  {
    name: 'products',
    icon: images.iconProduct,
    path: 'products',

  },
];

export const NOTIFICATION_DOT = 'notificationDot'

export const botSideBarItems = [
  {
    name: 'governance',
    icon: images.iconGovernance,
    path: 'governance',
    href: 'https://snapshot.org/#/hakka.eth',
    connectOutsideWebsite: true,
    underConstruction: false,
    subIcon: images.iconSnapshot

  },
  {
    name: 'forum',
    icon: images.iconForum,
    href: 'https://forum.hakka.finance/',
    path: 'forum',
    connectOutsideWebsite: true,
    underConstruction: false,
    subIcon: images.iconLinkSmall,
  },
  {
    name: 'play to earn!',
    icon: images.iconChallenge,
    path: 'play2earn-intro',
    connectOutsideWebsite: false,
    underConstruction: false,
    subIcon: NOTIFICATION_DOT,
  },
  {
    name: 'farms',
    icon: images.iconFarms,
    href: 'https://rewards.hakka.finance/',
    path: 'farms',
    connectOutsideWebsite: false,
    underConstruction: true,
  },
  {
    name: 'vesting',
    icon: images.iconReward,
    path: 'vesting',
    connectOutsideWebsite: false,
    underConstruction: true,
  },
  {
    name: 'staking',
    icon: images.iconVesting,
    href: 'https://staking.hakka.finance/',
    path: 'staking',
    connectOutsideWebsite: false,
    underConstruction: true,
  },
  {
    name: 'Guild Bank',
    icon: images.iconVault,
    href: 'https://vault.hakka.finance/',
    path: 'guildbank',
    connectOutsideWebsite: false,
    underConstruction: true,
  },
  {
    name: 'Year in Review',
    icon: images.iconYearlyReview,
    path: 'yearly-review',
    connectOutsideWebsite: false,
    underConstruction: false,
  },
  {
    name: 'Bug Bounty',
    icon: images.iconBug,
    href: 'https://immunefi.com/bounty/hakkafinance/',
    path: 'bugbounty',
    connectOutsideWebsite: true,
    underConstruction: false,
    subIcon: images.iconLinkSmall,
  },
];

function SideBar(props) {
  const { onCloseSideBar, isShowSideBar } = props;
  const [selectedNav, setSelectedNav] = useState('');
  const [isViewAllNotifiedMission, setIsViewAllNotifiedMission] = useState<boolean>(true)
  const isBrowser = typeof window !== 'undefined';

  useEffect(() => {
    const localStorageViewedPages = isBrowser ? window.localStorage.getItem('viewed-pages') : ''
    if (localStorageViewedPages) {
      let isAllAddressPass = true
      const viewedPages: string[] = JSON.parse(localStorageViewedPages)
      notificationMissionAddresses.forEach((address: string) => {
        if (viewedPages.findIndex((viewedAddress: string) => viewedAddress === address) === -1) {
          isAllAddressPass = false
        }
      })
      setIsViewAllNotifiedMission(isAllAddressPass)
    } else if (notificationMissionAddresses.length > 0) {
      setIsViewAllNotifiedMission(false)
    }
  }, [])

  const onSelectNavItem = (path) => () => {
    navigate(`/${path}`);
    setSelectedNav(path);

    console.log(path);
  };
  const handleCloseSideBar = () => {
    onCloseSideBar(false);
  };
  const renderTopSideBar = () => topSideBarItems.map((it, idx) => (
    <Box key={it.name} onClick={onSelectNavItem(it.path)}>
      <SideBarItem
        selectedNav={selectedNav}
        icon={it.icon}
        text={it.name}
        path={it.path}
      />
    </Box>
  ));

  const renderBotSideBar = () => botSideBarItems.map((it, idx) => (
    <Box key={it.name} onClick={it.connectOutsideWebsite ? () => window.open(it.href, '_blank', 'noopener, noreferrer') : onSelectNavItem(it.path)}>
      <SideBarItem
        selectedNav={selectedNav}
        icon={it.icon}
        text={it.name}
        path={it.path}
        subIcon={get(it, 'subIcon')}
        isViewAllNotifiedMission={isViewAllNotifiedMission}
      />
    </Box>
  ));

  return (
    <Box sx={isShowSideBar ? styles.sidebar_responsive_show : styles.sidebar_responsive}>
      <Flex flexDirection="column" justifyContent="space-between" sx={styles.sidebar}>
        <Box>
          <Box sx={styles.custom_padding}>
            <Box sx={styles.sidebar_header}>
              <img src={images.hakkaLogo} onClick={()=>navigate(`/`)}/>
              <img onClick={handleCloseSideBar} sx={styles.sidebar_closeBtn} src={images.iconDeleteRound} />
            </Box>
            <Box mt="3">{renderTopSideBar()}</Box>
          </Box>

          <Box sx={styles.hl} ml="25px" mt="2" pr="0" />

          <Box sx={styles.custom_padding}>
            <Box sx={styles.sidebar_subText} pl="3">DAO</Box>
            <Box mt="2">{renderBotSideBar()}</Box>
          </Box>

          <Box sx={styles.hl} ml="25px" mt="2" pr="0" />

          <Box sx={styles.custom_padding}>
            <Box sx={styles.sidebar_subText} pl="3">News</Box>

            <Box sx={styles.medium_content}>
              <Flex onClick={() => { window.open('https://medium.com/hakkafinance', '_blank', 'noopener, noreferrer')}} alignItems="center">
                <img src={images.iconMedium} />
                <Box sx={styles.bold_text} ml="12px">Medium</Box>
              </Flex>
              <Flex onClick={() => { window.open('https://medium.com/hakkafinance', '_blank', 'noopener, noreferrer')}}>
                <img src={images.iconLinkSmall} />
              </Flex>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box sx={styles.hl} mt="2" pr="0" />
          <Box p="12px">
            <MyButton onClick={() => { window.open('https://hakka-finance.gitbook.io/hakka-wiki/', '_blank', 'noopener, noreferrer')}}>
              <Box sx={{ fontFamily: 'system-ui', fontWeight: '700' }}>Learn More</Box>
            </MyButton>
          </Box>
          <Box sx={styles.bold_text_link} mb="12px" p="2" textAlign="center">
            or
            {' '}
            <Link sx={styles.bold_text_link} href="mailto:admin@hakka.finance">
              contact us
            </Link>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
export default React.memo(SideBar);
