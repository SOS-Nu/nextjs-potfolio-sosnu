"use client";

import { setLanguage, setLayoutConfig } from "@/redux/slices/appSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useTranslation } from "react-i18next";
import { MdNightlight, MdOutlineLightMode } from "react-icons/md";

// Helper constants
const VI_FLAG = "/assets/svg/language/vi.svg";
const EN_FLAG = "/assets/svg/language/en.svg";
const LANG_VI_ID = 1;
const LANG_EN_ID = 2;

function AppHeader() {
  const { t, i18n } = useTranslation();
  const currentPath = usePathname();
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // --- REDUX HOOKS ---
  const dispatch = useAppDispatch();
  const layoutConfig = useAppSelector((state) => state.app.layoutConfig);

  // Xác định theme hiện tại (dựa trên colorScheme hoặc config khác)
  const currentTheme = layoutConfig.theme;

  // --- HANDLERS ---
  const handleMode = (mode: "light" | "dark") => {
    // Dispatch action cập nhật Redux (Middleware sẽ tự lưu Cookie)
    dispatch(
      setLayoutConfig({
        ...layoutConfig,
        theme: mode,
      }),
    );
  };

  const handleLanguageChange = (langCode: string, langId: number) => {
    // 1. Đổi ngôn ngữ hiển thị ngay lập tức
    i18n.changeLanguage(langCode);
    // 2. Cập nhật Redux (để Middleware lưu Cookie cho lần sau)
    dispatch(setLanguage(langId));
  };

  const closeNav = () => setExpanded(false);

  // Xử lý click outside để đóng menu mobile (chỉ đăng ký khi menu đang mở)
  useEffect(() => {
    if (!expanded) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [expanded]);

  const getNavLinkClass = (path: string) => {
    return `nav-link ${currentPath === path ? "active" : ""}`;
  };

  const renderFlag = (lang: string) => (
    <Image
      src={lang === "en" ? EN_FLAG : VI_FLAG}
      alt={lang}
      width={20}
      height={20}
      style={{ height: 20, width: 20 }}
    />
  );

  return (
    <Navbar
      fixed="top"
      data-bs-theme={currentTheme}
      expand="lg"
      className="bg-body-tertiary"
      style={{ zIndex: 10 }}
      expanded={expanded}
      onToggle={setExpanded}
      ref={navRef}
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

          <Nav className="ms-auto align-items-lg-center">
            {/* Theme Toggler */}
            <div className="nav-link" style={{ cursor: "pointer" }}>
              {currentTheme === "light" ? (
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

            {/* Language Dropdown */}
            <NavDropdown title={renderFlag(i18n.resolvedLanguage || "vi")}>
              <div
                onClick={() => handleLanguageChange("en", LANG_EN_ID)}
                className="dropdown-item d-flex gap-2 align-items-center"
                style={{ cursor: "pointer" }}
              >
                <Image src={EN_FLAG} alt="english" width={20} height={20} />
                <span>English</span>
              </div>
              <div
                onClick={() => handleLanguageChange("vi", LANG_VI_ID)}
                className="dropdown-item d-flex gap-2 align-items-center"
                style={{ cursor: "pointer" }}
              >
                <Image src={VI_FLAG} alt="vietnamese" width={20} height={20} />
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
