import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Card, Space, Typography } from '@douyinfe/semi-ui';
import Meta from '@douyinfe/semi-ui/lib/es/card/meta';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import GoPlayer from './component/GoPalyer';
import "./index.less";
import MusicList from './component/MusicList';
import MusicProgress from './component/MusicProgress';

interface NetMusicProps {
  title?: string;
}

/**
 * 搞一个音乐播放器 - 可拖拽
 * 首先是个组件
 * 样式 / 功能
 * 然后...要引入API - Netease - Music
 */
const NeteaseMusic = (props: NetMusicProps) => {
  const refDom = useRef();
  const { Text } = Typography;
  const {title, ...rest} = props;
  const {localStorage } = window as WindowLocalStorage;
  const [x, setX] = useState(Number(localStorage.getItem('x-position')) || 0);
  const [y, setY] = useState(Number(localStorage.getItem("y-position")) || 0);

  useEffect(() => {
     localStorage.setItem("x-position", String(x));
     localStorage.setItem('y-position', String(y));
  },[x,y]);

  const handleStop = (e: DraggableEvent, data: DraggableData) => {
    setX(data.x);
    setY(data.y);
  };

  // 先把样式搞出来
  return (
    <Draggable defaultPosition={{ x: x, y: x }} onStop={handleStop}>
      <Card
        ref={refDom}
        className="neteaseMusic-card"
        title={
          <Meta
            title="Music Name"
            description="Singer"
            avatar={
              <Avatar
                alt="Singer Pic"
                size="default"
                src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/card-meta-avatar-docs-demo.jpg"
              />
            }
          />
        }
        cover={
          <img
            draggable="false"
            alt="这是专辑照"
            src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg"
          />
        }
        style={{ maxWidth: 360 }}
        headerExtraContent={<Text link>Menu</Text>}
        footerLine={true}
        footerStyle={{ display: "flex", justifyContent: "flex-end" }}
        footer={<MusicList />}
        {...rest}
      >
        <GoPlayer />
        <MusicProgress />
      </Card>
    </Draggable>
  );
};


export default NeteaseMusic;