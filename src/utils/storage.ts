import { UserStats, Badge } from '../types/math';
import { BADGES } from '../data/gameQuestions';

const STORAGE_KEY = 'identity_quest_user_stats_v1';

export const INITIAL_USER_STATS: UserStats = {
  exp: 0,
  level: 1,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  soundEnabled: true,
  unlockedBadges: ['b_novice'],
  identityMastery: {
    1: { correct: 0, total: 0 },
    2: { correct: 0, total: 0 },
    3: { correct: 0, total: 0 },
    4: { correct: 0, total: 0 },
    5: { correct: 0, total: 0 },
    6: { correct: 0, total: 0 },
    7: { correct: 0, total: 0 },
  },
  highScores: {
    speedRush: 0,
    memoryMatch: 0,
    bossTowerFloor: 1,
    fillBlankScore: 0,
    blockBuilderScore: 0,
  },
};

export function loadUserStats(): UserStats {
  if (typeof window === 'undefined') return INITIAL_USER_STATS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return INITIAL_USER_STATS;
    const parsed = JSON.parse(data);

    // Check streak
    const today = new Date().toISOString().split('T')[0];
    const lastDate = parsed.lastActiveDate;
    if (lastDate !== today) {
      const last = new Date(lastDate);
      const curr = new Date(today);
      const diffTime = Math.abs(curr.getTime() - last.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        parsed.streakDays = (parsed.streakDays || 1) + 1;
      } else if (diffDays > 1) {
        parsed.streakDays = 1;
      }
      parsed.lastActiveDate = today;
    }

    return { ...INITIAL_USER_STATS, ...parsed };
  } catch (e) {
    console.error('Failed to load user stats:', e);
    return INITIAL_USER_STATS;
  }
}

export function saveUserStats(stats: UserStats): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save user stats:', e);
  }
}

export function calculateLevel(exp: number): { level: number; currentLevelExp: number; nextLevelExp: number; title: string } {
  // Level threshold: Level 1 (0-100), Level 2 (100-250), Level 3 (250-450), etc.
  const levels = [
    { level: 1, minExp: 0, maxExp: 100, title: 'Học Trò Nhập Môn 🌱' },
    { level: 2, minExp: 100, maxExp: 250, title: 'Tập Sự Bình Phương 📐' },
    { level: 3, minExp: 250, maxExp: 450, title: 'Học Bá Tính Nhẩm ⚡' },
    { level: 4, minExp: 450, maxExp: 700, title: 'Kỵ Sĩ Lập Phương 🧊' },
    { level: 5, minExp: 700, maxExp: 1000, title: 'Chuyên Gia Phân Tích 🔍' },
    { level: 6, minExp: 1000, maxExp: 1400, title: 'Thợ Săn Dấu Hỏi 🎯' },
    { level: 7, minExp: 1400, maxExp: 1900, title: 'Cao Thủ Biến Đổi 🔮' },
    { level: 8, minExp: 1900, maxExp: 2500, title: 'Bậc Thầy Đa Thức 🏆' },
    { level: 9, minExp: 2500, maxExp: 3300, title: 'Huyền Thoại Đại Số 🌟' },
    { level: 10, minExp: 3300, maxExp: 999999, title: 'Đại Sư Hằng Đẳng Thức 👑' },
  ];

  for (const lvl of levels) {
    if (exp < lvl.maxExp || lvl.level === 10) {
      return {
        level: lvl.level,
        currentLevelExp: exp - lvl.minExp,
        nextLevelExp: lvl.maxExp - lvl.minExp,
        title: lvl.title,
      };
    }
  }

  return {
    level: 10,
    currentLevelExp: 1000,
    nextLevelExp: 1000,
    title: 'Đại Sư Hằng Đẳng Thức 👑',
  };
}

export function checkNewBadges(stats: UserStats): { updatedStats: UserStats; newlyUnlocked: Badge[] } {
  const currentBadges = new Set(stats.unlockedBadges);
  const newlyUnlocked: Badge[] = [];

  BADGES.forEach((badge) => {
    if (currentBadges.has(badge.id)) return;

    let shouldUnlock = false;
    if (badge.requiredExp && stats.exp >= badge.requiredExp) {
      shouldUnlock = true;
    }
    if (badge.id === 'b_boss_slayer' && stats.highScores.bossTowerFloor >= 5) {
      shouldUnlock = true;
    }
    if (badge.id === 'b_speed_demon' && stats.highScores.speedRush >= 500) {
      shouldUnlock = true;
    }
    if (badge.id === 'b_memory_king' && stats.highScores.memoryMatch >= 8) {
      shouldUnlock = true;
    }
    if (badge.id === 'b_grandmaster' && stats.level >= 10) {
      shouldUnlock = true;
    }

    if (shouldUnlock) {
      currentBadges.add(badge.id);
      newlyUnlocked.push({ ...badge, unlocked: true });
    }
  });

  const updatedStats: UserStats = {
    ...stats,
    unlockedBadges: Array.from(currentBadges),
  };

  if (newlyUnlocked.length > 0) {
    saveUserStats(updatedStats);
  }

  return { updatedStats, newlyUnlocked };
}
