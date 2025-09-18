import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones, BookOpen, Mic, PenLine, ArrowUpRight } from "lucide-react";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Progress as Bar } from "@/components/ui/progress";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const SKILLS = [
  { key: "Listening", color: "#2563EB", accent: "bg-blue-50", icon: <Headphones className="size-6 text-[#2563EB]" />, status: "Đang tiến bộ" },
  { key: "Reading", color: "#22C55E", accent: "bg-green-50", icon: <BookOpen className="size-6 text-[#22C55E]" />, status: "Cần cải thiện" },
  { key: "Speaking", color: "#F59E42", accent: "bg-orange-50", icon: <Mic className="size-6 text-[#F59E42]" />, status: "Hoàn thành tốt" },
  { key: "Writing", color: "#A855F7", accent: "bg-purple-50", icon: <PenLine className="size-6 text-[#A855F7]" />, status: "Đang tiến bộ" },
];

const weekly = [
  { week: "W1", score: 5.5 },
  { week: "W2", score: 5.8 },
  { week: "W3", score: 6.0 },
  { week: "W4", score: 6.5 },
];

export default function Progress() {
  const [tab, setTab] = React.useState("overview");
  // Example skill values
  const skillValues = { Listening: 68, Reading: 52, Speaking: 41, Writing: 37 };
  // Example weekly progress delta
  const weeklyDelta = weekly.map((w, i) => i === 0 ? 0 : +(w.score - weekly[i - 1].score).toFixed(1));

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-inter-montserrat">
  <div className="max-w-4xl mx-auto py-3 md:py-6 px-2 sm:px-3 md:px-0">
  <h1 className="text-[18px] sm:text-[20px] md:text-[24px] font-bold text-[#2563EB] font-display mb-2 sm:mb-3 md:mb-4">Kết quả học tập</h1>
        {/* Tab Navigation */}
  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4 md:mb-6">
          <button onClick={() => setTab("overview")} className={`px-3 md:px-4 py-2 rounded-full font-semibold text-[14px] md:text-[15px] border ${tab === "overview" ? "bg-[#2563EB] text-white border-[#2563EB]" : "bg-white text-[#2563EB] border-blue-200"}`}>Tổng quan</button>
          <button onClick={() => setTab("skill")} className={`px-3 md:px-4 py-2 rounded-full font-semibold text-[14px] md:text-[15px] border ${tab === "skill" ? "bg-[#22C55E] text-white border-[#22C55E]" : "bg-white text-[#22C55E] border-green-200"}`}>Theo kỹ năng</button>
          <button onClick={() => setTab("week")} className={`px-3 md:px-4 py-2 rounded-full font-semibold text-[14px] md:text-[15px] border ${tab === "week" ? "bg-[#F59E42] text-white border-[#F59E42]" : "bg-white text-[#F59E42] border-orange-200"}`}>Theo tuần</button>
        </div>
        {/* Section: Goal Progress */}
        {tab === "overview" && (
          <div className="bg-white rounded-2xl shadow-sm p-3 sm:p-4 md:p-6 mb-3 sm:mb-4 md:mb-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-bold text-[15px] md:text-[16px] text-[#2563EB]">Mục tiêu điểm tổng</span>
              <span className="text-xs md:text-sm text-gray-500">6.5 / 7.0 mục tiêu</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="relative w-12 h-12 md:w-16 md:h-16">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <circle cx="18" cy="18" r="16" fill="#F9FAFB" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#2563EB" strokeWidth="4" strokeDasharray="100" strokeDashoffset={100 - 85} style={{ transition: "stroke-dashoffset 0.3s" }} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-bold text-[15px] md:text-[18px] text-[#2563EB]">85%</span>
              </div>
              <span className="text-xs md:text-sm text-[#22C55E] font-semibold">Đang tiến bộ</span>
            </div>
          </div>
        )}
        {/* Section: Weekly Progress Line Chart */}
        {(tab === "overview" || tab === "week") && (
          <div className="bg-white rounded-2xl shadow-sm p-3 sm:p-4 md:p-6 mb-3 sm:mb-4 md:mb-6">
            <div className="mb-2 font-bold text-[15px] md:text-[16px] text-[#2563EB]">Diễn tiến theo tuần</div>
            <div className="w-full h-36 sm:h-44 md:h-56">
              <LineChart width={window.innerWidth < 640 ? 260 : window.innerWidth < 768 ? 340 : 400} height={window.innerWidth < 640 ? 110 : window.innerWidth < 768 ? 140 : 180} data={weekly} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" tickLine={false} axisLine={false} />
                <YAxis domain={[5, 7]} tickLine={false} axisLine={false} />
                <Tooltip content={({ active, payload, label }) => active && payload && payload[0] ? (
                  <div className="bg-white rounded-lg shadow px-3 py-2 text-xs md:text-sm border border-[#E5E7EB]">
                    <div className="font-bold text-[#2563EB]">{label} – {payload[0].value} điểm</div>
                    <div className="text-gray-500">{weeklyDelta[weekly.findIndex(w => w.week === label)] > 0 ? `+${weeklyDelta[weekly.findIndex(w => w.week === label)]}` : weeklyDelta[weekly.findIndex(w => w.week === label)]} so với tuần trước</div>
                  </div>
                ) : null} />
                <Line type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2} dot={{ r: 5, stroke: '#2563EB', strokeWidth: 2, fill: '#fff' }} isAnimationActive />
              </LineChart>
            </div>
          </div>
        )}
        {/* Section: Skill Progress Cards */}
        {(tab === "overview" || tab === "skill") && (
          <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {SKILLS.map(skill => (
              <div key={skill.key} className={`bg-white rounded-2xl shadow-md p-3 sm:p-4 md:p-5 flex flex-col items-center gap-2 ${skill.accent}`} style={{ borderRadius: 16, boxShadow: "0 2px 12px #E5E7EB" }}>
                <div className="mb-2">{skill.icon}</div>
                <div className="font-bold text-[15px] md:text-[16px] text-gray-700">{skill.key}</div>
                <div className="relative w-12 h-12 md:w-14 md:h-14 mb-2">
                  <svg viewBox="0 0 36 36" className="w-full h-full">
                    <circle cx="18" cy="18" r="16" fill="#F9FAFB" />
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                    <circle cx="18" cy="18" r="16" fill="none" stroke={skill.color} strokeWidth="4" strokeDasharray="100" strokeDashoffset={100 - skillValues[skill.key]} style={{ transition: "stroke-dashoffset 0.3s" }} />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-bold text-[14px] md:text-[16px] text-gray-700">{skillValues[skill.key]}%</span>
                </div>
                <div className="flex items-center gap-1 text-xs md:text-sm font-semibold">
                  <span className={skill.status === "Hoàn thành tốt" ? "text-[#22C55E]" : skill.status === "Cần cải thiện" ? "text-[#F59E42]" : "text-[#2563EB]"}>{skill.status}</span>
                  <ArrowUpRight className="size-4 text-[#22C55E] animate-fade-in" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`
        .font-inter-montserrat {
          font-family: 'Inter', 'Montserrat', sans-serif;
        }
        .font-display {
          font-family: 'Montserrat', 'Inter', sans-serif;
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(-8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s cubic-bezier(.4,2,.3,1) both;
        }
      `}</style>
    </div>
  );
}

function SkillProgress({ title, value }: { title: string; value: number }) {
  // ...no longer used, replaced by new skill card UI above
}
