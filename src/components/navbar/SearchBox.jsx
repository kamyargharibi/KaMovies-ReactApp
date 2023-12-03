import { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { HiXMark } from "react-icons/hi2";
import { LuPackageSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SearchBox = ({ isOpen, setIsOpen }) => {
  // Search value
  const [query, setQuery] = useState("");
  // Navigation page
  const navigate = useNavigate();

  // Handle search box
  const searchHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setIsOpen(false);
      }, 300);
    }
  };
  // Translate texts
  const { t, i18n } = useTranslation();

  return (
    <>
      {isOpen && (
        <div>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40"
              onClose={() => setIsOpen(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-primary-g80 bg-opacity-70" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-8 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="max-w-6xl w-full sm:h-44 h-32 transform overflow-hidden rounded-2xl bg-gradient-to-r from-primary-v70 via-secondary-v60 to-secondary-v50 p-6 text-left align-middle shadow-xl transition-all">
                      {/* Title of search box */}
                      <Dialog.Title
                        as="h3"
                        className="flex
                         items-center gap-1 text-lg sm:px-4 font-medium leading-6 text-white"
                      >
                        <LuPackageSearch size={22} /> {t("hero.button")}
                      </Dialog.Title>
                      <div className="mt-4">
                        {/* Search box field */}
                        <div className="w-full mx-auto">
                          <div className="max-w-7xl w-full flex items-center relative mx-auto sm:px-4">
                            <input
                              type="text"
                              placeholder={t("hero.placeholder")}
                              className="w-full mx-auto sm:h-14 h-10 px-4 rtl:pe-6 focus:outline-none border border-secondary-v50 rounded-xl border-opacity-50"
                              onKeyUp={searchHandler}
                              onChange={(e) => setQuery(e.target.value)}
                            />
                            <HiXMark
                              onClick={() => setIsOpen(false)}
                              className="block h-6 w-6 absolute right-1 lg:rtl:right-[95%] sm:rtl:right-[94%] rtl:right-[90%] sm:right-7 cursor-pointer text-secondary-v60 hover:rotate-90 hover:text-secondary-v50 duration-300"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      )}
    </>
  );
};

export default SearchBox;
