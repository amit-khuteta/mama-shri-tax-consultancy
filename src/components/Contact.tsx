import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, Clock, AlertCircle, CheckCircle, PhoneCall } from "lucide-react";
import { useSite } from "../context/SiteContext";

const WEB3FORMS_ACCESS_KEY = "0bb1fa9d-e8ba-415e-ad3a-cd34616bc88a";
const NOTIFY_EMAIL = "amitkekri9@gmail.com";

type FormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

type FieldError = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): FieldError {
  const errors: FieldError = {};
  if (!form.name.trim() || form.name.trim().length < 3)
    errors.name = "Please enter your full name (at least 3 characters).";
  if (!form.phone.trim() || !/^\+?[0-9\s\-]{7,15}$/.test(form.phone.trim()))
    errors.phone = "Please enter a valid phone number.";
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (!form.service)
    errors.service = "Please select the service you are interested in.";
  if (!form.message.trim() || form.message.trim().length < 20)
    errors.message = "Please describe your requirements (at least 20 characters).";
  return errors;
}

export default function Contact() {
  const { data } = useSite();

  const empty: FormState = { name: "", phone: "", email: "", service: "", message: "" };
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<FieldError>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const touch = (field: keyof FormState) =>
    setTouched(prev => ({ ...prev, [field]: true }));

  const handleChange = (field: keyof FormState, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) {
      const e = validate(updated);
      setErrors(prev => ({ ...prev, [field]: e[field] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, email: true, service: true, message: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Consultation Request from ${form.name} — Mama Shri Tax Consultancy`,
          from_name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
          to_email: NOTIFY_EMAIL,
          replyto: form.email,
          botcheck: "",
        }),
      });

      const json = await res.json();
      if (json.success) {
        setStatus("success");
        setForm(empty);
        setTouched({});
        setErrors({});
        setTimeout(() => setStatus("idle"), 7000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const field = (key: keyof FormState) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      handleChange(key, e.target.value),
    onBlur: () => {
      touch(key);
      const e = validate(form);
      setErrors(prev => ({ ...prev, [key]: e[key] }));
    },
    className: `form-input${touched[key] && errors[key] ? " input-error" : touched[key] && !errors[key] ? " input-ok" : ""}`,
  });

  return (
    <section id="contact" className="contact-section">
      {/* Decorative background blobs */}
      <div className="contact-blob contact-blob-1" />
      <div className="contact-blob contact-blob-2" />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <div className="section-head" style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">
            Ready to Simplify Your <span className="gold-text">Tax Compliance?</span>
          </h2>
          <div className="gold-divider center" />
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Reach out today for a free consultation. Our experts are ready to help you navigate
            tax complexities with ease.
          </p>
        </div>

        {/* Contact cards row */}
        <div className="contact-cards-row">
          <div className="contact-card">
            <div className="cc-icon-wrap cc-blue">
              <PhoneCall size={22} />
            </div>
            <div className="cc-body">
              <div className="cc-label">Primary Phone</div>
              <a href={`tel:${data.phone1}`} className="cc-value cc-link">{data.phone1}</a>
            </div>
          </div>

          <div className="contact-card">
            <div className="cc-icon-wrap cc-gold">
              <Phone size={22} />
            </div>
            <div className="cc-body">
              <div className="cc-label">Secondary Phone</div>
              <a href={`tel:${data.phone2}`} className="cc-value cc-link">{data.phone2}</a>
            </div>
          </div>

          <div className="contact-card">
            <div className="cc-icon-wrap cc-green">
              <Mail size={22} />
            </div>
            <div className="cc-body">
              <div className="cc-label">Email Address</div>
              <a href={`mailto:${data.email}`} className="cc-value cc-link">{data.email}</a>
            </div>
          </div>

          <div className="contact-card">
            <div className="cc-icon-wrap cc-red">
              <MapPin size={22} />
            </div>
            <div className="cc-body">
              <div className="cc-label">Office Address</div>
              <div className="cc-value">{data.address}</div>
              <div className="cc-sub">{data.city}</div>
            </div>
          </div>

          <div className="contact-card">
            <div className="cc-icon-wrap cc-purple">
              <Clock size={22} />
            </div>
            <div className="cc-body">
              <div className="cc-label">Working Hours</div>
              <div className="cc-value">Mon – Sat: 9 AM – 7 PM</div>
              <div className="cc-sub">Sunday: By Appointment</div>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="contact-main-grid">
          {/* Left — Info panel */}
          <div className="contact-info-panel">
            <div className="cip-header">
              {data.logoImage ? (
                <img src={data.logoImage} alt="logo" className="cip-logo-img" />
              ) : (
                <div className="cip-logo-badge">{data.logoText}</div>
              )}
              <div>
                <div className="cip-biz-name">{data.businessName}</div>
                <div className="cip-tagline">{data.tagline}</div>
              </div>
            </div>

            <p className="cip-about">{data.about}</p>

            <div className="cip-divider" />

            <div className="cip-detail-list">
              <div className="cip-detail">
                <div className="cip-detail-icon"><Phone size={15} /></div>
                <div>
                  <div className="cip-detail-label">Phone Numbers</div>
                  <a href={`tel:${data.phone1}`} className="cip-detail-val cip-link">{data.phone1}</a>
                  <a href={`tel:${data.phone2}`} className="cip-detail-val cip-link">{data.phone2}</a>
                </div>
              </div>
              <div className="cip-detail">
                <div className="cip-detail-icon"><Mail size={15} /></div>
                <div>
                  <div className="cip-detail-label">Email</div>
                  <a href={`mailto:${data.email}`} className="cip-detail-val cip-link">{data.email}</a>
                </div>
              </div>
              <div className="cip-detail">
                <div className="cip-detail-icon"><MapPin size={15} /></div>
                <div>
                  <div className="cip-detail-label">Address</div>
                  <div className="cip-detail-val">{data.address}</div>
                  <div className="cip-detail-val">{data.city}</div>
                </div>
              </div>
            </div>

            <div className="cip-cta-row">
              <a href={`tel:${data.phone1}`} className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                <Phone size={15} /> Call Now
              </a>
              <a href={`mailto:${data.email}`} className="btn-outline" style={{ flex: 1, justifyContent: "center", color: "white", borderColor: "rgba(201,168,76,0.5)" }}>
                <Mail size={15} /> Email Us
              </a>
            </div>

            {/* Decorative map pin graphic */}
            <div className="cip-map-strip">
              <MapPin size={14} style={{ color: "var(--gold)", flexShrink: 0 }} />
              <span>Near Sabji Mandi, Balaji Complex, 1st Floor, Kekri – 305404</span>
            </div>
          </div>

          {/* Right — Booking form */}
          <div className="contact-form-panel">
            <div className="cfp-header">
              <div className="cfp-badge">Free Consultation</div>
              <h3 className="cfp-title">Book Your Appointment</h3>
              <p className="cfp-sub">All fields are required. We will get back to you within 24 hours.</p>
            </div>

            {status === "success" && (
              <div className="form-banner form-success">
                <CheckCircle size={18} />
                <span>
                  Thank you! Your request has been sent to <strong>{NOTIFY_EMAIL}</strong>. We will contact you shortly.
                </span>
              </div>
            )}
            {status === "error" && (
              <div className="form-banner form-error">
                <AlertCircle size={18} />
                <span>
                  Something went wrong. Please call us directly or email <strong>{NOTIFY_EMAIL}</strong>.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <input type="checkbox" name="botcheck" style={{ display: "none" }} />

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input {...field("name")} placeholder="Your full name" />
                  {touched.name && errors.name && (
                    <span className="field-error"><AlertCircle size={12} /> {errors.name}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Phone *</label>
                  <input {...field("phone")} placeholder="+91 XXXXX XXXXX" />
                  {touched.phone && errors.phone && (
                    <span className="field-error"><AlertCircle size={12} /> {errors.phone}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input {...field("email")} type="email" placeholder="your@email.com" />
                {touched.email && errors.email && (
                  <span className="field-error"><AlertCircle size={12} /> {errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Service Interested In *</label>
                <select {...field("service")}>
                  <option value="">Select a service...</option>
                  {data.services.map(s => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                </select>
                {touched.service && errors.service && (
                  <span className="field-error"><AlertCircle size={12} /> {errors.service}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Message / Requirements *</label>
                <textarea
                  {...field("message")}
                  className={`form-input form-textarea${touched.message && errors.message ? " input-error" : touched.message && !errors.message ? " input-ok" : ""}`}
                  placeholder="Describe your requirements in detail (min 20 characters)..."
                />
                {touched.message && errors.message && (
                  <span className="field-error"><AlertCircle size={12} /> {errors.message}</span>
                )}
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", opacity: status === "sending" ? 0.7 : 1, padding: "14px 24px", fontSize: "15px" }}
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <><span className="spinner" /> Sending...</>
                ) : (
                  <><Send size={16} /> Send Consultation Request</>
                )}
              </button>

              <p className="form-note">
                📧 Your message will be delivered directly to <strong>{NOTIFY_EMAIL}</strong>
              </p>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Section base ── */
        .contact-section {
          padding: 100px 0;
          background: linear-gradient(160deg, #f0f4ff 0%, #fafafa 50%, #fff8ee 100%);
          position: relative;
          overflow: hidden;
        }

        /* Decorative blobs */
        .contact-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .contact-blob-1 {
          width: 500px; height: 500px;
          background: rgba(201,168,76,0.08);
          top: -100px; right: -100px;
        }
        .contact-blob-2 {
          width: 400px; height: 400px;
          background: rgba(10,25,70,0.06);
          bottom: -80px; left: -80px;
        }

        /* ── Contact cards row ── */
        .contact-cards-row {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
          margin-bottom: 56px;
        }
        .contact-card {
          background: white;
          border-radius: 16px;
          padding: 20px 24px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.07);
          border: 1px solid rgba(0,0,0,0.05);
          transition: transform 0.2s, box-shadow 0.2s;
          min-width: 200px;
          flex: 1;
          max-width: 260px;
        }
        .contact-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.12);
        }
        .cc-icon-wrap {
          width: 48px; height: 48px; flex-shrink: 0;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
        }
        .cc-blue   { background: rgba(66,133,244,0.12); color: #4285f4; }
        .cc-gold   { background: rgba(201,168,76,0.15); color: #b8860b; }
        .cc-green  { background: rgba(52,168,83,0.12);  color: #2e7d32; }
        .cc-red    { background: rgba(234,67,53,0.12);  color: #c62828; }
        .cc-purple { background: rgba(103,58,183,0.12); color: #6a1b9a; }
        .cc-body { flex: 1; }
        .cc-label {
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 1px;
          color: var(--text-mid); margin-bottom: 4px;
        }
        .cc-value { font-size: 14px; font-weight: 600; color: var(--navy); display: block; }
        .cc-sub   { font-size: 12px; color: var(--text-mid); margin-top: 2px; }
        .cc-link  { text-decoration: none; transition: color 0.2s; }
        .cc-link:hover { color: var(--gold); }

        /* ── Main grid ── */
        .contact-main-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 32px;
          align-items: start;
        }

        /* ── Info panel ── */
        .contact-info-panel {
          background: linear-gradient(145deg, var(--navy) 0%, #0d1f5c 100%);
          border-radius: 24px;
          padding: 36px;
          color: white;
          position: relative;
          overflow: hidden;
        }
        .contact-info-panel::after {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%);
          border-radius: 50%;
        }
        .cip-header {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 20px;
        }
        .cip-logo-badge {
          width: 54px; height: 54px; flex-shrink: 0;
          background: linear-gradient(135deg, var(--gold), var(--gold-dark));
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; font-weight: 900; color: var(--navy);
        }
        .cip-logo-img { width: 54px; height: 54px; border-radius: 14px; object-fit: contain; flex-shrink: 0; }
        .cip-biz-name { font-size: 16px; font-weight: 800; line-height: 1.3; }
        .cip-tagline  { font-size: 12px; color: var(--gold); font-weight: 500; margin-top: 2px; }
        .cip-about {
          font-size: 13px; color: rgba(255,255,255,0.7);
          line-height: 1.7; margin-bottom: 24px;
        }
        .cip-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(201,168,76,0.5), transparent);
          margin-bottom: 24px;
        }
        .cip-detail-list { display: flex; flex-direction: column; gap: 18px; margin-bottom: 28px; }
        .cip-detail { display: flex; align-items: flex-start; gap: 12px; }
        .cip-detail-icon {
          width: 34px; height: 34px; flex-shrink: 0;
          background: rgba(201,168,76,0.15);
          border: 1px solid rgba(201,168,76,0.3);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: var(--gold);
        }
        .cip-detail-label {
          font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 1.2px;
          color: var(--gold); margin-bottom: 3px;
        }
        .cip-detail-val { font-size: 13px; color: rgba(255,255,255,0.85); display: block; line-height: 1.5; }
        .cip-link { text-decoration: none; transition: color 0.2s; }
        .cip-link:hover { color: var(--gold); }
        .cip-cta-row {
          display: flex; gap: 12px;
          padding-top: 20px;
          border-top: 1px solid rgba(201,168,76,0.2);
          margin-bottom: 20px;
        }
        .cip-map-strip {
          display: flex; align-items: flex-start; gap: 8px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 12px;
          color: rgba(255,255,255,0.6);
          line-height: 1.5;
        }

        /* ── Form panel ── */
        .contact-form-panel {
          background: white;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.09);
          border: 1px solid rgba(0,0,0,0.05);
        }
        .cfp-header { margin-bottom: 28px; }
        .cfp-badge {
          display: inline-block;
          background: linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05));
          border: 1px solid rgba(201,168,76,0.4);
          color: #b8860b;
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 1.5px;
          padding: 5px 14px; border-radius: 20px;
          margin-bottom: 10px;
        }
        .cfp-title {
          font-size: 24px; font-weight: 800;
          color: var(--navy); margin-bottom: 6px;
        }
        .cfp-sub { font-size: 13px; color: var(--text-mid); }

        /* Banners */
        .form-banner {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 14px 18px; border-radius: 12px;
          font-size: 14px; font-weight: 500;
          margin-bottom: 20px; line-height: 1.5;
        }
        .form-success { background: rgba(56,161,105,0.08); border: 1px solid #38a169; color: #276749; }
        .form-error   { background: rgba(229,62,62,0.06);  border: 1px solid #e53e3e; color: #c53030; }

        /* Field states */
        .input-error { border-color: #e53e3e !important; background: rgba(229,62,62,0.03) !important; }
        .input-ok    { border-color: #38a169 !important; }
        .field-error {
          display: flex; align-items: center; gap: 5px;
          color: #e53e3e; font-size: 12px; font-weight: 500; margin-top: 5px;
        }

        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-note {
          text-align: center; font-size: 12px; color: var(--text-mid);
          margin-top: 14px; padding: 10px 14px;
          background: rgba(201,168,76,0.05);
          border-radius: 10px; border: 1px dashed rgba(201,168,76,0.35);
        }

        /* Spinner */
        .spinner {
          display: inline-block; width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: white; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Responsive */
        @media (max-width: 960px) {
          .contact-main-grid { grid-template-columns: 1fr; }
          .contact-cards-row { gap: 12px; }
          .contact-card { max-width: 100%; }
        }
        @media (max-width: 600px) {
          .contact-form-panel { padding: 24px 20px; }
          .contact-info-panel { padding: 28px 20px; }
          .form-row { grid-template-columns: 1fr; }
          .contact-cards-row { flex-direction: column; }
          .contact-card { max-width: 100%; }
        }
      `}</style>
    </section>
  );
}
