import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./components/layout/AppLayout";
import Index from "./pages/Index";
import Practice from "./pages/Practice";
import PracticeDetail from "./pages/PracticeDetail";
import SkillDetail from "./pages/SkillDetail";
import MockTests from "./pages/MockTests";
import TestDetail from "./pages/TestDetail";
import MockTestDetail from "./pages/MockTestDetail";
import ExamListening from "./pages/ExamListening";
import ExamListeningResult from "./pages/ExamListeningResult";
import ExamSkill from "./pages/ExamSkill";
import Progress from "./pages/Progress";
import Dictionary from "./pages/Dictionary";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import React from "react";
import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ForgotPassword from "./pages/ForgotPassword";
import Roadmap from "./pages/Roadmap";
import Settings from "./pages/Settings";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";


const queryClient = new QueryClient();


const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Routes>
          {/* Splash/Landing page and Auth routes */}
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          {/* Main app routes */}
          <Route element={<AppLayout />}> 
            <Route path="/home" element={<Index />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/practice/campus-orientation" element={<PracticeDetail />} />
            {/* Legacy direct routes for compatibility */}
            <Route path="/skills/:skill" element={<SkillDetail />} />
            <Route path="/mock-tests" element={<MockTests />} />
            <Route path="/mock-tests/:id" element={<TestDetail />} />
            <Route path="/mock-test-detail" element={<MockTestDetail />} />
            <Route path="/exam/listening" element={<ExamListening />} />
            <Route path="/exam/listening/result" element={<ExamListeningResult />} />
            <Route path="/exam/:skill" element={<ExamSkill />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

createRoot(document.getElementById("root")!).render(<App />);
