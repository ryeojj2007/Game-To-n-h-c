import React from 'react';
import { UserStats } from '../types/math';
import { BADGES } from '../data/gameQuestions';
import { SEVEN_IDENTITIES } from '../data/identities';
import { MathView } from './MathView';
import { Trophy, Award, Flame, Zap, Target, Layers, Swords, BookOpen, ShieldCheck } from 'lucide-react';
import { calculateLevel } from '../utils/storage';

interface LeaderboardAndStatsProps {
  stats: UserStats;
}

export const LeaderboardAndStats: React.FC<LeaderboardAndStatsProps> = ({ stats }) => {
  const levelInfo = calculateLevel(stats.exp);

  return (
    <div className="space-y-6">
      {/* Top Banner: Profile Overview */}
      <div className="bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-4xl shadow-xl shadow-amber-500/20 border-2 border-amber-400/40">
              🧙‍♂️
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h2 className="text-2xl font-black text-white">Hồ Sơ Kiện Tướng Toán Học</h2>
                <span className="px-2.5 py-0.5 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold rounded-lg font-mono">
                  Level {levelInfo.level}
                </span>
              </div>
              <div className="text-sm font-semibold text-amber-400 mt-0.5">{levelInfo.title}</div>
              <div className="text-xs text-slate-400 mt-1 flex items-center justify-center md:justify-start gap-3">
                <span className="flex items-center gap-1 text-rose-400">
                  <Flame className="w-3.5 h-3.5 fill-rose-500" /> Chuỗi {stats.streakDays} ngày chăm chỉ
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300">Tổng kinh nghiệm: <span className="font-bold text-emerald-400">{stats.exp} EXP</span></span>
              </div>
            </div>
          </div>

          {/* Level Progress Bar */}
          <div className="w-full md:w-72 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-400">Tiến độ Level {levelInfo.level + 1}</span>
              <span className="text-amber-400 font-bold">
                {levelInfo.currentLevelExp} / {levelInfo.nextLevelExp} EXP
              </span>
            </div>
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                style={{ width: `${Math.min(100, (levelInfo.currentLevelExp / levelInfo.nextLevelExp) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Mastery Rates + High Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Identity Mastery */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
            <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">Độ Thuần Thục 7 Hằng Đẳng Thức</h3>
              <p className="text-xs text-slate-400">Theo dõi tỉ lệ giải đúng từng hằng đẳng thức để bù đắp điểm yếu!</p>
            </div>
          </div>

          <div className="space-y-3">
            {SEVEN_IDENTITIES.map((item) => {
              const mastery = stats.identityMastery[item.id] || { correct: 0, total: 0 };
              const percent = mastery.total > 0 ? Math.round((mastery.correct / mastery.total) * 100) : 0;

              return (
                <div key={item.id} className="p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-slate-800 font-mono text-[10px] font-bold text-slate-300 flex items-center justify-center">
                        {item.id}
                      </span>
                      <span className="font-bold text-slate-200">{item.name}</span>
                    </div>
                    <span className="font-mono text-slate-400 font-semibold">
                      {mastery.correct} / {mastery.total} đúng ({percent}%)
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full transition-all duration-500 ${
                        percent >= 80
                          ? 'bg-emerald-500'
                          : percent >= 50
                          ? 'bg-amber-500'
                          : mastery.total > 0
                          ? 'bg-rose-500'
                          : 'bg-slate-700'
                      }`}
                      style={{ width: `${Math.max(5, percent)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* High Scores in Game Modes */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
              <span className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
                <Trophy className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">Kỷ Lục Mini Game</h3>
                <p className="text-xs text-slate-400">Điểm số cao nhất đã đạt được</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-rose-500/10 text-rose-400 rounded-xl">
                    <Zap className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate-200">Đua Tốc Độ 60s</div>
                    <div className="text-[10px] text-slate-400">Kỷ lục điểm cao</div>
                  </div>
                </div>
                <div className="text-base font-black font-mono text-amber-400">{stats.highScores.speedRush} PTS</div>
              </div>

              <div className="p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-purple-500/10 text-purple-400 rounded-xl">
                    <Swords className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate-200">Leo Tháp Boss</div>
                    <div className="text-[10px] text-slate-400">Tầng cao nhất vượt qua</div>
                  </div>
                </div>
                <div className="text-base font-black font-mono text-purple-400">Tầng {stats.highScores.bossTowerFloor}</div>
              </div>

              <div className="p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl">
                    <Award className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate-200">Lật Thẻ Ghép Đôi</div>
                    <div className="text-[10px] text-slate-400">Số cặp ghép nhanh nhất</div>
                  </div>
                </div>
                <div className="text-base font-black font-mono text-indigo-400">{stats.highScores.memoryMatch} Cặp</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
          <span className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
            <Award className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-white">Kho Huy Hiệu Thành Tích ({stats.unlockedBadges.length}/{BADGES.length})</h3>
            <p className="text-xs text-slate-400">Chinh phục các mốc thử thách để mở khóa toàn bộ huy hiệu huyền thoại!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {BADGES.map((badge) => {
            const isUnlocked = stats.unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-slate-950 border-amber-500/40 shadow-lg shadow-amber-500/5'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-40 grayscale'
                }`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <div className="font-bold text-sm text-slate-100 mb-1">{badge.title}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{badge.description}</p>
                <div className="mt-3 text-[10px] font-mono font-bold text-amber-400">
                  {isUnlocked ? '✓ ĐÃ MỞ KHÓA' : '🔒 CHƯA ĐẠT'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
