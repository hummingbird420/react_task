import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Footer from "../footer/Footer";
import NavMenu from "../header/NavMenu";
import SideMenu from "../menu/SideMenu";

function Layout({ children }) {
  const [sidebar, setSidebar] = React.useState(false);
  const currentPath = useLocation().pathname;

  useEffect(() => {
    if (currentPath.startsWith("/config/")) {
      setSidebar(true);
    }
  }, [currentPath]);

  return (
    <div className="layout_wrapper">
      <NavMenu />
      <Container fluid className="custom-layout">
        <Row>
          <Col lg={3} className="d-lg-block d-none">
            <Row
              className={` ${
                sidebar ? "d-flex" : "d-none"
              } custom-layout__sidebar--align`}
            >
              <Col lg={6} className="position-relative">
                <div className="sidebar_menu_wrapper card border-0 position-fixed shadow-sm rounded py-5 mt-4">
                  <SideMenu />
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg={6} className="mt-3">
            {children}
          </Col>
          <Col lg={3} className="d-lg-block d-none"></Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Layout;
