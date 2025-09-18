export default function Settings() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center font-inter-montserrat px-2">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md mx-auto flex flex-col items-center">
        <h1 className="text-[22px] font-bold text-[#2563EB] font-display mb-4 text-center">Cài đặt</h1>
        <div className="text-[15px] text-gray-700 text-center mb-2">Tùy chỉnh giao diện, thông báo, bảo mật, ngôn ngữ.</div>
        <ul className="list-disc pl-6 text-[15px] text-gray-700">
          <li>Đổi theme</li>
          <li>Bật/tắt thông báo</li>
          <li>Đổi ngôn ngữ</li>
          <li>Thiết lập bảo mật</li>
        </ul>
      </div>
    </div>
  );
}
