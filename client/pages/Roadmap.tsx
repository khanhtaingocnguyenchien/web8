export default function Roadmap() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center font-inter-montserrat px-2">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md mx-auto flex flex-col items-center">
        <h1 className="text-[22px] font-bold text-[#2563EB] font-display mb-4 text-center">Lộ trình học</h1>
        <div className="text-[15px] text-gray-700 text-center mb-2">Đề xuất lộ trình cá nhân hóa, các mốc luyện tập, mục tiêu band.</div>
        <ul className="list-disc pl-6 text-[15px] text-gray-700">
          <li>Kiểm tra trình độ đầu vào</li>
          <li>Chia nhỏ mục tiêu theo từng kỹ năng</li>
          <li>Lịch luyện tập hàng tuần</li>
          <li>Gợi ý bài tập phù hợp</li>
        </ul>
      </div>
    </div>
  );
}
