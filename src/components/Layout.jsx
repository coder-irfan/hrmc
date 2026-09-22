import { useEffect, Suspense, lazy } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./Header";
import WhatsApp from "./WhatsApp";
import LoaderUI from "../components/Loader";
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

      <Suspense fallback={<LoaderUI />}>
        <Footer getDirection={getDirection} />
      </Suspense>

      <WhatsApp />
    </>
  );
};

export default Layout;
