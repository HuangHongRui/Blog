import React from "react";
import { useRequest } from "ahooks";
import { Link } from "react-router-dom";
import { getMusic } from "../../service";
import NeteaseMusic from "../../components/NeteaseMusic";

const App = () => {
  const { data } = useRequest(getMusic);

  return (
    <div>
      <Link to="/">{data?.data || "Demo"}</Link>
      <NeteaseMusic />
    </div>
  );
};

export default App;
