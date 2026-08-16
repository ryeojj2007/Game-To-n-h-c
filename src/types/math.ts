export interface IdentityItem {
  id: number;
  name: string;
  nameEn: string;
  formulaLatex: string;
  leftSideLatex: string;
  rightSideLatex: string;
  verbalVietnamese: string;
  mnemonicTip: string;
  commonPitfall: string;
  category: 'square' | 'cube' | 'extended';
  geometryDescription: string;
  examples: {
    problemLatex: string;
    steps: {
      desc: string;
      latex: string;
    }[];
    resultLatex: string;
    identifyAB: string;
  }[];
}

export interface UserStats {
  exp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string;
  soundEnabled: boolean;
  unlockedBadges: string[];
  identityMastery: Record<number, { correct: number; total: number }>;
  highScores: {
    speedRush: number;
    memoryMatch: number;
    bossTowerFloor: number;
    fillBlankScore: number;
    blockBuilderScore: number;
  };
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requiredExp?: number;
  condition?: string;
}

export interface QuizQuestion {
  id: string;
  questionLatex: string;
  questionText: string;
  identityId: number;
  difficulty?: 'NB' | 'TH' | 'VD' | 'VDC';
  group?: '123' | '45' | '67';
  options: {
    id: string;
    latex: string;
    text?: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  hint: string;
}

export interface FillBlankQuestion {
  id: string;
  prompt: string;
  fullEquationLatex: string;
  displayTemplateLatex: string; // e.g. "(2x + [BLANK1])^2 = 4x^2 + [BLANK2] + 9"
  blanks: {
    id: string;
    correctAnswer: string;
    displayLatex: string;
  }[];
  optionsPool: string[]; // Options to pick or drag
  identityId: number;
  explanation: string;
}

export interface MemoryCard {
  id: string;
  pairId: string;
  contentLatex: string;
  label?: string;
  isFlipped: boolean;
  isMatched: boolean;
  type: 'left' | 'right';
}

export interface BossMonster {
  id: string;
  name: string;
  title: string;
  avatar: string;
  maxHp: number;
  currentHp: number;
  identityFocus: number[];
  dialogueIntro: string;
  dialogueDefeated: string;
  attackPower: number;
  bgGradient: string;
}
