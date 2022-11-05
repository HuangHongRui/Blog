import { Avatar, Layout } from "@douyinfe/semi-ui"
import style from './index.module.less';
import { Typography } from '@douyinfe/semi-ui';

export default () => {
  const { Sider, Content } = Layout;
  const { Title } = Typography;
  return (
    <Layout className={style.llayout}>
      <Sider className={style.lsider}>
        <Avatar className={style.lavatar} shape="square" src='./file/baby.jpg'/>
        <Title heading={3} className="text-center my-6">心一也</Title>
        {/* name */}
        {/* title */}
        {/* tool */}
        {/* bro */}
        {/* about */}
      </Sider>
      <Content className={style.lcontent}>

      </Content>
    </Layout>
  )
}