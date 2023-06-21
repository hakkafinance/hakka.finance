import React from 'react';
// import BlankScreen from '../components/BlankScreen'
import DappLayout from '../containers/DappLayout';
import VaultPage from '../components/VaultPage';

const GuildBankPage = () => (
  <DappLayout
    title="Hakka Finance | Guildbank"
  >
    {/* <BlankScreen
        path = {'guildbank'}
      /> */}
    <VaultPage />
  </DappLayout>
);

export default GuildBankPage;
