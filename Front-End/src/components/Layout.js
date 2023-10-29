import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Header from "./Header";
import Footer from "./Footer";
const Layout = () => {
  const content = (
    <>
      <Header />
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
  return content;
};
export default Layout;
