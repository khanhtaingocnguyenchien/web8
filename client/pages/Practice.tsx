import { useState } from "react";
import ListeningPanel from "./ListeningPanel";
function ReadingPanel() {
  const [selected, setSelected] = useState<Record<string, number | null>>({});
  const passage = `Universities often host campus orientation to help new students become familiar with the facilities and services. Participants usually visit the library, sports center, and student union.`;
  const questions = [
    {
      id: "r1",
      text: "What is the main purpose of campus orientation?",
      options: ["To introduce new students to facilities", "To organize sports events", "To teach academic subjects", "To register for classes"],
      answer: 0,
    },
    {
      id: "r2",
      text: "Which place is NOT mentioned as part of the tour?",
      options: ["Library", "Sports center", "Student union", "Cafeteria"],
      answer: 3,
    },
    {
      id: "r3",
      text: "Who usually participates in campus orientation?",
      options: ["New students", "Teachers", "Parents", "Alumni"],
      answer: 0,
    },
    {
      id: "r4",
      text: "Which facility is commonly visited during orientation?",
      options: ["Library", "Gym", "Cafeteria", "Dormitory"],
      answer: 0,
    },
    {
      id: "r5",
      text: "What is the benefit of campus orientation?",
      options: ["Familiarize with campus", "Get free books", "Meet alumni", "Enroll in classes"],
      answer: 0,
    },
  ];
  // Simulate scroll progress for demo
  const [scrollProgress, setScrollProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const passageRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!passageRef.current) return;
      const el = passageRef.current;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setScrollProgress(scrollHeight ? Math.min(1, scrollTop / scrollHeight) : 0);
    };
    const el = passageRef.current;
    if (el) el.addEventListener('scroll', handleScroll);
    return () => el && el.removeEventListener('scroll', handleScroll);
  }, []);
  // Highlight key words (demo: 'orientation', 'library')
  const highlightWords = ['orientation', 'library'];
  const passageHtml = passage.split(' ').map((word, i) => {
    const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (highlightWords.includes(cleanWord)) {
      return `<span class='highlight-word' title='${cleanWord === 'orientation' ? 'Định hướng' : 'Thư viện'}'>${word}</span>`;
    }
    return word;
  }).join(' ');
  return (
    <div className={`grid gap-6 sm:grid-cols-2 bg-white font-inter-montserrat`}>
      <div className="reading-card-modern relative">
        {/* Progress bar at top */}
        <div className="progress-bar-modern bg-green-100 rounded-full h-2 w-full mb-4">
          <div className="progress-inner-modern bg-green-400 h-full rounded-full transition-all" style={{ width: `${scrollProgress * 100}%` }} />
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[22px] font-bold text-gray-900 font-display">Đoạn văn</span>
        </div>
        <div className="passage-scroll relative">
          <div
            ref={passageRef}
            className="passage-content-modern text-[18px] leading-relaxed whitespace-pre-line overflow-y-auto pr-6 text-gray-700"
            style={{ maxHeight: 220 }}
            dangerouslySetInnerHTML={{ __html: passageHtml.repeat(4) }}
          />
          <div className="scroll-indicator-modern absolute top-0 right-0 h-full w-2 rounded-full bg-gray-100">
            <div className="scroll-progress-modern w-full rounded-full bg-green-400 transition-all" style={{ height: `${scrollProgress * 100}%` }} />
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500">Word count: {passage.split(' ').length * 4} | Reading speed: 210 words/min</div>
      </div>
      <div className="questions-group space-y-4">
        {questions.map((q, idx) => (
          <div key={q.id} className="question-card-modern p-5 rounded-2xl shadow-sm bg-gray-50 border border-gray-200">
            <div className="flex items-center mb-2">
              <span className="text-green-600 font-bold text-lg mr-2">Câu {idx + 1}</span>
              <span className="font-semibold text-gray-800 text-base">{q.text}</span>
            </div>
            <div className="flex flex-col gap-3 mt-2">
              {q.options.map((o, oidx) => (
                <label key={o} className={`radio-modern flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer transition-all
                  ${selected[q.id] === oidx ? 'selected-answer-modern' : 'hover:bg-green-50'}` }>
                  <input
                    type="radio"
                    name={q.id}
                    value={o}
                    checked={selected[q.id] === oidx}
                    onChange={() => setSelected((prev) => ({ ...prev, [q.id]: oidx }))}
                    className="radio-input-modern"
                  />
                  <span className="radio-circle-modern mr-2" />
                  <span className="text-[16px] text-gray-700">{o}</span>
                </label>
              ))}
            </div>
            {selected[q.id] !== null && (
              <div className="text-xs text-green-600 mt-2 font-semibold">Bạn đã chọn</div>
            )}
          </div>
        ))}
      </div>
      <style>{`
        .font-inter-montserrat {
          font-family: 'Inter', 'Montserrat', sans-serif;
        }
        .reading-card-modern {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(59,130,246,0.06);
          border: 1px solid #E5E7EB;
          padding: 2rem;
          position: relative;
        }
        .passage-content-modern {
          background: #fff;
          border-radius: 8px;
          border: 1px solid #F3F4F6;
          padding: 1rem;
          margin-bottom: 0.5rem;
          font-size: 18px;
          line-height: 1.7;
        }
        .highlight-word {
          background: #FDE68A;
          color: #B45309;
          border-radius: 4px;
          padding: 0 2px;
          cursor: pointer;
          border-bottom: 1px dotted #FACC15;
        }
        .highlight-word:hover {
          background: #FDE68A;
          color: #92400E;
        }
        .progress-bar-modern {
          background: #DCFCE7;
        }
        .progress-inner-modern {
          background: #10B981;
        }
        .scroll-indicator-modern {
          background: #F3F4F6;
        }
        .scroll-progress-modern {
          background: #10B981;
        }
        .questions-group {
          font-size: 16px;
        }
        .question-card-modern {
          font-size: 16px;
          background: #F9FAFB;
          border-radius: 16px;
          box-shadow: 0 1px 6px rgba(59,130,246,0.04);
          border: 1px solid #E5E7EB;
        }
        .radio-modern {
          position: relative;
          font-size: 16px;
          background: #fff;
          border: 1.5px solid #E5E7EB;
          transition: border 0.2s, background 0.2s;
        }
        .radio-modern:hover {
          border-color: #10B981;
          background: #F0FDF4;
        }
        .radio-input-modern {
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 2px solid #E5E7EB;
          background: #fff;
          margin-right: 0.5rem;
          outline: none;
          transition: border 0.2s;
          position: relative;
        }
        .radio-input-modern:checked {
          border-color: #10B981;
        }
        .radio-circle-modern {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #E5E7EB;
          box-sizing: border-box;
          position: relative;
        }
        .radio-input-modern:checked + .radio-circle-modern {
          border-color: #10B981;
          background: #10B981;
        }
        .selected-answer-modern {
          background: #DCFCE7 !important;
          border: 1.5px solid #10B981 !important;
        }
      `}</style>
    </div>
  );
}
import { useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones, BookOpen, Mic, PenLine, Play } from "lucide-react";

export default function Practice() {
  return (
  <div className="space-y-6 min-h-screen pb-8 px-2 bg-neutral-bg">
      <h1 className="text-3xl font-extrabold text-center mb-4 text-blue-700 tracking-tight drop-shadow-xl font-display">Luyện tập kỹ năng</h1>
      <div className="flex justify-center mb-4">
        <div className="h-1 w-32 bg-blue-300 rounded-full" />
      </div>
      <Tabs defaultValue="listening" className="w-full">
  <TabsList className="grid w-full grid-cols-4 rounded-xl shadow-lg bg-transparent mb-4 min-h-[64px]">
    <TabsTrigger value="listening" className="tab-btn" data-skill="listening">
      <Headphones className="mr-2 size-6 text-blue-500" />
      <span className="hidden sm:inline">Listening</span>
    </TabsTrigger>
    <TabsTrigger value="reading" className="tab-btn" data-skill="reading">
      <BookOpen className="mr-2 size-6 text-green-500" />
      <span className="hidden sm:inline">Reading</span>
    </TabsTrigger>
    <TabsTrigger value="speaking" className="tab-btn" data-skill="speaking">
      <Mic className="mr-2 size-6 text-orange-500" />
      <span className="hidden sm:inline">Speaking</span>
    </TabsTrigger>
    <TabsTrigger value="writing" className="tab-btn" data-skill="writing">
      <PenLine className="mr-2 size-6 text-purple-500" />
      <span className="hidden sm:inline">Writing</span>
    </TabsTrigger>
  </TabsList>
  <style>{`
    .bg-neutral-bg {
      background: #F9FAFB;
      min-height: 100vh;
      width: 100%;
      position: relative;
    }
    .tab-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 64px;
      font-weight: 600;
      font-size: 1.15rem;
      border-radius: 0.75rem;
      background: transparent;
      cursor: pointer;
      outline: none;
      border: none;
      position: relative;
      color: #374151;
      box-shadow: none;
      border-bottom: 2px solid transparent;
      transition: color 0.2s, border-bottom 0.2s;
    }
    .tab-btn[data-skill="listening"] {
      --accent: #3B82F6;
    }
    .tab-btn[data-skill="reading"] {
      --accent: #10B981;
    }
    .tab-btn[data-skill="speaking"] {
      --accent: #F97316;
    }
    .tab-btn[data-skill="writing"] {
      --accent: #8B5CF6;
    }
    .tab-btn:hover:not([data-state="active"]) {
      color: var(--accent, #2563EB);
      background: #F3F4F6;
    }
    .tab-btn[data-state="active"] {
      color: var(--accent, #2563EB);
      font-weight: 700;
      border-bottom: 2.5px solid var(--accent, #2563EB);
      background: #fff;
    }
    @media (max-width: 640px) {
      .tab-btn span { display: none; }
      .tab-btn { font-size: 1.05rem; height: 56px; }
    }
    .practice-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(59,130,246,0.06);
      border: 1px solid #E5E7EB;
      padding: 2rem;
      margin-bottom: 1.5rem;
    }
  `}</style>
        <TabsContent value="listening" className="mt-4">
          <ListeningPanel />
        </TabsContent>
        <TabsContent value="reading" className="mt-4">
          <ReadingPanel />
        </TabsContent>
        <TabsContent value="speaking" className="mt-4">
          <Card className="p-10 rounded-3xl shadow-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 via-pink-100 to-red-50">
            <div className="mb-8">
              <span className="text-2xl font-extrabold text-orange-600 mb-2 block font-display tracking-tight">IELTS Speaking Practice</span>
              <span className="text-base text-pink-500">Chủ đề: Talk about your favorite hobby</span>
            </div>
            <div className="mb-8">
              <ul className="list-disc pl-5 text-base text-gray-700 space-y-2">
                <li>Giới thiệu về sở thích của bạn</li>
                <li>Lý do bạn thích sở thích này</li>
                <li>Thời gian bạn dành cho sở thích</li>
                <li>Ảnh hưởng của sở thích đến cuộc sống</li>
              </ul>
            </div>
            <div className="mb-8 flex flex-col items-center">
              {/* Recording button state logic */}
              {(() => {
                // Simulated state for demo; replace with actual state logic
                const [isRecording, setIsRecording] = useState(false);
                const [isSaved, setIsSaved] = useState(false);
                const [recordTime, setRecordTime] = useState(0);
                // Simulate timer for demo
                useEffect(() => {
                  let timer;
                  if (isRecording) {
                    timer = setInterval(() => setRecordTime(t => t + 1), 1000);
                  } else if (!isRecording) {
                    clearInterval(timer);
                  }
                  return () => clearInterval(timer);
                }, [isRecording]);
                // Format time mm:ss
                const formatTime = t => `${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`;
                // Button color and icon
                let btnColor = '#F97316', btnShadow = '0 4px 20px 0 rgba(249,115,22,0.15)', icon = <Mic size={32} color="#fff" />, label = 'Bắt đầu ghi âm';
                if (isRecording) {
                  btnColor = '#DC2626';
                  btnShadow = '0 4px 20px 0 rgba(220,38,38,0.15)';
                  icon = <Mic size={32} color="#fff" className="pulse" />;
                  label = 'Đang ghi âm';
                } else if (isSaved) {
                  btnColor = '#22C55E';
                  btnShadow = '0 4px 20px 0 rgba(34,197,94,0.15)';
                  icon = <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
                  label = 'Lưu ghi âm';
                }
                return (
                  <>
                    <button
                      className="record-btn mb-2"
                      style={{ background: btnColor, boxShadow: btnShadow }}
                      aria-label={label}
                      onClick={() => {
                        if (isSaved) return;
                        if (isRecording) { setIsRecording(false); setIsSaved(true); } else { setIsRecording(true); setIsSaved(false); setRecordTime(0); }
                      }}
                    >
                      {icon}
                    </button>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="record-label">{label}</span>
                      {isRecording && <span className="record-time">{formatTime(recordTime)}</span>}
                    </div>
                  </>
                );
              })()}
              <style>{`
                .record-btn {
                  width: 80px;
                  height: 80px;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border: none;
                  outline: none;
                  transition: background 0.2s, box-shadow 0.2s;
                  box-shadow: 0 4px 20px 0 rgba(0,0,0,0.10);
                  position: relative;
                  cursor: pointer;
                }
                .record-btn:hover {
                  filter: brightness(1.1);
                }
                .pulse {
                  animation: pulse 1s infinite;
                }
                @keyframes pulse {
                  0% { filter: drop-shadow(0 0 0 #DC2626); }
                  50% { filter: drop-shadow(0 0 12px #DC2626); }
                  100% { filter: drop-shadow(0 0 0 #DC2626); }
                }
                .record-label {
                  font-size: 1rem;
                  font-weight: 600;
                  color: #111827;
                }
                .record-time {
                  font-size: 1rem;
                  font-weight: 500;
                  color: #374151;
                  background: #F3F4F6;
                  border-radius: 6px;
                  padding: 2px 8px;
                  margin-left: 4px;
                }
                  
              `}</style>
            </div>
            <textarea className="w-full p-4 rounded-xl border-2 border-orange-300 mb-4 text-base" rows={5} placeholder="Ghi chú ý chính hoặc ý tưởng..." />
            <div className="text-sm text-pink-500 font-medium">Hướng dẫn: Nói ít nhất 1 phút, tập trung vào lý do bạn thích sở thích này.</div>
          </Card>
        </TabsContent>
        <TabsContent value="writing" className="mt-4">
          <Card className="p-8 md:p-10 rounded-3xl shadow-xl border border-gray-200 bg-white">
            <div className="mb-8">
              <span className="text-2xl font-extrabold mb-2 block font-display tracking-tight text-indigo-700" style={{ fontFamily: 'Montserrat, Inter, sans-serif' }}>IELTS Writing Practice</span>
              <span className="text-base text-blue-500 font-medium">Đề bài: Write about the advantages and disadvantages of studying abroad.</span>
            </div>
            <ul className="list-disc pl-5 text-base text-gray-700 space-y-2 mb-6">
              <li>Viết tối thiểu <span className="font-bold text-blue-600">250 từ</span>.</li>
              <li>Cấu trúc: mở bài, thân bài 2 ý, kết luận.</li>
              <li>Chấm điểm theo <span className="font-bold text-indigo-600">Task Response, Coherence, Lexical, Grammar</span>.</li>
            </ul>
            <textarea className="w-full p-5 rounded-2xl border border-blue-200 mb-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-blue-50 transition-all" rows={8} placeholder="Write down key points here…" style={{ fontFamily: 'Inter, Montserrat, sans-serif', background: '#fff', color: '#333', resize: 'vertical' }} />
            <div className="text-sm text-blue-500 font-medium mb-2">Tip: Manage your time, outline before writing, check grammar and vocabulary.</div>
            <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-2">
              <span>Word count</span>
              <span className="word-count-highlight">0 / 250</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-blue-100 mb-2">
              <div className="h-full bg-blue-400 transition-all" style={{ width: `0%` }} />
            </div>
            <button className="mt-4 px-6 py-3 rounded-full bg-blue-600 text-white font-bold text-base shadow-md hover:bg-blue-700 transition-all" type="button">Submit</button>
          </Card>
          <style>{`
            .word-count-highlight {
              color: #2563eb;
              font-weight: 700;
              transition: color 0.2s;
            }
            textarea:focus {
              box-shadow: 0 0 0 4px #bfdbfe;
            }
          `}</style>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ListeningPanel moved to ListeningPanel.tsx

export function LessonItem({ title, progress }: { title: string; progress: number }) {
  return (
    <a href="/practice/campus-orientation" className="block rounded-lg border p-3 hover:bg-accent/50">
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium">{title}</span>
        <span className="text-muted-foreground">{progress}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </a>
  );
}
