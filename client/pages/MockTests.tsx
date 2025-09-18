import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Clock, Sparkles, Filter, Award, TrendingUp, BookOpen, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const tests = [
  { id: 1, name: "IELTS Academic - Test A", duration: 60, level: "B2-C1", type: "Academic", attempts: 2, band: 7.5 },
  { id: 2, name: "IELTS General - Test B", duration: 60, level: "B1-B2", type: "General", attempts: 1, band: 6.0 },
  { id: 3, name: "IELTS Academic - Test C", duration: 60, level: "B2-C1", type: "Academic", attempts: 0, band: null },
];
const filters = ["Tất cả", "Academic", "General", "Hoàn thành"];

export default function MockTests() {
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const filteredTests = activeFilter === "Tất cả"
    ? tests
    : activeFilter === "Hoàn thành"
      ? tests.filter(t => t.band)
      : tests.filter(t => t.type === activeFilter);
  return (
    <div className="mocktest-dashboard bg-white min-h-screen font-inter-montserrat px-2 md:px-8 py-6 md:py-8">
      {/* Hero Banner */}
      <div className="hero-banner-mocktest rounded-2xl shadow-lg bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-8 mb-6 md:mb-8 flex flex-col items-center text-center">
        <h1 className="text-[22px] md:text-[28px] font-bold text-blue-700 mb-2 font-display">Thi thử IELTS Online</h1>
        <div className="text-[15px] md:text-[18px] text-gray-700 mb-3">Trải nghiệm đề thi thật, chấm điểm tự động, luyện tập hiệu quả!</div>
        <Button size="lg" className="mt-2 px-6 md:px-8 py-2 md:py-3 rounded-full bg-blue-600 text-white font-bold text-[16px] md:text-lg shadow-md hover:bg-blue-700 transition-all">Bắt đầu ngay</Button>
        <div className="mt-4 flex flex-wrap gap-2 md:gap-3 justify-center">
          <div className="badge-mocktest flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-[14px] md:text-[15px] shadow"><Award size={18} className="text-yellow-500" /> Đạt band 7+</div>
          <div className="badge-mocktest flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-[14px] md:text-[15px] shadow"><TrendingUp size={18} className="text-green-500" /> Tiến bộ liên tục</div>
          <div className="badge-mocktest flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-[14px] md:text-[15px] shadow"><ShieldCheck size={18} className="text-blue-500" /> Đề thi chuẩn quốc tế</div>
        </div>
      </div>
      {/* Filters & Quick Link */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 md:mb-6 gap-2 md:gap-0">
        <div className="flex gap-2 flex-wrap">
          {filters.map(f => (
            <button
              key={f}
              className={`filter-btn-mocktest px-3 md:px-4 py-2 rounded-full font-semibold text-[14px] md:text-[15px] border ${activeFilter === f ? "bg-blue-600 text-white border-blue-600" : "bg-white text-blue-600 border-blue-200"}`}
              onClick={() => setActiveFilter(f)}
            >{f}</button>
          ))}
        </div>
        <Button variant="secondary" asChild className="w-full md:w-auto">
          <Link to="/progress" className="gap-2 inline-flex items-center justify-center">
            <BadgeCheck className="size-4" /> Kết quả gần đây
          </Link>
        </Button>
      </div>
      {/* Test Cards Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-8 md:mb-10">
        {filteredTests.map((t) => (
          <Card key={t.id} className={`test-card-mocktest shadow-md border-2 ${t.type === "Academic" ? "border-blue-200" : "border-green-200"} bg-white rounded-2xl`}>
            <CardContent className="p-4 md:p-6 flex flex-col gap-2 md:gap-3">
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <BookOpen size={28} className={t.type === "Academic" ? "text-blue-600" : "text-green-600"} />
                <span className={`text-[16px] md:text-[18px] font-bold font-display ${t.type === "Academic" ? "text-blue-700" : "text-green-700"}`}>{t.name}</span>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 text-[14px] md:text-[15px] text-gray-600">
                <span className="inline-flex items-center gap-1"><Clock size={16} /> {t.duration} phút</span>
                <span>Trình độ: {t.level}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-400">Lần làm: {t.attempts}</span>
                {t.band && <span className="text-xs text-yellow-600 font-bold">Band: {t.band}</span>}
              </div>
              <Button asChild className="gap-2 mt-2 md:mt-3 w-full md:w-auto" variant={t.type === "Academic" ? "default" : "secondary"}>
                <Link to={`/mock-tests/${t.id}`}><Sparkles className="size-5" /> Bắt đầu</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Band Score Tracker */}
      <div className="band-score-tracker-mocktest flex flex-col items-center mt-6 md:mt-8">
        <div className="text-[16px] md:text-[18px] font-bold text-gray-700 mb-2">Band Score Progress</div>
        <div className="flex gap-1 md:gap-2">
          {[5, 6, 7, 8, 9].map(band => (
            <div key={band} className={`band-score-dot-mocktest w-8 md:w-10 h-8 md:h-10 rounded-full flex items-center justify-center font-bold text-[15px] md:text-lg shadow ${tests.some(t => t.band && t.band >= band) ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}>{band}</div>
          ))}
        </div>
      </div>
      <style>{`
        .font-inter-montserrat {
          font-family: 'Inter', 'Montserrat', sans-serif;
        }
        .font-display {
          font-family: 'Montserrat', 'Inter', sans-serif;
        }
        .hero-banner-mocktest {
          background: linear-gradient(120deg, #EFF6FF 0%, #D1FAE5 100%);
        }
        .test-card-mocktest {
          border-radius: 18px;
          box-shadow: 0 2px 12px rgba(59,130,246,0.06);
          border: 2px solid #DBEAFE;
        }
        .filter-btn-mocktest {
          transition: color 0.2s, background 0.2s;
        }
        .badge-mocktest {
          font-family: 'Montserrat', 'Inter', sans-serif;
        }
        .band-score-dot-mocktest {
          transition: background 0.2s, color 0.2s;
        }
      `}</style>
    </div>
  );
}
