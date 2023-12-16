import { Routes, Route, useLocation } from "react-router-dom";
//importing react slick slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { animateScroll } from "react-scroll";

import NavBar from "./components/organs/NavBar"
import Home from "./components/pages/Home";
import Map from "./components/pages/Map";
import BuyTree from "./components/pages/BuyTree";
import PlantTree from "./components/pages/PlantTree";
import { useEffect } from "react";
import Footer from "./components/organs/Footer";

function App() {
  const directory = useLocation();
  useEffect(() => {
    animateScroll.scrollToTop({
      duration: 0,
    });
  }, [directory.pathname]);

  return (
    <div className="w-full bg-white text-gray-950 font-poppins">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* show map */}
        <Route path="/adopt-a-tree" element={<Map />} />
        <Route path="/buy-a-tree" element={<BuyTree />} />
        <Route path="/plant-a-tree" element={<PlantTree />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App
