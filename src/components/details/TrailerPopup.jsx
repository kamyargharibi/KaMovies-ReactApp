import React, { Fragment } from "react";
import ReactPlayer from "react-player/youtube";
import { IoClose } from "react-icons/io5";
import { BiSolidMoviePlay } from "react-icons/bi";
import { Transition, Dialog } from "@headlessui/react";
import { useTranslation } from "react-i18next";

const TrailerPopup = ({ show, setShow, videoId, setVideoId }) => {
  // Handle Close button on popup box
  const handleClose = () => {
    setShow(false);
    setVideoId(null);
  };
  // Translate Texts
  const { t, i18n } = useTranslation();

  return (
    <div className={`${show ? "flex" : "hidden"} flex-col z-50`}>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          onClose={() => setShow(false)}
        >
          {/* Animation popup box */}
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
              {/* Animation popup box */}
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="lg:w-[50%] w-full h-fit transform overflow-hidden rounded-2xl bg-gradient-to-r from-primary-v70 via-secondary-v60 to-secondary-v50 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex
                         items-center justify-between gap-1 text-lg sm:px-4 font-medium leading-6 text-white"
                  >
                    {/* Title on popup box */}
                    <span className="flex items-center gap-1">
                      <BiSolidMoviePlay /> {t("detailsPage.watchTrailer")}
                    </span>
                    {/* Close button on popup box */}
                    <span
                      title="Close Popup"
                      onClick={handleClose}
                      className="flex items-center text-xl cursor-pointer hover:rotate-90 duration-300"
                    >
                      <IoClose size={35} />
                    </span>
                  </Dialog.Title>
                  <div className="mt-4 mb-10">
                    <div className="w-full mx-auto">
                      {/* React player component */}
                      <div className="max-w-7xl w-full flex items-center flex-col relative mx-auto sm:px-4">
                        <ReactPlayer
                          width={"100%"}
                          controls
                          url={`https://www.youtube.com/watch?v=${videoId}`}
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
  );
};

export default TrailerPopup;
