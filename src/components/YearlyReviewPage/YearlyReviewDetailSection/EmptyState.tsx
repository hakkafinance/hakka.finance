/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react'
import { navigate } from 'gatsby';
import { MyButton } from '../../Common';
import images from '../../../images';
import styles from './styles';

const EmptyState = () => {
  return (
    <div sx={styles.emptyPageWrapper}>
      <img src={images.iconNoData}></img>
      <p sx={styles.noDataWarning}>No data found with this address</p>
      <div sx={styles.goToProductsBtnWrapper}> 
        <MyButton
          styleKit='green'
          onClick={() => navigate(`/products`)} 
          >
          Try our products
        </MyButton>
      </div>
    </div>
  )
}

export default EmptyState