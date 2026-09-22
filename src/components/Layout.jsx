import { useEffect, lazy } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./Header";
import WhatsApp from "./WhatsApp";
const Footer = lazy(() => import("./Footer"));

// Automatic scroll-to-top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Layout = ({ getDirection }) => {
  return (
    <>
      <ScrollToTop />

      <Header getDirection={getDirection} />

      <main>
        <Outlet />
      </main>

      <Footer getDirection={getDirection} />

      <WhatsApp />
    </>
  );
};

export default Layout;
