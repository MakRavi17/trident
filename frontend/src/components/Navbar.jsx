import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import Button from "./Button";
import { NAV_LINKS } from "../utils/constants";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isRegisterFlow =
    location.pathname === "/register" || location.pathname === "/payment";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [enableActiveTracking, setEnableActiveTracking] = useState(false);

  useEffect(() => {
    if (!isHomePage) {
      setEnableActiveTracking(false);
      return;
    }

    const activateTrackingOnScroll = () => {
      if (window.scrollY > 0) {
        setEnableActiveTracking(true);
      }
    };

    window.addEventListener("scroll", activateTrackingOnScroll);
    return () => window.removeEventListener("scroll", activateTrackingOnScroll);
  }, [isHomePage]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const navigateToSection = (hash) => {
    navigate({ pathname: "/", hash });
    closeMenu();
  };

  const renderNavLink = (item, isOverlay = false) => {
    const baseClass = isOverlay ? "navbar-overlay-link" : "navbar-link";
    const className = baseClass;
    const targetSection = item.href.replace("#", "");

    if (isHomePage) {
      return (
        <ScrollLink
          key={item.label}
          to={targetSection}
          smooth
          duration={700}
          offset={-80}
          spy={enableActiveTracking}
          activeClass="navbar-link-active"
          className={className}
          onClick={() => {
            setEnableActiveTracking(true);
            if (isOverlay) {
              closeMenu();
            }
          }}
        >
          {item.label}
        </ScrollLink>
      );
    }

    return (
      <button
        key={item.label}
        type="button"
        className={className}
        onClick={() => navigateToSection(item.href)}
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
      >
        {item.label}
      </button>
    );
  };

  return (
    <motion.header
      className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container navbar-inner">
        {isHomePage ? (
          <ScrollLink
            to="home"
            smooth
            duration={700}
            offset={-80}
            className="navbar-logo"
          >
            TRIDENT
          </ScrollLink>
        ) : (
          <button
            type="button"
            className="navbar-logo"
            onClick={() => navigate("/")}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            TRIDENT
          </button>
        )}

        <nav aria-label="Primary" className="navbar-links">
          {NAV_LINKS.map((item) => renderNavLink(item))}
        </nav>

        <div className="navbar-actions">
          <Button
            variant="primary"
            className={`navbar-cta${isRegisterFlow ? " navbar-cta-active" : ""}`}
            onClick={() => navigate("/register")}
          >
            Register Now
          </Button>

          <button
            type="button"
            className="navbar-menu-button"
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="navbar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="navbar-overlay-panel">
              {NAV_LINKS.map((item) => renderNavLink(item, true))}

              <Button
                variant="primary"
                className="navbar-overlay-cta"
                onClick={() => {
                  closeMenu();
                  navigate("/register");
                }}
              >
                Register Now
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
