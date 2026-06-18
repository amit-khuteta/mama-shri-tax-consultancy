import React, { useState } from "react";
import {
  FileText, Calculator, ClipboardCheck, BookOpen,
  TrendingUp, Shield, PlusCircle, BarChart2, Check
} from "lucide-react";
import { useSite } from "../context/SiteContext";

const iconMap: Record<string, React.ElementType> = {
  FileText, Calculator, ClipboardCheck, BookOpen,
  TrendingUp, Shield, PlusCircle, BarChart2
};

export default function Services() {
  const { data } = useSite();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-head">
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">Comprehensive Tax &amp; Financial Services</h2>
          <div className="gold-divider center" />
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            From GST compliance to financial advisory, we provide end-to-end solutions
            designed to simplify your financial journey.
          </p>
        </div>

        <div className="services-grid">
          {data.services.map((svc) => {
            const Icon = iconMap[svc.icon] || FileText;
            const isActive = active === svc.id;
            return (
              <div
                key={svc.id}
                className={`service-card${isActive ? " service-card--active" : ""}`}
                onClick={() => setActive(isActive ? null : svc.id)}
              >
                <div className="service-card__icon">
                  <Icon size={28} />
                </div>
                <h3 className="service-card__title">{svc.title}</h3>
                <p className="service-card__desc">{svc.description}</p>
                <ul className={`service-card__features${isActive ? " show" : ""}`}>
                  {svc.features.map((f, i) => (
                    <li key={i}>
                      <Check size={13} color="var(--gold)" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="service-card__toggle">
                  {isActive ? "Show Less ↑" : "View Details ↓"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .services-section {
          padding: 100px 0;
          background: var(--off-white);
        }
        .section-head {
          text-align: center; margin-bottom: 60px;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .service-card {
          background: white;
          border-radius: var(--radius-lg);
          padding: 32px 28px;
          cursor: pointer;
          border: 2px solid transparent;
          box-shadow: var(--shadow-md);
          transition: var(--transition);
          position: relative; overflow: hidden;
        }
        .service-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, var(--gold), var(--gold-light));
          opacity: 0; transition: var(--transition);
        }
        .service-card:hover, .service-card--active {
          border-color: rgba(201,168,76,0.3);
          transform: translateY(-6px);
          box-shadow: var(--shadow-xl);
        }
        .service-card:hover::before, .service-card--active::before { opacity: 1; }
        .service-card__icon {
          width: 60px; height: 60px;
          background: linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.2));
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          color: var(--gold); margin-bottom: 20px;
          transition: var(--transition);
        }
        .service-card:hover .service-card__icon, .service-card--active .service-card__icon {
          background: linear-gradient(135deg, var(--gold), var(--gold-dark));
          color: var(--navy);
          transform: scale(1.1);
        }
        .service-card__title {
          font-size: 18px; font-weight: 700; color: var(--navy);
          margin-bottom: 10px;
        }
        .service-card__desc {
          font-size: 14px; color: var(--text-mid); line-height: 1.6;
          margin-bottom: 16px;
        }
        .service-card__features {
          max-height: 0; overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.3s ease;
          opacity: 0; margin-bottom: 0;
        }
        .service-card__features.show {
          max-height: 200px; opacity: 1; margin-bottom: 12px;
        }
        .service-card__features li {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; color: var(--text-mid); padding: 4px 0;
        }
        .service-card__toggle {
          font-size: 12px; font-weight: 700; color: var(--gold);
          letter-spacing: 0.5px; margin-top: 8px;
        }
        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
