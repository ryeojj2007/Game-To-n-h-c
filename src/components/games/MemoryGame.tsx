import React, { useState, useEffect } from 'react';
import { MathView } from '../MathView';
import { MEMORY_CARD_PAIRS } from '../../data/gameQuestions';
import { soundManager } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { RotateCcw, Award, Zap, Timer, Flame, CheckCircle2 } from 'lucide-react';
import { UserStats } from '../../types/math';

interface MemoryCardItem {
  id: string;
  pairId: string;
  latex: string;
  label?: string;
  isFlipped: boolean;
  isMatched: boolean;
  type: 'left' | 'right';
}

interface MemoryGameProps {
  onEarnExp: (amount: number, identityId?: number) => void;
  stats: UserStats;
}

export const MemoryGame: React.FC<MemoryGameProps> = ({ onEarnExp }) => {
  const [pairCount, setPairCount] = useState<4 | 6 | 8>(6);
  const [cards, setCards] = useState<MemoryCardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [matches, setMatches] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isWon, setIsWon] = useState<boolean>(false);

  // Initialize game
  const initGame = (count = pairCount) => {
    soundManager.playClick();
    const selectedPairs = [...MEMORY_CARD_PAIRS].sort(() => 0.5 - Math.random()).slice(0, count);
    const cardList: MemoryCardItem[] = [];

    selectedPairs.forEach((pair) => {
      cardList.push({
        id: `${pair.id}_left`,
        pairId: pair.id,
        latex: pair.left,
        label: pair.label,
        isFlipped: false,
        isMatched: false,
        type: 'left',
      });
      cardList.push({
        id: `${pair.id}_right`,
        pairId: pair.id,
        latex: pair.right,
        label: pair.label,
        isFlipped: false,
        isMatched: false,
        type: 'right',
      });
    });

    // Shuffle cards
    const shuffled = cardList.sort(() => 0.5 - Math.random());
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setCombo(0);
    setMaxCombo(0);
    setTime(0);
    setIsPlaying(true);
    setIsWon(false);
  };

  useEffect(() => {
    initGame(pairCount);
  }, [pairCount]);

  // Timer
  useEffect(() => {
    let interval: any;
    if (isPlaying && !isWon) {
      interval = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isWon]);

  const handleCardClick = (index: number) => {
    if (!isPlaying || isWon) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;
    if (flippedCards.length >= 2) return;

    soundManager.playCardFlip();

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [idx1, idx2] = newFlipped;
      const card1 = newCards[idx1];
      const card2 = newCards[idx2];

      if (card1.pairId === card2.pairId && card1.type !== card2.type) {
        // MATCH!
        const nextCombo = combo + 1;
        setCombo(nextCombo);
        if (nextCombo > maxCombo) setMaxCombo(nextCombo);
        soundManager.playCorrect(nextCombo);

        setTimeout(() => {
          newCards[idx1].isMatched = true;
          newCards[idx2].isMatched = true;
          setCards([...newCards]);
          setFlippedCards([]);
          const newMatches = matches + 1;
          setMatches(newMatches);

          if (newMatches === pairCount) {
            // VICTORY!
            setIsWon(true);
            setIsPlaying(false);
            soundManager.playVictory();
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            });
            const expBonus = pairCount * 25 + Math.max(0, 100 - time) + nextCombo * 10;
            onEarnExp(expBonus);
          }
        }, 300);
      } else {
        // NO MATCH
        setCombo(0);
        soundManager.playWrong();
        setTimeout(() => {
          newCards[idx1].isFlipped = false;
          newCards[idx2].isFlipped = false;
          setCards([...newCards]);
          setFlippedCards([]);
        }, 900);
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <Award className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">Lật Thẻ Ghép Đôi Hằng Đẳng Thức</h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Ghép đúng vế trái và vế phải của hằng đẳng thức hoặc biểu thức tương đương!
          </p>
        </div>

        {/* Difficulty buttons */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex gap-1">
            <button
              onClick={() => setPairCount(4)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                pairCount === 4 ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Dễ (8 Thẻ)
            </button>
            <button
              onClick={() => setPairCount(6)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                pairCount === 6 ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Vừa (12 Thẻ)
            </button>
            <button
              onClick={() => setPairCount(8)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                pairCount === 8 ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Khó (16 Thẻ)
            </button>
          </div>

          <button
            onClick={() => initGame()}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-colors"
            title="Chơi lại ván mới"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Game Dashboard Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Thời Gian</div>
            <div className="text-lg font-bold font-mono text-cyan-400">{formatTime(time)}</div>
          </div>
          <Timer className="w-5 h-5 text-cyan-400/50" />
        </div>

        <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Lượt Lật</div>
            <div className="text-lg font-bold font-mono text-amber-400">{moves}</div>
          </div>
          <Zap className="w-5 h-5 text-amber-400/50" />
        </div>

        <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Đã Ghép</div>
            <div className="text-lg font-bold font-mono text-emerald-400">
              {matches} / {pairCount}
            </div>
          </div>
          <CheckCircle2 className="w-5 h-5 text-emerald-400/50" />
        </div>

        <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Combo</div>
            <div className="text-lg font-bold font-mono text-rose-400">x{combo}</div>
          </div>
          <Flame className={`w-5 h-5 ${combo > 1 ? 'text-rose-500 animate-bounce' : 'text-rose-400/40'}`} />
        </div>
      </div>

      {/* Win Banner */}
      {isWon && (
        <div className="mb-6 p-5 bg-gradient-to-r from-emerald-600/30 via-teal-600/30 to-slate-900 border border-emerald-500/40 rounded-2xl text-center animate-in fade-in zoom-in duration-300">
          <div className="text-2xl font-black text-emerald-400 mb-1">🎉 CHIẾN THẮNG XUẤT SẮC! 🎉</div>
          <p className="text-sm text-slate-300 mb-3">
            Bạn đã hoàn thành trong <span className="text-white font-bold">{formatTime(time)}</span> với{' '}
            <span className="text-white font-bold">{moves}</span> lượt lật và Combo đỉnh cao{' '}
            <span className="text-rose-400 font-bold">x{maxCombo}</span>! (+{pairCount * 25 + Math.max(0, 100 - time)} EXP)
          </p>
          <button
            onClick={() => initGame()}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold rounded-xl shadow-lg transition-all"
          >
            Chơi Ván Mới Ngay
          </button>
        </div>
      )}

      {/* Cards Grid */}
      <div
        className={`grid gap-3.5 ${
          pairCount === 4
            ? 'grid-cols-2 sm:grid-cols-4'
            : pairCount === 6
            ? 'grid-cols-2 sm:grid-cols-4 md:grid-cols-6'
            : 'grid-cols-2 sm:grid-cols-4 md:grid-cols-8'
        }`}
      >
        {cards.map((card, idx) => {
          const isSelected = flippedCards.includes(idx);
          const showFront = card.isFlipped || card.isMatched;

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className={`h-28 sm:h-32 rounded-2xl cursor-pointer select-none transition-all duration-300 transform perspective-1000 ${
                card.isMatched
                  ? 'bg-emerald-950/40 border-2 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                  : showFront
                  ? 'bg-slate-800 border-2 border-indigo-400/80 shadow-xl shadow-indigo-500/20 scale-[1.02]'
                  : 'bg-gradient-to-br from-slate-800 to-slate-950 hover:from-slate-700 hover:to-slate-900 border border-slate-700/80 hover:border-indigo-400/50 hover:shadow-lg'
              }`}
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center">
                {showFront ? (
                  <div className="animate-in fade-in duration-200">
                    <MathView
                      latex={card.latex}
                      className={`text-sm sm:text-base font-bold ${
                        card.isMatched ? 'text-emerald-300' : 'text-indigo-200'
                      }`}
                    />
                    {card.label && (
                      <div className="text-[10px] text-slate-400 mt-1 font-mono">{card.label}</div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-600">
                    <span className="text-2xl font-mono font-bold text-slate-500">?</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-1">HĐT</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
