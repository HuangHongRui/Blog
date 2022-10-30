import React from 'react';
import { Layout } from '@douyinfe/semi-ui';
import style from './index.module.less';
import Header from '../../components/Header';
const { Footer, Content } = Layout;

export default () => {

  return (
    <Layout className={style['home-layout']}>
      <Header />
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};
