import React from 'react';
import { Layout } from '@douyinfe/semi-ui';
import './index.less';
const { Header, Footer, Content } = Layout;

export default () => {

  return (
    <Layout className='home-layout'>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};
