/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Flex } from 'rebass';
import SideBar from '../SideBar';
import DappHeader from '../Header/DappHeader/index';
import Footer from '../Footer';
import styles from './styles';
import images from '../../images';
import Web3ReactManager from '../../components/Web3ReactManager';
import { ToastContainer } from 'react-toastify';
import './ReactToastify.css';

const DappLayout = ({ children, title }) => {
  const TOAST_AUTO_CLOSE_TIME = 8000;
  const [isShowSideBar, setIsShowSideBar] = useState(false);

  const toggleSideBar = () => {
    setIsShowSideBar(!isShowSideBar);
  };
  const handleClose = (value) => {
    setIsShowSideBar(value);
  };

  useEffect(() => {
    const gatsbyFocusWrapper = document.getElementById('gatsby-focus-wrapper');
    gatsbyFocusWrapper.removeAttribute('tabIndex');
    document.getElementById('wrapper').focus();
  }, [isShowSideBar]);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title || 'Hakka Finance'}</title>
        <meta property="og:image" content={images.iconOgImage} />
      </Helmet>
      <Flex>
        <SideBar isShowSideBar={isShowSideBar} onCloseSideBar={handleClose} />

        <Box
          id="wrapper"
          tabIndex="-1"
          width="100%"
          sx={styles.custom_scroll_bar}
        >
          <DappHeader sx={styles.content_wrapper} toggleSidebar={toggleSideBar} />
          <Box
            sx={styles.content}
          >
            <ToastContainer
              enableMultiContainer
              containerId={'tx'} 
              position='top-right'
              autoClose={TOAST_AUTO_CLOSE_TIME}
              hideProgressBar={false}
              newestOnTop={true}
              pauseOnFocusLoss
              draggable
              pauseOnHover />
            <ToastContainer
              style={{ maxWidth: "100vw", width: 'auto' }}
              enableMultiContainer
              containerId={'error'} 
              position='top-center'
              autoClose={TOAST_AUTO_CLOSE_TIME}
              hideProgressBar={false}
              newestOnTop={true}
              pauseOnFocusLoss
              draggable
              pauseOnHover />
            <Web3ReactManager>
              {children}
            </Web3ReactManager>
          </Box>
          <Footer />
        </Box>
      </Flex>
    </div>
  );
};

export default React.memo(DappLayout);
