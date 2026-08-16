import React, { useState, useEffect } from 'react';
import { MathView } from '../MathView';
import { QUIZ_QUESTIONS } from '../../data/gameQuestions';
import { soundManager } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Swords, Bot, Users, Trophy, Play, RotateCcw } from 'lucide-react';
import { UserStats } from '../../types/math';

interface DuelArenaGameProps {
  onEarnExp: (amount: number, identityId?: number) => void;
  stats: UserStats;
}

export const DuelArenaGame: React.FC<DuelArenaGameProps> = ({ onEarnExp }) => {
  const [mode, setMode] = useState<'bot' | 'pvp'>('bot');
  const [botDifficulty, setBotDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [round, setRound] = useState<number>(1);
  const [p1Score, setP1Score] = useState<number>(0);
  const [p2Score, setP2Score] = useState<number>(0);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof QUIZ_QUESTIONS>([]);
  const [winner, setWinner] = useState<'p1' | 'p2' | null>(null);
  const [p1Locked, setP1Locked] = useState<string | null>(null);
  const [p2Locked, setP2Locked] = useState<string | null>(null);

  const currentQ = shuffledQuestions[currentQIndex] || QUIZ_QUESTIONS[0];

  const startDuel = () => {
    soundManager.playClick();
    const shuffled = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
    setShuffledQuestions(shuffled);
    setCurrentQIndex(0);
    setRound(1);
    setP1Score(0);
    setP2Score(0);
    setWinner(null);
    setP1Locked(null);
    setP2Locked(null);
    setIsPlaying(true);
  };

  // Bot AI automated answering logic
  useEffect(() => {
    let timeout: any;
    if (isPlaying && mode === 'bot' && !p2Locked && !winner) {
      // Delay based on bot difficulty
      const delay =
        botDifficulty === 'easy'
          ? Math.random() * 3000 + 4000
          : botDifficulty === 'medium'
          ? Math.random() * 2000 + 2500
          : Math.random() * 1000 + 1500;

      // Accuracy probability
      const accuracy = botDifficulty === 'easy' ? 0.6 : botDifficulty === 'medium' ? 0.85 : 0.98;

      timeout = setTimeout(() => {
        const willBeCorrect = Math.random() < accuracy;
        const correctOpt = currentQ.options.find((o) => o.isCorrect);
        const wrongOpts = currentQ.options.filter((o) => !o.isCorrect);

        const chosen = willBeCorrect
          ? correctOpt?.id || 'A'
          : wrongOpts[Math.floor(Math.random() * wrongOpts.length)]?.id || 'B';

        handlePlayerAction('p2', chosen);
      }, delay);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, mode, botDifficulty, currentQIndex, p2Locked, winner]);

  const handlePlayerAction = (player: 'p1' | 'p2', optionId: string) => {
    if (!isPlaying || winner) return;

    if (player === 'p1' && !p1Locked) {
      setP1Locked(optionId);
    } else if (player === 'p2' && !p2Locked) {
      setP2Locked(optionId);
    }

    const chosen = currentQ.options.find((o) => o.id === optionId);
    const isRight = chosen?.isCorrect;

    if (isRight) {
      soundManager.playCorrect();
      if (player === 'p1') {
        const next = p1Score + 1;
        setP1Score(next);
        if (next >= 3) {
          endMatch('p1');
          return;
        }
      } else {
        const next = p2Score + 1;
        setP2Score(next);
        if (next >= 3) {
          endMatch('p2');
          return;
        }
      }
      setTimeout(() => advanceRound(), 1000);
    } else {
      soundManager.playWrong();
      // If someone answered wrong, if both answered wrong advance round
      if ((player === 'p1' && p2Locked) || (player === 'p2' && p1Locked)) {
        setTimeout(() => advanceRound(), 1000);
      }
    }
  };

  const advanceRound = () => {
    setP1Locked(null);
    setP2Locked(null);
    setRound((r) => r + 1);
    setCurrentQIndex((i) => (i + 1) % shuffledQuestions.length);
  };

  const endMatch = (matchWinner: 'p1' | 'p2') => {
    setWinner(matchWinner);
    setIsPlaying(false);
    if (matchWinner === 'p1') {
      soundManager.playVictory();
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      onEarnExp(80);
    } else {
      soundManager.playWrong();
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <Swords className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">Đấu Trường 1v1 (Duel Arena)</h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Thi đấu đối kháng trực tiếp! Ai trả lời đúng nhanh hơn chạm mốc 3 điểm trước sẽ giành chiến thắng!
          </p>
        </div>

        {!isPlaying && (
          <div className="flex items-center gap-2">
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex gap-1">
              <button
                onClick={() => setMode('bot')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                  mode === 'bot' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Bot className="w-3.5 h-3.5" /> Đấu với AI Bot
              </button>
              <button
                onClick={() => setMode('pvp')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                  mode === 'pvp' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" /> 2 Người Chơi (1v1)
              </button>
            </div>
          </div>
        )}
      </div>

      {!isPlaying && !winner ? (
        <div className="p-8 text-center bg-slate-950/70 rounded-2xl border border-slate-800 max-w-lg mx-auto">
          <div className="text-4xl mb-3">⚔️</div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {mode === 'bot' ? 'Thách Đấu Với AI Bot' : 'Đấu Trường 2 Người Chơi'}
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            Luật chơi: Chạm 3 điểm trước để chiến thắng. Tốc độ và sự chuẩn xác là chìa khóa vinh quang!
          </p>

          {mode === 'bot' && (
            <div className="mb-6">
              <div className="text-xs uppercase font-semibold text-slate-400 mb-2">Chọn Cấp Độ Bot:</div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setBotDifficulty('easy')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    botDifficulty === 'easy'
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  🌱 Dễ (Tập Sự)
                </button>
                <button
                  onClick={() => setBotDifficulty('medium')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    botDifficulty === 'medium'
                      ? 'bg-amber-950 border-amber-500 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  ⚡ Vừa (Học Sinh Giỏi)
                </button>
                <button
                  onClick={() => setBotDifficulty('hard')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    botDifficulty === 'hard'
                      ? 'bg-rose-950 border-rose-500 text-rose-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  🔥 Khó (Siêu AI)
                </button>
              </div>
            </div>
          )}

          <button
            onClick={startDuel}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-lg rounded-2xl shadow-xl shadow-amber-500/20 transform hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto"
          >
            <Play className="w-5 h-5 fill-current" /> VÀO TRẬN ĐẤU
          </button>
        </div>
      ) : winner ? (
        /* Winner Screen */
        <div className="p-8 text-center bg-slate-950/80 rounded-2xl border border-slate-800 animate-in zoom-in duration-300">
          <Trophy className="w-14 h-14 text-amber-400 mx-auto mb-2" />
          <h3 className="text-2xl font-black text-white mb-1">
            {winner === 'p1'
              ? mode === 'bot'
                ? '🎉 BẠN ĐÃ THẮNG AI BOT!'
                : '🎉 NGƯỜI CHƠI 1 CHIẾN THẮNG!'
              : mode === 'bot'
              ? '🤖 AI BOT ĐÃ CHIẾN THẮNG!'
              : '🎉 NGƯỜI CHƠI 2 CHIẾN THẮNG!'}
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            Tỉ số chung cuộc: <span className="text-white font-mono font-bold">{p1Score} - {p2Score}</span>
          </p>

          <button
            onClick={startDuel}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-xl shadow-lg transition-all"
          >
            Đấu Lại Trận Mới
          </button>
        </div>
      ) : (
        /* Active Duel Screen */
        <div>
          {/* Scoreboard */}
          <div className="grid grid-cols-3 gap-4 mb-6 items-center">
            <div className="p-4 bg-slate-950 rounded-2xl border border-indigo-500/30 text-center">
              <div className="text-xs text-indigo-400 font-semibold mb-1">
                {mode === 'bot' ? '🧙‍♂️ Bạn (P1)' : '🧙‍♂️ Người Chơi 1'}
              </div>
              <div className="text-3xl font-black font-mono text-indigo-300">{p1Score} / 3</div>
            </div>

            <div className="text-center font-mono font-bold text-slate-500">
              <div className="text-xs uppercase text-slate-400">Hiệp {round}</div>
              <span className="text-xl text-amber-400">VS</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-rose-500/30 text-center">
              <div className="text-xs text-rose-400 font-semibold mb-1">
                {mode === 'bot' ? `🤖 Bot (${botDifficulty})` : '🧝‍♀️ Người Chơi 2'}
              </div>
              <div className="text-3xl font-black font-mono text-rose-300">{p2Score} / 3</div>
            </div>
          </div>

          {/* Central Question Box */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 text-center mb-6 shadow-xl">
            <div className="text-xs uppercase text-slate-400 font-semibold mb-1">{currentQ.questionText}</div>
            <div className="text-2xl font-mono font-bold text-white my-2">
              <MathView latex={currentQ.questionLatex} block />
            </div>
          </div>

          {/* Player 1 & Player 2 Duel Controls */}
          {mode === 'pvp' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* P1 Controls */}
              <div className="p-4 bg-indigo-950/20 rounded-2xl border border-indigo-500/30">
                <div className="text-xs font-bold text-indigo-400 mb-3 text-center uppercase">
                  Bảng Điều Khiển P1:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {currentQ.options.map((opt) => (
                    <button
                      key={opt.id}
                      disabled={!!p1Locked}
                      onClick={() => handlePlayerAction('p1', opt.id)}
                      className={`p-3 rounded-xl border font-mono font-semibold text-xs transition-all ${
                        p1Locked === opt.id
                          ? opt.isCorrect
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                            : 'bg-rose-950 border-rose-500 text-rose-300'
                          : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-bold mr-1.5">{opt.id}:</span>
                      <MathView latex={opt.latex} />
                    </button>
                  ))}
                </div>
              </div>

              {/* P2 Controls */}
              <div className="p-4 bg-rose-950/20 rounded-2xl border border-rose-500/30">
                <div className="text-xs font-bold text-rose-400 mb-3 text-center uppercase">
                  Bảng Điều Khiển P2:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {currentQ.options.map((opt) => (
                    <button
                      key={opt.id}
                      disabled={!!p2Locked}
                      onClick={() => handlePlayerAction('p2', opt.id)}
                      className={`p-3 rounded-xl border font-mono font-semibold text-xs transition-all ${
                        p2Locked === opt.id
                          ? opt.isCorrect
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                            : 'bg-rose-950 border-rose-500 text-rose-300'
                          : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-bold mr-1.5">{opt.id}:</span>
                      <MathView latex={opt.latex} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Bot mode single player view */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt) => (
                <button
                  key={opt.id}
                  disabled={!!p1Locked}
                  onClick={() => handlePlayerAction('p1', opt.id)}
                  className={`p-4 rounded-xl border-2 text-left flex items-center gap-3 transition-all ${
                    p1Locked === opt.id
                      ? opt.isCorrect
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/70 border-rose-500 text-rose-200'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="w-7 h-7 rounded-lg bg-slate-900 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 text-slate-400">
                    {opt.id}
                  </span>
                  <div className="font-mono font-semibold text-sm">
                    <MathView latex={opt.latex} />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
