import "./App.css";

import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "./lib/utils";
import Footer from "./components/landings/footer_Sec/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Navbar from "./components/landings/navbar_Sec/Navbar";
// import { NavigationMenuBar } from "./components/landings/navbar_Sec/NavigationMenuBar";
import useNavbarItems from "./components/landings/navbar_Sec/navbarItems";
import NavigationMenuBar from "./components/landings/navbar_Sec/NavigationMenuBar";
import { generateToken, getDeviceToken, messaging } from "./lib/firebase";
import { onMessage } from "firebase/messaging";
import { NotesTask } from "./pages/notes/note-data";
function AppLayout() {
  const location = useLocation();
  const { navItems } = useNavbarItems();
  // useVoiceCommands();
  // const homePath = location.pathname === "/";
  // const accPath = location.pathname === "/my-account";

  const queryParams = new URLSearchParams(window.location.search);
  const auth = queryParams.get("auth");

  useEffect(() => {
    if (!auth) {
      localStorage.removeItem("otp-timer");
      localStorage.removeItem("otp-finished");
    }
  }, [auth]);

  useEffect(() => {
    getDeviceToken();
    generateToken();
    onMessage(messaging, (payload) => {
      console.log("Received a message:", payload);
      // ...
    });
  }, []);

  return (
    <>
      <div
        className={cn(`min-h-screen flex flex-col justify-between`, {
          "debug-screens": import.meta.env.MODE === "development",
        })}
      >
        {" "}
        {import.meta.env.MODE == "development" && (
          <div className="absolute top-1 left-1">
            {NotesTask.filter((note) => note.status === "Pending").map(() => (
              <Link
                to={`/new-notes`}
                className="text-xs w-5 h-5 rounded-full overflow-auto bg-red-400 flex items-center justify-center font-bold text-white"
              >
                {NotesTask.length}
              </Link>
            ))}
          </div>
        )}
        <div className="">
          <Navbar navItems={navItems} />
          {!location.pathname.startsWith("/my-account") && (
            <div className="w-full bg-[#F6F6F6] border-b select-none ">
              {/* <NavigationMenuBar /> */}
              <NavigationMenuBar />
            </div>
          )}
          <div className="max-w-screen-2xl mx-auto 2xl:px-0 xl:px-10 sm:px-5 px-1">
            <Outlet />
          </div>
        </div>
        <Footer />
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
}

export default AppLayout;
