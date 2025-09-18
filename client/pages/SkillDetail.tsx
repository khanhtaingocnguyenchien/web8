import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Headphones, Mic, PenLine, Play } from "lucide-react";

const SKILL_META = {
  listening: { label: "Listening", icon: Headphones, color: "from-blue-500 to-blue-600" },
  reading: { label: "Reading", icon: BookOpen, color: "from-emerald-500 to-emerald-600" },
  speaking: { label: "Speaking", icon: Mic, color: "from-fuchsia-500 to-fuchsia-600" },
  writing: { label: "Writing", icon: PenLine, color: "from-amber-500 to-amber-600" },
} as const;

type SkillKey = keyof typeof SKILL_META;

export default function SkillDetail() {
  const params = useParams();
  const key = (params.skill as SkillKey) || "listening";
  const meta = SKILL_META[key];

  const lessons = [
    { id: 1, title: "Unit 1: Introduction", progress: 100 },
    { id: 2, title: "Unit 2: Campus Map", progress: 65 },
    { id: 3, title: "Unit 3: Library Rules", progress: 30 },
    { id: 4, title: "Unit 4: Timetable", progress: 0 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className={`inline-flex size-10 items-center justify-center rounded-lg bg-gradient-to-br ${meta.color} text-white`}>
          <meta.icon className="size-5" />
        </div>
        <h1 className="text-xl font-bold">{meta.label}</h1>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Tổng quan</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Ôn luyện {meta.label} với các bài học theo chủ đề, bài nghe/đọc mẫu và câu hỏi thực hành.
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Danh sách bài học</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {lessons.map((l) => (
            <Link key={l.id} to={`/practice/campus-orientation#u${l.id}`} className="rounded-lg border p-3 hover:bg-accent/50">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium">{l.title}</span>
                <span className="text-muted-foreground">{l.progress}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full bg-primary" style={{ width: `${l.progress}%` }} />
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button asChild className="gap-2">
          <Link to="/practice/campus-orientation">
            <Play className="size-4" /> Bắt đầu luyện {meta.label}
          </Link>
        </Button>
      </div>
    </div>
  );
}
