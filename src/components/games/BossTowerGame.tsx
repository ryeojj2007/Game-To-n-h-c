import React, { useState } from 'react';
import { MathView } from '../MathView';
import { BOSS_LIST, QUIZ_QUESTIONS } from '../../data/gameQuestions';
import { soundManager } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Shield, Swords, Sparkles, Heart, RotateCcw, ChevronRight, Award, Skull } from 'lucide-react';
import { UserStats } from '../../types/math';

interface BossTowerGameProps {
  onEarnExp: (amount: number, identityId?: number) => void;
  stats: UserStats;
}

export const BossTowerGame: React.FC<BossTowerGameProps> = ({ onEarnExp }) => {
  const [currentFloor, setCurrentFloor] = useState<number>(0); // 0 to 4 (5 floors)
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [bossHp, setBossHp] = useState<number>(BOSS_LIST[0].maxHp);
  const [shieldActive, setShieldActive] = useState<boolean>(false);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [isFloorWon, setIsFloorWon] = useState<boolean>(false);
  const [isPlayerDead, setIsPlayerDead] = useState<boolean>(false);

  const currentBoss = BOSS_LIST[currentFloor];

  // Filter questions that match boss focus
  const bossQuestions = QUIZ_QUESTIONS.filter((q) =>
    currentBoss.identityFocus.includes(q.identityId)
  ).sort(() => 0.5 - Math.random());

  const currentQuestion = bossQuestions[currentQIndex % bossQuestions.length] || QUIZ_QUESTIONS[0];

  const handleSelectAnswer = (optionId: string) => {
    if (isAnswered || isPlayerDead || isFloorWon) return;

    setSelectedOption(optionId);
    setIsAnswered(true);

    const chosen = currentQuestion.options.find((o) => o.id === optionId);
    const isCorrect = chosen?.isCorrect;

    if (isCorrect) {
      // Player attacks boss
      soundManager.playCorrect();
      soundManager.playBossHit();

      const isCrit = Math.random() > 0.6;
      const damage = isCrit ? 40 : 25;
      const newBossHp = Math.max(0, bossHp - damage);
      setBossHp(newBossHp);

      const logMsg = isCrit
        ? `🔥 CHÍ MẠNG TOÁN HỌC! Bạn tung chiêu khai triển chính xác gây ${damage} sát thương lên ${currentBoss.name}!`
        : `⚔️ Bạn giải đúng hằng đẳng thức gây ${damage} sát thương!`;

      setCombatLog((prev) => [logMsg, ...prev.slice(0, 4)]);
      onEarnExp(30, currentQuestion.identityId);

      if (newBossHp === 0) {
        // Floor Victory!
        setIsFloorWon(true);
        soundManager.playVictory();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
        onEarnExp(100);
      } else {
        setTimeout(() => {
          advanceNextTurn();
        }, 1200);
      }
    } else {
      // Boss attacks player!
      soundManager.playWrong();

      const rawDamage = currentBoss.attackPower;
      const actualDamage = shieldActive ? Math.round(rawDamage * 0.5) : rawDamage;
      const newPlayerHp = Math.max(0, playerHp - actualDamage);
      setPlayerHp(newPlayerHp);

      const logMsg = shieldActive
        ? `🛡️ Khiên hóa giải đã đỡ một phần đòn đánh của ${currentBoss.name}! Bạn chỉ mất ${actualDamage} HP.`
        : `💥 Bạn nhầm công thức! ${currentBoss.name} phản đòn gây ${actualDamage} sát thương!`;

      setCombatLog((prev) => [logMsg, ...prev.slice(0, 4)]);
      setShieldActive(false);

      if (newPlayerHp === 0) {
        setIsPlayerDead(true);
      } else {
        setTimeout(() => {
          advanceNextTurn();
        }, 1400);
      }
    }
  };

  const advanceNextTurn = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentQIndex((i) => i + 1);
  };

  const handleActivateShield = () => {
    if (shieldActive || isAnswered) return;
    soundManager.playClick();
    setShieldActive(true);
    setCombatLog((prev) => ['🛡️ Bạn đã kích hoạt Khiên Hóa Giải cho lượt tới!', ...prev.slice(0, 4)]);
  };

  const handleNextFloor = () => {
    if (currentFloor < BOSS_LIST.length - 1) {
      const nextF = currentFloor + 1;
      setCurrentFloor(nextF);
      setBossHp(BOSS_LIST[nextF].maxHp);
      setPlayerHp(100); // heal up for next floor
      setIsFloorWon(false);
      setIsPlayerDead(false);
      setIsAnswered(false);
      setSelectedOption(null);
      setCombatLog([`⚔️ Đã tiến vào ${BOSS_LIST[nextF].title}: Đối đầu với ${BOSS_LIST[nextF].name}!`]);
    }
  };

  const handleRestartFloor = () => {
    soundManager.playClick();
    setPlayerHp(100);
    setBossHp(currentBoss.maxHp);
    setIsFloorWon(false);
    setIsPlayerDead(false);
    setIsAnswered(false);
    setSelectedOption(null);
    setShieldActive(false);
    setCombatLog(['⚔️ Bắt đầu lại trận chiến tầng này!']);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
              <Swords className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">Leo Tháp Săn Boss Hằng Đẳng Thức</h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Vượt qua 5 tầng tháp ma trận toán học, hạ gục các Boss huyền thoại để trở thành Đại Sư!
          </p>
        </div>

        {/* Floor selector indicator */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {BOSS_LIST.map((b, idx) => (
            <div
              key={b.id}
              className={`w-7 h-7 rounded-lg text-xs font-bold font-mono flex items-center justify-center transition-all ${
                idx === currentFloor
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30 ring-2 ring-purple-400'
                  : idx < currentFloor
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                  : 'bg-slate-900 text-slate-600'
              }`}
            >
              {idx + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Battle Stage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Player Status Card */}
        <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xl shadow-md shadow-cyan-500/20">
                  🧙‍♂️
                </div>
                <div>
                  <div className="font-bold text-slate-200">Hiệp Sĩ Toán Học</div>
                  <div className="text-xs text-cyan-400 font-mono">Cấp độ 8 THCS</div>
                </div>
              </div>
              {shieldActive && (
                <span className="px-2.5 py-1 bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold rounded-lg flex items-center gap-1 animate-pulse">
                  <Shield className="w-3.5 h-3.5" /> Khiên Bật
                </span>
              )}
            </div>

            {/* HP Bar */}
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between text-xs font-mono font-bold">
                <span className="text-slate-400 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> HP Bạn:
                </span>
                <span className={playerHp > 30 ? 'text-emerald-400' : 'text-rose-400 animate-bounce'}>
                  {playerHp} / 100
                </span>
              </div>
              <div className="w-full h-3.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full transition-all duration-500 ${
                    playerHp > 50
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      : playerHp > 25
                      ? 'bg-gradient-to-r from-amber-500 to-orange-400'
                      : 'bg-gradient-to-r from-rose-600 to-red-500'
                  }`}
                  style={{ width: `${playerHp}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              disabled={shieldActive || isAnswered || isFloorWon || isPlayerDead}
              onClick={handleActivateShield}
              className={`w-full py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                shieldActive
                  ? 'bg-cyan-900/40 border-cyan-500 text-cyan-300 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
              }`}
            >
              <Shield className="w-4 h-4 text-cyan-400" /> Dựng Khiên Phòng Thủ (-50% DMG)
            </button>
          </div>
        </div>

        {/* Boss Status Card */}
        <div className={`p-5 bg-gradient-to-br ${currentBoss.bgGradient} rounded-2xl border border-slate-700/80 flex flex-col justify-between shadow-xl`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/20 flex items-center justify-center text-2xl backdrop-blur-sm">
                  {currentBoss.avatar}
                </div>
                <div>
                  <div className="font-black text-white text-base">{currentBoss.name}</div>
                  <div className="text-xs text-slate-300">{currentBoss.title}</div>
                </div>
              </div>
              <div className="px-2.5 py-1 bg-black/40 rounded-lg text-xs font-mono text-amber-300 border border-white/10 font-bold">
                Tầng {currentFloor + 1}
              </div>
            </div>

            {/* Boss HP Bar */}
            <div className="space-y-1.5 mb-3">
              <div className="flex justify-between text-xs font-mono font-bold text-white">
                <span>HP Boss:</span>
                <span>
                  {bossHp} / {currentBoss.maxHp}
                </span>
              </div>
              <div className="w-full h-3.5 bg-black/60 rounded-full overflow-hidden border border-white/20">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 transition-all duration-500"
                  style={{ width: `${(bossHp / currentBoss.maxHp) * 100}%` }}
                />
              </div>
            </div>

            <p className="text-xs text-white/90 italic bg-black/30 p-2.5 rounded-xl border border-white/10">
              "{isFloorWon ? currentBoss.dialogueDefeated : currentBoss.dialogueIntro}"
            </p>
          </div>
        </div>
      </div>

      {/* Combat Log */}
      {combatLog.length > 0 && (
        <div className="mb-6 p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 font-mono text-xs space-y-1">
          {combatLog.map((log, idx) => (
            <div key={idx} className="text-slate-300">
              {log}
            </div>
          ))}
        </div>
      )}

      {/* Floor Won Banner */}
      {isFloorWon ? (
        <div className="p-8 text-center bg-gradient-to-r from-emerald-600/30 via-teal-600/30 to-slate-900 border border-emerald-500/40 rounded-2xl animate-in fade-in zoom-in duration-300">
          <div className="text-3xl mb-2">👑</div>
          <h3 className="text-2xl font-black text-emerald-400 mb-1">
            ĐÃ ĐÁNH BẠI {currentBoss.name.toUpperCase()}!
          </h3>
          <p className="text-sm text-slate-300 mb-6">
            Bạn đã xuất sắc vượt qua {currentBoss.title}! Nhận thưởng +100 EXP!
          </p>

          {currentFloor < BOSS_LIST.length - 1 ? (
            <button
              onClick={handleNextFloor}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 mx-auto"
            >
              Tiến Vào Tầng {currentFloor + 2} <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <div className="text-amber-400 font-bold text-lg">
              🎉 XUẤT SẮC! BẠN ĐÃ PHÁ ĐẢO TOÀN BỘ 5 TẦNG THÁP HẰNG ĐẲNG THỨC! 🎉
            </div>
          )}
        </div>
      ) : isPlayerDead ? (
        /* Player Defeated */
        <div className="p-8 text-center bg-rose-950/40 border border-rose-500/40 rounded-2xl animate-in fade-in zoom-in duration-300">
          <Skull className="w-12 h-12 text-rose-400 mx-auto mb-2" />
          <h3 className="text-2xl font-black text-rose-400 mb-1">BẠN ĐÃ GỤC NGÃ!</h3>
          <p className="text-sm text-slate-300 mb-6">
            Đừng nản lòng! Hãy ôn lại công thức hằng đẳng thức và thử lại ngay nhé!
          </p>
          <button
            onClick={handleRestartFloor}
            className="px-8 py-3 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" /> Thử Lại Tầng Này
          </button>
        </div>
      ) : (
        /* Question Battle Arena */
        <div>
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 text-center mb-4">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
              Giải đúng để tấn công Boss:
            </div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-white my-2">
              <MathView latex={currentQuestion.questionLatex} block />
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options.map((opt) => {
              const isChosen = selectedOption === opt.id;
              const isRight = isAnswered && opt.isCorrect;
              const isWrong = isAnswered && isChosen && !opt.isCorrect;

              return (
                <button
                  key={opt.id}
                  disabled={isAnswered}
                  onClick={() => handleSelectAnswer(opt.id)}
                  className={`p-4 rounded-xl border-2 text-left flex items-center gap-3 transition-all ${
                    isRight
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : isWrong
                      ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200 hover:border-purple-400'
                  }`}
                >
                  <span className="w-7 h-7 rounded-lg bg-slate-900 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 text-slate-400">
                    {opt.id}
                  </span>
                  <div className="font-mono font-semibold text-sm">
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
