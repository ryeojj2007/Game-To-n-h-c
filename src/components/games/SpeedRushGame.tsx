import React, { useState, useEffect, useRef } from 'react';
import { MathView } from '../MathView';
import { QUIZ_QUESTIONS } from '../../data/gameQuestions';
import { soundManager } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Zap, Timer, Flame, Snowflake, Target, Lightbulb, Play, RotateCcw, Award } from 'lucide-react';
import { UserStats } from '../../types/math';

interface SpeedRushGameProps {
  onEarnExp: (amount: number, identityId?: number) => void;
  stats: UserStats;
}

export const SpeedRushGame: React.FC<SpeedRushGameProps> = ({ onEarnExp, stats }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof QUIZ_QUESTIONS>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // Lifelines
  const [freezeUsed, setFreezeUsed] = useState<boolean>(false);
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState<boolean>(false);
  const [hintUsed, setHintUsed] = useState<boolean>(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);

  const timerRef = useRef<any>(null);

  const currentQ = shuffledQuestions[currentQIndex] || QUIZ_QUESTIONS[0];

  const startGame = () => {
    soundManager.playClick();
    const shuffled = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
    setShuffledQuestions(shuffled);
    setCurrentQIndex(0);
    setTimeLeft(60);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsGameOver(false);
    setFreezeUsed(false);
    setFiftyFiftyUsed(false);
    setHintUsed(false);
    setEliminatedOptions([]);
    setShowHint(false);
    setIsPlaying(true);
  };

  // Countdown
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 5 && t > 0) soundManager.playTick();
          if (t <= 1) {
            clearInterval(timerRef.current);
            endGame();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, timeLeft]);

  const endGame = () => {
    setIsPlaying(false);
    setIsGameOver(true);
    soundManager.playVictory();
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
    });
    onEarnExp(Math.floor(score * 0.5));
  };

  const handleSelectAnswer = (optionId: string) => {
    if (isAnswered || !isPlaying) return;

    setSelectedOption(optionId);
    setIsAnswered(true);

    const chosen = currentQ.options.find((o) => o.id === optionId);
    const isCorrect = chosen?.isCorrect;

    if (isCorrect) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > maxStreak) setMaxStreak(nextStreak);
      soundManager.playCorrect(nextStreak);

      // Score multiplier based on streak
      const multiplier = nextStreak >= 5 ? 3 : nextStreak >= 3 ? 2 : nextStreak >= 2 ? 1.5 : 1;
      const gained = Math.round(50 * multiplier);
      setScore((s) => s + gained);
      onEarnExp(20, currentQ.identityId);

      setTimeout(() => {
        advanceQuestion();
      }, 700);
    } else {
      setStreak(0);
      soundManager.playWrong();
      setTimeout(() => {
        advanceQuestion();
      }, 1200);
    }
  };

  const advanceQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setEliminatedOptions([]);
    setShowHint(false);

    if (currentQIndex < shuffledQuestions.length - 1) {
      setCurrentQIndex((i) => i + 1);
    } else {
      // Loop or reshuffle
      const reshuffled = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
      setShuffledQuestions(reshuffled);
      setCurrentQIndex(0);
    }
  };

  // Lifeline 1: Freeze (+15s)
  const useFreeze = () => {
    if (freezeUsed || !isPlaying) return;
    soundManager.playClick();
    setFreezeUsed(true);
    setTimeLeft((t) => t + 15);
  };

  // Lifeline 2: 50:50 (Eliminate 2 wrong answers)
  const useFiftyFifty = () => {
    if (fiftyFiftyUsed || !isPlaying) return;
    soundManager.playClick();
    setFiftyFiftyUsed(true);
    const wrongOptions = currentQ.options.filter((o) => !o.isCorrect).map((o) => o.id);
    const shuffledWrong = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
    setEliminatedOptions(shuffledWrong);
  };

  // Lifeline 3: Hint
  const useHint = () => {
    if (hintUsed || !isPlaying) return;
    soundManager.playClick();
    setHintUsed(true);
    setShowHint(true);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
              <Zap className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">Đua Tốc Độ 60 Giây (Speed Rush)</h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Trả lời đúng nhiều câu nhất có thể trước khi đồng hồ điểm 0! Chuỗi thắng càng dài điểm càng cao!
          </p>
        </div>

        {isPlaying && (
          <button
            onClick={startGame}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-colors"
            title="Chơi lại"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {!isPlaying && !isGameOver ? (
        /* Welcome / Start Screen */
        <div className="p-8 text-center bg-slate-950/70 rounded-2xl border border-slate-800">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-tr from-rose-500 to-amber-500 rounded-3xl flex items-center justify-center shadow-lg shadow-rose-500/20 text-3xl">
            ⚡
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Sẵn Sàng Thử Thách Tốc Độ?</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            Bạn có 60 giây. Hãy giữ chuỗi đúng liên tục để kích hoạt nhân điểm <span className="text-amber-400 font-bold">x1.5, x2, x3</span> và sử dụng 3 quyền trợ giúp thông minh!
          </p>

          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto mb-8 text-left text-xs">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-2.5">
              <Snowflake className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <div>
                <div className="font-bold text-slate-200">Đóng Băng</div>
                <div className="text-slate-500">+15 giây quý giá</div>
              </div>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-2.5">
              <Target className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <div className="font-bold text-slate-200">50 : 50</div>
                <div className="text-slate-500">Loại 2 đáp án sai</div>
              </div>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-2.5">
              <Lightbulb className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <div className="font-bold text-slate-200">Gợi Ý</div>
                <div className="text-slate-500">Xem mẹo công thức</div>
              </div>
            </div>
          </div>

          <button
            onClick={startGame}
            className="px-8 py-3.5 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-slate-950 font-black text-lg rounded-2xl shadow-xl shadow-rose-500/20 transform hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto"
          >
            <Play className="w-6 h-6 fill-current" /> BẮT ĐẦU NGAY!
          </button>
        </div>
      ) : isGameOver ? (
        /* Game Over Screen */
        <div className="p-8 text-center bg-slate-950/80 rounded-2xl border border-slate-800 animate-in fade-in zoom-in duration-300">
          <div className="text-4xl mb-2">🏆</div>
          <h3 className="text-2xl font-black text-white mb-1">HẾT GIỜ RỒI!</h3>
          <p className="text-sm text-slate-400 mb-6">Bạn đã thể hiện tốc độ tính toán rất ấn tượng!</p>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="text-xs text-slate-400 uppercase font-semibold">Tổng Điểm</div>
              <div className="text-2xl font-black text-amber-400 font-mono">{score}</div>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="text-xs text-slate-400 uppercase font-semibold">Chuỗi Max</div>
              <div className="text-2xl font-black text-rose-400 font-mono">x{maxStreak}</div>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="text-xs text-slate-400 uppercase font-semibold">EXP Nhận</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">+{Math.floor(score * 0.5)}</div>
            </div>
          </div>

          <button
            onClick={startGame}
            className="px-8 py-3 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-slate-950 font-bold rounded-xl shadow-lg transition-all"
          >
            Thử Lại Để Phá Kỷ Lục
          </button>
        </div>
      ) : (
        /* Active Game Screen */
        <div>
          {/* Top Bar: Time, Score, Streak, Lifelines */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
            {/* Timer */}
            <div
              className={`p-3 rounded-2xl border flex items-center justify-between transition-colors ${
                timeLeft <= 10
                  ? 'bg-rose-950/60 border-rose-500 animate-pulse text-rose-400'
                  : 'bg-slate-950/70 border-slate-800 text-cyan-400'
              }`}
            >
              <div>
                <div className="text-[11px] uppercase font-semibold text-slate-400">Thời Gian</div>
                <div className="text-2xl font-black font-mono">{timeLeft}s</div>
              </div>
              <Timer className="w-6 h-6 opacity-70" />
            </div>

            {/* Score */}
            <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-center justify-between text-amber-400">
              <div>
                <div className="text-[11px] uppercase font-semibold text-slate-400">Điểm Số</div>
                <div className="text-2xl font-black font-mono">{score}</div>
              </div>
              <Award className="w-6 h-6 opacity-70" />
            </div>

            {/* Streak */}
            <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-center justify-between text-rose-400">
              <div>
                <div className="text-[11px] uppercase font-semibold text-slate-400">Combo Streak</div>
                <div className="text-2xl font-black font-mono">
                  {streak > 0 ? `x${streak}` : '0'}
                  {streak >= 3 && <span className="text-xs ml-1 text-amber-400 font-bold">({streak >= 5 ? 'x3' : 'x2'} PTS)</span>}
                </div>
              </div>
              <Flame className={`w-6 h-6 ${streak >= 3 ? 'text-rose-500 animate-bounce' : 'opacity-40'}`} />
            </div>

            {/* Lifelines */}
            <div className="p-2 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-center justify-around">
              <button
                disabled={freezeUsed}
                onClick={useFreeze}
                className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  freezeUsed
                    ? 'opacity-30 border-slate-800 bg-slate-900 cursor-not-allowed'
                    : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-400 hover:bg-cyan-900/60'
                }`}
                title="+15 Giây"
              >
                <Snowflake className="w-4 h-4" />
                <span className="text-[9px] font-bold">+15s</span>
              </button>

              <button
                disabled={fiftyFiftyUsed}
                onClick={useFiftyFifty}
                className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  fiftyFiftyUsed
                    ? 'opacity-30 border-slate-800 bg-slate-900 cursor-not-allowed'
                    : 'bg-amber-950/40 border-amber-500/40 text-amber-400 hover:bg-amber-900/60'
                }`}
                title="Loại 2 đáp án sai"
              >
                <Target className="w-4 h-4" />
                <span className="text-[9px] font-bold">50:50</span>
              </button>

              <button
                disabled={hintUsed}
                onClick={useHint}
                className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  hintUsed
                    ? 'opacity-30 border-slate-800 bg-slate-900 cursor-not-allowed'
                    : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60'
                }`}
                title="Gợi ý"
              >
                <Lightbulb className="w-4 h-4" />
                <span className="text-[9px] font-bold">Gợi ý</span>
              </button>
            </div>
          </div>

          {/* Question Box */}
          <div className="p-6 bg-slate-950/90 rounded-2xl border border-slate-800 text-center mb-6 shadow-inner">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              {currentQ.questionText}
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-white my-3">
              <MathView latex={currentQ.questionLatex} block />
            </div>

            {showHint && (
              <div className="mt-3 p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 animate-in fade-in">
                💡 <span className="font-semibold">Mẹo:</span> {currentQ.hint}
              </div>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQ.options.map((opt) => {
              const isEliminated = eliminatedOptions.includes(opt.id);
              const isChosen = selectedOption === opt.id;
              const isRight = isAnswered && opt.isCorrect;
              const isWrong = isAnswered && isChosen && !opt.isCorrect;

              if (isEliminated) {
                return (
                  <div
                    key={opt.id}
                    className="p-4 rounded-2xl border border-slate-800/40 bg-slate-950/30 opacity-20 cursor-not-allowed"
                  >
                    <span className="font-mono text-slate-600 line-through">Đáp án {opt.id}</span>
                  </div>
                );
              }

              return (
                <button
                  key={opt.id}
                  disabled={isAnswered}
                  onClick={() => handleSelectAnswer(opt.id)}
                  className={`p-4 rounded-2xl border-2 text-left flex items-center gap-4 transition-all duration-200 ${
                    isRight
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-4 ring-emerald-500/20'
                      : isWrong
                      ? 'bg-rose-950/70 border-rose-500 text-rose-200 ring-4 ring-rose-500/20'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 hover:border-indigo-400/60 text-slate-100 hover:scale-[1.01] active:scale-[0.99]'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-xl font-bold font-mono text-sm flex items-center justify-center flex-shrink-0 ${
                      isRight
                        ? 'bg-emerald-500 text-slate-950'
                        : isWrong
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-900 text-slate-300'
                    }`}
                  >
                    {opt.id}
                  </span>
                  <div className="text-base font-mono font-semibold flex-1">
                    <MathView latex={opt.latex} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
