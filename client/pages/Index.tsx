import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Headphones, Mic, PenLine, Sparkles } from "lucide-react";

export default function Index() {
  // Demo data
  const user = { name: "Ngọc Chiến", streak: 5, lastScore: 7.0 };
  const skills = [
    { key: "listening", label: "Listening", icon: Headphones, color: "from-blue-500 to-blue-600", progress: 68 },
    { key: "reading", label: "Reading", icon: BookOpen, color: "from-emerald-500 to-emerald-600", progress: 52 },
    { key: "speaking", label: "Speaking", icon: Mic, color: "from-fuchsia-500 to-fuchsia-600", progress: 41 },
    { key: "writing", label: "Writing", icon: PenLine, color: "from-amber-500 to-amber-600", progress: 37 },
  ];
  return (
    <div className="dashboard-ielts space-y-8 bg-white min-h-screen font-inter-montserrat px-2 py-6">
      {/* Hero Section */}
      <section className="hero-dashboard relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-blue-100 to-green-50 p-6 flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="z-10 flex-1 w-full">
          <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold leading-tight text-blue-700 font-display mb-2">Chào mừng, {user.name}!</h1>
          <div className="text-[clamp(1rem,2vw,1.25rem)] text-gray-700 mb-3">Sẵn sàng chinh phục IELTS hôm nay?</div>
          <div className="flex flex-col gap-3 mb-4 w-full sm:flex-row sm:gap-3">
            <Button asChild size="lg" className="shadow-md w-full sm:w-auto px-8 py-3 rounded-full bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all">
              <Link to="/practice">Tiếp tục ôn luyện</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="border border-blue-200 w-full sm:w-auto px-8 py-3 rounded-full font-bold text-lg">
              <Link to="/mock-tests" className="inline-flex items-center gap-2">
                <Sparkles className="size-5" /> Thi thử ngay
              </Link>
            </Button>
         
          </div>
          <div className="flex flex-col gap-2 items-start mt-2 sm:flex-row sm:gap-4 sm:items-center">
            <span className="badge-dashboard flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-[15px] shadow"><Sparkles className="size-5 text-yellow-500" /> Chuỗi ngày chăm chỉ: {user.streak}</span>
            <span className="badge-dashboard flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-[15px] shadow">Band gần nhất: {user.lastScore}</span>
          </div>
        </div>
        {/* Illustration */}
        <div className="hidden md:block flex-1 flex justify-end items-center">
          <img src="/placeholder.svg" alt="Motivational Illustration" className="w-56 h-56 object-contain" />
        </div>
        <div className="pointer-events-none absolute -right-20 -top-16 h-40 w-40 rounded-full bg-blue-200 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-green-200 blur-3xl" />
      </section>

      {/* Skills Section with Circular Progress */}
      <section>
        <h2 className="mb-3 text-[clamp(1.1rem,2vw,1.5rem)] font-semibold">Kỹ năng của bạn</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {skills.map(skill => (
            <SkillCardCircular key={skill.key} {...skill} />
          ))}
        </div>
      </section>

      {/* Progress Charts & Band Score */}
      <section className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Tiến độ tổng thể</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <DonutChart value={Math.round(skills.reduce((a, s) => a + s.progress, 0) / skills.length)} />
            <div className="text-[clamp(1rem,2vw,1.25rem)] font-bold text-blue-700">Dự đoán Band: {user.lastScore}</div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Thi thử sắp tới</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3">
            <CountdownTimer seconds={3600} />
            <div className="text-sm text-muted-foreground">IELTS Mock Test • Academic • 60 phút</div>
            <Button asChild size="lg" className="mt-2 px-8 py-3 rounded-full bg-blue-600 text-white font-bold text-base shadow-md hover:bg-blue-700 transition-all">
              <Link to="/mock-tests">Bắt đầu</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Gamification: Badges, Leaderboard */}
      <section className="mt-8">
        <h2 className="mb-3 text-[clamp(1.1rem,2vw,1.5rem)] font-semibold">Thành tích & Bảng xếp hạng</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <span className="badge-dashboard flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-semibold text-[15px] shadow"><Sparkles className="size-5 text-orange-500" /> 7 ngày liên tiếp</span>
          <span className="badge-dashboard flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold text-[15px] shadow"><Sparkles className="size-5 text-purple-500" /> Top 10 học viên</span>
        </div>
        <div className="leaderboard-dashboard bg-gray-50 rounded-xl p-4 shadow">
          <div className="mb-2 font-bold text-gray-700">Bảng xếp hạng tuần này</div>
          <ol className="space-y-2">
            <li className="flex items-center gap-2"><span className="font-bold text-blue-600">1.</span> Ngọc Chiến <span className="ml-auto text-green-600 font-semibold">Band 7.0</span></li>
            <li className="flex items-center gap-2"><span className="font-bold text-blue-600">2.</span> Minh Anh <span className="ml-auto text-green-600 font-semibold">Band 6.5</span></li>
            <li className="flex items-center gap-2"><span className="font-bold text-blue-600">3.</span> Quang Huy <span className="ml-auto text-green-600 font-semibold">Band 6.0</span></li>
          </ol>
        </div>
      </section>

      <style>{`
        .font-inter-montserrat {
          font-family: 'Inter', 'Montserrat', sans-serif;
        }
        .font-display {
          font-family: 'Montserrat', 'Inter', sans-serif;
        }
        .hero-dashboard {
          background: linear-gradient(120deg, #EFF6FF 0%, #D1FAE5 100%);
        }
        .badge-dashboard {
          font-family: 'Montserrat', 'Inter', sans-serif;
        }
        .dashboard-ielts {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .dashboard-ielts section {
          margin-bottom: 2rem;
        }
        .hero-dashboard {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        @media (max-width: 1024px) {
          .dashboard-ielts {
            max-width: 100vw;
            padding: 0.5rem;
          }
          .hero-dashboard {
            flex-direction: row;
            gap: 1.5rem;
          }
          .dashboard-ielts section {
            margin-bottom: 1.5rem;
          }
        }
        @media (max-width: 900px) {
          .hero-dashboard {
            flex-direction: column;
            gap: 1rem;
            padding: 1.5rem;
          }
          .dashboard-ielts section {
            margin-bottom: 1rem;
          }
        }
        @media (max-width: 640px) {
          .dashboard-ielts {
            padding: 0.25rem;
          }
          .hero-dashboard {
            flex-direction: column;
            padding: 1rem;
            gap: 0.5rem;
          }
          .dashboard-ielts section {
            margin-bottom: 0.75rem;
          }
          h1, h2 {
            font-size: 1.1rem !important;
          }
          .skill-card-testdetail, .test-card-mocktest {
            font-size: 0.95rem !important;
            padding: 1rem !important;
          }
          .badge-dashboard {
            font-size: 0.9rem !important;
            padding: 0.5rem 1rem !important;
          }
          .leaderboard-dashboard {
            padding: 0.5rem !important;
          }
          .sticky-mobile-header {
            position: sticky;
            top: 0;
            z-index: 50;
            background: #fff;
            box-shadow: 0 2px 8px rgba(59,130,246,0.06);
            padding: 0.75rem 1rem;
          }
        }
      `}</style>
    </div>
  );

function SkillCardCircular({ key, label, icon: Icon, color, progress }: { key: string; label: string; icon: any; color: string; progress: number }) {
  return (
    <Link to={`/skills/${key}`} className="group block">
      <div className="relative overflow-hidden rounded-xl border bg-card p-4 shadow-md flex flex-col items-center hover:scale-[1.03] transition-transform">
        <div className="mb-2">
          <CircularProgress value={progress} color={color} icon={<Icon className="size-6" />} />
        </div>
        <div className="font-bold text-[clamp(1rem,2vw,1.15rem)] mb-1">{label}</div>
        <div className="text-xs text-muted-foreground">{progress}% hoàn thành</div>
      </div>
    </Link>
  );
}

// Circular progress ring for skill cards
function CircularProgress({ value, color, icon }: { value: number; color: string; icon: React.ReactNode }) {
  // SVG circle math
  const radius = 24, stroke = 5, normalizedRadius = radius - stroke, circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <svg width={radius * 2} height={radius * 2}>
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={`url(#${color.replace(/[^a-z0-9]/gi, '')})`}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{ transition: 'stroke-dashoffset 0.6s' }}
        />
        <defs>
          <linearGradient id={color.replace(/[^a-z0-9]/gi, '')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color.includes('blue') ? '#3B82F6' : color.includes('emerald') ? '#10B981' : color.includes('fuchsia') ? '#A21CAF' : '#F59E42'} />
            <stop offset="100%" stopColor={color.includes('blue') ? '#2563EB' : color.includes('emerald') ? '#059669' : color.includes('fuchsia') ? '#C026D3' : '#F59E42'} />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[1.1rem] font-bold text-gray-700">{icon}</span>
    </div>
  );
}

// Countdown timer for mock test
function CountdownTimer({ seconds }: { seconds: number }) {
  const [time, setTime] = useState(seconds);
  useEffect(() => {
    const interval = setInterval(() => setTime(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(interval);
  }, [seconds]);
  const min = Math.floor(time / 60), sec = time % 60;
  return (
    <div className="countdown-timer-dashboard text-[clamp(1.1rem,2vw,1.5rem)] font-bold text-orange-600">
      Thi thử bắt đầu sau: {min}:{String(sec).padStart(2, '0')}
    </div>
  );
}

// Donut chart for overall progress
function DonutChart({ value }: { value: number }) {
  const radius = 36, stroke = 8, normalizedRadius = radius - stroke, circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg width={radius * 2} height={radius * 2}>
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#3B82F6"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{ transition: 'stroke-dashoffset 0.6s' }}
        />
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[1.2rem] font-bold text-blue-700">{value}%</span>
    </div>
  );
}
}
