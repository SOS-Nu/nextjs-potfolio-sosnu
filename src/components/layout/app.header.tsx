"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { MdOutlineLightMode, MdNightlight } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { NavDropdown } from "react-bootstrap";

import { useEffect, useRef, useState } from "react";
import { useCurrentApp } from "../context/app.context";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ThemeContextType = "light" | "dark";

const viFlag = "/assets/svg/language/vi.svg";
const enFlag = "/assets/svg/language/en.svg";

function AppHeader() {
  const { theme, setTheme } = useCurrentApp();
  const { t, i18n } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const currentPath = usePathname();

  const getNavLinkClass = (path: string) => {
    // So sánh đường dẫn hiện tại với đường dẫn mục tiêu
    // Nếu trùng, thêm class 'active' (hoặc class CSS bạn dùng để highlight)
    // Nếu không, chỉ giữ lại class 'nav-link'
    return `nav-link ${currentPath === path ? "active" : ""}`;
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Kiểm tra nếu Navbar đang mở VÀ cú nhấp chuột KHÔNG nằm bên trong Navbar
      if (
        expanded &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    };

    // Gắn event listener khi component mount
    document.addEventListener("mousedown", handleOutsideClick);

    // Dọn dẹp event listener khi component unmount hoặc khi dependencies thay đổi
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [expanded]); // Dependency array: chỉ chạy lại khi trạng thái expanded thay đổi

  const handleMode = (mode: ThemeContextType) => {
    setTheme(mode);
  };

  const closeNav = () => {
    setExpanded(false);
  };

  const renderFlag = (language: string) => {
    return (
      <img
        style={{ height: 20, width: 20 }}
        src={language === "en" ? enFlag : viFlag}
        alt={language}
      />
    );
  };

  return (
    <Navbar
      fixed="top"
      data-bs-theme={theme}
      expand="lg"
      className="bg-body-tertiary"
      style={{ zIndex: 1 }}
      expanded={expanded}
      onToggle={setExpanded}
      // ref={navRef as any}
    >
      <Container>
        <Link className="navbar-brand" href="/" onClick={closeNav}>
          <span className="brand-green">{t("appHeader.brand")}</span>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className={getNavLinkClass("/")} href="/" onClick={closeNav}>
              {t("appHeader.home")}
            </Link>
            <Link
              className={getNavLinkClass("/project")}
              href="/project"
              onClick={closeNav}
            >
              {" "}
              {t("appHeader.project")}
            </Link>
            <Link
              className={getNavLinkClass("/about")}
              href="/about"
              onClick={closeNav}
            >
              {t("appHeader.about")}
            </Link>
          </Nav>
          <Nav className="ms-auto">
            <div className="nav-link" style={{ cursor: "pointer" }}>
              {theme === "light" ? (
                <MdOutlineLightMode
                  onClick={() => handleMode("dark")}
                  style={{ fontSize: 20 }}
                />
              ) : (
                <MdNightlight
                  onClick={() => handleMode("light")}
                  style={{ fontSize: 20 }}
                />
              )}
            </div>

            <NavDropdown title={renderFlag(i18n.resolvedLanguage!)}>
              <div
                onClick={() => i18n.changeLanguage("en")}
                className="dropdown-item d-flex gap-2 align-items-center"
                style={{ cursor: "pointer" }}
              >
                <img
                  style={{ height: 20, width: 20 }}
                  src={enFlag}
                  alt="english"
                />
                <span>English</span>
              </div>
              <div
                onClick={() => i18n.changeLanguage("vi")}
                className="dropdown-item d-flex gap-2 align-items-center"
                style={{ cursor: "pointer" }}
              >
                <img
                  style={{ height: 20, width: 20 }}
                  src={viFlag}
                  alt="vietnamese"
                />
                <span>Tiếng Việt</span>
              </div>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppHeader;
