import React from "react";
import { render } from "react-dom";
import Home from "./pages/Home";
import Demo from "./pages/Else/demo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HaveFun from "./pages/Else/HaveFun";
import './index.less'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HaveFun/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/demo" element={<Demo/>} />
      </Routes>
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("Leo"));
