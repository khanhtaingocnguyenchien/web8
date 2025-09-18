import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ExamListeningResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score = 0, correct = 0, incorrect = 0, answers = {} } = location.state || {};

  // Demo questions (should sync with ExamListening)
  const QUESTIONS = [
    {
      id: 1,
      question: "What is the main topic of the audio?",
      options: ["Campus life", "Health tips", "Travel plans"],
      answer: 0,
    },
    {
      id: 2,
      question: "What should students bring to orientation?",
      options: ["Passport", "Student ID", "Laptop"],
      answer: 1,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center font-inter-montserrat">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-[22px] font-bold mb-2 text-[#2563EB]">Kết quả bài thi Listening</div>
        <div className="text-[16px] text-[#374151] mb-4">Điểm số: <span className="font-bold text-[#22C55E]">{score}/10</span></div>
        <div className="mb-4 flex gap-6">
          <span className="text-[15px] text-[#2563EB]">Đúng: <b>{correct}</b></span>
          <span className="text-[15px] text-[#EF4444]">Sai: <b>{incorrect}</b></span>
        </div>
        <div className="mb-4">
          <div className="font-bold mb-2 text-[#2563EB]">Review đáp án:</div>
          <ul className="space-y-2">
            {QUESTIONS.map(q => (
              <li key={q.id} className="text-[15px]">
                <span className="font-semibold">Câu {q.id}:</span> {q.question}
                <br />
                <span className="mr-2">Đáp án của bạn: <b className={answers[q.id] === q.answer ? 'text-[#22C55E]' : 'text-[#EF4444]'}>{q.options[answers[q.id] ?? -1] ?? "(chưa chọn)"}</b></span>
                <span>Đáp án đúng: <b className="text-[#2563EB]">{q.options[q.answer]}</b></span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => navigate("/exam/listening")} className="rounded-full px-6 py-2 bg-[#2563EB] text-white font-bold">Làm lại</Button>
        </div>
      </div>
      <style>{`
        .font-inter-montserrat {
          font-family: 'Inter', 'Montserrat', sans-serif;
        }
      `}</style>
    </div>
  );
}
