import React, { useState } from "react";
import { Play, CheckCircle2, Lock, Clock, ChevronDown, ChevronUp, ChevronRight, Award } from "lucide-react";
export default function ListeningPanel() {

  // Demo data
  const units = [
    { id: 1, title: "Unit 1: Introduction", duration: "03:45", progress: 100, status: "completed", transcript: "Welcome to campus orientation...", questions: ["What is the main topic?", "Who is the speaker?"] },
    { id: 2, title: "Unit 2: Campus Map", duration: "04:10", progress: 65, status: "in-progress", transcript: "Let's explore the campus map...", questions: ["Which building is the library?", "Where is the sports center?"] },
    { id: 3, title: "Unit 3: Library Rules", duration: "02:55", progress: 30, status: "in-progress", transcript: "Library rules are important...", questions: ["What is not allowed in the library?", "What are the opening hours?"] },
    { id: 4, title: "Unit 4: Timetable", duration: "05:00", progress: 0, status: "locked", transcript: "Your timetable helps organize...", questions: ["How do you check your timetable?", "Who can help with schedule changes?"] },
  ];
  const completed = units.filter(u => u.status === "completed").length;
  const percent = Math.round((units.reduce((a, u) => a + u.progress, 0) / (units.length * 100)) * 100);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  return (
    <div className="listening-practice-modern min-h-screen bg-white font-inter-montserrat px-2 py-8">
      {/* Top progress tracker */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-[18px] font-semibold text-gray-700">
          <span className="text-blue-700 font-bold">{completed}/{units.length}</span> Units completed
        </div>
        <div className="text-[16px] font-medium text-gray-500">{percent}%</div>
      </div>
      {/* Large central audio player */}
      <div className="flex flex-col items-center mb-8">
        <div className="audio-player-modern relative flex flex-col items-center">
          <button
            className="audio-play-btn-modern bg-blue-600 text-white rounded-full w-24 h-24 flex items-center justify-center shadow-xl hover:bg-blue-700 transition-all mb-4"
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={() => setIsPlaying(p => !p)}
          >
            <Play size={48} />
            {/* Waveform animation */}
            <div className={`waveform-modern absolute left-1/2 -translate-x-1/2 bottom-[-18px] flex gap-1 ${isPlaying ? "playing" : ""}`}>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="wave-bar" style={{ height: `${12 + Math.abs(6 - i) * 6}px` }} />
              ))}
            </div>
          </button>
          <div className="flex items-center gap-4">
            <span className="text-[16px] font-bold text-gray-700">00:00</span>
            <div className="h-2 w-40 rounded-full bg-blue-100">
              <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `35%` }} />
            </div>
            <span className="text-[16px] font-bold text-gray-700">05:00</span>
          </div>
          {/* Playback speed control */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[15px] text-gray-500">Speed:</span>
            {[0.75, 1, 1.25, 1.5].map(rate => (
              <button
                key={rate}
                className={`px-3 py-1 rounded-full font-semibold text-[15px] border ${playbackRate === rate ? "bg-blue-600 text-white border-blue-600" : "bg-white text-blue-600 border-blue-200"}`}
                onClick={() => setPlaybackRate(rate)}
              >{rate}x</button>
            ))}
          </div>
        </div>
      </div>
      {/* Unit cards grid */}
      <div className="grid gap-6 sm:grid-cols-2 mb-10">
        {units.map((u, idx) => (
          <div key={u.id} className={`unit-card-modern p-6 rounded-2xl shadow-md border ${u.status === "locked" ? "bg-gray-100 border-gray-200 opacity-60" : "bg-white border-blue-100"}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[18px] font-bold text-blue-700 font-display">{u.title}</span>
              <span className="flex items-center gap-1 text-[15px] text-gray-500"><Clock size={16} />{u.duration}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-32 rounded-full bg-blue-100">
                <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${u.progress}%` }} />
              </div>
              {u.status === "completed" && <CheckCircle2 size={20} className="text-green-500" />}
              {u.status === "in-progress" && <ChevronRight size={20} className="text-blue-400" />}
              {u.status === "locked" && <Lock size={20} className="text-gray-400" />}
            </div>
            <button
              className={`expand-unit-btn flex items-center gap-2 text-[15px] font-semibold mt-2 ${u.status === "locked" ? "text-gray-400 cursor-not-allowed" : "text-blue-600"}`}
              disabled={u.status === "locked"}
              onClick={() => setExpanded(expanded === u.id ? null : u.id)}
            >
              {expanded === u.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              {expanded === u.id ? "Hide transcript & questions" : "Show transcript & questions"}
            </button>
            {expanded === u.id && (
              <div className="mt-4 bg-blue-50 rounded-xl p-4">
                <div className="text-[16px] font-bold text-blue-700 mb-2">Transcript</div>
                <div className="text-[15px] text-gray-700 mb-3 leading-relaxed">{u.transcript}</div>
                <div className="text-[16px] font-bold text-blue-700 mb-2">Comprehension Questions</div>
                <ul className="list-disc pl-5 text-[15px] text-gray-700 space-y-2">
                  {u.questions.map((q, qidx) => (
                    <li key={qidx}>{q}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Motivational badges */}
      <div className="flex flex-wrap gap-4 justify-center mt-8">
        <div className="badge-modern flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-[15px] shadow"><Award size={18} className="text-yellow-500" /> Consistency Star</div>
        <div className="badge-modern flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-[15px] shadow"><Award size={18} className="text-green-500" /> 2 Units Completed</div>
        <div className="badge-modern flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-[15px] shadow"><Award size={18} className="text-blue-500" /> Listening Pro</div>
      </div>
      <style>{`
        .font-inter-montserrat {
          font-family: 'Inter', 'Montserrat', sans-serif;
        }
        .audio-play-btn-modern {
          position: relative;
        }
        .waveform-modern {
          display: flex;
          align-items: flex-end;
          height: 24px;
        }
        .wave-bar {
          width: 4px;
          background: #2563EB;
          border-radius: 2px;
          transition: height 0.3s;
        }
        .waveform-modern.playing .wave-bar {
          animation: waveAnim 1.2s infinite ease-in-out;
        }
        @keyframes waveAnim {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        .unit-card-modern {
          font-size: 16px;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 2px 12px rgba(59,130,246,0.06);
          border: 1px solid #DBEAFE;
        }
        .expand-unit-btn {
          transition: color 0.2s;
        }
        .badge-modern {
          font-family: 'Montserrat', 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
}