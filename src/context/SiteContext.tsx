import React, { createContext, useContext, ReactNode } from "react";

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface SiteData {
  businessName: string;
  tagline: string;
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  city: string;
  about: string;
  logoText: string;
  logoImage: string;
  heroTitle: string;
  heroSubtitle: string;
  services: Service[];
  achievements: { value: string; label: string }[];
}

const defaultData: SiteData = {
  businessName: "Mama Shri Tax Consultancy",
  tagline: "Your Trusted GST & Tax Partner",
  phone1: "+91 92510 87011",
  phone2: "+91 98295 09591",
  email: "amitkekri9@gmail.com",
  address: "Near Sabji Mandi, Balaji Complex, 1st Floor",
  city: "Kekri, Rajasthan - 305404",
  about: "Mama Shri Tax Consultancy is a premier financial advisory firm specializing in GST compliance, income tax returns, and comprehensive accounting solutions. With years of expertise and a client-first approach, we simplify complex tax workflows for individuals and businesses alike.",
  logoText: "MS",
  logoImage: "",
  heroTitle: "Expert Tax & GST Solutions for Your Business",
  heroSubtitle: "Streamline your compliance, maximize returns, and grow with confidence. Mama Shri Tax Consultancy delivers precision-driven financial services tailored to your needs.",
  services: [
    {
      id: "1",
      icon: "FileText",
      title: "GST Return Filing",
      description: "Accurate and timely GST return filing to keep your business fully compliant with all regulatory requirements.",
      features: ["GSTR-1, 2A, 3B Filing", "Monthly & Quarterly Returns", "GST Reconciliation", "Penalty Resolution"]
    },
    {
      id: "2",
      icon: "Calculator",
      title: "ITR Preparation",
      description: "Comprehensive income tax return preparation for individuals, firms, and corporates with maximum deductions.",
      features: ["Individual & Business ITR", "Tax Planning & Advisory", "Deduction Optimization", "E-Filing Support"]
    },
    {
      id: "3",
      icon: "ClipboardCheck",
      title: "Audit Services",
      description: "Thorough statutory and internal audit services ensuring financial accuracy and regulatory compliance.",
      features: ["Statutory Audits", "Internal Audits", "Tax Audits", "Compliance Reviews"]
    },
    {
      id: "4",
      icon: "BookOpen",
      title: "Accounting & Bookkeeping",
      description: "Complete accounting solutions including Tally and Excel-based management for clear financial visibility.",
      features: ["Tally ERP Management", "Excel Reporting", "Monthly Bookkeeping", "Financial Statements"]
    },
    {
      id: "5",
      icon: "TrendingUp",
      title: "Financial Advisory",
      description: "Strategic financial guidance to help you make informed decisions and achieve your business goals.",
      features: ["Investment Planning", "Cash Flow Analysis", "Business Structuring", "Risk Assessment"]
    },
    {
      id: "6",
      icon: "Shield",
      title: "Insurance & LTC Claims",
      description: "Assistance with insurance premium management and Leave Travel Concession claim processing.",
      features: ["Insurance Premium Filing", "LTC Claim Processing", "Policy Advisory", "Documentation Support"]
    },
    {
      id: "7",
      icon: "PlusCircle",
      title: "New GST Registration",
      description: "End-to-end GST registration services for new businesses, ensuring smooth onboarding to the GST system.",
      features: ["New Registration", "Amendment Services", "GSTIN Verification", "Cancellation Support"]
    },
    {
      id: "8",
      icon: "BarChart2",
      title: "MIS & Reporting",
      description: "Management Information System reports and financial analytics to drive data-backed business decisions.",
      features: ["Monthly MIS Reports", "P&L Statements", "Balance Sheet Prep", "Budget Forecasting"]
    }
  ],
  achievements: [
    { value: "500+", label: "Happy Clients" },
    { value: "10+", label: "Years Experience" },
    { value: "5000+", label: "Returns Filed" },
    { value: "98%", label: "Compliance Rate" }
  ]
};

interface SiteContextType {
  data: SiteData;
}

const SiteContext = createContext<SiteContextType | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  return (
    <SiteContext.Provider value={{ data: defaultData }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
