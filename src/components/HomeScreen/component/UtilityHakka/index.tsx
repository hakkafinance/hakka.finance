/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { Flex, Box } from 'rebass';
import images from '../../../../images';
import styles from './styles';

function UtilityHakka() {
  const detailsInfo = [
    {
      image: 'iconParliament',
      title: 'Voting Power',
      text: 'The mintage amount of sHAKKA determines Voting Power. It\'s immutable and non-transferrable.',
    },
    {
      image: 'iconMoneyBox',
      title: 'Beneficiary Right',
      text:
        'sHAKKA is tradable in secondary market & beneficial in reward contracts.',
    },
  ];

  const renderDetailsInfo = () => detailsInfo.map((item, i) => (
    <Flex sx={styles.utilityInfoContainer} flexDirection="column" key={i}>
      <img sx={styles.utilityImgInfo} src={images[item.image]} alt="" />
      <Box sx={styles.utilityTitle} mt="20px" mb="4px">{item.title}</Box>
      <p
        sx={styles.utilityText}
        dangerouslySetInnerHTML={{ __html: item.text }}
      />
    </Flex>
  ));

  return (
    <>
      <Box sx={styles.utilityHead} mb="20px">Utility of HAKKA</Box>
      <Flex
        justifyContent="space-between"
        sx={styles.utilityTextLink}
      >
        <Flex sx={styles.utilityText}>
          <p>Stake HAKKA to get sHAKKA and bestowed below rights.</p>
        </Flex>
        <a sx={{ textDecoration: 'none' }} target="_blank" href="https://staking.hakka.finance/" rel="noreferrer">
          <Flex
            sx={styles.utilityLink}
            alignItems="center"
          >
            <Box>Stake Portal</Box>
            <Flex ml="1" mt="1px"><img sx={styles.imgForward} src={images.iconForwardGreen} alt="" /></Flex>
          </Flex>
        </a>
      </Flex>
      <Flex sx={styles.detailsInfo} mt="4">{renderDetailsInfo()}</Flex>
    </>
  );
}

export default UtilityHakka;
