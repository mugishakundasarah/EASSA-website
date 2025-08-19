import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-200px)] bg-gradient-to-b from-white via-[#fff7f7] to-white">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout