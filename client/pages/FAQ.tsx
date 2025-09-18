export default function FAQ() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center font-inter-montserrat px-2">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md mx-auto flex flex-col items-center">
        <h1 className="text-[22px] font-bold text-[#2563EB] font-display mb-4 text-center">Câu hỏi thường gặp</h1>
        <div className="text-[15px] text-gray-700 text-center mb-2">Tổng hợp các câu hỏi và giải đáp về nền tảng BEST IELTS.</div>
        <ul className="list-disc pl-6 text-[15px] text-gray-700">
          <li>Làm sao để bắt đầu luyện thi?</li>
          <li>Cách tính điểm thi thử?</li>
          <li>Lộ trình học cá nhân hóa hoạt động thế nào?</li>
          <li>Liên hệ hỗ trợ ở đâu?</li>
        </ul>
      </div>
    </div>
  );
}
