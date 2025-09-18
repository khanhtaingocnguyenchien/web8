import * as React from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const COLORS = {
  bg: "#F9FAFB",
  surface: "#FFFFFF",
  border: "#E5E7EB",
  text: "#111827",
  textMuted: "#374151",
  note: "#6B7280",
  primary: "#2563EB",
  primaryDark: "#1D4ED8",
  primaryTint: "#DBEAFE",
  success: "#22C55E",
  danger: "#EF4444",
};

const QUESTIONS = [
  {
    id: 1,
    audio: "/audio/sample-listening.mp3",
    question: "What is the main topic of the audio?",
    options: ["Campus life", "Health tips", "Travel plans"],
    answer: 0,
  },
  {
    id: 2,
    audio: "/audio/sample-listening.mp3",
    question: "What should students bring to orientation?",
    options: ["Passport", "Student ID", "Laptop"],
    answer: 1,
  },
  {
    id: 3,
    audio: "/audio/sample-listening.mp3",
    question: "Where is the library located?",
    options: ["North Wing", "South Wing", "East Wing", "West Wing"],
    answer: 2,
  },
  {
    id: 4,
    audio: "/audio/sample-listening.mp3",
    question: "Who usually participates in campus orientation?",
    options: ["New students", "Teachers", "Parents", "Alumni"],
    answer: 0,
  },
  {
    id: 5,
    audio: "/audio/sample-listening.mp3",
    question: "Which place is NOT mentioned as part of the tour?",
    options: ["Library", "Sports center", "Student union", "Cafeteria"],
    answer: 3,
  },
];

export default function ExamListening() {
  const [idx, setIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<number, number | null>>(() => Object.fromEntries(QUESTIONS.map(q => [q.id, null])));
  const [playing, setPlaying] = React.useState(false);
  const [timer, setTimer] = React.useState(15 * 60); // 15:00
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();
  const [showSubmit, setShowSubmit] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const q = QUESTIONS[idx];
  const selected = answers[q.id];

  // Timer
  const timerLow = timer <= 120;
  React.useEffect(() => {
    const id = setInterval(() => setTimer(t => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(timer / 60)).padStart(2, "0");
  const ss = String(timer % 60).padStart(2, "0");

  // Audio controls
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };
  React.useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onEnded = () => setPlaying(false);
    el.addEventListener("ended", onEnded);
    return () => el.removeEventListener("ended", onEnded);
  }, []);

  // Progress
  const answeredCount = Object.values(answers).filter(v => v !== null).length;
  const progressPct = Math.round((answeredCount / QUESTIONS.length) * 100);

  // Handlers
  const setAnswer = (optIndex: number) => setAnswers(prev => ({ ...prev, [q.id]: optIndex }));
  const goNext = () => setIdx(i => Math.min(i + 1, QUESTIONS.length - 1));
  const goPrev = () => setIdx(i => Math.max(i - 1, 0));

  // Demo: 1 part, 5 questions
  const PARTS = [
    { label: "Part 1", start: 1, end: 5 },
  ];
  const currentPart = PARTS.find(p => q.id >= p.start && q.id <= p.end) || PARTS[0];
  const totalQuestions = 5;
  // Progress bar with checkpoints
  const checkpoints = PARTS.map(p => ((p.start - 1) / totalQuestions) * 100);

  const handleSubmit = () => {
    // Chấm điểm
    let correct = 0;
    let incorrect = 0;
    QUESTIONS.forEach(q => {
      if (answers[q.id] === q.answer) correct++;
      else if (answers[q.id] !== null) incorrect++;
    });
    setScore(Math.round((correct / QUESTIONS.length) * 10));
    setCorrectCount(correct);
    setIncorrectCount(incorrect);
    setShowSubmit(false);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setShowResult(true);
      navigate("/exam/listening/result", { state: { score, correct, incorrect, answers } });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-inter-montserrat">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-30 w-full bg-white shadow-sm border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between py-3 px-2 md:px-4 gap-2 md:gap-0">
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <span className="text-[16px] md:text-[18px] font-bold text-[#2563EB] font-display">{currentPart.label}</span>
            <span className="text-[15px] md:text-[16px] font-semibold text-[#374151]">Câu {q.id}/40</span>
            <span className="inline-flex items-center gap-1 px-2 md:px-3 py-1 rounded-full bg-[#2563EB] text-white text-[13px] md:text-[14px] font-bold">Đang thi</span>
            <span className="inline-flex items-center gap-1 px-2 md:px-3 py-1 rounded-full bg-[#D1D5DB] text-[#2563EB] text-[13px] md:text-[14px] font-bold">No replays</span>
            <span className="inline-flex items-center gap-1 px-2 md:px-3 py-1 rounded-full bg-[#DBEAFE] text-[#2563EB] text-[13px] md:text-[14px] font-bold">1x</span>
          </div>
          <span className={`inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full font-semibold text-[15px] md:text-[16px] shadow ${timerLow ? "bg-[#EF4444] animate-pulse" : "bg-[#22C55E]"} text-white`}>
            ⏱ {mm}:{ss}
          </span>
        </div>
        <div className="max-w-4xl mx-auto px-2 md:px-4 pb-2">
          <div className="w-full h-2 bg-[#E5E7EB] rounded-full relative">
            <div className="h-full bg-[#2563EB] rounded-full transition-all" style={{ width: `${(answeredCount / totalQuestions) * 100}%` }} />
            {/* Checkpoints for each part */}
            {checkpoints.map((pct, i) => (
              <div key={i} className="absolute top-0 h-2 w-0.5 bg-[#2563EB]" style={{ left: `${pct}%` }} />
            ))}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex flex-col items-center pt-6 md:pt-8 pb-32 px-2 md:px-0">
        {/* Audio Card */}
        <div className="w-full max-w-lg md:max-w-2xl mb-4 md:mb-6">
          <div className="rounded-2xl bg-white border border-[#E5E7EB] shadow-sm p-4 md:p-6">
            <div className="mb-3 md:mb-4 font-bold text-[15px] md:text-[16px] text-[#111827]">Audio</div>
            <div className="flex flex-col items-center">
              <audio ref={audioRef} src={q.audio} className="hidden" />
              <button
                className="w-14 md:w-16 h-14 md:h-16 rounded-full bg-[#2563EB] flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all mb-2"
                onClick={handlePlayPause}
              >
                {playing ? <Pause className="text-white size-8 md:size-10" /> : <Play className="text-white size-8 md:size-10" />}
              </button>
              {/* Progress bar (audio) */}
              <div className="w-full max-w-[220px] md:max-w-xs h-2 bg-[#D1D5DB] rounded-full overflow-hidden">
                <div className="h-full bg-[#2563EB] transition-all" style={{ width: "40%" }} />
              </div>
            </div>
          </div>
        </div>
        {/* Question Card */}
        <div className="w-full max-w-lg md:max-w-2xl mb-4 md:mb-6">
          <div className="rounded-2xl bg-white border border-[#E5E7EB] shadow-sm p-4 md:p-6">
            <div className="mb-3 md:mb-4 font-bold text-[17px] md:text-[18px] text-[#111827]">Câu hỏi</div>
            <div className="mb-2 text-[15px] md:text-[16px] text-[#374151] font-semibold">{q.question}</div>
            <div className="flex flex-col gap-3 md:gap-4">
              {q.options.map((opt, idx) => (
                <label
                  key={idx}
                  className={`flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl border border-[#E5E7EB] cursor-pointer transition-all text-[15px] md:text-[16px] font-medium ${selected === idx ? "bg-[#DBEAFE] border-[#2563EB] animate-check" : "bg-white hover:bg-[#F3F4F6]"}`}
                  onClick={() => setAnswer(idx)}
                >
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    checked={selected === idx}
                    onChange={() => setAnswer(idx)}
                    className="form-radio accent-[#2563EB] w-5 h-5"
                  />
                  <span className="text-[#374151]">{opt}</span>
                  {selected === idx && <span className="ml-2 text-[#22C55E] animate-check">✓</span>}
                </label>
              ))}
            </div>
            <div className="flex flex-col md:flex-row justify-between mt-5 md:mt-6 gap-2 md:gap-0">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-2 border-[#2563EB] text-[#2563EB] font-bold px-4 py-2"
                onClick={goPrev}
                disabled={idx === 0}
              >
                <ChevronLeft className="size-4 mr-1" /> Trước
              </Button>
              {idx === QUESTIONS.length - 1 ? (
                <Button
                  size="sm"
                  className="rounded-full bg-[#2563EB] text-white font-bold px-6 py-2 shadow-md hover:bg-[#1D4ED8] transition-all"
                  onClick={() => setShowSubmit(true)}
                >
                  Nộp bài
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-2 border-[#2563EB] text-[#2563EB] font-bold px-4 py-2"
                  onClick={goNext}
                >
                  Tiếp <ChevronRight className="size-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="w-full max-w-lg md:max-w-2xl mb-4 md:mb-6">
          <div className="mt-3 md:mt-4 text-[13px] md:text-[14px] text-[#6B7280]">Chọn đáp án và nộp bài khi hoàn thành.</div>
        </div>
      </div>
      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-white border-t border-[#E5E7EB] shadow-lg py-3 md:py-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-2 md:gap-4 justify-end px-2 md:px-4">
          <Button
            variant="outline"
            size="lg"
            className="px-6 md:px-8 py-2 md:py-3 rounded-full border-2 border-[#2563EB] text-[#2563EB] font-bold text-[15px] md:text-[16px] hover:bg-[#DBEAFE] transition-all"
          >
            Lưu tạm
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-6 md:px-8 py-2 md:py-3 rounded-full border-2 border-[#2563EB] text-[#2563EB] font-bold text-[15px] md:text-[16px] hover:bg-[#DBEAFE] transition-all"
          >
            Xem lại
          </Button>
          <Button
            size="lg"
            className="px-6 md:px-8 py-2 md:py-3 rounded-full bg-[#2563EB] text-white font-bold text-[15px] md:text-[16px] shadow-md hover:bg-[#1D4ED8] transition-all"
            onClick={() => setShowSubmit(true)}
          >
            Nộp bài
          </Button>
        </div>
      </div>
      {/* Submit confirmation dialog */}
      {showSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 px-2">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-sm w-full">
            <div className="text-[17px] md:text-[18px] font-bold mb-2 text-[#2563EB]">Xác nhận nộp bài?</div>
            <div className="text-[14px] md:text-[15px] text-[#374151] mb-6">Bạn còn {totalQuestions - answeredCount} câu chưa chọn. Bạn có chắc chắn muốn nộp bài?</div>
            <div className="flex gap-3 md:gap-4 justify-end">
              <Button variant="outline" onClick={() => setShowSubmit(false)} className="rounded-full px-5 md:px-6 py-2 border-2 border-[#2563EB] text-[#2563EB] font-bold">Huỷ</Button>
              <Button onClick={handleSubmit} className="rounded-full px-5 md:px-6 py-2 bg-[#2563EB] text-white font-bold">Nộp bài</Button>
            </div>
          </div>
        </div>
      )}
      {/* Result Page (modal) */}
      {showResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 px-2">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-md w-full">
            <div className="text-[20px] md:text-[22px] font-bold mb-2 text-[#2563EB]">Kết quả bài thi</div>
            <div className="text-[15px] md:text-[16px] text-[#374151] mb-4">Điểm số: <span className="font-bold text-[#22C55E]">{score}/10</span></div>
            <div className="mb-4 flex gap-4 md:gap-6">
              <span className="text-[14px] md:text-[15px] text-[#2563EB]">Đúng: <b>{correctCount}</b></span>
              <span className="text-[14px] md:text-[15px] text-[#EF4444]">Sai: <b>{incorrectCount}</b></span>
            </div>
            <div className="mb-4">
              <div className="font-bold mb-2 text-[#2563EB]">Review đáp án:</div>
              <ul className="space-y-2">
                {QUESTIONS.map(q => (
                  <li key={q.id} className="text-[14px] md:text-[15px]">
                    <span className="font-semibold">Câu {q.id}:</span> {q.question}
                    <br />
                    <span className="mr-2">Đáp án của bạn: <b className={answers[q.id] === q.answer ? 'text-[#22C55E]' : 'text-[#EF4444]'}>{q.options[answers[q.id] ?? -1] ?? "(chưa chọn)"}</b></span>
                    <span>Đáp án đúng: <b className="text-[#2563EB]">{q.options[q.answer]}</b></span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setShowResult(false)} className="rounded-full px-5 md:px-6 py-2 bg-[#2563EB] text-white font-bold">Đóng</Button>
            </div>
          </div>
        </div>
      )}
      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-50 bg-[#2563EB] text-white px-5 md:px-6 py-2 md:py-3 rounded-full shadow-lg font-semibold animate-fade-in">Đã nộp bài ✓</div>
      )}
      <style>{`
        .font-inter-montserrat {
          font-family: 'Inter', 'Montserrat', sans-serif;
        }
        .font-display {
          font-family: 'Montserrat', 'Inter', sans-serif;
        }
        @keyframes check {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-check {
          animation: check 0.4s cubic-bezier(.4,2,.3,1) both;
        }
      `}</style>
    </div>
  );
}
