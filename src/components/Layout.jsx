import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="">
        <Outlet /> {/* Renders child route components like Home, About, etc. */}
      </div>
      <Footer />
    </>
  );
}

export default Layout