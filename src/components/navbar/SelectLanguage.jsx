import { useTranslation } from "react-i18next";

const SelectLanguage = () => {
  // Translate texts
  const { t, i18n } = useTranslation();

  return (
    <div className="w-18">
      <div className="relative">
        {/* Change language with i18n */}
        <select
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          className="appearance-none w-8 h-6 rounded-lg backdrop-blur-sm bg-primary-g80 text-secondary-g20 text-center backdrop-brightness-90 shadow-[0_3px_10px_rgb(0,0,0,0.5)] focus:outline-none text-sm cursor-pointer"
        >
          {/* English language button */}
          <option
            className="flex items-center justify-center cursor-pointer max-h-60 w-full text-secondary-g20 focus:outline-none text-sm"
            value="en"
          >
            En
          </option>
          {/* Farsi language button */}
          <option
            className="cursor-pointer max-h-60 w-full text-secondary-g20 focus:outline-none text-sm"
            value="fa"
          >
            Fa
          </option>
        </select>
      </div>
    </div>
  );
};

export default SelectLanguage;
