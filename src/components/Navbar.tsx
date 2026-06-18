import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Phone, LogOut, Settings, ShieldCheck } from "lucide-react";
import { useSite } from "../context/SiteContext";
import MSLogo from "./MSLogo";

export default function Navbar() {
  const { data, isAdmin, logout } = useSite();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <div className="logo-badge">
            {data.logoImage
              ? <img src={data.logoImage} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
              : <MSLogo width={44} height={26} />
            }
          </div>
          <div className="logo-text">
            <span className="logo-name">{data.businessName}</span>
            <span className="logo-tag">{data.tagline}</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="navbar__links">
          {["home", "services", "about", "contact"].map(id => (
            <li key={id}>
              <button onClick={() => scrollTo(id)} className="nav-link">
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="navbar__actions">
          <a href={`tel:${data.phone1}`} className="nav-phone">
            <Phone size={14} />
            {data.phone1}
          </a>

          {isAdmin ? (
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                className="btn-outline"
                onClick={() => navigate("/admin/dashboard")}
                style={{ padding: "8px 16px", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}
              >
                <Settings size={14} /> Dashboard
              </button>
              <button
                className="btn-outline"
                onClick={handleLogout}
                style={{ padding: "8px 16px", fontSize: "13px", borderColor: "var(--danger)", color: "var(--danger)", display: "flex", alignItems: "center", gap: "6px" }}
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <button
              className="btn-primary desktop-cta"
              onClick={() => scrollTo("contact")}
              style={{ padding: "10px 22px", fontSize: "14px" }}
            >
              Get Started
            </button>
          )}

          {/* Hamburger — always visible */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile / hamburger menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {["home", "services", "about", "contact"].map(id => (
            <button key={id} onClick={() => scrollTo(id)} className="mobile-link">
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}

          <a href={`tel:${data.phone1}`} className="mobile-link" style={{ color: "var(--gold)" }}>
            <Phone size={14} /> {data.phone1}
          </a>

          <div className="mobile-divider" />

          {isAdmin ? (
            <>
              <button
                className="mobile-link"
                onClick={() => { navigate("/admin/dashboard"); setMenuOpen(false); }}
                style={{ color: "var(--gold)" }}
              >
                <Settings size={14} /> Dashboard
              </button>
              <button
                className="mobile-link"
                onClick={handleLogout}
                style={{ color: "#FC8181" }}
              >
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="mobile-link admin-mobile-link"
                onClick={() => { navigate("/admin"); setMenuOpen(false); }}
              >
                <ShieldCheck size={15} /> Admin Login
              </button>
              <button
                className="btn-primary"
                onClick={() => { scrollTo("contact"); setMenuOpen(false); }}
                style={{ margin: "8px 20px" }}
              >
                Get Started
              </button>
            </>
          )}
        </div>
      )}

      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          padding: 16px 0;
          background: transparent;
          transition: all 0.4s ease;
        }
        .navbar--scrolled {
          background: rgba(11, 31, 58, 0.97);
          backdrop-filter: blur(20px);
          padding: 10px 0;
          box-shadow: 0 4px 30px rgba(0,0,0,0.3);
        }
        .navbar__inner {
          display: flex; align-items: center; justify-content: space-between; gap: 20px;
        }
        .navbar__logo {
          display: flex; align-items: center; gap: 12px; flex-shrink: 0;
        }
        .logo-badge {
          width: 44px; height: 44px;
          background: white;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          overflow: hidden;
          padding: 2px;
        }
        .logo-text { display: flex; flex-direction: column; }
        .logo-name {
          font-size: 15px; font-weight: 800; color: var(--white);
          line-height: 1.2; letter-spacing: 0.3px;
        }
        .logo-tag {
          font-size: 10px; color: var(--gold); font-weight: 500; letter-spacing: 0.5px;
        }
        .navbar__links {
          display: flex; align-items: center; gap: 4px;
        }
        .nav-link {
          padding: 8px 16px; color: rgba(255,255,255,0.85);
          font-size: 14px; font-weight: 500;
          border-radius: 8px; transition: var(--transition);
          font-family: inherit;
        }
        .nav-link:hover { color: var(--gold); background: rgba(201,168,76,0.1); }
        .navbar__actions {
          display: flex; align-items: center; gap: 12px;
        }
        .nav-phone {
          display: flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600; color: var(--gold);
          transition: var(--transition);
        }
        .nav-phone:hover { color: var(--gold-light); }
        .hamburger {
          color: white; padding: 4px;
          display: flex; align-items: center; justify-content: center;
        }
        .mobile-menu {
          display: flex; flex-direction: column;
          background: var(--navy); padding: 12px 0 16px;
          border-top: 1px solid rgba(201,168,76,0.2);
        }
        .mobile-link {
          padding: 12px 24px; color: rgba(255,255,255,0.85);
          font-size: 15px; font-weight: 500; text-align: left;
          display: flex; align-items: center; gap: 8px;
          transition: var(--transition); font-family: inherit;
        }
        .mobile-link:hover { color: var(--gold); background: rgba(201,168,76,0.08); }
        .mobile-divider {
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin: 8px 24px;
        }
        .admin-mobile-link {
          color: rgba(201,168,76,0.8) !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          opacity: 0.85;
        }
        .admin-mobile-link:hover {
          color: var(--gold) !important;
          opacity: 1;
        }
        @media (max-width: 1050px) {
          .navbar__links, .nav-phone { display: none; }
          .desktop-cta { display: none; }
        }
        @media (max-width: 480px) {
          .logo-name { font-size: 13px; }
        }
      `}</style>
    </nav>
  );
}
