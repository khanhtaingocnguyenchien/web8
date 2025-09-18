import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCountdown } from "@/hooks/use-countdown";
import { toast } from "sonner";
import { Headphones, BookOpen, Mic, PenLine, Pause, Play, Save, StopCircle, Timer } from "lucide-react";

const DURATIONS: Record<string, number> = {
  listening: 15 * 60,
  reading: 20 * 60,
  speaking: 11 * 60,
  writing: 30 * 60,
};

export default function ExamSkill() {
  const { skill = "listening" } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const secs = DURATIONS[skill] ?? 15 * 60;
  const { display, progress } = useCountdown(secs, () => handleSubmit());

  const title = useMemo(() => skillLabel(skill), [skill]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function setAns(key: string, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit() {
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      toast.success("Đã nộp bài " + title);
      setTimeout(() => navigate("/progress"), 1200);
    }, 800);
  }

  function handleSave() {
    toast("Đã lưu tạm bài làm");
  }

  return (
  <div className="space-y-6 bg-gradient-to-br from-green-100 via-yellow-50 to-blue-100 min-h-screen px-2 pb-8">
      {/* Sticky exam header */}
  <div className="sticky top-14 z-30 -mx-4 sm:mx-0 bg-gradient-to-r from-green-300 via-yellow-200 to-blue-200 backdrop-blur border-b p-4 shadow-lg">
  <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-green-700 drop-shadow">
            <SkillIcon skill={skill} />
            <span>Đang thi <span className="font-semibold text-primary">{title}</span></span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-green-300 px-3 py-2 text-base bg-gradient-to-r from-green-100 via-yellow-100 to-blue-100 shadow">
            <Timer className="size-4" /> <span className="tabular-nums font-mono text-base">{display}</span>
          </div>
        </div>
  <div className="mt-2"><Progress value={progress} color="lime" /></div>
        <div className="mt-3 flex items-center justify-end gap-2">
          <Button variant="secondary" onClick={handleSave} className="gap-2 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-blue-400 text-white font-bold shadow-lg hover:scale-105">
            <Save className="size-4" /> Lưu tạm
          </Button>
          <Button onClick={handleSubmit} disabled={loading || submitted} className="gap-2 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-green-400 text-white font-bold shadow-lg hover:scale-105">
            {loading ? "Đang nộp..." : "Nộp bài"}
          </Button>
        </div>
      </div>

      <div className="mb-2">
        <Card className="bg-gradient-to-r from-green-50 via-yellow-50 to-blue-50 border-2 border-green-200 shadow-md">
          <CardContent className="py-3 text-sm text-muted-foreground">
            {skill === "listening" && (
              <>
                <b>Hướng dẫn:</b> Nghe audio, chọn đáp án đúng cho từng câu hỏi. Tập trung nghe kỹ, không tua lại audio.
              </>
            )}
            {skill === "reading" && (
              <>
                <b>Hướng dẫn:</b> Đọc kỹ đoạn văn, trả lời các câu hỏi trắc nghiệm. Quản lý thời gian hợp lý.
              </>
            )}
            {skill === "speaking" && (
              <>
                <b>Hướng dẫn:</b> Chuẩn bị ý chính, ghi âm phần nói, bám sát chủ đề. Nói rõ ràng, tự tin.
              </>
            )}
            {skill === "writing" && (
              <>
                <b>Hướng dẫn:</b> Đọc kỹ đề, lập dàn ý, viết bài luận tối thiểu 250 từ. Kiểm tra lại ngữ pháp, từ vựng.
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="animate-spin text-primary text-3xl">⏳</span>
        </div>
      ) : submitted ? (
        <Card className="p-6 text-center">
          <CardTitle className="mb-2 text-xl text-primary">Đã nộp bài!</CardTitle>
          <CardContent className="text-sm text-muted-foreground">Cảm ơn bạn đã hoàn thành phần thi {title}. Kết quả sẽ được cập nhật ở trang tiến độ.</CardContent>
        </Card>
      ) : (
        <>
          {skill === "listening" && <Listening answers={answers} setAns={setAns} />}
          {skill === "reading" && <Reading answers={answers} setAns={setAns} />}
          {skill === "speaking" && <Speaking answers={answers} setAns={setAns} />}
          {skill === "writing" && <Writing answers={answers} setAns={setAns} />}
        </>
      )}
    </div>
  );
}

function SkillIcon({ skill }: { skill?: string }) {
  if (skill === "reading") return <BookOpen className="size-4" />;
  if (skill === "speaking") return <Mic className="size-4" />;
  if (skill === "writing") return <PenLine className="size-4" />;
  return <Headphones className="size-4" />;
}

function skillLabel(s: string) {
  switch (s) {
    case "listening":
      return "Listening";
    case "reading":
      return "Reading";
    case "speaking":
      return "Speaking";
    case "writing":
      return "Writing";
    default:
      return s;
  }
}

function Listening({ answers, setAns }: any) {
  const qs = [
    { id: "q1", text: "When does the campus tour start?", options: ["8 AM", "9 AM", "10 AM", "11 AM"] },
    { id: "q2", text: "Where is the library located?", options: ["North Wing", "South Wing", "East Wing", "West Wing"] },
  ];
  return (
    <div className="space-y-4">
  <Card className="overflow-hidden bg-gradient-to-r from-green-200 via-yellow-100 to-blue-200 border-2 border-green-400 shadow-xl rounded-2xl">
        <CardHeader className="pb-2"><CardTitle className="text-base">Audio</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-lg border p-3">
            <div className="flex items-center gap-3">
              <button className="inline-flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Play className="size-5" />
              </button>
              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>00:00</span>
                  <span>03:45</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-1/5 bg-primary" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

  <Card className="bg-gradient-to-r from-green-50 via-yellow-50 to-blue-50 border-2 border-green-200 shadow-lg rounded-2xl">
        <CardHeader className="pb-2"><CardTitle className="text-base">Câu hỏi</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {qs.map((q) => (
            <div key={q.id} className="space-y-2">
              <p className="font-medium">{q.text}</p>
              <div className="grid gap-2">
                {q.options.map((o) => (
                  <label key={o} className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name={q.id}
                      value={o}
                      checked={answers[q.id] === o}
                      onChange={(e) => setAns(q.id, e.target.value)}
                    />
                    <span>{o}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Reading({ answers, setAns }: any) {
  const passage = `Universities often host campus orientation to help new students become familiar with the facilities and services. Participants usually visit the library, sports center, and student union.`;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
  <Card className="sm:sticky sm:top-36 h-max bg-gradient-to-r from-green-200 via-yellow-100 to-blue-200 border-2 border-green-400 shadow-xl rounded-2xl">
        <CardHeader className="pb-2"><CardTitle className="text-base">Đoạn văn</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{passage.repeat(4)}</p>
        </CardContent>
      </Card>

  <Card className="bg-gradient-to-r from-green-50 via-yellow-50 to-blue-50 border-2 border-green-200 shadow-lg rounded-2xl">
        <CardHeader className="pb-2"><CardTitle className="text-base">Câu hỏi</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="space-y-2">
              <p className="font-medium">Question {n}</p>
              {(["A", "B", "C", "D"] as const).map((o) => (
                <label key={o} className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name={`rq${n}`}
                    value={o}
                    checked={answers[`rq${n}`] === o}
                    onChange={(e) => setAns(`rq${n}`, e.target.value)}
                  />
                  <span>{o}</span>
                </label>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Speaking({ answers, setAns }: any) {
  const [state, setState] = useState<"idle" | "recording" | "paused">("idle");
  const [elapsed, setElapsed] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (state === "recording") {
      timer.current = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    } else {
      if (timer.current) window.clearInterval(timer.current);
    }
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [state]);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="space-y-4">
  <Card className="bg-gradient-to-r from-yellow-200 via-orange-100 to-green-200 border-2 border-yellow-400 shadow-xl rounded-2xl">
        <CardHeader className="pb-2"><CardTitle className="text-base">Speaking Prompts</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Introduce yourself and your study major.</li>
            <li>Describe a memorable teacher and why you liked them.</li>
            <li>Give an example to support your opinion.</li>
          </ul>

          <div className="rounded-lg border p-4">
            <div className="mb-2 text-sm text-muted-foreground">Thời gian ghi âm: <span className="font-mono">{mm}:{ss}</span></div>
            <div className="flex items-center gap-2">
              <Button size="icon" onClick={() => setState("recording")} disabled={state === "recording"}><Mic className="size-4" /></Button>
              <Button size="icon" variant="secondary" onClick={() => setState("paused")} disabled={state !== "recording"}><Pause className="size-4" /></Button>
              <Button size="icon" variant="destructive" onClick={() => { setState("idle"); setElapsed(0); }}><StopCircle className="size-4" /></Button>
            </div>
          </div>

          <Textarea rows={6} placeholder="Ghi chú ý chính bạn sẽ nói..." value={answers.s1 || ""} onChange={(e) => setAns("s1", e.target.value)} />
          <p className="text-xs text-muted-foreground">Gợi ý: mở đầu, lý do yêu thích, ví dụ, kết luận.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function Writing({ answers, setAns }: any) {
  const text = answers.w1 || "";
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  const percent = Math.min(100, (words / 250) * 100);

  return (
    <div className="grid gap-4 sm:grid-cols-3">
  <Card className="sm:col-span-1 h-max sm:sticky sm:top-36 bg-gradient-to-r from-green-200 via-yellow-100 to-blue-200 border-2 border-green-400 shadow-xl rounded-2xl">
        <CardHeader className="pb-2"><CardTitle className="text-base">Yêu cầu</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Some people think schools should focus more on practical skills than academic subjects. Do you agree or disagree?</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Viết tối thiểu 250 từ.</li>
            <li>Cấu trúc: mở bài, thân bài 2 ý, kết luận.</li>
            <li>Chấm điểm theo Task Response, Coherence, Lexical, Grammar.</li>
          </ul>
          <div>
            <div className="mb-1 flex items-center justify-between text-xs"><span>Số từ</span><span>{words} / 250</span></div>
            <Progress value={percent} />
          </div>
        </CardContent>
      </Card>

  <Card className="sm:col-span-2 bg-gradient-to-r from-green-50 via-yellow-50 to-blue-50 border-2 border-green-200 shadow-lg rounded-2xl">
        <CardHeader className="pb-2"><CardTitle className="text-base">Bài làm</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Textarea rows={14} placeholder="Viết bài luận của bạn..." value={text} onChange={(e) => setAns("w1", e.target.value)} />
          <div className="text-xs text-muted-foreground">Mẹo: quản lý thời gian, lập dàn ý trước khi viết.</div>
        </CardContent>
      </Card>
    </div>
  );
}
