/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import styles from './styles';
import logos from '../../assets';

export default function Option({
  onClick = null,
  header,
  icon,
  id,
}: {
  onClick?: null | (() => void);
  header: React.ReactNode;
  icon: string;
  id: string;
}) {
  const content = (
    <div
      sx={Object.assign(styles.optionCardClickable, styles.optionCard, styles.infoCard)}
      id={id}
      onClick={onClick}
    >
      <div sx={styles.optionCardLeft}>
        <div sx={styles.headerText}>
          {header}
        </div>
      </div>
      <div sx={styles.iconWrapper}>
        <img src={logos[icon]} alt="Icon" />
      </div>
    </div>
  );

  return content;
}
