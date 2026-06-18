import React from "react";
import { Award, Users, CheckCircle, Briefcase } from "lucide-react";
import { useSite } from "../context/SiteContext";

export default function About() {
  const { data } = useSite();

  const highlights = [
    { icon: Award, text: "Certified Tax Professionals" },
    { icon: Users, text: "Client-First Approach" },
    { icon: CheckCircle, text: "100% Compliance Guaranteed" },
    { icon: Briefcase, text: "End-to-End Financial Support" }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container about-inner">
        {/* Visual side */}
        <div className="about-visual">
          <div className="about-card-main">
            <div className="about-logo">
              <div className="about-logo-badge">{data.logoText}</div>
            </div>
            <h3 className="about-card-name">{data.businessName}</h3>
            <p className="about-card-tag">{data.tagline}</p>
            <div className="about-achievements">
              {data.achievements.map((a, i) => (
                <div key={i} className="about-achievement">
                  <span className="about-achievement-val">{a.value}</span>
                  <span className="about-achievement-lbl">{a.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-card-accent">
            <Award size={24} color="var(--gold)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: "14px", color: "var(--navy)" }}>
                ISO Certified Practice
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-mid)" }}>
                Recognized Financial Consultancy
              </div>
            </div>
          </div>
        </div>

        {/* Content side */}
        <div className="about-content">
          <span className="section-label">About Us</span>
          <h2 className="section-title">
            Decades of Expertise in Tax &amp;{" "}
            <span className="gold-text">Financial Compliance</span>
          </h2>
          <div className="gold-divider" />
          <p className="about-text">{data.about}</p>
          <p className="about-text" style={{ marginTop: "16px" }}>
            Our team of experienced chartered accountants and tax consultants leverages
            the latest tools — including Tally ERP and advanced Excel models — to deliver
            accurate, timely, and cost-effective financial services that help your business
            thrive in a complex regulatory environment.
          </p>

          <div className="about-highlights">
            {highlights.map(({ icon: Icon, text }) => (
              <div key={text} className="about-highlight">
                <div className="about-highlight-icon">
                  <Icon size={18} />
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          padding: 100px 0;
          background: white;
        }
        .about-inner {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: center;
        }
        .about-visual { position: relative; }
        .about-card-main {
          background: linear-gradient(135deg, var(--navy), var(--navy-mid));
          border-radius: var(--radius-lg);
          padding: 40px; color: white; text-align: center;
          box-shadow: var(--shadow-xl);
          position: relative; overflow: hidden;
        }
        .about-card-main::before {
          content: '';
          position: absolute; top: -50px; right: -50px;
          width: 200px; height: 200px;
          background: rgba(201,168,76,0.08);
          border-radius: 50%;
        }
        .about-logo { margin-bottom: 20px; }
        .about-logo-badge {
          width: 80px; height: 80px;
          background: linear-gradient(135deg, var(--gold), var(--gold-dark));
          border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          font-size: 28px; font-weight: 900; color: var(--navy);
          margin: 0 auto;
          box-shadow: 0 8px 24px rgba(201,168,76,0.4);
        }
        .about-card-name {
          font-size: 18px; font-weight: 800; color: white;
          margin-bottom: 6px;
        }
        .about-card-tag { font-size: 13px; color: var(--gold); margin-bottom: 28px; }
        .about-achievements {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
        }
        .about-achievement {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: var(--radius); padding: 16px;
        }
        .about-achievement-val {
          display: block; font-size: 28px; font-weight: 900; color: var(--gold);
          line-height: 1; margin-bottom: 4px;
        }
        .about-achievement-lbl { font-size: 12px; color: rgba(255,255,255,0.6); }
        .about-card-accent {
          position: absolute; bottom: -20px; right: -20px;
          background: white; border-radius: var(--radius);
          padding: 16px 20px;
          display: flex; align-items: center; gap: 12px;
          box-shadow: var(--shadow-lg);
          border: 2px solid rgba(201,168,76,0.2);
        }
        .about-content {}
        .about-text {
          font-size: 16px; color: var(--text-mid); line-height: 1.8;
        }
        .about-highlights {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 16px; margin-top: 32px;
        }
        .about-highlight {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 18px;
          background: var(--off-white);
          border-radius: var(--radius);
          border: 1px solid rgba(201,168,76,0.15);
          font-size: 14px; font-weight: 600; color: var(--navy);
          transition: var(--transition);
        }
        .about-highlight:hover {
          background: rgba(201,168,76,0.08);
          border-color: rgba(201,168,76,0.3);
        }
        .about-highlight-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.25));
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: var(--gold); flex-shrink: 0;
        }
        @media (max-width: 900px) {
          .about-inner { grid-template-columns: 1fr; gap: 50px; }
          .about-card-accent { display: none; }
          .about-highlights { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
