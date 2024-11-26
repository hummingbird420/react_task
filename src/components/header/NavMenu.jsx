import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import TopNav from "./TopNav";

function NavMenu() {
  const [stickyNav, setStickyNav] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      setStickyNav(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
  }, []);
  return (
    <div
      className={`custom-navmenu w-100 bg-white shadow-sm ${
        stickyNav ? "position-sticky custom-nav bg-light" : ""
      }`}
    >
      <Container>
        <TopNav />
      </Container>
    </div>
  );
}

export default NavMenu;
