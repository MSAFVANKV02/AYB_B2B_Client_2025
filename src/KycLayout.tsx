import { Toaster } from "react-hot-toast";

import { Outlet } from "react-router-dom";
import Footer from "@/components/landings/footer_Sec/Footer";
import { cn } from "@/lib/utils";
import Navbar from "@/components/landings/navbar_Sec/Navbar";
import useNavbarItems from "./components/landings/navbar_Sec/navbarItems";
import Loader from "./components/loader/loader";


function App() {
  // const location = useLocation();
  const {navItemsKyc} = useNavbarItems()
  // const {user} = useAppSelector(state=> state.auth)
  // const homePath = location.pathname === "/";


  return (
    <>
      <div
        className={cn(``, {
          "debug-screens": import.meta.env.MODE === "development",
        })}
      >

        <Loader />
     
        <Navbar navItems={navItemsKyc}/>
        {/* {
          user && (
            <div className="w-full p-3 bg-blue-200">
<span className=""></span>
            </div>
          )
        } */}
        <div className="max-w-screen-2xl mx-auto">
          <Outlet />   
        </div>
     
        <Footer />
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
}

export default App;
