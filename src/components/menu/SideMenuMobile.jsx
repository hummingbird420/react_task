import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/Collapse";
import { Link, useLocation } from "react-router-dom";

import { Circle, ChevronRight, ChevronDown } from "react-feather";
import useActiveMenu from "../../customHooks/useActiveMenu";
import { useEffect } from "react";

function SideMenu() {
  const [geography, setGeography] = useState(false);
  const [advance, setAdvance] = useState(false);

  // ! hooks are declared here
  const location = useLocation();
  const curretPath = location.pathname;

  // ! custom active menu hook
  const activeSide = useActiveMenu();

  useEffect(() => {
    if (curretPath.startsWith("/config/g/")) {
      setGeography(true);
      setAdvance(false);
    } else if (curretPath.startsWith("/config/a/")) {
      setAdvance(true);
      setGeography(false);
    }
  }, [curretPath]);

  return (
    <>
      <div>
        <Button
          onClick={() => {
            setGeography(!geography);
            setAdvance(false);
          }}
          aria-controls="example-collapse-text"
          aria-expanded={geography}
          className="text-left bg-white border-0 text-black font-fallback text-decoration-none font-fallback default-fz my-2 px-4"
        >
          {geography ? (
            <ChevronDown size={20} className={geography ? "orange-500" : ""} />
          ) : (
            <ChevronRight size={20} className="mb-1" />
          )}
          <span>
            <span className={geography ? "orange-500" : ""}>Geography</span>
          </span>
        </Button>
        <Collapse in={geography}>
          <div id="example-collapse-text" className="ms-4 px-4">
            <Card.Body className="py-0">
              <Nav.Item className="">
                <Link
                  className=" text-decoration-none text-muted font-fallback default-fz d-inline-block pb-2"
                  to={"/config/g/country"}
                >
                  <span>
                    <Circle
                      size={18}
                      className={`pb-1 me-2 ${
                        activeSide.geography ? "orange-500" : ""
                      }`}
                    />
                  </span>
                  <span className={activeSide.geography ? "orange-500" : ""}>
                    Country
                  </span>
                </Link>
              </Nav.Item>
            </Card.Body>
          </div>
        </Collapse>
      </div>
      <div>
        <Button
          onClick={() => {
            setAdvance(!advance);
            setGeography(false);
          }}
          aria-controls="example-collapse-text"
          aria-expanded={advance}
          className="text-left bg-white border-0 text-black font-fallback text-decoration-none font-fallback default-fz px-4"
        >
          {advance ? (
            <ChevronDown size={20} className={advance ? "orange-500" : ""} />
          ) : (
            <ChevronRight size={20} className="mb-1" />
          )}
          <span>
            <span className={advance ? "orange-500" : ""}>Advance</span>
          </span>
        </Button>
        <Collapse in={advance} dimension="height">
          <div id="example-collapse-text" className="ms-4 px-4">
            <Nav.Item className="">
              <Link
                className="text-decoration-none text-muted font-fallback default-fz d-flex align-items-center  py-2"
                to={"/config/a/category"}
              >
                <span>
                  <Circle
                    size={18}
                    className={`pb-1 me-2 ${
                      activeSide.category ? "orange-500" : ""
                    }`}
                  />
                </span>
                <span className={activeSide.category ? "orange-500" : ""}>
                  Categories
                </span>
              </Link>
            </Nav.Item>
            <Nav.Item className="">
              <Link
                className="d-inline-block py-2 text-decoration-none text-muted font-fallback default-fz "
                to={"/config/a/role"}
              >
                <span>
                  <Circle
                    size={18}
                    className={`pb-1 me-2 ${
                      activeSide.role ? "orange-500" : ""
                    }`}
                  />
                </span>
                <span className={activeSide.role ? "orange-500" : ""}>
                  Role
                </span>
              </Link>
            </Nav.Item>
            <Nav.Item className="">
              <Link
                className="d-inline-block text-decoration-none text-muted font-fallback default-fz  py-2"
                to={"/config/a/team"}
              >
                <span>
                  <Circle
                    size={18}
                    className={`pb-1 me-2 ${
                      activeSide.team ? "orange-500" : ""
                    }`}
                  />
                </span>
                <span className={activeSide.team ? "orange-500" : ""}>
                  Team
                </span>
              </Link>
            </Nav.Item>
            <Nav.Item className="">
              <Link
                className="d-inline-block text-decoration-none text-muted font-fallback default-fz  py-2"
                to={"/config/a/module"}
              >
                <span>
                  <Circle
                    size={18}
                    className={`pb-1 me-2 ${
                      activeSide.module ? "orange-500" : ""
                    }`}
                  />
                </span>
                <span className={activeSide.module ? "orange-500" : ""}>
                  Module
                </span>
              </Link>
            </Nav.Item>
            <Nav.Item className="">
              <Link
                className="d-inline-block text-decoration-none text-muted font-fallback default-fz  py-2"
                to={"/config/a/project"}
              >
                <span>
                  <Circle
                    size={18}
                    className={`pb-1 me-2 ${
                      activeSide.system ? "orange-500" : ""
                    }`}
                  />
                </span>
                <span className={activeSide.system ? "orange-500" : ""}>
                  System
                </span>
              </Link>
            </Nav.Item>
            <Nav.Item className="">
              <Link
                className="d-inline-block text-decoration-none text-muted font-fallback default-fz  py-2"
                to={"/config/a/admin/recovery"}
              >
                <span>
                  <Circle
                    size={18}
                    className={`pb-1 me-2 ${
                      activeSide.recovery ? "orange-500" : ""
                    }`}
                  />
                </span>
                <span
                  className={
                    activeSide.recovery
                      ? "orange-500 font-size-16"
                      : "font-size-16"
                  }
                >
                  Recovery
                </span>
              </Link>
            </Nav.Item>
            <Nav.Item className="">
              <Link
                className="d-inline-block text-decoration-none text-muted font-fallback default-fz  py-2"
                to={"/config/a/priority"}
              >
                <span>
                  <Circle
                    size={18}
                    className={`pb-1 me-2 ${
                      activeSide.priority ? "orange-500" : ""
                    }`}
                  />
                </span>
                <span className={activeSide.priority ? "orange-500" : ""}>
                  Priority
                </span>
              </Link>
            </Nav.Item>
          </div>
        </Collapse>
      </div>
    </>
  );
}

export default SideMenu;
