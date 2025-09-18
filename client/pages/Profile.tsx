import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear user session if needed
    navigate("/");
  };
  // Demo user data
  const user = {
    name: "Admin",
    email: "admin@email.com",
    avatar: "https://ui-avatars.com/api/?name=Admin&background=2563EB&color=fff",
  };
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-inter-montserrat">
  <div className="max-w-md mx-auto py-4 md:py-6 px-2 sm:px-4 md:px-0">
        <h1 className="text-[18px] sm:text-[22px] font-bold text-[#2563EB] font-display mb-3 sm:mb-4">Quản lý tài khoản</h1>
  <div className="bg-white rounded-2xl shadow-md p-3 sm:p-5 md:p-6 mb-3 sm:mb-6">
  <a href="/settings" className="block mt-2 text-center text-[#2563EB] font-semibold hover:underline">Cài đặt tài khoản</a>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <img src={user.avatar} alt="avatar" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#2563EB]" />
            <div className="text-center sm:text-left">
              <div className="font-bold text-[16px] sm:text-[18px] text-[#2563EB]">{user.name}</div>
              <div className="text-gray-500 text-[14px] sm:text-[15px]">{user.email}</div>
            </div>
          </div>
          <form className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">Họ và tên</label>
              <Input defaultValue={user.name} className="rounded-lg text-[14px]" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">Email</label>
              <Input type="email" defaultValue={user.email} className="rounded-lg text-[14px]" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">Mật khẩu mới</label>
              <Input type="password" placeholder="Nhập mật khẩu mới" className="rounded-lg text-[14px]" />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <Button className="rounded-full bg-[#2563EB] text-white font-bold px-4 sm:px-6 py-2 shadow-md hover:bg-[#1D4ED8] transition-all w-full sm:w-auto">Cập nhật thông tin</Button>
              <Button variant="outline" className="rounded-full px-4 sm:px-6 py-2 border-2 border-[#2563EB] text-[#2563EB] font-bold w-full sm:w-auto" onClick={handleLogout}>Đăng xuất</Button>
            </div>
          </form>
        </div>
        <div className="bg-white rounded-2xl shadow p-3 sm:p-5 md:p-6">
          <h2 className="font-bold text-[15px] sm:text-[16px] text-[#2563EB] mb-2">Bảo mật & Đổi mật khẩu</h2>
          <form className="space-y-2 sm:space-y-3">
            <Input type="password" placeholder="Mật khẩu hiện tại" className="rounded-lg text-[14px]" />
            <Input type="password" placeholder="Mật khẩu mới" className="rounded-lg text-[14px]" />
            <Input type="password" placeholder="Xác nhận mật khẩu mới" className="rounded-lg text-[14px]" />
            <Button className="rounded-full bg-[#2563EB] text-white font-bold px-4 sm:px-6 py-2 shadow-md hover:bg-[#1D4ED8] transition-all w-full">Đổi mật khẩu</Button>
          </form>
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
