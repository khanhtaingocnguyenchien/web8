import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Headphones, BookOpen, Mic, PenLine, Play, Award, TrendingUp, ShieldCheck, BarChart } from "lucide-react";

const TESTS = {
  1: { name: "IELTS Academic - Test A", duration: 60, band: 7.5, tips: "Tập trung vào kỹ năng nghe và đọc, quản lý thời gian tốt." },
  2: { name: "IELTS General - Test B", duration: 60, band: 6.0, tips: "Ôn luyện các chủ đề thực tế, chú ý phần viết." },
  3: { name: "IELTS Academic - Test C", duration: 60, band: null, tips: "Luyện tập đề thi thật, kiểm tra kỹ năng nói." },
} as const;

export default function TestDetail() {
  const { id = "1" } = useParams();
  const testId = Number(id) as keyof typeof TESTS;
  const test = TESTS[testId] || TESTS[1];

  const navigate = useNavigate();

  const parts = [
    { key: "listening", label: "Listening", icon: Headphones, color: "bg-blue-50 text-blue-700", desc: "Nghe các đoạn hội thoại và trả lời câu hỏi." },
    { key: "reading", label: "Reading", icon: BookOpen, color: "bg-green-50 text-green-700", desc: "Đọc hiểu các đoạn văn và chọn đáp án đúng." },
    { key: "speaking", label: "Speaking", icon: Mic, color: "bg-orange-50 text-orange-700", desc: "Trả lời các câu hỏi nói, ghi âm phần trả lời." },
    { key: "writing", label: "Writing", icon: PenLine, color: "bg-purple-50 text-purple-700", desc: "Viết bài luận theo chủ đề cho trước." },
  ];

  return (
    <div className="test-detail-dashboard bg-white min-h-screen font-inter-montserrat px-2 py-8">
      {/* Motivational Header Banner */}
      <div className="header-banner-testdetail rounded-2xl shadow-lg bg-gradient-to-br from-blue-50 to-green-50 p-8 mb-8 flex flex-col items-center text-center">
        <h1 className="text-[28px] font-bold text-blue-700 mb-2 font-display">{test.name}</h1>
        <div className="text-[18px] text-gray-700 mb-3">Thi thử mô phỏng, chinh phục band mục tiêu!</div>
        <div className="flex gap-4 justify-center mb-2">
          <Award size={28} className="text-yellow-500" />
          <TrendingUp size={28} className="text-green-500" />
          <ShieldCheck size={28} className="text-blue-500" />
        </div>
        <div className="flex items-center justify-center gap-4 mt-2">
          <span className="inline-flex items-center gap-2 text-[16px] text-gray-600 font-semibold"><Clock size={20} /> Tổng thời gian: {test.duration} phút</span>
          <span className="inline-flex items-center gap-2 text-[16px] text-blue-700 font-bold"><BarChart size={20} /> Band mục tiêu: {test.band || "7.0+"}</span>
        </div>
        <div className="mt-3 text-[15px] text-gray-500 font-medium">{test.tips}</div>
      </div>
      {/* Skill Cards */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 mb-10">
        {parts.map((p) => (
          <div key={p.key} className={`skill-card-testdetail p-6 rounded-2xl shadow-md border-2 ${p.color} flex flex-col items-center justify-center`}>
            <div className="mb-2"><p.icon size={36} /></div>
            <div className="text-[18px] font-bold font-display mb-1">{p.label}</div>
            <div className="text-[15px] text-gray-600 mb-2">~15 phút</div>
            <div className="text-[15px] text-gray-700 text-center">{p.desc}</div>
          </div>
        ))}
      </div>
      {/* Gamification: Progress Chart, Badges, Recent Attempts */}
      <div className="gamification-testdetail flex flex-col items-center mb-8">
        <div className="text-[18px] font-bold text-gray-700 mb-2">Tiến độ luyện tập</div>
        <div className="flex gap-2 mb-3">
          {["Lần 1", "Lần 2", "Lần 3"].map((a, i) => (
            <div key={a} className={`attempt-dot-testdetail w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow ${i < 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}>{a}</div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <div className="badge-testdetail flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-[15px] shadow"><Award size={18} className="text-yellow-500" /> Band 7+</div>
          <div className="badge-testdetail flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-[15px] shadow"><TrendingUp size={18} className="text-green-500" /> Tiến bộ liên tục</div>
          <div className="badge-testdetail flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-[15px] shadow"><ShieldCheck size={18} className="text-blue-500" /> Đề thi chuẩn quốc tế</div>
        </div>
      </div>
      {/* Main CTA */}
      <div className="flex flex-col items-center gap-4 mt-6">
        <Button
          type="button"
          size="lg"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 h-11 px-10 py-4 rounded-full bg-blue-600 text-white font-bold text-lg shadow-md hover:bg-blue-700 transition-all"
          onClick={() => navigate("/exam/listening")}
        >
          <Play className="size-5 mr-2" /> Bắt đầu thi
        </Button>
        <Button variant="secondary" size="lg" className="px-8 py-3 rounded-full font-semibold text-lg">
          Xem hướng dẫn
        </Button>
      </div>
      <style>{`
        .font-inter-montserrat {
          font-family: 'Inter', 'Montserrat', sans-serif;
        }
        .font-display {
          font-family: 'Montserrat', 'Inter', sans-serif;
        }
        .header-banner-testdetail {
          background: linear-gradient(120deg, #EFF6FF 0%, #D1FAE5 100%);
        }
        .skill-card-testdetail {
          border-radius: 18px;
          box-shadow: 0 2px 12px rgba(59,130,246,0.06);
          border: 2px solid #DBEAFE;
        }
        .badge-testdetail {
          font-family: 'Montserrat', 'Inter', sans-serif;
        }
        .attempt-dot-testdetail {
          transition: background 0.2s, color 0.2s;
        }
      `}</style>
    </div>
  );
}
