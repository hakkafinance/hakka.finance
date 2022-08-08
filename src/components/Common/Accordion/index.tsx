/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react'
import { isMobile } from 'react-device-detect';
import styles from './styles';
import images from '../../../images';

interface AccordionProps {
  children?: React.ReactNode;
  headerContent?: string;
}

const Accordion = ({ children, headerContent }: AccordionProps) => {
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
  const desktopStyle = { maxHeight: '0px', padding: '0px 20px 0px 43px', borderBottom: '0px' }
  const mobileStyle = { maxHeight: '0px', padding: '0px 12px 0px 12px', borderBottom: '0px' }
  
  return (
    <div sx={styles.container}>
      <div sx={styles.accordionHeader} onClick={() => setIsCollapse(!isCollapse)}>
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