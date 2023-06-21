/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react'
import { isMobile } from 'react-device-detect';
import styles from './styles';
import images from '../../../images';

interface AccordionProps {
  children?: React.ReactNode;
  headerContent?: string;
  headerBgColor?: string;
  isDefaultOpen?: boolean;
}

const Accordion = ({ children, headerContent, headerBgColor, isDefaultOpen = false }: AccordionProps) => {
  const [isCollapse, setIsCollapse] = useState<boolean>(!isDefaultOpen);
  const desktopStyle = { maxHeight: '0px', padding: '0px 20px 0px 43px', borderBottom: '0px' }
  const mobileStyle = { maxHeight: '0px', padding: '0px 12px 0px 12px', borderBottom: '0px' }
  
  return (
    <div>
      <div sx={styles.accordionHeader} style={{ background: headerBgColor }} onClick={() => setIsCollapse(!isCollapse)}>
        <img src={isCollapse ? images.iconTriangleUp : images.iconTriangleDown } />
        <p>{headerContent}</p>
      </div>
      <div 
        sx={styles.accordionCollapse} 
        style={isCollapse ? isMobile ? mobileStyle : desktopStyle : {}}
      >
        {children}
      </div>
    </div>
  )
}

export default Accordion