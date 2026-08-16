import React, { useState, useEffect } from 'react';
import { UserStats } from './types/math';
import { loadUserStats, saveUserStats, checkNewBadges, calculateLevel } from './utils/storage';
import { soundManager } from './utils/audio';
import { Navbar } from './components/Navbar';
import { StandardExamMode } from './components/StandardExamMode';
import { IdentityHandbook } from './components/IdentityHandbook';
import { IdentitySolver } from './components/IdentitySolver';
import { AITutorChat } from './components/AITutorChat';
import { LeaderboardAndStats } from './components/LeaderboardAndStats';
import { MemoryGame } from './components/games/MemoryGame';
import { FillBlankGame } from './components/games/FillBlankGame';
import { SpeedRushGame } from './components/games/SpeedRushGame';
import { BossTowerGame } from './components/games/BossTowerGame';
import { BlockBuilderGame } from './components/games/BlockBuilderGame';
import { DuelArenaGame } from './components/games/DuelArenaGame';
import {
  Gamepad2,
  Award,
  Zap,
  Swords,
  Layers,
  HelpCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Cpu,
  Bot,
  Flame,
  ChevronRight,
  CheckCircle,
  FileText,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

type TabType = 'games' | 'exam' | 'handbook' | 'solver' | 'tutor' | 'stats';
type GameMode = 'menu' | 'memory' | 'fill_blank' | 'speed_rush' | 'boss_tower' | 'block_builder' | 'duel_arena';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('games');
  const [selectedGame, setSelectedGame] = useState<GameMode>('menu');
  const [stats, setStats] = useState<UserStats>(loadUserStats());
  const [unlockedBadgeNotification, setUnlockedBadgeNotification] = useState<any | null>(null);

  // Initialize sound settings
  useEffect(() => {
    soundManager.isMuted = !stats.soundEnabled;
  }, [stats.soundEnabled]);

  const handleToggleSound = () => {
    const updated = { ...stats, soundEnabled: !stats.soundEnabled };
    setStats(updated);
    saveUserStats(updated);
    soundManager.isMuted = !updated.soundEnabled;
    if (updated.soundEnabled) soundManager.playClick();
  };

  const handleEarnExp = (amount: number, identityId?: number) => {
    const prevLevel = calculateLevel(stats.exp).level;
    const newExp = stats.exp + amount;
    const newLevelInfo = calculateLevel(newExp);

    // Update mastery if identityId provided
    const newMastery = { ...stats.identityMastery };
    if (identityId && newMastery[identityId]) {
      newMastery[identityId] = {
        correct: newMastery[identityId].correct + 1,
        total: newMastery[identityId].total + 1,
      };
    }

    const updatedStats: UserStats = {
      ...stats,
      exp: newExp,
      level: newLevelInfo.level,
      identityMastery: newMastery,
    };

    // Check badges
    const { updatedStats: finalStats, newlyUnlocked } = checkNewBadges(updatedStats);

    setStats(finalStats);
    saveUserStats(finalStats);

    // If leveled up, play fanfare!
    if (newLevelInfo.level > prevLevel) {
      soundManager.playLevelUp();
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
      });
    }

    if (newlyUnlocked.length > 0) {
      setUnlockedBadgeNotification(newlyUnlocked[0]);
    }
  };

  const gameCards = [
    {
      id: 'memory' as GameMode,
      title: 'Lật Thẻ Ghép Đôi',
      subtitle: 'Ghép vế trái & vế phải hằng đẳng thức',
      icon: Award,
      badge: 'Rèn Trí Nhớ',
      gradient: 'from-indigo-600 via-blue-600 to-slate-900',
      border: 'border-indigo-500/40',
      hoverBorder: 'hover:border-indigo-400',
      iconBg: 'bg-indigo-500/20 text-indigo-300',
    },
    {
      id: 'fill_blank' as GameMode,
      title: 'Thợ Săn Dấu Hỏi',
      subtitle: 'Điền mảnh ghép khuyết vào đẳng thức',
      icon: HelpCircle,
      badge: 'Tư Duy logic',
      gradient: 'from-amber-600 via-orange-600 to-slate-900',
      border: 'border-amber-500/40',
      hoverBorder: 'hover:border-amber-400',
      iconBg: 'bg-amber-500/20 text-amber-300',
    },
    {
      id: 'speed_rush' as GameMode,
      title: 'Đua Tốc Độ 60s',
      subtitle: 'Trắc nghiệm tốc độ với chuỗi streak x3',
      icon: Zap,
      badge: 'Phản Xạ Nhanh',
      gradient: 'from-rose-600 via-red-600 to-slate-900',
      border: 'border-rose-500/40',
      hoverBorder: 'hover:border-rose-400',
      iconBg: 'bg-rose-500/20 text-rose-300',
    },
    {
      id: 'boss_tower' as GameMode,
      title: 'Leo Tháp Săn Boss',
      subtitle: '5 Tầng tháp ma trận hạ gục Boss đại ma vương',
      icon: Swords,
      badge: 'Chiến Thuật RPG',
      gradient: 'from-purple-600 via-pink-600 to-slate-900',
      border: 'border-purple-500/40',
      hoverBorder: 'hover:border-purple-400',
      iconBg: 'bg-purple-500/20 text-purple-300',
    },
    {
      id: 'block_builder' as GameMode,
      title: 'Xếp Khối Đa Thức',
      subtitle: 'Lắp ghép nhân tử và bình phương',
      icon: Layers,
      badge: 'Thực Hành Ghép',
      gradient: 'from-emerald-600 via-teal-600 to-slate-900',
      border: 'border-emerald-500/40',
      hoverBorder: 'hover:border-emerald-400',
      iconBg: 'bg-emerald-500/20 text-emerald-300',
    },
    {
      id: 'duel_arena' as GameMode,
      title: 'Đấu Trường 1v1',
      subtitle: 'Thách đấu với AI Bot hoặc 2 người chơi',
      icon: Swords,
      badge: 'Đối Kháng Trực Tiếp',
      gradient: 'from-cyan-600 via-blue-700 to-slate-900',
      border: 'border-cyan-500/40',
      hoverBorder: 'hover:border-cyan-400',
      iconBg: 'bg-cyan-500/20 text-cyan-300',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          if (tab === 'games') setSelectedGame('menu');
        }}
        stats={stats}
        onToggleSound={handleToggleSound}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Unlocked Badge Modal Notification */}
        {unlockedBadgeNotification && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-slate-900 border-2 border-amber-400 rounded-3xl p-6 max-w-md w-full text-center shadow-2xl relative animate-in zoom-in">
              <button
                onClick={() => setUnlockedBadgeNotification(null)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-5xl mb-3">{unlockedBadgeNotification.icon}</div>
              <div className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-1">
                HUY HIỆU MỚI MỞ KHÓA!
              </div>
              <h3 className="text-2xl font-black text-white mb-2">{unlockedBadgeNotification.title}</h3>
              <p className="text-xs text-slate-300 mb-6">{unlockedBadgeNotification.description}</p>
              <button
                onClick={() => setUnlockedBadgeNotification(null)}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-xl shadow-lg"
              >
                Tuyệt Vời! Nhận Thưởng
              </button>
            </div>
          </div>
        )}

        {/* Tab 1: Games Hub */}
        {currentTab === 'games' && (
          <div>
            {selectedGame === 'menu' ? (
              <div className="space-y-8">
                {/* Hero Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 p-6 sm:p-10 shadow-2xl">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative z-10 max-w-2xl space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Học Toán 8 Không Còn Khô Khan
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                      Làm Chủ <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">7 Hằng Đẳng Thức</span> Qua Trò Chơi!
                    </h1>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      Luyện tập phản xạ khai triển, phân tích đa thức thành nhân tử, không còn lo bị nhầm dấu với 6 chế độ game toán học siêu cuốn!
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          setCurrentTab('exam');
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-2xl shadow-xl shadow-amber-500/20 transform hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                      >
                        <FileText className="w-5 h-5" /> Thi Thử 4 Mức Độ
                      </button>
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedGame('speed_rush');
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-black rounded-2xl shadow-xl shadow-rose-500/20 transform hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                      >
                        <Zap className="w-5 h-5 fill-current" /> Đua Tốc Độ 60s
                      </button>
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          setCurrentTab('handbook');
                        }}
                        className="px-6 py-3 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold rounded-2xl transition-all flex items-center gap-2"
                      >
                        <BookOpen className="w-5 h-5 text-indigo-400" /> Cẩm Nang 7 HĐT
                      </button>
                    </div>
                  </div>
                </div>

                {/* 6 Mini Games Grid */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Gamepad2 className="w-5 h-5 text-amber-400" />
                      <h2 className="text-xl font-bold text-white tracking-tight">Chọn Chế Độ Chơi</h2>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">6 Chế Độ Đầy Đủ</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {gameCards.map((game) => {
                      const Icon = game.icon;
                      return (
                        <div
                          key={game.id}
                          onClick={() => {
                            soundManager.playClick();
                            setSelectedGame(game.id);
                          }}
                          className={`group relative p-6 rounded-3xl bg-slate-900/90 border ${game.border} ${game.hoverBorder} hover:bg-slate-800/80 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between overflow-hidden`}
                        >
                          <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${game.gradient} opacity-20 rounded-bl-full blur-xl pointer-events-none group-hover:opacity-40 transition-opacity`} />

                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <div className={`p-3 rounded-2xl ${game.iconBg} shadow-md`}>
                                <Icon className="w-6 h-6" />
                              </div>
                              <span className="px-2.5 py-1 bg-slate-950/80 border border-slate-800 text-[10px] font-bold font-mono text-slate-300 rounded-lg">
                                {game.badge}
                              </span>
                            </div>

                            <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors mb-1.5">
                              {game.title}
                            </h3>
                            <p className="text-xs text-slate-400 leading-relaxed">{game.subtitle}</p>
                          </div>

                          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-amber-400">
                            <span>Vào chơi ngay</span>
                            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* Active Mini Game Container */
              <div>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedGame('menu');
                  }}
                  className="mb-6 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 text-xs font-bold flex items-center gap-2 transition-colors"
                >
                  ← Trở về danh sách trò chơi
                </button>

                {selectedGame === 'memory' && <MemoryGame onEarnExp={handleEarnExp} stats={stats} />}
                {selectedGame === 'fill_blank' && <FillBlankGame onEarnExp={handleEarnExp} stats={stats} />}
                {selectedGame === 'speed_rush' && <SpeedRushGame onEarnExp={handleEarnExp} stats={stats} />}
                {selectedGame === 'boss_tower' && <BossTowerGame onEarnExp={handleEarnExp} stats={stats} />}
                {selectedGame === 'block_builder' && <BlockBuilderGame onEarnExp={handleEarnExp} stats={stats} />}
                {selectedGame === 'duel_arena' && <DuelArenaGame onEarnExp={handleEarnExp} stats={stats} />}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Standard Exam Mode */}
        {currentTab === 'exam' && <StandardExamMode onEarnExp={handleEarnExp} stats={stats} />}

        {/* Tab 3: Handbook & Geometry */}
        {currentTab === 'handbook' && <IdentityHandbook />}

        {/* Tab 3: Solver & Step-by-Step */}
        {currentTab === 'solver' && <IdentitySolver />}

        {/* Tab 4: AI Tutor Chat */}
        {currentTab === 'tutor' && <AITutorChat />}

        {/* Tab 5: Leaderboard & Stats */}
        {currentTab === 'stats' && <LeaderboardAndStats stats={stats} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 Đấu Trường 7 Hằng Đẳng Thức Đáng Nhớ — Dành riêng cho học sinh ôn tập Toán 8 & Ôn thi vào lớp 10.</p>
        </div>
      </footer>
    </div>
  );
}
