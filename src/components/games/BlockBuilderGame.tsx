import React, { useState } from 'react';
import { MathView } from '../MathView';
import { BLOCK_BUILDER_LEVELS } from '../../data/gameQuestions';
import { soundManager } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Layers, RotateCcw, Check, ArrowRight, Delete, Sparkles, Lightbulb } from 'lucide-react';
import { UserStats } from '../../types/math';

interface BlockBuilderGameProps {
  onEarnExp: (amount: number, identityId?: number) => void;
  stats: UserStats;
}

export const BlockBuilderGame: React.FC<BlockBuilderGameProps> = ({ onEarnExp }) => {
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const [currentSequence, setCurrentSequence] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const level = BLOCK_BUILDER_LEVELS[levelIndex];

  const handleAddBlock = (block: string) => {
    if (isSubmitted) return;
    soundManager.playClick();
    setCurrentSequence((prev) => [...prev, block]);
  };

  const handleRemoveLastBlock = () => {
    if (isSubmitted) return;
    soundManager.playClick();
    setCurrentSequence((prev) => prev.slice(0, prev.length - 1));
  };

  const handleClearAll = () => {
    if (isSubmitted) return;
    soundManager.playClick();
    setCurrentSequence([]);
  };

  const handleCheckAnswer = () => {
    if (currentSequence.length === 0) return;

    const userStr = currentSequence.join('');
    const correctStr = level.correctSequence.join('');
    const right = userStr === correctStr;

    setIsSubmitted(true);
    setIsCorrect(right);

    if (right) {
      soundManager.playCorrect(3);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
      onEarnExp(50);
    } else {
      soundManager.playWrong();
    }
  };

  const handleNextLevel = () => {
    soundManager.playClick();
    if (levelIndex < BLOCK_BUILDER_LEVELS.length - 1) {
      setLevelIndex((i) => i + 1);
    } else {
      setLevelIndex(0);
    }
    setCurrentSequence([]);
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <Layers className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">Xếp Khối Phân Tích Đa Thức</h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Lắp ghép các mảnh khối toán học để tạo thành dạng nhân tử hoặc bình phương đúng!
          </p>
        </div>

        <div className="px-3.5 py-1.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400 font-bold">
          Màn {levelIndex + 1} / {BLOCK_BUILDER_LEVELS.length}
        </div>
      </div>

      {/* Target Expression Area */}
      <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 text-center mb-6">
        <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
          {level.instruction}
        </div>
        <div className="text-2xl sm:text-3xl font-mono font-black text-amber-400 my-2">
          <MathView latex={level.targetExpressionLatex} block />
        </div>
      </div>

      {/* Builder Assembly Area */}
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
          Khu Vực Lắp Ghép Của Bạn:
        </div>
        <div className="min-h-[72px] p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 flex flex-wrap items-center gap-2">
          {currentSequence.length === 0 ? (
            <span className="text-slate-600 text-sm italic mx-auto">
              Chưa có khối nào. Hãy bấm vào các khối bên dưới để lắp ráp...
            </span>
          ) : (
            currentSequence.map((block, idx) => (
              <span
                key={idx}
                className="px-3.5 py-2 bg-gradient-to-br from-indigo-600 to-blue-700 text-white font-mono font-bold text-lg rounded-xl shadow-md animate-in zoom-in duration-150"
              >
                <MathView latex={block} />
              </span>
            ))
          )}
        </div>
      </div>

      {/* Available Blocks Palette */}
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3">
          Kho Khối Toán Học (Bấm Để Thêm):
        </div>
        <div className="flex flex-wrap gap-2.5">
          {level.availableBlocks.map((block, idx) => (
            <button
              key={idx}
              disabled={isSubmitted}
              onClick={() => handleAddBlock(block)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-emerald-400 text-slate-100 font-mono font-bold text-base rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              <MathView latex={block} />
            </button>
          ))}
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex gap-2">
          <button
            disabled={isSubmitted || currentSequence.length === 0}
            onClick={handleRemoveLastBlock}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-40"
          >
            <Delete className="w-4 h-4" /> Xóa Khối Cuối
          </button>
          <button
            disabled={isSubmitted || currentSequence.length === 0}
            onClick={handleClearAll}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-40"
          >
            <RotateCcw className="w-4 h-4" /> Xóa Hết
          </button>
        </div>

        {!isSubmitted ? (
          <button
            disabled={currentSequence.length === 0}
            onClick={handleCheckAnswer}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-40 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all"
          >
            <Check className="w-4 h-4" /> Kiểm Tra Lắp Ghép
          </button>
        ) : (
          <button
            onClick={handleNextLevel}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold rounded-xl text-sm shadow-lg flex items-center gap-2 transition-all"
          >
            {levelIndex < BLOCK_BUILDER_LEVELS.length - 1 ? 'Màn Tiếp Theo' : 'Chơi Lại'}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Result feedback */}
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
            <div>
              <div className="font-bold text-sm mb-1">
                {isCorrect ? '🎉 Lắp ghép chính xác tuyệt đối! (+50 EXP)' : '❌ Chưa đúng thứ tự hoặc thiếu khối!'}
              </div>
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-white">Đáp án chuẩn: </span>
                <MathView latex={level.correctSequence.join('')} /> — {level.explanation}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
