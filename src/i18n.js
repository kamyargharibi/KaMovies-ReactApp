import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import fa from "./locales/fa.json";

const resources = {
  // All Translations
  en: {
    translation: en,
  },
  fa: {
    translation: fa,
  },
};

i18n.use(initReactI18next).init({
  resources,
  // Defualt language
  lng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
