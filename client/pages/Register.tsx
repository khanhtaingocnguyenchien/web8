import React, { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
      <Card className="p-5 sm:p-8 rounded-2xl shadow-lg w-full max-w-sm mx-auto flex flex-col items-center" style={{ width: '100%', maxWidth: 400 }}>
        <h2 className="text-[20px] sm:text-[22px] font-bold text-center mb-4 text-[#2563EB] font-display">Đăng ký</h2>
        <form className="space-y-4 w-full">
          <input
            type="text"
            placeholder="Họ và tên"
            value={name}
            onChange={e => setName(e.target.value)}
            className="rounded-lg text-[15px] pl-4 pr-3 py-3 w-full border border-[#E5E7EB] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] transition-all"
            required
            autoComplete="name"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="rounded-lg text-[15px] pl-4 pr-3 py-3 w-full border border-[#E5E7EB] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] transition-all"
            required
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="rounded-lg text-[15px] pl-4 pr-3 py-3 w-full border border-[#E5E7EB] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] transition-all"
            required
            autoComplete="new-password"
          />
          <Button className="w-full py-3 rounded-full bg-[#2563EB] text-white font-bold shadow-md hover:bg-[#1D4ED8] active:bg-[#1E40AF] transition-all text-[16px]">Đăng ký</Button>
        </form>
        <div className="mt-4 text-center text-[13px] text-gray-500">
          Đã có tài khoản? <a href="/login" className="text-[#2563EB] font-semibold hover:underline">Đăng nhập</a>
        </div>
      </Card>
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
