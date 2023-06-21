import React, { ReactNode } from 'react'
import { Box, Flex, Link, Text } from 'rebass';
import images from '../../../../images';
import styles from './styles';


export enum SecurityOrganizations {
  HashCloak,
  Immunefi,
}

interface OrganizationsInfoType {
  securityContent: string;
  preposition: string;
  icon: ReactNode;
  btnContent: string;
  link: string;
}

const SECURITY_ORGANIZATION_INFO: { [organization in SecurityOrganizations]: OrganizationsInfoType } = {
  [SecurityOrganizations.HashCloak]: {
    securityContent: 'Audited and verified',
    preposition: 'by',
    icon: <img src={images.iconHashCloak} width='126px' height='28px' />,
    btnContent: 'Read Audit Report',
    link: 'https://github.com/hakkafinance/audit-reports',
  },
  [SecurityOrganizations.Immunefi]: {
    securityContent: 'Bug bounty program',
    preposition: 'via',
    icon: <img src={images.iconImmunefi} width='116px' height='28px' />,
    btnContent: 'Secure Our Code',
    link: 'https://immunefi.com/bounty/hakkafinance/',
  },
};

type SecurityItemProps = {
  organization: SecurityOrganizations;
}

const SecurityItem = ({ organization }: SecurityItemProps) => 
  <Flex sx={styles.securityItemWrapper}>
    <Flex sx={styles.titleWrapper}>
      <span>{SECURITY_ORGANIZATION_INFO[organization].securityContent}&ensp; </span>
      <Flex sx={styles.iconWrapper}>
        <span style={{ fontSize: '16px' }}>{SECURITY_ORGANIZATION_INFO[organization].preposition}&ensp; </span>
        <Box>{SECURITY_ORGANIZATION_INFO[organization].icon}</Box>
      </Flex>
    </Flex>
    <Link sx={styles.linkButton} href={SECURITY_ORGANIZATION_INFO[organization].link} target="_blank" rel="noreferrer noopener">
      <Flex>
        <Text sx={styles.buttonContent}>{SECURITY_ORGANIZATION_INFO[organization].btnContent}</Text>
        <img src={images.iconLinkSmall} />
      </Flex>
    </Link>
  </Flex>
;

const SecuritySection = () => {
  return (
    <Box sx={styles.securitySection}>
      <Box sx={styles.title}>Security</Box>
      <SecurityItem organization={SecurityOrganizations.HashCloak} />
      <SecurityItem organization={SecurityOrganizations.Immunefi} />
    </Box>
  )
}

export default SecuritySection