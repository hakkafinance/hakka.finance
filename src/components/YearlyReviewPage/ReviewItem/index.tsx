/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react'
import styles from './styles';

interface ReviewItemProps {
  title: string
  icon: string
  performance: string
  comment: string
}
  
const ReviewItem = ({ title, icon, performance, comment }: ReviewItemProps) => {
  return (
    <div sx={styles.itemWrapper}>
      <p sx={styles.title}>{title}</p>
      <div sx={styles.mainContent}>
        <img src={icon} />
        <div>
          <p sx={styles.performance}>{performance}</p>
          <p sx={styles.comment}>{comment}</p>
        </div>
      </div>
      <p sx={styles.mobileCOmment}>{comment}</p>
    </div>
  )
}

export default ReviewItem