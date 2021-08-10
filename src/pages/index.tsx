import * as React from 'react';
import Layout from 'src/containers/Layout';
import MyButton from 'src/components/Common/MyButton';
import HomeScreen from 'src/components/HomeScreen';
import SideBar from 'src/containers/SideBar';
import ProductScreen from 'src/components/ProductScreen';

// markup
const IndexPage = () => (
  <Layout>
    <HomeScreen />
  </Layout>
);

export default IndexPage;
