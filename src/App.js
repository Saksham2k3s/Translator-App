import React, { useEffect, useState } from "react";
import {
  HistorySideBar,
  TranslationBox,
} from "./components";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

function App() {
  const { error } = useSelector((state) => state.translate);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  useEffect(() => {
    if (error) {
      toast.error("Error while translating!");
    }
  }, [error]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      {/* Toast Notifications */}
      <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              zIndex: 9999,
            },
          }}
        />
      <div className="min-h-screen max-h-screen flex flex-col lg:flex-row bg-purple-200  font-mono px-2 lg:p-0 ">
        {/* Mobile toggle button */}
        <button
          className="lg:hidden p-4 bg-purple-400 text-white rounded-md shadow-lg w-fit m-4  "
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? "Close History" : "Show History"}
        </button>

        {/* Sidebar - only shows on mobile when toggled */}
        <div
          className={`absolute w-[80%] bg-slate-100 transition-transform transform lg:relative lg:w-[20%] lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} overflow-scroll overflow-y-scrool overflow-x-hidden h-screen `}
          style={{ zIndex: 0 }}
        >
          <div className="absolute right-4 top-4 p-2 hover:bg-gray-400 rounded-full block lg:hidden " onClick={() => setIsSidebarOpen(!isSidebarOpen) }  > <RxCross2/> </div>
          <HistorySideBar />
        </div>

        {/* Main Translation Box */}
        <div className=" w-[100%] lg:w-[80%] h-screen flex flex-col justify-center align-middle  ">
          <TranslationBox />
        </div>
      </div>
    </>
  );
}

export default App;
