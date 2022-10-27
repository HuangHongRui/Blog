import { Button, Popover, Slider, Space  } from "@douyinfe/semi-ui";
import { IconBackTop, IconLikeHeart, IconPause, IconPlay, IconRestart, IconSong, IconText, IconVolume1 } from "@douyinfe/semi-icons";
import React, { useState } from "react";

const App = () => {
  const [play, setPlay] = useState<Boolean>(true);
  const setPlayHandler =() => {
    setPlay(!play);
  }
  return (
    <Space
      spacing="loose"
      style={{ color: "#2A64FA", width: "100%", justifyContent: "center" }}
    >
      <IconRestart />
      {play ? (
        <IconPause onClick={setPlayHandler} />
      ) : (
        <IconPlay onClick={setPlayHandler} />
      )}
      <IconRestart rotate={180} />
      <IconLikeHeart />
      <IconSong />
      <IconText />
      <Popover content={<Slider style={{ width: 100 }} />}>
        <IconVolume1 />
      </Popover>
    </Space>
  );
};

export default App;