import React, { useState } from 'react';
import { MathView } from '../MathView';
import { FILL_BLANK_QUESTIONS } from '../../data/gameQuestions';
import { soundManager } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { HelpCircle, Check, ArrowRight, RotateCcw, Sparkles, Lightbulb } from 'lucide-react';
import { UserStats } from '../../types/math';

interface FillBlankGameProps {
  onEarnExp: (amount: number, identityId?: number) => void;
  stats: UserStats;
}

export const FillBlankGame: React.FC<FillBlankGameProps> = ({ onEarnExp }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [filledBlanks, setFilledBlanks] = useState<Record<string, string>>({});
  const [activeBlankId, setActiveBlankId] = useState<string>('BLANK1');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const currentQ = FILL_BLANK_QUESTIONS[currentIndex];

  const handleSelectOption = (opt: string) => {
    if (isSubmitted) return;
    soundManager.playClick();
    const updated = { ...filledBlanks, [activeBlankId]: opt };
    setFilledBlanks(updated);

    // Auto-advance active blank to next blank if available
    const blankIds = currentQ.blanks.map((b) => b.id);
    const nextUnfilled = blankIds.find((id) => id !== activeBlankId && !updated[id]);
    if (nextUnfilled) {
      setActiveBlankId(nextUnfilled);
    }
  };

  const handleCheckAnswer = () => {
    // Verify all blanks are filled
    const allFilled = currentQ.blanks.every((b) => !!filledBlanks[b.id]);
    if (!allFilled) return;

    let correct = true;
    currentQ.blanks.forEach((b) => {
      if (filledBlanks[b.id] !== b.correctAnswer) {
        correct = false;
      }
    });

    setIsSubmitted(true);
    setIsCorrect(correct);

    if (correct) {
      soundManager.playCorrect(3);
      setScore((s) => s + 50);
      onEarnExp(50, currentQ.identityId);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } else {
      soundManager.playWrong();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex < FILL_BLANK_QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
      setFilledBlanks({});
      setActiveBlankId('BLANK1');
      setIsSubmitted(false);
      setIsCorrect(false);
    } else {
      // Finished all questions
      setCurrentIndex(0);
      setFilledBlanks({});
      setActiveBlankId('BLANK1');
      setIsSubmitted(false);
      setIsCorrect(false);
    }
  };

  const handleResetCurrent = () => {
    soundManager.playClick();
    setFilledBlanks({});
    setActiveBlankId('BLANK1');
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  // Render template with interactive blank placeholders
  const renderTemplateEquation = () => {
    // Template string: e.g. "([BLANK1] - 5)^2 = 4x^2 - [BLANK2] + 25"
    return (
      <div className="flex flex-wrap items-center justify-center gap-2 p-6 bg-slate-950/80 rounded-2xl border border-slate-800 text-xl font-mono">
        {currentQ.displayTemplateLatex.split(/(\[BLANK\d\])/).map((part, idx) => {
          if (part === '[BLANK1]' || part === '[BLANK2]') {
            const blankId = part.replace('[', '').replace(']', '');
            const value = filledBlanks[blankId];
            const isActive = activeBlankId === blankId;
            const targetBlank = currentQ.blanks.find((b) => b.id === blankId);
            const isBlankRight = isSubmitted && value === targetBlank?.correctAnswer;
            const isBlankWrong = isSubmitted && value && value !== targetBlank?.correctAnswer;

            return (
              <button
                key={idx}
                onClick={() => !isSubmitted && setActiveBlankId(blankId)}
                className={`min-w-[64px] h-11 px-3 rounded-xl border-2 font-bold text-center flex items-center justify-center transition-all ${
                  isBlankRight
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                    : isBlankWrong
                    ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                    : isActive
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-4 ring-amber-500/20 animate-pulse'
                    : value
                    ? 'bg-slate-800 border-indigo-500 text-indigo-200'
                    : 'bg-slate-900 border-dashed border-slate-600 text-slate-500 hover:border-slate-400'
                }`}
              >
                {value ? <MathView latex={value} /> : <span className="text-xs">? ({blankId})</span>}
              </button>
            );
          }
          return <MathView key={idx} latex={part} className="text-lg text-slate-200 font-bold" />;
        })}
      </div>
    );
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <HelpCircle className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">Thợ Săn Dấu Hỏi (Điền Khuyết HĐT)</h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Chọn các mảnh ghép đúng để điền vào các vị trí dấu hỏi <span className="text-amber-400 font-bold">?</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono font-bold text-emerald-400">
            Điểm: {score} XP
          </div>
          <div className="px-3.5 py-1.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-400">
            Câu {currentIndex + 1} / {FILL_BLANK_QUESTIONS.length}
          </div>
        </div>
      </div>

      {/* Question Prompt */}
      <div className="mb-4 text-center">
        <span className="text-sm text-slate-300 font-medium">{currentQ.prompt}</span>
      </div>

      {/* Main Equation Area */}
      <div className="mb-6">{renderTemplateEquation()}</div>

      {/* Options Palette */}
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3 text-center">
          Nhấp chọn mảnh ghép để điền vào ô đang chọn ({activeBlankId}):
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {currentQ.optionsPool.map((opt, idx) => {
            const isUsed = Object.values(filledBlanks).includes(opt);
            return (
              <button
                key={idx}
                disabled={isSubmitted}
                onClick={() => handleSelectOption(opt)}
                className={`px-5 py-2.5 rounded-xl border font-mono font-bold text-base transition-all ${
                  isUsed
                    ? 'bg-slate-800/40 border-slate-700/50 text-slate-500 line-through cursor-not-allowed'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700 hover:border-amber-400/60 text-amber-200 hover:scale-105 active:scale-95 shadow-md'
                }`}
              >
                <MathView latex={opt} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4 mb-6">
        {!isSubmitted ? (
          <>
            <button
              onClick={handleResetCurrent}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 text-sm font-semibold flex items-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Làm lại ô này
            </button>
            <button
              disabled={!currentQ.blanks.every((b) => !!filledBlanks[b.id])}
              onClick={handleCheckAnswer}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all"
            >
              <Check className="w-4 h-4" /> Kiểm Tra Kết Quả
            </button>
          </>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all"
          >
            {currentIndex < FILL_BLANK_QUESTIONS.length - 1 ? 'Câu Tiếp Theo' : 'Chơi Lại Từ Đầu'}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Explanation Banner */}
      {isSubmitted && (
        <div
          className={`p-4 rounded-2xl border animate-in fade-in duration-300 ${
            isCorrect
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-slate-900 rounded-xl">
              <Lightbulb className={`w-5 h-5 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`} />
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm mb-1 flex items-center gap-2">
                {isCorrect ? '🎉 Chính xác 100%! (+50 EXP)' : '❌ Chưa chính xác rồi!'}
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <div>
                  <span className="font-semibold text-white">Đẳng thức đúng: </span>
                  <MathView latex={currentQ.fullEquationLatex} />
                </div>
                <div>
                  <span className="font-semibold text-white">Giải thích: </span>
                  {currentQ.explanation}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
