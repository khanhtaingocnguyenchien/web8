import React, { useState } from "react";
import { Button } from "../components/ui/button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center font-inter-montserrat px-2">
      <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 w-full max-w-sm mx-auto flex flex-col items-center" style={{ width: '100%', maxWidth: 400 }}>
        <h1 className="text-[20px] sm:text-[22px] font-bold text-[#2563EB] font-display mb-4 text-center">Quên mật khẩu</h1>
        {sent ? (
          <div className="text-center text-[15px] text-[#2563EB]">Vui lòng kiểm tra email để đặt lại mật khẩu.</div>
        ) : (
          <form className="space-y-4 w-full" onSubmit={e => {e.preventDefault(); setSent(true);}}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              className="rounded-lg text-[15px] pl-4 pr-3 py-3 w-full border border-[#E5E7EB] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] transition-all"
              required
              autoComplete="username"
            />
            <Button className="w-full py-3 rounded-full bg-[#2563EB] text-white font-bold shadow-md hover:bg-[#1D4ED8] active:bg-[#1E40AF] transition-all text-[16px]">Gửi yêu cầu</Button>
          </form>
        )}
      </div>
    </div>
  );
}
