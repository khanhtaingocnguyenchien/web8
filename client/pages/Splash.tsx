
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Splash() {
  const [showIllustration, setShowIllustration] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowIllustration(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-between font-inter-montserrat">
      {/* Hero Section */}
      <div className="w-full flex flex-col items-center pt-8 pb-4 px-4 md:px-0">
        {/* SVG Illustration with fade-in */}
        <div
          className={`mb-6 transition-opacity duration-700 ${showIllustration ? "opacity-100" : "opacity-0"}`}
        >
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="36" cy="36" r="36" fill="#2563EB" fillOpacity="0.08" />
            <rect x="18" y="28" width="36" height="16" rx="8" fill="#2563EB" />
            <path d="M36 34v4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="36" cy="36" r="3" fill="#fff" />
          </svg>
        </div>
        {/* Tagline */}
        <h1 className="font-bold text-[20px] sm:text-[22px] md:text-[28px] text-[#2563EB] font-display text-center leading-tight mb-2">
          Luyện thi IELTS hiện đại<br />Dễ dùng, miễn phí cho mọi người
        </h1>
        <p className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-700 text-center mb-2 max-w-md">
          Đề giống thật, chấm điểm tự động, lộ trình cá nhân hóa.
        </p>
      </div>
      {/* Value Props Row */}
      <div className="w-full flex flex-col items-center px-4">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl w-full mb-6">
          {/* Đề giống thật */}
          <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm px-4 py-2 min-w-[120px]">
            <svg width="22" height="22" stroke="#2563EB" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3" strokeWidth="2"/><path d="M7 9h10M7 13h6" strokeWidth="2" strokeLinecap="round"/></svg>
            <span className="text-[15px] text-gray-800 font-medium">Đề giống thật</span>
          </div>
          {/* Chấm điểm tự động */}
          <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm px-4 py-2 min-w-[120px]">
            <svg width="22" height="22" stroke="#2563EB" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2"/><path d="M12 8v4l3 2" strokeWidth="2" strokeLinecap="round"/></svg>
            <span className="text-[15px] text-gray-800 font-medium">Chấm điểm tự động</span>
          </div>
          {/* Lộ trình cá nhân hóa */}
          <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm px-4 py-2 min-w-[120px]">
            <svg width="22" height="22" stroke="#2563EB" fill="none" viewBox="0 0 24 24"><path d="M4 17V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10" strokeWidth="2"/><circle cx="12" cy="14" r="2" strokeWidth="2"/><path d="M12 16v2" strokeWidth="2" strokeLinecap="round"/></svg>
            <span className="text-[15px] text-gray-800 font-medium">Lộ trình cá nhân hóa</span>
          </div>
        </div>
      </div>
      {/* CTA Block & Quick Login */}
      <div className="w-full flex flex-col items-center pb-8 px-4 md:px-0">
        <Button asChild className="w-full max-w-md h-12 rounded-lg bg-[#2563EB] text-white font-bold text-[16px] shadow-md hover:bg-[#1D4ED8] active:bg-[#1E40AF] transition-all mb-3">
          <Link to="/login">Bắt đầu miễn phí</Link>
        </Button>
        <Button asChild variant="outline" className="w-full max-w-md h-12 rounded-lg border-[#2563EB] text-[#2563EB] font-semibold text-[16px] mb-3">
          <Link to="/demo">Xem demo</Link>
        </Button>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-2">
          <Button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 active:bg-gray-200 shadow-sm">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.39a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.89-1.74 2.98-4.3 2.98-7.31z" fill="#4285F4"/><path d="M10 20c2.7 0 4.97-.9 6.63-2.44l-3.23-2.5c-.9.6-2.05.96-3.4.96-2.61 0-4.82-1.76-5.61-4.13H1.06v2.59A10 10 0 0 0 10 20z" fill="#34A853"/><path d="M4.39 12.39A5.99 5.99 0 0 1 3.64 10c0-.83.15-1.63.41-2.39V5.02H1.06A10 10 0 0 0 0 10c0 1.64.4 3.19 1.06 4.56l3.33-2.17z" fill="#FBBC05"/><path d="M10 4.04c1.47 0 2.79.51 3.83 1.51l2.87-2.87C14.97 1.09 12.7 0 10 0A10 10 0 0 0 1.06 5.02l3.33 2.59C5.18 5.8 7.39 4.04 10 4.04z" fill="#EA4335"/></svg>
            <span className="font-medium">Google</span>
          </Button>
          <Button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 active:bg-gray-200 shadow-sm">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.67 10c0-3.68-2.99-6.67-6.67-6.67S3.33 6.32 3.33 10c0 3.68 2.99 6.67 6.67 6.67s6.67-2.99 6.67-6.67z" fill="#000"/><path d="M10 3.33c-3.68 0-6.67 2.99-6.67 6.67 0 3.68 2.99 6.67 6.67 6.67 3.68 0 6.67-2.99 6.67-6.67 0-3.68-2.99-6.67-6.67-6.67zm0 12c-2.94 0-5.33-2.39-5.33-5.33S7.06 4.67 10 4.67s5.33 2.39 5.33 5.33-2.39 5.33-5.33 5.33z" fill="#fff"/></svg>
            <span className="font-medium">Apple</span>
          </Button>
        </div>
      </div>
      {/* Trust Badges Strip */}
      <div className="w-full flex flex-col items-center px-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-xl w-full">
          <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-sm">
            <svg width="18" height="18" stroke="#2563EB" fill="none" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" strokeWidth="2"/></svg>
            <span className="text-[14px] text-gray-700 font-medium">1000+ học viên</span>
          </div>
          <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-sm">
            <svg width="18" height="18" stroke="#2563EB" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#2563EB">7.0+</text></svg>
            <span className="text-[14px] text-gray-700 font-medium">Band 7.0+</span>
          </div>
          <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-sm">
            <svg width="18" height="18" stroke="#2563EB" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" strokeWidth="2"/><path d="M8 12h8" strokeWidth="2" strokeLinecap="round"/></svg>
            <span className="text-[14px] text-gray-700 font-medium">Nền tảng miễn phí</span>
          </div>
        </div>
      </div>
  
      <footer className="w-full flex flex-col items-center px-4 pb-4">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-[13px] text-gray-500">
          <a href="#" className="hover:text-[#2563EB] transition">Điều khoản</a>
          <span className="hidden sm:inline">•</span>
          <a href="#" className="hover:text-[#2563EB] transition">Quyền riêng tư</a>
          <span className="hidden sm:inline">•</span>
          <a href="#" className="hover:text-[#2563EB] transition">Liên hệ</a>
        </div>
      </footer>
      {/* Sticky Bottom CTA Placeholder */}
      <div className="fixed bottom-0 left-0 w-full flex items-center justify-center pointer-events-none z-50">
        <div className="pointer-events-auto w-full max-w-md px-4 pb-4">
          <Button className="w-full h-12 rounded-lg bg-[#2563EB] text-white font-bold text-[16px] shadow-md hover:bg-[#1D4ED8] active:bg-[#1E40AF] transition-all" style={{transition: 'transform 0.4s cubic-bezier(.4,2,.3,1)', transform: 'translateY(120px)'}}>Bắt đầu luyện ngay</Button>
        </div>
      </div>
    </div>
  );
}
