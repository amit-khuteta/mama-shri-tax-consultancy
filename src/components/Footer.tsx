import React from "react";
import { Phone, Mail, MapPin, Heart } from "lucide-react";
import { useSite } from "../context/SiteContext";
import { useNavigate } from "react-router-dom";
import MSLogo from "./MSLogo";

export default function Footer() {
  const { data } = useSite();
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer-badge">
                {data.logoImage
                  ? <img src={data.logoImage} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
                  : <MSLogo width={48} height={29} />
                }
              </div>
              <div>
                <div className="footer-name">{data.businessName}</div>
                <div className="footer-tag">{data.tagline}</div>
              </div>
            </div>
            <p className="footer__desc">
              Your trusted partner for GST compliance, income tax, and comprehensive
              financial advisory services. Simplifying tax for businesses across India.
            </p>
            <div className="footer__contact-quick">
              <a href={`tel:${data.phone1}`} className="footer-contact-item">
                <Phone size={14} /> {data.phone1}
              </a>
              <a href={`mailto:${data.email}`} className="footer-contact-item">
                <Mail size={14} /> {data.email}
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h4 className="footer__col-title">Our Services</h4>
            <ul className="footer__links">
              {data.services.slice(0, 6).map(s => (
                <li key={s.id}>
                  <button onClick={() => scrollTo("services")} className="footer__link">
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__links">
              {[
                { label: "Home", id: "home" },
                { label: "Services", id: "services" },
                { label: "About Us", id: "about" },
                { label: "Contact", id: "contact" }
              ].map(({ label, id }) => (
                <li key={id}>
                  <button onClick={() => scrollTo(id)} className="footer__link">{label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div className="footer__col">
            <h4 className="footer__col-title">Office Address</h4>
            <div className="footer__address">
              <MapPin size={16} color="var(--gold)" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <div>{data.address}</div>
                <div>{data.city}</div>
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <div className="footer__hours-title">Working Hours</div>
              <div className="footer__hours">Mon – Sat: 9:00 AM – 7:00 PM</div>
              <div className="footer__hours">Sunday: By Appointment</div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <div>
            &copy; {new Date().getFullYear()} {data.businessName}. All rights reserved.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            Made with <Heart size={14} fill="var(--gold)" color="var(--gold)" /> for our clients
          </div>
        </div>
      </div>

      <style>{`
        .footer { background: var(--navy); color: rgba(255,255,255,0.75); }
        .footer__top { padding: 70px 0 50px; }
        .footer__grid {
          display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 50px;
        }
        .footer__logo {
          display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
        }
        .footer-badge {
          width: 52px; height: 52px;
          background: white;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
          padding: 3px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .footer-name { font-size: 15px; font-weight: 800; color: white; }
        .footer-tag { font-size: 11px; color: var(--gold); font-weight: 500; }
        .footer__desc {
          font-size: 14px; line-height: 1.7; margin-bottom: 20px;
          color: rgba(255,255,255,0.6);
        }
        .footer__contact-quick { display: flex; flex-direction: column; gap: 8px; }
        .footer-contact-item {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; color: var(--gold); font-weight: 500;
          transition: var(--transition);
        }
        .footer-contact-item:hover { color: var(--gold-light); }
        .footer__col-title {
          font-size: 13px; font-weight: 700; color: white;
          letter-spacing: 1.5px; text-transform: uppercase;
          margin-bottom: 20px; padding-bottom: 10px;
          border-bottom: 1px solid rgba(201,168,76,0.2);
        }
        .footer__links { display: flex; flex-direction: column; gap: 10px; }
        .footer__link {
          font-size: 14px; color: rgba(255,255,255,0.65);
          transition: var(--transition); text-align: left;
          font-family: inherit;
        }
        .footer__link:hover { color: var(--gold); padding-left: 4px; }
        .footer__address {
          display: flex; gap: 10px; font-size: 14px;
          color: rgba(255,255,255,0.65); line-height: 1.6;
        }
        .footer__hours-title {
          font-size: 12px; font-weight: 700; color: var(--gold);
          letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px;
        }
        .footer__hours { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.8; }
        .footer__bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 20px 0;
        }
        .footer__bottom-inner {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 13px; color: rgba(255,255,255,0.45);
          flex-wrap: wrap; gap: 10px;
        }
        @media (max-width: 1000px) {
          .footer__grid { grid-template-columns: 1fr 1fr; gap: 40px; }
        }
        @media (max-width: 600px) {
          .footer__grid { grid-template-columns: 1fr; gap: 32px; }
          .footer__bottom-inner { flex-direction: column; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
