import React from "react";
import { useRequest } from "ahooks";
import { Link } from "react-router-dom";
import { getMusic } from "../../service";

const App = () => {
  const { data } = useRequest(getMusic);

  return (
    <div>
      fetch -<Link to="/">{data?.data || "Demo"}</Link>
    </div>
  );
};

export default App;
