import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import PageNotFound from "./pages/PageNotFound";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Explore from "./pages/Explore";
import { useDispatch } from "react-redux";
import { fetchDataFromApi } from "./utils/api";
import { getApiData, getGenres } from "./store/movieSlice";
import Genre from "./pages/Genre";
import { useTranslation } from "react-i18next";
import Headroom from "react-headroom";
import i18n from "./i18n";

const App = () => {
  // Check value pin or unpin navbar
  const [navbarPin, setNavbarPin] = useState(true);
  const dispatch = useDispatch();

  // Url for image cover
  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiData(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };

  useEffect(() => {
    // Render fetch api config (url image)
    fetchApiConfig();
    // Render all genres
    genresCall();
  }, []);

  // Translate texts
  const { t, i18n } = useTranslation();

  // Get current direction
  document.body.dir = i18n.dir();

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <BrowserRouter>
        <div className="w-full min-h-screen mx-auto flex flex-col relative dark:bg-primary-g90 rtl:font-vazir font-nunito">
          {/* Show & hide navbar on scroll */}
          <Headroom
            className="!h-0"
            onPin={() => setNavbarPin(!navbarPin)}
            onUnpin={() => setNavbarPin(!navbarPin)}
            style={{
              webkitTransition: "all .5s ease-in-out",
              mozTransition: "all .5s ease-in-out",
              oTransition: "all .5s ease-in-out",
              transition: "all .5s ease-in-out",
              zIndex: "50",
            }}
          >
            {/* Navbar Component */}
            <Navbar navbarPin={navbarPin} />
          </Headroom>
          <Routes>
            {/* Home component */}
            <Route path="/" element={<Home />} />
            {/* Details component */}
            <Route path="/:mediaType/:id" element={<Details />} />
            {/* Search component */}
            <Route path="/search/:query" element={<Search />} />
            {/* Explore component */}
            <Route path="/explore/:mediaType" element={<Explore />} />
            {/* Genre component */}
            <Route path="/genre/:mediaType/:id" element={<Genre />} />
            {/* 404 Error page not found component */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          {/* Footer component */}
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
