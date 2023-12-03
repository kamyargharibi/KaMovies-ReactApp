import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const PageNotFound = () => {
  // navigate route
  const navigate = useNavigate();

  // Translate texts
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="max-w-7xl w-full sm:my-auto my-20 mx-auto lg:px-10 sm:px-8 px-4">
      <div className="w-full flex flex-col items-center justify-center sm:gap-10 gap-3 mx-auto">
        <h2 className="w-full font-nunito md:text-9xl sm:text-8xl text-7xl text-secondary-v60 animate-pulse font-bold flex items-center justify-center">
          {t("notFoundPage.errorNumber")}
        </h2>
        <span className="md:text-2xl sm:text-xl text-xs text-center text-secondary-g60 dark:text-secondary-g30">
          {t("notFoundPage.description")}
        </span>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-0.5 py-2 pe-4 ps-3 rounded-md sm:text-base text-sm bg-secondary-v60 text-white group hover:bg-opacity-90 duration-200"
        >
          <BsArrowLeft className="group-hover:-translate-x-1 duration-200 rtl:group-hover:translate-x-1 rtl:rotate-180 sm:text-lg" />
          {t("notFoundPage.btnBackHomePage")}
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
