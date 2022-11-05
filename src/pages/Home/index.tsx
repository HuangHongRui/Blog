import React from 'react';
import { Layout } from '@douyinfe/semi-ui';
import style from './index.module.less';
import Header from '../../components/Header';
import Content from '../../components/Content';
const { Footer } = Layout;

export default () => {

  return (
    <Layout className={style['home-layout']}>
      <Header />
      <Content />
      <Footer>Footer</Footer>
    </Layout>
  );
};
