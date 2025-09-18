import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Headphones, BookOpen, Mic, PenLine } from "lucide-react";

const skills = [
	{ key: "listening", label: "Listening", icon: Headphones, desc: "Luyện kỹ năng nghe với audio và câu hỏi trắc nghiệm." },
	{ key: "reading", label: "Reading", icon: BookOpen, desc: "Luyện kỹ năng đọc hiểu với đoạn văn và câu hỏi." },
	{ key: "speaking", label: "Speaking", icon: Mic, desc: "Luyện kỹ năng nói với ghi âm và chủ đề thực tế." },
	{ key: "writing", label: "Writing", icon: PenLine, desc: "Luyện kỹ năng viết với đề bài và đếm từ." },
];


export default function Exam() {
	return (
		<div className="max-w-xl mx-auto py-8 px-2">
			<header className="mb-6 text-center">
				<h1 className="text-2xl font-bold mb-2 text-primary">Thi thử IELTS</h1>
				<p className="text-sm text-muted-foreground">Chọn kỹ năng bạn muốn luyện tập. Mỗi kỹ năng sẽ có giao diện và đồng hồ riêng phù hợp với bài thi IELTS thực tế.</p>
			</header>
			<div className="grid gap-4 sm:grid-cols-2">
				{skills.map((s) => (
					<Card key={s.key} className="hover:shadow-lg transition-shadow">
						<CardHeader className="pb-2 flex flex-row items-center gap-3">
							<s.icon className="size-7 text-primary" />
							<CardTitle className="text-lg">{s.label}</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
							<Button asChild className="w-full" aria-label={`Luyện ${s.label}`} size="lg">
								<Link to={`/exam/${s.key}`}>Bắt đầu luyện {s.label}</Link>
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
