import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Moon, Volume2, Star, Clipboard, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import React from "react";

const sample = [
  { word: "achieve", phonetic: "/əˈtʃiːv/", meaning: "đạt được, giành được", example: "You can achieve your goals with practice.", type: "verb", audio: "/audio/achieve.mp3" },
  { word: "coherent", phonetic: "/kəʊˈhɪərənt/", meaning: "mạch lạc, chặt chẽ", example: "Her essay was clear and coherent.", type: "adj", audio: "/audio/coherent.mp3" },
];

export default function Dictionary() {
  const [q, setQ] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [dark, setDark] = useState(false);
  const [flashcard, setFlashcard] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [favorite, setFavorite] = useState<string[]>([]);
  const [copied, setCopied] = useState<string>("");
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  React.useEffect(() => {
    if (q) {
      setSuggestions(sample.filter(i => i.word.startsWith(q.toLowerCase())).map(i => i.word));
    } else {
      setSuggestions([]);
    }
  }, [q]);

  React.useEffect(() => {
    if (history.length > 0 && history.length % 5 === 0) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  }, [history]);

  const results = q ? sample.filter((i) => i.word.includes(q.toLowerCase())) : sample;

  const handleSearch = (word?: string) => {
    const val = word || q;
    if (!val) return;
    setQ(val);
    setHistory(h => [val, ...h.filter(w => w !== val)].slice(0, 5));
  };

  const handleFavorite = (word: string) => {
    setFavorite(f => f.includes(word) ? f.filter(w => w !== word) : [...f, word]);
  };

  const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
  setCopied(text);
  setTimeout(() => setCopied("") , 1200);
  };

  const handleAudio = (audio: string) => {
    const a = new Audio(audio);
    a.play();
  };

  const handleFlip = (word: string) => {
    setFlipped(f => ({ ...f, [word]: !f[word] }));
  };

  return (
    <div className={dark ? "min-h-screen bg-[#181A20] font-inter-montserrat" : "min-h-screen bg-[#F9FAFB] font-inter-montserrat"}>
      <div className="max-w-xl mx-auto py-6 px-2 md:px-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className={`font-bold font-display text-[22px] ${dark ? "text-white" : "text-[#2563EB]"}`}>Tra cứu từ điển</h1>
          <button onClick={() => setDark(d => !d)} className="rounded-full p-2 bg-[#E5E7EB] dark:bg-[#23272F] shadow">
            {dark ? <Sun className="text-yellow-400 size-5" /> : <Moon className="text-[#2563EB] size-5" />}
          </button>
        </div>
        {/* Search Bar */}
        <div className="relative mb-2">
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
            placeholder="Nhập từ vựng tiếng Anh..."
            className="w-full rounded-full border border-[#E5E7EB] bg-white dark:bg-[#23272F] py-3 pl-12 pr-4 text-[16px] shadow focus:border-[#2563EB] outline-none"
            autoFocus
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#2563EB]" />
          <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-4 py-2 bg-[#2563EB] text-white font-bold shadow-md" onClick={() => handleSearch()}>Tìm</Button>
          {/* Autocomplete suggestions */}
          {suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-[#23272F] rounded-xl shadow-lg border border-[#E5E7EB] z-10">
              {suggestions.map(s => (
                <div key={s} className="px-4 py-2 cursor-pointer hover:bg-[#F3F4F6] dark:hover:bg-[#23272F]" onClick={() => handleSearch(s)}>{s}</div>
              ))}
            </div>
          )}
        </div>
        {/* Search History */}
        {history.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2 items-center">
            <span className="text-xs text-[#2563EB] font-bold">Lịch sử:</span>
            {history.map((h, i) => (
              <button key={h} className="px-3 py-1 rounded-full bg-[#DBEAFE] text-[#2563EB] text-xs font-semibold shadow" onClick={() => handleSearch(h)}>{h}</button>
            ))}
          </div>
        )}
        {/* Flashcard Mode Toggle */}
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => setFlashcard(f => !f)} className="rounded-full px-4 py-2 bg-[#2563EB] text-white font-bold shadow-md flex items-center gap-2">
            <RefreshCw className="size-4" /> Flashcard mode
          </button>
        </div>
        {/* Word Cards */}
        <div className="grid gap-4">
          {results.map(r => (
            <div key={r.word} className={`transition-transform ${flashcard && flipped[r.word] ? "rotate-y-180" : ""}`}>
              <Card className={`bg-white dark:bg-[#23272F] border-none shadow-lg rounded-xl overflow-hidden relative`} style={{ borderRadius: 12, boxShadow: "0 2px 12px #E5E7EB" }}>
                <CardContent className="p-5">
                  {/* Flashcard front/back */}
                  {!flashcard || !flipped[r.word] ? (
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-[20px] text-[#2563EB] dark:text-white">{r.word}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${r.type === "noun" ? "bg-blue-50 text-blue-600" : r.type === "verb" ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-600"}`}>{r.type}</span>
                        <button onClick={() => handleAudio(r.audio)} className="ml-2 p-1 rounded-full bg-[#DBEAFE] text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all"><Volume2 className="size-4" /></button>
                        <button onClick={() => handleFavorite(r.word)} className={`ml-2 p-1 rounded-full ${favorite.includes(r.word) ? "bg-yellow-300 text-yellow-700" : "bg-[#F3F4F6] text-[#2563EB]"} hover:bg-yellow-300 hover:text-yellow-700 transition-all`}><Star className="size-4" /></button>
                        <button onClick={() => handleFlip(r.word)} className="ml-2 p-1 rounded-full bg-[#F3F4F6] text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all"><RefreshCw className="size-4" /></button>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[15px] italic text-gray-400 dark:text-gray-300">{r.phonetic}</span>
                        <button onClick={() => handleCopy(r.phonetic)} className="p-1 rounded-full hover:bg-[#DBEAFE] text-[#2563EB] transition-all"><Clipboard className="size-3" /></button>
                        {copied === r.phonetic && <span className="text-xs text-green-500 ml-1">Đã copy!</span>}
                      </div>
                      <p className="mt-1 text-[16px] font-semibold text-gray-800 dark:text-gray-100">{r.meaning}
                        <button onClick={() => handleCopy(r.meaning)} className="ml-2 p-1 rounded-full hover:bg-[#DBEAFE] text-[#2563EB] transition-all"><Clipboard className="size-3" /></button>
                        {copied === r.meaning && <span className="text-xs text-green-500 ml-1">Đã copy!</span>}
                      </p>
                      <p className="mt-2 text-[14px] text-gray-500 dark:text-gray-400">VD: <span className="italic">{r.example}</span>
                        <button onClick={() => handleCopy(r.example)} className="ml-2 p-1 rounded-full hover:bg-[#DBEAFE] text-[#2563EB] transition-all"><Clipboard className="size-3" /></button>
                        {copied === r.example && <span className="text-xs text-green-500 ml-1">Đã copy!</span>}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-32">
                      <p className="text-[16px] font-semibold text-gray-800 dark:text-gray-100 mb-2">{r.meaning}</p>
                      <p className="text-[14px] text-gray-500 dark:text-gray-400">VD: <span className="italic">{r.example}</span></p>
                      <button onClick={() => handleFlip(r.word)} className="mt-3 px-4 py-2 rounded-full bg-[#2563EB] text-white font-bold shadow-md">Lật lại</button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        {/* Gamification Toast */}
        {showToast && (
          <div className="fixed bottom-8 right-8 z-50 bg-[#2563EB] text-white px-6 py-3 rounded-full shadow-lg font-semibold animate-fade-in">🎉 Bạn đã học {history.length} từ hôm nay!</div>
        )}
      </div>
      <style>{`
        .font-inter-montserrat {
          font-family: 'Inter', 'Montserrat', sans-serif;
        }
        .font-display {
          font-family: 'Montserrat', 'Inter', sans-serif;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s cubic-bezier(.4,2,.3,1) both;
        }
      `}</style>
    </div>
  );
}
