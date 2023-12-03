import React from "react";
import { Link } from "react-router-dom";
import { AiFillTwitterCircle, AiFillGithub } from "react-icons/ai";
import { BsFacebook, BsLinkedin } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const Footer = () => {
  // Translate Texts
  const { t, i18n } = useTranslation();

  return (
    <div className="w-full mt-auto border-t border-secondary-g20 dark:border-secondary-g50/50">
      <div className="max-w-7xl w-full flex flex-wrap items-start justify-between mx-auto sm:px-8 px-4 my-8">
        {/* Text about website */}
        <div className="sm:w-1/3 w-full">
          <h2 className="w-34 text-2xl  text-center text-primary-g80 dark:text-secondary-g20 font-semibold sm:mb-4">
            {t("footer.titles.aboutCompany")}
          </h2>
          <p className="text-sm text-center sm:text-base text-primary-g80 dark:text-secondary-g40 rounded-lg py-3">
            {t("footer.description")}
          </p>
        </div>
        {/* Links list */}
        <div className="sm:w-1/4 w-full sm:mt-0 sm:my-6 my-2 flex sm:items-center items-center sm:justify-center justify-start flex-col">
          <h2 className="w-18 text-2xl text-center text-primary-g80 dark:text-secondary-g20 font-semibold sm:mb-4">
            {t("footer.titles.links")}
          </h2>
          <ul className="list-none w-full flex sm:flex-col flex-row flex-wrap items-center justify-center gap-x-2">
            <Link to="/">
              <li className="sm:w-full w-[5rem] sm:text-base text-xs sm:border-none border-e border-secondary-g50 dark:border-secondary-g30 text-primary-g70 hover:text-secondary-g60 dark:text-secondary-g30 dark:hover:text-secondary-g40 duration-200 my-1">
                {t("footer.links.terms")}
              </li>
            </Link>
            <Link to="/">
              <li className="sm:w-full w-[5rem] sm:text-base text-xs sm:border-none border-e border-secondary-g50 dark:border-secondary-g30 text-primary-g70 hover:text-secondary-g60 dark:text-secondary-g30 dark:hover:text-secondary-g40 duration-200 my-1">
                {t("footer.links.privacyPolicy")}
              </li>
            </Link>
            <Link to="/">
              <li className="sm:w-full w-[2.5rem] sm:text-base text-xs sm:border-none border-e border-secondary-g50 dark:border-secondary-g30 text-primary-g70 hover:text-secondary-g60 dark:text-secondary-g30 dark:hover:text-secondary-g40 duration-200 my-1">
                {t("footer.links.about")}
              </li>
            </Link>
            <Link to="/">
              <li className="sm:w-full w-[2rem] sm:text-base text-xs sm:border-none border-e border-secondary-g50 dark:border-secondary-g30 text-primary-g70 hover:text-secondary-g60 dark:text-secondary-g30 dark:hover:text-secondary-g40 duration-200 my-1">
                {t("footer.links.blog")}
              </li>
            </Link>
            <Link to="/">
              <li className="sm:w-full w-[1.5rem] sm:text-base text-xs text-primary-g70 hover:text-secondary-g60 dark:text-secondary-g30 dark:hover:text-secondary-g40 duration-200 my-3">
                {t("footer.links.faq")}
              </li>
            </Link>
          </ul>
        </div>
        {/* SocialMedia links */}
        <div className="sm:w-1/4 w-full">
          <h2 className="w-22 text-2xl text-center text-primary-g80 dark:text-secondary-g20 font-semibold mb-4">
            {t("footer.titles.socialMedia")}
          </h2>
          <div className="w-full flex items-center justify-center flex-wrap sm:py-2 sm:gap-4 gap-3">
            <Link to="/">
              <AiFillTwitterCircle
                size={30}
                className="w-7 rounded-full bg-white hover:bg-secondary-v50 dark:bg-primary-g90 dark:hover:bg-secondary-v50 text-secondary-g60 dark:text-white hover:shadow-[0px_0px_10px_5px_#9f7aea] duration-300 cursor-pointer hover:animate-pulse hover:scale-110"
              />
            </Link>
            <Link to="https://github.com/kamyargharibi" target="_blank">
              <AiFillGithub
                size={30}
                className="w-7 rounded-full bg-white hover:bg-secondary-v50 dark:bg-primary-g90 dark:hover:bg-secondary-v50 text-secondary-g60 dark:text-white hover:shadow-[0px_0px_10px_5px_#9f7aea] duration-300 cursor-pointer hover:animate-pulse hover:scale-110"
              />
            </Link>
            <Link to="/">
              <BsFacebook
                size={25}
                className="w-6 rounded-full bg-white hover:bg-secondary-v50 dark:bg-primary-g90 dark:hover:bg-secondary-v50 text-secondary-g60 dark:text-white hover:shadow-[0px_0px_10px_5px_#9f7aea] duration-300 cursor-pointer hover:animate-pulse hover:scale-110"
              />
            </Link>
            <Link
              to="https://www.linkedin.com/in/kamyar-gharibi/"
              target="_blank"
            >
              <BsLinkedin
                size={25}
                className="w-6 rounded-full bg-white hover:bg-secondary-v50 dark:bg-primary-g90 dark:hover:bg-secondary-v50 text-secondary-g60 dark:text-white hover:shadow-[0px_0px_10px_5px_#9f7aea] duration-300 cursor-pointer hover:animate-pulse hover:scale-110"
              />
            </Link>
          </div>
        </div>
      </div>
      {/* CopyRight */}
      <div className="w-full flex justify-center mt-8 border-t border-secondary-g20 dark:border-secondary-g50/20 bg-gray-100 dark:bg-primary-g90">
        <p className="py-4 text-primary-g70 dark:text-secondary-g50">
          {t("footer.copyRight.year")}{" "}
          <span className="font-semibold text-primary-g80 hover:text-primary-v70 dark:text-secondary-g20 dark:hover:text-primary-v70 cursor-pointer duration-300">
            <Link to="https://github.com/kamyargharibi" target="_blank">
              {t("footer.copyRight.name")}
            </Link>
          </span>
          {t("footer.copyRight.text")}
        </p>
      </div>
    </div>
  );
};

export default Footer;
