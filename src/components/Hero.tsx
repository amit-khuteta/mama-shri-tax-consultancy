import React from "react";
import { ArrowRight, Phone, Star, CheckCircle } from "lucide-react";
import { useSite } from "../context/SiteContext";
import MSLogo from "./MSLogo";

export default function Hero() {
  const { data } = useSite();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero">
      {/* Background layers */}
      <div className="hero__bg">
        <div className="hero__bg-gradient" />
        <div className="hero__bg-pattern" />
        <div className="hero__bg-orb hero__bg-orb--1" />
        <div className="hero__bg-orb hero__bg-orb--2" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content animate-fadeInUp">
          {/* Badge */}
          <div className="hero__badge">
            <Star size={12} fill="currentColor" />
            <span>Trusted by 500+ Businesses Across India</span>
          </div>

          {/* Title */}
          <h1 className="hero__title">
            {data.heroTitle.split(" ").slice(0, 4).join(" ")}{" "}
            <span className="gold-text">{data.heroTitle.split(" ").slice(4).join(" ")}</span>
          </h1>

          <p className="hero__subtitle">{data.heroSubtitle}</p>

          {/* Checkpoints */}
          <ul className="hero__checks">
            {["GST Return Filing", "ITR Preparation", "Audit Services", "New GST Registration"].map(item => (
              <li key={item}>
                <CheckCircle size={16} color="var(--gold)" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="hero__ctas">
            <button className="btn-primary" onClick={() => scrollTo("contact")}>
              Book Free Consultation <ArrowRight size={16} />
            </button>
            <a href={`tel:${data.phone1}`} className="btn-secondary">
              <Phone size={16} /> Call Now
            </a>
          </div>
        </div>

        {/* Stats card */}
        <div className="hero__stats animate-fadeIn" style={{ animationDelay: "0.3s" }}>
          <div className="stats-card">
            <div className="stats-card__header">
              <div className="logo-badge-lg">
                {data.logoImage
                  ? <img src={data.logoImage} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }} />
                  : <MSLogo width={56} height={34} />
                }
              </div>
              <div>
                <div className="stats-card__name">{data.businessName}</div>
                <div className="stats-card__tag">{data.tagline}</div>
              </div>
            </div>
            <div className="stats-grid">
              {data.achievements.map((a, i) => (
                <div key={i} className="stat-item">
                  <div className="stat-value">{a.value}</div>
                  <div className="stat-label">{a.label}</div>
                </div>
              ))}
            </div>
            <div className="stats-card__services">
              <div className="stats-card__services-title">Our Expertise</div>
              <div className="service-tags">
                {["GST Filing", "ITR", "Audit", "Tally", "Advisory", "Insurance", "LTC Claims", "Registration"].map(tag => (
                  <span key={tag} className="service-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll" onClick={() => scrollTo("services")}>
        <div className="scroll-dot" />
      </div>

      <style>{`
        .hero {
          position: relative; min-height: 100vh;
          display: flex; align-items: center;
          padding: 120px 0 80px; overflow: hidden;
        }
        .hero__bg { position: absolute; inset: 0; z-index: 0; }
        .hero__bg-gradient {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 50%, #1a3a6e 100%);
        }
        .hero__bg-pattern {
          position: absolute; inset: 0; opacity: 0.04;
          background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0);
          background-size: 40px 40px;
        }
        .hero__bg-orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); opacity: 0.15;
        }
        .hero__bg-orb--1 {
          width: 500px; height: 500px;
          background: var(--gold); top: -100px; right: -100px;
          animation: float 8s ease-in-out infinite;
        }
        .hero__bg-orb--2 {
          width: 300px; height: 300px;
          background: #4A90D9; bottom: -50px; left: 10%;
          animation: float 10s ease-in-out infinite reverse;
        }
        .hero__inner {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 60px; align-items: center;
        }
        .hero__badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(201,168,76,0.15);
          border: 1px solid rgba(201,168,76,0.3);
          color: var(--gold); font-size: 13px; font-weight: 600;
          padding: 8px 16px; border-radius: 50px;
          margin-bottom: 24px;
        }
        .hero__title {
          font-size: clamp(32px, 4.5vw, 56px);
          font-weight: 900; color: white; line-height: 1.1;
          margin-bottom: 20px; letter-spacing: -1px;
        }
        .hero__subtitle {
          font-size: 17px; color: rgba(255,255,255,0.75);
          line-height: 1.7; margin-bottom: 28px; max-width: 520px;
        }
        .hero__checks {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px; margin-bottom: 36px;
        }
        .hero__checks li {
          display: flex; align-items: center; gap: 8px;
          color: rgba(255,255,255,0.85); font-size: 14px; font-weight: 500;
        }
        .hero__ctas { display: flex; gap: 16px; flex-wrap: wrap; }

        /* Stats card */
        .stats-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(201,168,76,0.2);
          backdrop-filter: blur(20px);
          border-radius: var(--radius-lg);
          padding: 32px; color: white;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .stats-card__header {
          display: flex; align-items: center; gap: 16px;
          margin-bottom: 28px; padding-bottom: 24px;
          border-bottom: 1px solid rgba(201,168,76,0.2);
        }
        .logo-badge-lg {
          width: 64px; height: 64px;
          background: white;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
          overflow: hidden;
          padding: 4px;
        }
        .stats-card__name {
          font-size: 16px; font-weight: 800; color: white; line-height: 1.3;
        }
        .stats-card__tag { font-size: 12px; color: var(--gold); font-weight: 500; }
        .stats-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 20px; margin-bottom: 28px;
        }
        .stat-item { text-align: center; }
        .stat-value {
          font-size: 32px; font-weight: 900; color: var(--gold);
          line-height: 1; margin-bottom: 6px;
        }
        .stat-label { font-size: 12px; color: rgba(255,255,255,0.6); font-weight: 500; }
        .stats-card__services-title {
          font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.5);
          letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px;
        }
        .service-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .service-tag {
          padding: 4px 12px;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 50px; font-size: 12px; color: var(--gold); font-weight: 500;
        }

        .hero__scroll {
          position: absolute; bottom: 30px; left: 50%;
          transform: translateX(-50%); cursor: pointer;
          display: flex; flex-direction: column; align-items: center; gap: 6px;
        }
        .scroll-dot {
          width: 24px; height: 40px;
          border: 2px solid rgba(201,168,76,0.5);
          border-radius: 12px; position: relative;
        }
        .scroll-dot::after {
          content: ''; position: absolute;
          top: 6px; left: 50%; transform: translateX(-50%);
          width: 4px; height: 8px;
          background: var(--gold); border-radius: 2px;
          animation: float 1.5s ease-in-out infinite;
        }

        @media (max-width: 900px) {
          .hero__inner { grid-template-columns: 1fr; gap: 40px; }
          .hero__stats { display: none; }
          .hero__checks { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
