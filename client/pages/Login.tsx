import React, { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (email !== "admin@gmail.com" || password !== "123456") {
        setError("Sai mật khẩu hoặc email");
        setLoading(false);
      } else {
        setLoading(false);
        navigate("/home");
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center font-inter-montserrat px-2">
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-12 h-12 rounded-full bg-[#2563EB] flex items-center justify-center">
            <span className="text-white font-bold text-2xl">B</span>
          </div>
          <span className="font-bold text-[22px] sm:text-[24px] text-[#2563EB] font-display">BEST IELTS</span>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 w-full max-w-sm mx-auto flex flex-col items-center" style={{ width: '100%', maxWidth: 400 }}>
        <h1 className="text-[20px] sm:text-[22px] font-bold text-[#2563EB] font-display mb-4 text-center">Đăng nhập</h1>
        <form className="space-y-4 w-full" onSubmit={handleSubmit}>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-[#2563EB]">👤</span>
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              className={`rounded-lg text-[15px] pl-10 pr-3 py-3 w-full border ${error ? 'border-red-500' : 'border-[#E5E7EB]'} focus:border-[#2563EB] transition-all`}
              required
              autoComplete="username"
              onKeyDown={e => e.key === 'Enter' && handleSubmit(e)}
            />
            {error && (
              <div className="absolute left-0 -bottom-7 text-xs text-red-500 bg-white px-2 py-1 rounded shadow">{error}</div>
            )}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-[#2563EB]">🔒</span>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              className={`rounded-lg text-[15px] pl-10 pr-3 py-3 w-full border ${error ? 'border-red-500' : 'border-[#E5E7EB]'} focus:border-[#2563EB] transition-all`}
              required
              autoComplete="current-password"
              onKeyDown={e => e.key === 'Enter' && handleSubmit(e)}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full font-bold px-6 py-3 shadow-md transition-all text-white text-[16px] bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF]"
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="4" fill="none" /></svg>
                Đang đăng nhập...
              </span>
            ) : (
              'Đăng nhập'
            )}
          </button>
        </form>
        {/* Quick login buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-3">
          <Button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 active:bg-gray-200 shadow-sm">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.39a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.89-1.74 2.98-4.3 2.98-7.31z" fill="#4285F4"/><path d="M10 20c2.7 0 4.97-.9 6.63-2.44l-3.23-2.5c-.9.6-2.05.96-3.4.96-2.61 0-4.82-1.76-5.61-4.13H1.06v2.59A10 10 0 0 0 10 20z" fill="#34A853"/><path d="M4.39 12.39A5.99 5.99 0 0 1 3.64 10c0-.83.15-1.63.41-2.39V5.02H1.06A10 10 0 0 0 0 10c0 1.64.4 3.19 1.06 4.56l3.33-2.17z" fill="#FBBC05"/><path d="M10 4.04c1.47 0 2.79.51 3.83 1.51l2.87-2.87C14.97 1.09 12.7 0 10 0A10 10 0 0 0 1.06 5.02l3.33 2.59C5.18 5.8 7.39 4.04 10 4.04z" fill="#EA4335"/></svg>
            <span className="font-medium">Google</span>
          </Button>
          <Button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 active:bg-gray-200 shadow-sm">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.67 10c0-3.68-2.99-6.67-6.67-6.67S3.33 6.32 3.33 10c0 3.68 2.99 6.67 6.67 6.67s6.67-2.99 6.67-6.67z" fill="#000"/><path d="M10 3.33c-3.68 0-6.67 2.99-6.67 6.67 0 3.68 2.99 6.67 6.67 6.67 3.68 0 6.67-2.99 6.67-6.67 0-3.68-2.99-6.67-6.67-6.67zm0 12c-2.94 0-5.33-2.39-5.33-5.33S7.06 4.67 10 4.67s5.33 2.39 5.33 5.33-2.39 5.33-5.33 5.33z" fill="#fff"/></svg>
            <span className="font-medium">Apple</span>
          </Button>
        </div>
        <div className="mt-4 text-center text-[13px] text-gray-500">
          Chưa có tài khoản?{' '}
          <a href="/register" className="text-[#2563EB] font-semibold hover:underline">Đăng ký</a>
        </div>
      </div>
      <style>{`
        .font-inter-montserrat {
          font-family: 'Inter', 'Montserrat', sans-serif;
        }
        .font-display {
          font-family: 'Montserrat', 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
}
