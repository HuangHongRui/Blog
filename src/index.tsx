import { render } from "react-dom";
import Home from "./pages/Home";
import Demo from "./pages/Else/demo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HaveFun from "./pages/Else/HaveFun";
import "tailwindcss/tailwind.css"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/demo" element={<Demo/>} />
        <Route path="/fun" element={<HaveFun/>} />
      </Routes>
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("root"));
