import React from 'react';
import { UserStats } from '../types/math';
import { calculateLevel } from '../utils/storage';
import { soundManager } from '../utils/audio';
import { Gamepad2, FileText, BookOpen, Cpu, Bot, Trophy, Volume2, VolumeX, Flame } from 'lucide-react';

interface NavbarProps {
  currentTab: 'games' | 'exam' | 'handbook' | 'solver' | 'tutor' | 'stats';
  onTabChange: (tab: 'games' | 'exam' | 'handbook' | 'solver' | 'tutor' | 'stats') => void;
  stats: UserStats;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onTabChange, stats, onToggleSound }) => {
  const levelInfo = calculateLevel(stats.exp);

  const navItems = [
    { id: 'games' as const, label: 'Trò Chơi', icon: Gamepad2 },
    { id: 'exam' as const, label: 'Đề Thi Thử 4 Mức Độ', icon: FileText },
    { id: 'handbook' as const, label: 'Bí Kíp & Hình Học', icon: BookOpen },
    { id: 'solver' as const, label: 'Máy Khai Triển', icon: Cpu },
    { id: 'tutor' as const, label: 'Gia Sư AI', icon: Bot },
    { id: 'stats' as const, label: 'Thành Tích', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <div
            onClick={() => onTabChange('games')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-mono font-black text-amber-400 text-lg">
                7
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-black text-sm sm:text-base text-white tracking-tight">
                <span>ĐẤU TRƯỜNG 7 HĐT</span>
                <span className="px-1.5 py-0.5 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] rounded-md font-mono">
                  TOÁN 8
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">7 Hằng Đẳng Thức Đáng Nhớ</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundManager.playClick();
                    onTabChange(item.id);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Status & Toggles */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak indicator */}
            <div className="px-2.5 py-1.5 bg-rose-950/40 border border-rose-500/30 rounded-xl flex items-center gap-1.5 text-xs font-mono font-bold text-rose-300">
              <Flame className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
              <span>{stats.streakDays}</span>
            </div>

            {/* Level & EXP indicator */}
            <div
              onClick={() => onTabChange('stats')}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl flex items-center gap-2 text-xs font-mono cursor-pointer transition-colors"
              title={`Level ${levelInfo.level}: ${levelInfo.title} (${stats.exp} EXP)`}
            >
              <div className="w-5 h-5 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-[10px]">
                {levelInfo.level}
              </div>
              <div className="hidden lg:block font-bold text-amber-300">{stats.exp} EXP</div>
            </div>

            {/* Sound Mute Toggle */}
            <button
              onClick={onToggleSound}
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 transition-colors"
              title={stats.soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            >
              {stats.soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-800/60 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundManager.playClick();
                  onTabChange(item.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold flex flex-col items-center gap-1 transition-all ${
                  isActive ? 'text-amber-400 font-black' : 'text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
