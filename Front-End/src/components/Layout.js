import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import FooterBottom from "./FooterBottom";
import Footer from "./Footer";
const Layout = () => {
  const content = (
    <>
      <Nav />
      <Outlet />
      <Footer />
      <FooterBottom />
    </>
  );
  return content;
};
export default Layout;
