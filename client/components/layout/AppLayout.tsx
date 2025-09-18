import { NavLink, Outlet, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BookOpen, Headphones, Home, LineChart, Mic, NotebookPen, Search } from "lucide-react";

const tabs = [
  { to: "/", label: "Trang chủ", icon: Home },
  { to: "/practice", label: "Luyện tập", icon: NotebookPen },
  { to: "/mock-tests", label: "Thi thử", icon: BookOpen },
  { to: "/progress", label: "Tiến độ", icon: LineChart },
  { to: "/dictionary", label: "Từ điển", icon: Search },
];

export default function AppLayout() {
  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-background/80 backdrop-blur border-b">
        <div className="container flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-primary to-primary/70" />
            <span className="text-lg leading-none">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">BEST</span>{" "}
              <span className="text-foreground">IELTS</span>
            </span>
          </Link>
          <nav className="flex items-center gap-3">
            <Link to="/dictionary" aria-label="Tra cứu từ điển" className="p-2 rounded-md hover:bg-accent/50">
              <Search className="size-5" />
            </Link>
            <Link to="/profile" className="px-3 py-1.5 rounded-md text-sm font-medium bg-secondary hover:bg-secondary/80">
              Tài khoản
            </Link>
          </nav>
        </div>
      </header>

      <main className="container flex-1 w-full pb-24 pt-4">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 inset-x-0 z-40 border-t bg-white/90 dark:bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-background/60">
        <div className="container grid grid-cols-5 gap-1 py-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <NavLink
                key={t.to}
                to={t.to}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center justify-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={cn("size-5", isActive && "fill-primary/10")} />
                    <span>{t.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
