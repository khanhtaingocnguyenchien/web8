
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

const lessons = [
  {
    id: 1,
    title: "Bài nghe số 1",
    skill: "listening",
    description: "Luyện kỹ năng nghe với các chủ đề đa dạng.",
    color: "from-blue-400 to-purple-400",
    button: "from-blue-500 to-purple-500",
  },
  {
    id: 2,
    title: "Bài đọc số 1",
    skill: "reading",
    description: "Luyện kỹ năng đọc hiểu các đoạn văn IELTS.",
    color: "from-green-400 to-teal-400",
    button: "from-green-500 to-teal-500",
  },
  {
    id: 3,
    title: "Bài nói số 1",
    skill: "speaking",
    description: "Luyện kỹ năng nói với các chủ đề phổ biến.",
    color: "from-orange-400 to-pink-400",
    button: "from-orange-500 to-pink-500",
  },
  {
    id: 4,
    title: "Bài viết số 1",
    skill: "writing",
    description: "Luyện kỹ năng viết bài luận IELTS.",
    color: "from-pink-400 to-red-400",
    button: "from-pink-500 to-red-500",
  },
];

export default function PracticeDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const handlePractice = (skill: string) => {
    switch (skill) {
      case "listening":
        navigate("/practice-listening");
        break;
      case "reading":
        navigate("/practice-reading");
        break;
      case "speaking":
        navigate("/practice-speaking");
        break;
      case "writing":
        navigate("/practice-writing");
        break;
      default:
        break;
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 drop-shadow-xl">
          Chi tiết bài luyện tập
        </h1>
        <div className="space-y-8">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className={`p-6 rounded-2xl shadow-xl border-2 border-transparent bg-white/90 hover:scale-[1.02] transition-transform duration-200 hover:border-${lesson.skill}-400 relative overflow-hidden`}>
              <div className={`absolute inset-0 z-0 opacity-20 bg-gradient-to-r ${lesson.color}`}></div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h2>
                  <p className="text-gray-700 mb-2 font-medium">{lesson.description}</p>
                  <span className={`inline-block px-4 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${lesson.color} text-white shadow-lg tracking-wide`}>{lesson.skill.toUpperCase()}</span>
                </div>
                <Button
                  className={`mt-4 md:mt-0 px-8 py-2 rounded-full bg-gradient-to-r ${lesson.button} text-white font-bold shadow-xl hover:scale-110 transition-transform duration-200 border-2 border-white`}
                  onClick={() => handlePractice(lesson.skill)}
                >
                  Luyện
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
