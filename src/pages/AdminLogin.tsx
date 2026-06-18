import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, LogIn, ArrowLeft, User } from "lucide-react";
import { useSite } from "../context/SiteContext";

export default function AdminLogin() {
  const { data, login } = useSite();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const ok = login(username, password);
      setLoading(false);
      if (ok) {
        navigate("/admin/dashboard");
      } else {
        setError("Invalid username or password. Please try again.");
        setPassword("");
      }
    }, 800);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-bg" />
      <div className="admin-login-card">
        <button className="back-btn" onClick={() => navigate("/")}>
          <ArrowLeft size={16} /> Back to Website
        </button>

        <div className="admin-login-logo">
          <div className="al-badge">{data.logoText}</div>
        </div>
        <h2 className="al-title">{data.businessName}</h2>
        <p className="al-subtitle">Admin Portal — Secure Login</p>

        <div className="al-lock">
          <Lock size={20} color="var(--gold)" />
        </div>

        <form onSubmit={handleSubmit} className="al-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <div className="input-wrap">
              <User size={15} className="input-icon" />
              <input
                className="form-input with-icon"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-wrap">
              <input
                className="form-input"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button type="button" className="eye-btn" onClick={() => setShow(!show)}>
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && <div className="al-error">{error}</div>}

          <button type="submit" className="btn-primary al-submit" disabled={loading}>
            {loading ? (
              <span className="al-spinner" />
            ) : (
              <><LogIn size={16} /> Login to Dashboard</>
            )}
          </button>
        </form>
      </div>

      <style>{`
        .admin-login-page {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          position: relative; padding: 24px;
        }
        .admin-login-bg {
          position: fixed; inset: 0;
          background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 60%, #1a3a6e 100%);
          z-index: -1;
        }
        .admin-login-bg::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0);
          background-size: 40px 40px;
        }
        .admin-login-card {
          background: white; border-radius: var(--radius-lg);
          padding: 48px 44px; width: 100%; max-width: 440px;
          box-shadow: var(--shadow-xl); text-align: center;
          position: relative;
          animation: fadeInUp 0.6s ease;
        }
        .back-btn {
          position: absolute; top: 20px; left: 20px;
          display: flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600; color: var(--text-mid);
          transition: var(--transition); font-family: inherit;
        }
        .back-btn:hover { color: var(--navy); }
        .admin-login-logo { margin-bottom: 16px; }
        .al-badge {
          width: 72px; height: 72px;
          background: linear-gradient(135deg, var(--gold), var(--gold-dark));
          border-radius: 18px;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; font-weight: 900; color: var(--navy);
          margin: 0 auto;
          box-shadow: 0 8px 24px rgba(201,168,76,0.4);
        }
        .al-title {
          font-size: 20px; font-weight: 800; color: var(--navy); margin-bottom: 4px;
        }
        .al-subtitle { font-size: 13px; color: var(--text-mid); margin-bottom: 24px; }
        .al-lock {
          width: 48px; height: 48px;
          background: rgba(201,168,76,0.1);
          border: 2px solid rgba(201,168,76,0.2);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 28px;
        }
        .al-form { text-align: left; }
        .input-wrap { position: relative; }
        .input-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: var(--text-light);
        }
        .form-input.with-icon { padding-left: 40px; }
        .password-wrap { position: relative; }
        .eye-btn {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          color: var(--text-light); transition: var(--transition);
        }
        .eye-btn:hover { color: var(--gold); }
        .al-error {
          background: rgba(229,62,62,0.08);
          border: 1px solid var(--danger);
          color: var(--danger);
          padding: 10px 14px; border-radius: var(--radius);
          font-size: 13px; font-weight: 600; margin-bottom: 16px;
        }
        .al-submit {
          width: 100%; justify-content: center; margin-top: 8px;
          padding: 14px;
        }
        .al-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .al-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(11,31,58,0.3);
          border-top-color: var(--navy);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
