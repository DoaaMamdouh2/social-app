import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="pt-24"></div>
      <Outlet />
    </>
  );
}

export default Layout;