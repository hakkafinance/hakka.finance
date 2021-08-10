/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { Box, Flex, Heading } from 'rebass';
import images from 'src/images';
import styles from './styles';

function HakkaTeam() {
  const listMenbers = [
    {
      avatar: images.jackLai,
      name: 'Jack Lai',
      job: 'researcher',
    },
    {
      avatar: images.wegoChen,
      name: 'Wego Chen',
      job: 'ADVISOR',
    },
    {
      avatar: images.ianHsu,
      name: 'Ian Hsu',
      job: 'ADVISOR',
    },
  ];

  const renderListMembers = () => listMenbers.map((item, i) => (
    <Box
      sx={styles.hakkaTeamInfoUser}
      flexDirection="column"
      key={i}
    >
      <Flex sx={styles.team_img_responsive}><img sx={styles.hakkaTeamImgUserList} src={item.avatar} alt="" /></Flex>
      <Box sx={styles.hakkaTeamName} mt="24px">{item.name}</Box>
      <Box sx={styles.hakkaTeamJob} mt="2">{item.job}</Box>
    </Box>
  ));

  return (
    <Box sx={styles.hakkaTeam}>
      <Box sx={styles.hakkaTeamHead}>Hakka Team</Box>
      <Flex sx={styles.hakkaTeamUser}>
        <img sx={styles.hakkaTeamImgUser} src={images.pingChen} alt="" />

        <Box sx={styles.hakkaTeamInfo}>
          <Box sx={styles.hakkaTeamName} mt={['24px', '0px', '0px', '0px']}>Ping Chen</Box>
          <Box sx={styles.hakkaTeamJob} mt="2">FOUNDER</Box>
          <p sx={styles.hakkaTeamComment}>
            Ping is the founder of the HAKKA ecosystem and has been involved in
            the Ethereum community for over 5 years as a dApp developer.
          </p>
        </Box>
      </Flex>

      <Box sx={styles.hakkaTeamListMember} mt="4" flexWrap="wrap">
        {renderListMembers()}
      </Box>
      {/* <Box mt="4"><hr sx={styles.dividerLine} /></Box> */}
      <Flex sx={styles.hakkaTeamFootContent} mt="48px" justifyContent="space-between" alignItems="center" mb="6">
        <Box sx={styles.hakkaTeamFootText}>Know more about Hakka Team</Box>
        <Flex sx={styles.hakkaTeamFootTextLink} alignItems="center">
          Visit Wiki
          <img src={images.iconLinkSmallGreen} alt="" />
        </Flex>
      </Flex>
    </Box>
  );
}

export default HakkaTeam;
