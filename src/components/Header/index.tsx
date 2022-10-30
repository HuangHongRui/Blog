import { Button, Col, Row, Space } from '@douyinfe/semi-ui';
import Header from '@douyinfe/semi-ui/lib/es/navigation/Header';
import React, { useState } from 'react';
import { IconLanguage, IconGithubLogo, IconSun, IconMoon } from '@douyinfe/semi-icons';
import style from './index.module.less';
import { switchMode } from '../../utils';

export default () => {
  const [on, setOn] = useState(true);
  const [cn, setCn] = useState(true);
  return (
    <Header className={style.header}>
      <Row gutter={24} className="nav">
        <Col span={12} className="logo">
          <Space>Leo's Blog</Space>
        </Col>
        <Col span={12} className="btns">
          <Space align="end">
            <Button theme='borderless' type='tertiary' style={{ marginRight: 8 }}>首页</Button>
            <Button theme='borderless' type='tertiary' style={{ marginRight: 8 }}>文章</Button>
            <Button theme='borderless' type='tertiary' style={{ marginRight: 8 }}>书签</Button>
            <Button theme='borderless' type='tertiary' style={{ marginRight: 8 }}>关于</Button>
            <Button
              theme='borderless'
              onClick={() => setCn(v => !v)}
              icon={<IconLanguage size='large' />} 
            >
              {cn ? 'EN' : '中文'}
            </Button>
            <Button
              theme='borderless'
              icon={on ? <IconMoon size='large' /> : <IconSun size='large' />} 
              onClick={() => { setOn(t => !t); switchMode() }}
            />
            <Button theme='borderless' icon={<IconGithubLogo size='large' />} />
          </Space>
        </Col>
      </Row>
    </Header>
  )
}