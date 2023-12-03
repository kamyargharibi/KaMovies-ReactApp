import React, { useEffect } from "react";
import Trending from "../components/home/Trending";
import WhatsPopular from "../components/home/WhatsPopular";
import TopRated from "../components/home/TopRated";
import Hero from "../components/home/Hero";

const Home = () => {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full mx-auto">
      {/* Hero component */}
      <Hero />
      <div id="lists" className="w-full sm:mb-14 mb-6 px-2">
        {/* Trending component */}
        <Trending />
        {/* WhatsPopular component */}
        <WhatsPopular />
        {/* Toprate component */}
        <TopRated />
      </div>
    </div>
  );
};

export default Home;
