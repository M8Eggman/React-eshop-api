import { Outlet } from "react-router-dom";
import "./Layout.css";
import Nav from "../nav/nav";
import Footer from "../footer/Footer";

export default function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}
