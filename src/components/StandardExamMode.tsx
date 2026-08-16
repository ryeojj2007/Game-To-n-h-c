import React, { useState, useEffect } from 'react';
import { MathView } from './MathView';
import { QUIZ_QUESTIONS } from '../data/gameQuestions';
import { QuizQuestion, UserStats } from '../types/math';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  ClipboardCheck,
  Timer,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Sparkles,
  Filter,
  BarChart3,
  Lightbulb,
  FileText
} from 'lucide-react';

interface StandardExamModeProps {
  onEarnExp: (amount: number, identityId?: number) => void;
  stats: UserStats;
}

export const StandardExamMode: React.FC<StandardExamModeProps> = ({ onEarnExp }) => {
  // Config state
  const [selectedDifficulty, setSelectedDifficulty] = useState<'ALL' | 'NB' | 'TH' | 'VD' | 'VDC'>('ALL');
  const [selectedGroup, setSelectedGroup] = useState<'ALL' | '123' | '45' | '67'>('ALL');
  const [questionCount, setQuestionCount] = useState<number>(10);

  // Exam execution state
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [examQuestions, setExamQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Timer
  useEffect(() => {
    let interval: any;
    if (isStarted && !isSubmitted) {
      interval = setInterval(() => {
        setTimeSpent((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted, isSubmitted]);

  // Start exam
  const handleStartExam = () => {
    soundManager.playClick();
    let pool = [...QUIZ_QUESTIONS];

    if (selectedDifficulty !== 'ALL') {
      pool = pool.filter((q) => q.difficulty === selectedDifficulty);
    }

    if (selectedGroup !== 'ALL') {
      pool = pool.filter((q) => q.group === selectedGroup);
    }

    // Shuffle and slice
    const selected = pool.sort(() => 0.5 - Math.random()).slice(0, questionCount);

    if (selected.length === 0) {
      alert('Không tìm thấy câu hỏi phù hợp với bộ lọc đã chọn! Vui lòng mở rộng bộ lọc.');
      return;
    }

    setExamQuestions(selected);
    setCurrentIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setTimeSpent(0);
    setIsSubmitted(false);
    setIsStarted(true);
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (isSubmitted) return;
    soundManager.playClick();
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const toggleFlag = (questionId: string) => {
    soundManager.playClick();
    setFlaggedQuestions((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleSubmitExam = () => {
    const answeredCount = Object.keys(userAnswers).length;
    if (answeredCount < examQuestions.length) {
      const confirmSubmit = window.confirm(
        `Bạn mới làm ${answeredCount}/${examQuestions.length} câu. Bạn có chắc chắn muốn nộp bài sớm không?`
      );
      if (!confirmSubmit) return;
    }

    soundManager.playVictory();
    setIsSubmitted(true);

    // Calculate score & awards
    let correctCount = 0;
    examQuestions.forEach((q) => {
      const chosen = userAnswers[q.id];
      const correct = q.options.find((o) => o.isCorrect)?.id;
      if (chosen === correct) {
        correctCount++;
        onEarnExp(25, q.identityId);
      }
    });

    const finalScore = Math.round((correctCount / examQuestions.length) * 100);
    if (finalScore >= 70) {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
      });
      onEarnExp(100);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentQ = examQuestions[currentIndex];

  // Scoring calculation
  const getResultsSummary = () => {
    let correctCount = 0;
    const diffStats: Record<string, { correct: number; total: number }> = {
      NB: { correct: 0, total: 0 },
      TH: { correct: 0, total: 0 },
      VD: { correct: 0, total: 0 },
      VDC: { correct: 0, total: 0 },
    };

    examQuestions.forEach((q) => {
      const chosen = userAnswers[q.id];
      const correct = q.options.find((o) => o.isCorrect)?.id;
      const isRight = chosen === correct;

      if (isRight) correctCount++;

      const diff = q.difficulty || 'NB';
      if (diffStats[diff]) {
        diffStats[diff].total++;
        if (isRight) diffStats[diff].correct++;
      }
    });

    const score10 = Number(((correctCount / examQuestions.length) * 10).toFixed(1));
    return { correctCount, total: examQuestions.length, score10, diffStats };
  };

  return (
    <div className="space-y-6">
      {/* Configuration Screen */}
      {!isStarted && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">Bộ Đề Thi Thử Trắc Nghiệm 4 Mức Độ</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Hệ thống 60 câu hỏi chuẩn từ đề thi Toán 8 (Nhận biết • Thông hiểu • Vận dụng • Vận dụng cao)
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Filter 1: Difficulty */}
            <div>
              <label className="text-xs uppercase font-bold text-slate-300 block mb-2">
                1. Chọn Mức Độ Nhận Thức:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'ALL', label: 'Tất cả mức độ', desc: 'Đề tổng hợp' },
                  { id: 'NB', label: 'Nhận biết (NB)', desc: 'Nhận diện & Công thức' },
                  { id: 'TH', label: 'Thông hiểu (TH)', desc: 'Khai triển & Rút gọn' },
                  { id: 'VD', label: 'Vận dụng (VD)', desc: 'Tính nhanh & Tìm x' },
                  { id: 'VDC', label: 'Vận dụng cao (VDC)', desc: 'Cực trị & Bất đẳng thức' },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedDifficulty(d.id as any);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedDifficulty === d.id
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-500/20'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs">{d.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{d.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 2: Topic group */}
            <div>
              <label className="text-xs uppercase font-bold text-slate-300 block mb-2">
                2. Chọn Chuyên Đề Hằng Đẳng Thức:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                {[
                  { id: 'ALL', label: 'Toàn bộ 7 HĐT', desc: 'HĐT 1 đến 7' },
                  { id: '123', label: 'Chuyên đề HĐT 1, 2, 3', desc: '(A±B)², A²-B²' },
                  { id: '45', label: 'Chuyên đề HĐT 4, 5', desc: '(A±B)³ bậc 3' },
                  { id: '67', label: 'Chuyên đề HĐT 6, 7', desc: 'A³±B³ tổng/hiệu' },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedGroup(g.id as any);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedGroup === g.id
                        ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300 ring-2 ring-indigo-500/20'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs">{g.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{g.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 3: Question count */}
            <div>
              <label className="text-xs uppercase font-bold text-slate-300 block mb-2">
                3. Số Lượng Câu Hỏi Trong Đề:
              </label>
              <div className="flex gap-3">
                {[5, 10, 20].map((count) => (
                  <button
                    key={count}
                    onClick={() => {
                      soundManager.playClick();
                      setQuestionCount(count);
                    }}
                    className={`flex-1 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                      questionCount === count
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {count} Câu Hỏi
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleStartExam}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-base rounded-2xl shadow-xl shadow-amber-500/20 transform hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <ClipboardCheck className="w-5 h-5" /> BẮT ĐẦU LÀM BÀI THI THỬ
            </button>
          </div>
        </div>
      )}

      {/* Active Exam & Results View */}
      {isStarted && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Question / Result Area */}
          <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
            {!isSubmitted ? (
              /* Active Question View */
              <div>
                {/* Question Top Bar */}
                <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold rounded-xl">
                      Câu {currentIndex + 1} / {examQuestions.length}
                    </span>
                    <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-400 text-xs font-mono rounded-xl">
                      Mức độ: <span className="font-bold text-white">{currentQ.difficulty || 'NB'}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => toggleFlag(currentQ.id)}
                    className={`px-3 py-1 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      flaggedQuestions[currentQ.id]
                        ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{flaggedQuestions[currentQ.id] ? 'Đã đánh dấu cờ' : 'Đánh dấu xem lại'}</span>
                  </button>
                </div>

                {/* Question Prompt & Math */}
                <div className="mb-6">
                  <div className="text-sm font-semibold text-slate-200 mb-3">{currentQ.questionText}</div>
                  <div className="p-6 bg-slate-950/90 rounded-2xl border border-slate-800 text-center text-xl sm:text-2xl font-mono font-bold text-white shadow-inner">
                    <MathView latex={currentQ.questionLatex} block />
                  </div>
                </div>

                {/* Options List */}
                <div className="space-y-3 mb-6">
                  {currentQ.options.map((opt) => {
                    const isSelected = userAnswers[currentQ.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(currentQ.id, opt.id)}
                        className={`w-full p-4 rounded-2xl border-2 text-left flex items-center gap-4 transition-all duration-200 ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md shadow-amber-500/10'
                            : 'bg-slate-950/70 hover:bg-slate-800/80 border-slate-800/80 hover:border-slate-700 text-slate-200'
                        }`}
                      >
                        <span
                          className={`w-8 h-8 rounded-xl font-mono font-bold text-sm flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {opt.id}
                        </span>
                        <div className="font-mono text-sm sm:text-base font-semibold flex-1">
                          <MathView latex={opt.latex} />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Question Navigation Prev / Next */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => {
                      soundManager.playClick();
                      setCurrentIndex((i) => i - 1);
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Câu Trước
                  </button>

                  <button
                    disabled={currentIndex === examQuestions.length - 1}
                    onClick={() => {
                      soundManager.playClick();
                      setCurrentIndex((i) => i + 1);
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    Câu Tiếp Theo <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Detailed Results View */
              <div className="space-y-6">
                {/* Score Header */}
                {(() => {
                  const summary = getResultsSummary();
                  return (
                    <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 rounded-2xl border border-indigo-500/30 text-center">
                      <div className="text-4xl mb-2">🎉</div>
                      <h3 className="text-2xl font-black text-white mb-1">KẾT QUẢ BÀI THI THỬ</h3>
                      <p className="text-xs text-slate-400 mb-4">
                        Thời gian hoàn thành: <span className="font-mono text-white font-bold">{formatTime(timeSpent)}</span>
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto mb-6">
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                          <div className="text-[10px] text-slate-400 uppercase font-semibold">Điểm Số</div>
                          <div className="text-2xl font-black text-amber-400 font-mono">{summary.score10}/10</div>
                        </div>
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                          <div className="text-[10px] text-slate-400 uppercase font-semibold">Số Câu Đúng</div>
                          <div className="text-2xl font-black text-emerald-400 font-mono">
                            {summary.correctCount}/{summary.total}
                          </div>
                        </div>
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                          <div className="text-[10px] text-slate-400 uppercase font-semibold">Tỉ Lệ Đúng</div>
                          <div className="text-2xl font-black text-cyan-400 font-mono">
                            {Math.round((summary.correctCount / summary.total) * 100)}%
                          </div>
                        </div>
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                          <div className="text-[10px] text-slate-400 uppercase font-semibold">EXP Nhận</div>
                          <div className="text-2xl font-black text-purple-400 font-mono">
                            +{summary.correctCount * 25 + (summary.score10 >= 7 ? 100 : 0)}
                          </div>
                        </div>
                      </div>

                      {/* Difficulty Performance Breakdown */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left text-xs mb-4">
                        {Object.entries(summary.diffStats).map(([diff, data]) => {
                          if (data.total === 0) return null;
                          const pct = Math.round((data.correct / data.total) * 100);
                          return (
                            <div key={diff} className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800">
                              <div className="text-[10px] font-bold text-slate-400">{diff}:</div>
                              <div className="font-mono font-bold text-slate-200">
                                {data.correct}/{data.total} đúng ({pct}%)
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => {
                          soundManager.playClick();
                          setIsStarted(false);
                          setIsSubmitted(false);
                        }}
                        className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2 mx-auto"
                      >
                        <RotateCcw className="w-4 h-4" /> Làm Bài Thi Khác
                      </button>
                    </div>
                  );
                })()}

                {/* Detailed Question Review List */}
                <div className="space-y-4">
                  <div className="text-xs uppercase tracking-wider font-bold text-slate-400">
                    Chi Tiết Lời Giải Từng Câu:
                  </div>
                  {examQuestions.map((q, idx) => {
                    const userChosen = userAnswers[q.id];
                    const correctOpt = q.options.find((o) => o.isCorrect);
                    const isRight = userChosen === correctOpt?.id;

                    return (
                      <div
                        key={q.id}
                        className={`p-5 rounded-2xl border text-left transition-all ${
                          isRight
                            ? 'bg-emerald-950/20 border-emerald-500/40'
                            : 'bg-rose-950/20 border-rose-500/40'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold font-mono text-sm text-white">Câu {idx + 1}:</span>
                            <span className="text-xs font-mono px-2 py-0.5 bg-slate-900 rounded-md text-slate-400">
                              {q.difficulty || 'NB'}
                            </span>
                          </div>
                          <span
                            className={`text-xs font-bold font-mono flex items-center gap-1 ${
                              isRight ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {isRight ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                            {isRight ? 'Chính xác' : 'Chưa đúng'}
                          </span>
                        </div>

                        <div className="text-xs text-slate-300 mb-2">{q.questionText}</div>
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono font-bold text-white mb-3">
                          <MathView latex={q.questionLatex} block />
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-3">
                          <div className="p-2 bg-slate-900 rounded-lg">
                            <span className="text-slate-500">Bạn chọn: </span>
                            <span className={isRight ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                              {userChosen ? `Đáp án ${userChosen}` : 'Bỏ trống'}
                            </span>
                          </div>
                          <div className="p-2 bg-slate-900 rounded-lg">
                            <span className="text-slate-500">Đáp án đúng: </span>
                            <span className="text-emerald-400 font-bold">Đáp án {correctOpt?.id}</span>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-1">
                          <div>
                            <span className="font-semibold text-amber-300">💡 Hướng dẫn giải: </span>
                            {q.explanation}
                          </div>
                          {q.hint && (
                            <div className="text-[11px] text-slate-400 italic">
                              <span className="font-semibold text-slate-300">Mẹo nhanh: </span>
                              {q.hint}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Question Palette & Timer */}
          <div className="lg:col-span-4 space-y-4">
            {/* Timer & Controls Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Timer className="w-4 h-4" /> Thời Gian
                </div>
                <div className="text-xl font-black font-mono text-cyan-300">{formatTime(timeSpent)}</div>
              </div>

              {!isSubmitted && (
                <button
                  onClick={handleSubmitExam}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black rounded-xl text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" /> NỘP BÀI THI NGAY
                </button>
              )}
            </div>

            {/* Question Quick Palette */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl backdrop-blur-xl">
              <div className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3">
                Danh Sách Câu Hỏi ({Object.keys(userAnswers).length}/{examQuestions.length}):
              </div>

              <div className="grid grid-cols-5 gap-2">
                {examQuestions.map((q, idx) => {
                  const isCurrent = currentIndex === idx;
                  const isAnswered = !!userAnswers[q.id];
                  const isFlagged = !!flaggedQuestions[q.id];

                  let colorClass = 'bg-slate-950 border-slate-800 text-slate-400';
                  if (isSubmitted) {
                    const isRight = userAnswers[q.id] === q.options.find((o) => o.isCorrect)?.id;
                    colorClass = isRight
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                      : 'bg-rose-950 border-rose-500 text-rose-300';
                  } else if (isCurrent) {
                    colorClass = 'bg-amber-500 text-slate-950 font-black ring-2 ring-amber-400';
                  } else if (isAnswered) {
                    colorClass = 'bg-indigo-950 border-indigo-500/60 text-indigo-300';
                  } else if (isFlagged) {
                    colorClass = 'bg-rose-950/60 border-rose-500 text-rose-300';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        soundManager.playClick();
                        setCurrentIndex(idx);
                      }}
                      className={`h-10 rounded-xl border text-xs font-mono font-bold flex flex-col items-center justify-center transition-all ${colorClass}`}
                    >
                      <span>{idx + 1}</span>
                      {isFlagged && !isSubmitted && <span className="w-1 h-1 rounded-full bg-rose-400"></span>}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-indigo-950 border border-indigo-500"></span>
                  <span>Đã chọn đáp án</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-rose-950 border border-rose-500"></span>
                  <span>Đã đánh dấu cờ</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-slate-950 border border-slate-800"></span>
                  <span>Chưa làm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
