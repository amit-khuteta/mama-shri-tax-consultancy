import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings, LogOut, Eye, Save, Plus, Trash2,
  Building, Phone, Mail, MapPin, FileText, Users, BarChart2, Upload, X
} from "lucide-react";
import { useSite, SiteData, Service } from "../context/SiteContext";
import MSLogo from "../components/MSLogo";

type TabKey = "branding" | "contact" | "hero" | "services" | "achievements";

const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "branding", label: "Branding", icon: Building },
  { key: "contact", label: "Contact Info", icon: Phone },
  { key: "hero", label: "Hero Section", icon: Eye },
  { key: "services", label: "Services", icon: FileText },
  { key: "achievements", label: "Achievements", icon: BarChart2 }
];

export default function AdminDashboard() {
  const { data, updateData, isAdmin, logout } = useSite();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>("branding");
  const [local, setLocal] = useState<SiteData>(data);
  const [saved, setSaved] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAdmin) navigate("/admin");
  }, [isAdmin]);

  const set = (key: keyof SiteData, val: unknown) => {
    setLocal(prev => ({ ...prev, [key]: val }));
  };

  const handleSave = () => {
    updateData(local);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogoUpload = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      set("logoImage", result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleLogoUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleLogoUpload(file);
  };

  const removeLogo = () => {
    set("logoImage", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addService = () => {
    const newSvc: Service = {
      id: Date.now().toString(),
      icon: "FileText",
      title: "New Service",
      description: "Service description here.",
      features: ["Feature 1", "Feature 2"]
    };
    set("services", [...local.services, newSvc]);
  };

  const removeService = (id: string) => {
    set("services", local.services.filter(s => s.id !== id));
  };

  const updateService = (id: string, field: keyof Service, value: string | string[]) => {
    set("services", local.services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const updateAchievement = (i: number, field: "value" | "label", val: string) => {
    const arr = [...local.achievements];
    arr[i] = { ...arr[i], [field]: val };
    set("achievements", arr);
  };

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-badge">
            {local.logoImage
              ? <img src={local.logoImage} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
              : <MSLogo width={44} height={26} />
            }
          </div>
          <div>
            <div className="sidebar-name">Admin Panel</div>
            <div className="sidebar-sub">Content Management</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={`sidebar-tab${tab === key ? " active" : ""}`}
              onClick={() => setTab(key)}
            >
              <Icon size={17} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-action" onClick={() => navigate("/")}>
            <Eye size={16} /> View Website
          </button>
          <button className="sidebar-action danger" onClick={() => { logout(); navigate("/"); }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <h1 className="admin-page-title">{tabs.find(t => t.key === tab)?.label}</h1>
            <p className="admin-page-sub">Manage and update your website content</p>
          </div>
          <button className="btn-primary" onClick={handleSave}>
            <Save size={16} /> Save Changes
          </button>
        </div>

        {saved && (
          <div className="admin-toast">
            ✅ Changes saved and applied to your website!
          </div>
        )}

        <div className="admin-content">
          {/* BRANDING */}
          {tab === "branding" && (
            <div className="admin-section">
              <h3 className="admin-section-title">Business Identity</h3>
              <div className="admin-grid">
                <div className="form-group">
                  <label className="form-label">Business Name</label>
                  <input className="form-input" value={local.businessName}
                    onChange={e => set("businessName", e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Logo Text Fallback (2–3 chars)</label>
                  <input className="form-input" value={local.logoText} maxLength={3}
                    onChange={e => set("logoText", e.target.value.toUpperCase())} />
                </div>
                <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="form-label">Tagline</label>
                  <input className="form-input" value={local.tagline}
                    onChange={e => set("tagline", e.target.value)} />
                </div>
                <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="form-label">About Us</label>
                  <textarea className="form-input form-textarea" value={local.about}
                    onChange={e => set("about", e.target.value)} style={{ minHeight: "140px" }} />
                </div>
              </div>

              {/* Logo Upload */}
              <div style={{ marginTop: "32px" }}>
                <h4 className="admin-section-title" style={{ fontSize: "15px" }}>Logo Image</h4>
                <p style={{ color: "var(--text-mid)", fontSize: "13px", marginBottom: "16px" }}>
                  Upload your business logo (PNG, JPG, SVG recommended). It will replace the MS logo across the entire website.
                </p>

                {local.logoImage ? (
                  <div className="logo-preview-box">
                    <div className="logo-preview-inner">
                      <img src={local.logoImage} alt="Current Logo" className="logo-preview-img" />
                      <div className="logo-preview-info">
                        <div style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "6px" }}>Logo uploaded ✓</div>
                        <div style={{ fontSize: "13px", color: "var(--text-mid)", marginBottom: "16px" }}>
                          This image is now displayed in the navbar, hero, and footer.
                        </div>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                          <button
                            className="btn-primary"
                            style={{ fontSize: "13px", padding: "8px 16px" }}
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Upload size={14} /> Change Logo
                          </button>
                          <button
                            className="btn-outline"
                            style={{ fontSize: "13px", padding: "8px 16px" }}
                            onClick={removeLogo}
                          >
                            <X size={14} /> Remove Logo
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* MS Logo Preview */}
                    <div className="ms-logo-preview-box">
                      <div className="ms-logo-preview-label">Current Logo (Default)</div>
                      <div className="ms-logo-preview-display">
                        <MSLogo width={120} height={72} />
                      </div>
                      <div className="ms-logo-preview-note">
                        This is your MS logo shown across the website. Upload a custom image below to replace it.
                      </div>
                    </div>

                    <div
                      className={`logo-upload-zone${dragOver ? " drag-over" : ""}`}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="upload-icon-wrap">
                        <Upload size={28} />
                      </div>
                      <div className="upload-title">Click or drag & drop to replace logo</div>
                      <div className="upload-sub">Supports PNG, JPG, SVG, WEBP — Max 5MB</div>
                      <button className="btn-primary" style={{ marginTop: "16px", fontSize: "13px", padding: "10px 24px" }}
                        onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                        <Upload size={14} /> Browse File
                      </button>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileInput}
                />
              </div>

              {/* Preview */}
              <div className="brand-preview" style={{ marginTop: "28px" }}>
                <div className="bp-badge">
                  {local.logoImage
                    ? <img src={local.logoImage} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
                    : <MSLogo width={44} height={26} />
                  }
                </div>
                <div>
                  <div className="bp-name">{local.businessName}</div>
                  <div className="bp-tag">{local.tagline}</div>
                </div>
              </div>
            </div>
          )}

          {/* CONTACT */}
          {tab === "contact" && (
            <div className="admin-section">
              <h3 className="admin-section-title">Contact Information</h3>
              <div className="admin-grid">
                {[
                  { label: "Primary Phone", key: "phone1" as keyof SiteData, icon: Phone },
                  { label: "Secondary Phone", key: "phone2" as keyof SiteData, icon: Phone },
                  { label: "Email Address", key: "email" as keyof SiteData, icon: Mail },
                  { label: "Street Address", key: "address" as keyof SiteData, icon: MapPin },
                  { label: "City / State / PIN", key: "city" as keyof SiteData, icon: MapPin }
                ].map(({ label, key, icon: Icon }) => (
                  <div className="form-group" key={key}>
                    <label className="form-label">
                      <Icon size={13} style={{ display: "inline", marginRight: "6px" }} />
                      {label}
                    </label>
                    <input className="form-input" value={local[key] as string}
                      onChange={e => set(key, e.target.value)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HERO */}
          {tab === "hero" && (
            <div className="admin-section">
              <h3 className="admin-section-title">Hero Section Content</h3>
              <div className="admin-grid">
                <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="form-label">Hero Title</label>
                  <input className="form-input" value={local.heroTitle}
                    onChange={e => set("heroTitle", e.target.value)} />
                </div>
                <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="form-label">Hero Subtitle</label>
                  <textarea className="form-input form-textarea" value={local.heroSubtitle}
                    onChange={e => set("heroSubtitle", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* SERVICES */}
          {tab === "services" && (
            <div className="admin-section">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h3 className="admin-section-title" style={{ margin: 0 }}>Services Portfolio</h3>
                <button className="btn-primary" onClick={addService} style={{ padding: "10px 20px", fontSize: "13px" }}>
                  <Plus size={15} /> Add Service
                </button>
              </div>
              <div className="services-admin-list">
                {local.services.map((svc, idx) => (
                  <div key={svc.id} className="service-admin-card">
                    <div className="sac-header">
                      <span className="sac-num">#{idx + 1}</span>
                      <button className="sac-remove" onClick={() => removeService(svc.id)}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="admin-grid">
                      <div className="form-group">
                        <label className="form-label">Service Title</label>
                        <input className="form-input" value={svc.title}
                          onChange={e => updateService(svc.id, "title", e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Icon Name</label>
                        <select className="form-input" value={svc.icon}
                          onChange={e => updateService(svc.id, "icon", e.target.value)}>
                          {["FileText","Calculator","ClipboardCheck","BookOpen","TrendingUp","Shield","PlusCircle","BarChart2","Users","Settings"].map(ic => (
                            <option key={ic} value={ic}>{ic}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                        <label className="form-label">Description</label>
                        <textarea className="form-input form-textarea" value={svc.description}
                          onChange={e => updateService(svc.id, "description", e.target.value)}
                          style={{ minHeight: "80px" }} />
                      </div>
                      <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                        <label className="form-label">Features (comma-separated)</label>
                        <input className="form-input" value={svc.features.join(", ")}
                          onChange={e => updateService(svc.id, "features", e.target.value.split(",").map(f => f.trim()))} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACHIEVEMENTS */}
          {tab === "achievements" && (
            <div className="admin-section">
              <h3 className="admin-section-title">Achievement Stats</h3>
              <p style={{ color: "var(--text-mid)", fontSize: "14px", marginBottom: "24px" }}>
                These numbers appear in the hero section and about section.
              </p>
              <div className="achievements-admin-grid">
                {local.achievements.map((a, i) => (
                  <div key={i} className="achievement-admin-card">
                    <div className="aac-preview">
                      <div className="aac-val">{a.value}</div>
                      <div className="aac-lbl">{a.label}</div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Value</label>
                      <input className="form-input" value={a.value}
                        onChange={e => updateAchievement(i, "value", e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Label</label>
                      <input className="form-input" value={a.label}
                        onChange={e => updateAchievement(i, "label", e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <style>{`
        .admin-page {
          display: flex; min-height: 100vh; background: var(--off-white);
        }
        .admin-sidebar {
          width: 260px; background: var(--navy); color: white;
          display: flex; flex-direction: column;
          position: fixed; top: 0; left: 0; bottom: 0; z-index: 100;
          overflow-y: auto;
        }
        .sidebar-header {
          display: flex; align-items: center; gap: 12px;
          padding: 24px 20px;
          border-bottom: 1px solid rgba(201,168,76,0.2);
        }
        .sidebar-badge {
          width: 44px; height: 44px; flex-shrink: 0;
          background: white;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          padding: 2px;
        }
        .sidebar-name { font-size: 14px; font-weight: 800; }
        .sidebar-sub { font-size: 11px; color: var(--gold); font-weight: 500; }
        .sidebar-nav {
          padding: 20px 12px; flex: 1;
          display: flex; flex-direction: column; gap: 4px;
        }
        .sidebar-tab {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 14px; border-radius: var(--radius);
          color: rgba(255,255,255,0.7); font-size: 14px; font-weight: 500;
          transition: var(--transition); width: 100%; text-align: left;
          font-family: inherit;
        }
        .sidebar-tab:hover { background: rgba(255,255,255,0.07); color: white; }
        .sidebar-tab.active { background: rgba(201,168,76,0.15); color: var(--gold); }
        .sidebar-footer {
          padding: 16px 12px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex; flex-direction: column; gap: 8px;
        }
        .sidebar-action {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 14px; border-radius: var(--radius);
          color: rgba(255,255,255,0.7); font-size: 14px;
          transition: var(--transition); font-family: inherit;
        }
        .sidebar-action:hover { background: rgba(255,255,255,0.07); color: white; }
        .sidebar-action.danger:hover { background: rgba(252,129,129,0.1); color: #FC8181; }
        .admin-main {
          flex: 1; margin-left: 260px; min-height: 100vh;
          display: flex; flex-direction: column;
        }
        .admin-topbar {
          display: flex; justify-content: space-between; align-items: center;
          padding: 24px 32px; background: white;
          border-bottom: 1px solid var(--border);
          position: sticky; top: 0; z-index: 10;
        }
        .admin-page-title { font-size: 22px; font-weight: 800; color: var(--navy); margin-bottom: 4px; }
        .admin-page-sub { font-size: 13px; color: var(--text-mid); }
        .admin-toast {
          margin: 20px 32px 0;
          padding: 14px 20px;
          background: #F0FFF4; border: 1px solid #9AE6B4;
          border-radius: var(--radius); color: #276749;
          font-size: 14px; font-weight: 600;
        }
        .admin-content { padding: 32px; flex: 1; }
        .admin-section {
          background: white; border-radius: var(--radius-lg);
          padding: 32px; box-shadow: var(--shadow);
        }
        .admin-section-title {
          font-size: 17px; font-weight: 800; color: var(--navy);
          margin-bottom: 24px; padding-bottom: 12px;
          border-bottom: 2px solid var(--gold-light);
        }
        .admin-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
        }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-label {
          font-size: 13px; font-weight: 700; color: var(--navy);
          text-transform: uppercase; letter-spacing: 0.5px;
          display: flex; align-items: center;
        }
        .form-input {
          padding: 12px 14px; border: 1.5px solid var(--border);
          border-radius: var(--radius); font-size: 14px;
          color: var(--text); font-family: inherit;
          transition: var(--transition); background: var(--off-white);
        }
        .form-input:focus { border-color: var(--gold); outline: none; background: white; }
        .form-textarea { resize: vertical; min-height: 100px; }

        /* MS Logo Preview */
        .ms-logo-preview-box {
          background: #f8f9fa; border: 2px solid var(--border);
          border-radius: var(--radius); padding: 20px;
          margin-bottom: 20px; text-align: center;
        }
        .ms-logo-preview-label {
          font-size: 12px; font-weight: 700; color: var(--text-mid);
          text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;
        }
        .ms-logo-preview-display {
          display: flex; justify-content: center; align-items: center;
          padding: 16px; background: white; border-radius: var(--radius);
          margin-bottom: 12px; border: 1px solid var(--border);
        }
        .ms-logo-preview-note {
          font-size: 12px; color: var(--text-mid); line-height: 1.5;
        }

        /* Logo upload */
        .logo-upload-zone {
          border: 2px dashed var(--border); border-radius: var(--radius-lg);
          padding: 48px 32px; text-align: center; cursor: pointer;
          transition: var(--transition); background: var(--off-white);
        }
        .logo-upload-zone:hover, .logo-upload-zone.drag-over {
          border-color: var(--gold); background: rgba(201,168,76,0.05);
        }
        .upload-icon-wrap {
          width: 64px; height: 64px;
          background: rgba(201,168,76,0.1); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px; color: var(--gold);
        }
        .upload-title { font-size: 16px; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
        .upload-sub { font-size: 13px; color: var(--text-mid); }
        .logo-preview-box {
          border: 1.5px solid var(--border); border-radius: var(--radius-lg);
          padding: 24px; background: var(--off-white);
        }
        .logo-preview-inner { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
        .logo-preview-img {
          width: 120px; height: 120px; object-fit: contain;
          border-radius: var(--radius); border: 1px solid var(--border);
          background: white; padding: 8px;
        }
        .logo-preview-info { flex: 1; min-width: 200px; }

        /* Brand preview */
        .brand-preview {
          display: flex; align-items: center; gap: 14px;
          padding: 20px 24px;
          background: var(--navy); border-radius: var(--radius-lg);
        }
        .bp-badge {
          width: 48px; height: 48px; flex-shrink: 0;
          background: white; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; padding: 2px;
        }
        .bp-name { font-size: 15px; font-weight: 800; color: white; }
        .bp-tag { font-size: 11px; color: var(--gold); font-weight: 500; }

        /* Services */
        .services-admin-list { display: flex; flex-direction: column; gap: 20px; }
        .service-admin-card {
          border: 1.5px solid var(--border); border-radius: var(--radius-lg);
          padding: 24px; background: var(--off-white);
        }
        .sac-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 16px;
        }
        .sac-num { font-size: 13px; font-weight: 700; color: var(--text-mid); }
        .sac-remove {
          color: var(--danger); padding: 6px; border-radius: var(--radius);
          transition: var(--transition);
        }
        .sac-remove:hover { background: rgba(229,62,62,0.1); }

        /* Achievements */
        .achievements-admin-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
        }
        .achievement-admin-card {
          border: 1.5px solid var(--border); border-radius: var(--radius-lg);
          padding: 20px; background: var(--off-white);
          display: flex; flex-direction: column; gap: 14px;
        }
        .aac-preview {
          text-align: center; padding: 16px;
          background: var(--navy); border-radius: var(--radius);
        }
        .aac-val { font-size: 28px; font-weight: 900; color: var(--gold); }
        .aac-lbl { font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 4px; }

        @media (max-width: 768px) {
          .admin-sidebar { display: none; }
          .admin-main { margin-left: 0; }
          .admin-grid { grid-template-columns: 1fr; }
          .admin-content { padding: 20px; }
        }
      `}</style>
    </div>
  );
}
