import { Button, List, Space } from "@douyinfe/semi-ui";
import React from "react";

const App = () => {
  const data = [
    "从明天起，做一个幸福的人",
    "喂马，劈柴，周游世界",
    "从明天起，关心粮食和蔬菜",
    "我有一所房子，面朝大海，春暖花开",
  ];
  return (
    <List
      size="small"
      dataSource={data}
      style={{ flexBasis: '100%' }}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  );
}

export default App;