/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { Box, Flex } from 'rebass';
import images from 'src/images';
import styles from './styles';

const ListWebIcon = (props) => (
  <Box sx={styles.list_web_icon}>
    <Flex>
      <Box mr="3"><img src={images.iconTelegram} /></Box>
      <Box mr="3"><img src={images.iconTwitter} /></Box>
      <Box mr="3"><img src={images.iconDiscord} /></Box>
      <Box mr="3"><img src={images.iconMedium} /></Box>
      <Box mr="3"><img src={images.iconGithub} /></Box>
    </Flex>
  </Box>
);
export default ListWebIcon;
