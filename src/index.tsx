import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Writer from "@/pages/Writer";
import Demo from "@/pages/Else/demo";
import Article from "@/pages/Article";
import HaveFun from "@/pages/Else/HaveFun";
import '@/index.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/demo" element={<Demo/>} />
        <Route path="/fun" element={<HaveFun/>} />
        <Route path="/article" element={<Article/>} />
        <Route path="/writer" element={<Writer/>} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
