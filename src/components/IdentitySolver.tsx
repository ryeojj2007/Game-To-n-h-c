import React, { useState } from 'react';
import { MathView } from './MathView';
import { Cpu, Search, Sparkles, CheckCircle2, ArrowRight, Lightbulb } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface PresetProblem {
  id: string;
  label: string;
  input: string;
  identityName: string;
  identityNum: number;
  identifyAB: { A: string; B: string };
  formula: string;
  steps: { desc: string; math: string }[];
  result: string;
  tips: string;
}

const PRESET_SOLVER_EXAMPLES: PresetProblem[] = [
  {
    id: 'p1',
    label: '(2x + 5)²',
    input: '(2x + 5)^2',
    identityName: 'Bình phương của một tổng',
    identityNum: 1,
    identifyAB: { A: '2x', B: '5' },
    formula: '(A + B)^2 = A^2 + 2AB + B^2',
    steps: [
      { desc: '1. Xác định biểu thức', math: 'A = 2x, \\quad B = 5' },
      { desc: '2. Thay vào công thức khai triển', math: '(2x)^2 + 2 \\cdot (2x) \\cdot (5) + 5^2' },
      { desc: '3. Tính lũy thừa và các tích hệ số', math: '4x^2 + 20x + 25' }
    ],
    result: '4x^2 + 20x + 25',
    tips: 'Lưu ý: Bình phương của 2x là (2x)² = 4x² (phải bình phương cả hệ số 2!).'
  },
  {
    id: 'p2',
    label: '(3x - 4y)²',
    input: '(3x - 4y)^2',
    identityName: 'Bình phương của một hiệu',
    identityNum: 2,
    identifyAB: { A: '3x', B: '4y' },
    formula: '(A - B)^2 = A^2 - 2AB + B^2',
    steps: [
      { desc: '1. Xác định biểu thức', math: 'A = 3x, \\quad B = 4y' },
      { desc: '2. Thay vào công thức', math: '(3x)^2 - 2 \\cdot (3x) \\cdot (4y) + (4y)^2' },
      { desc: '3. Tính toán', math: '9x^2 - 24xy + 16y^2' }
    ],
    result: '9x^2 - 24xy + 16y^2',
    tips: 'Dấu trừ ở giữa (-24xy), còn số hạng cuối (+16y²) luôn mang dấu dương.'
  },
  {
    id: 'p3',
    label: '9x² - 16y²',
    input: '9x^2 - 16y^2',
    identityName: 'Hiệu hai bình phương',
    identityNum: 3,
    identifyAB: { A: '3x', B: '4y' },
    formula: 'A^2 - B^2 = (A - B)(A + B)',
    steps: [
      { desc: '1. Đưa các số hạng về dạng bình phương', math: '9x^2 = (3x)^2, \\quad 16y^2 = (4y)^2' },
      { desc: '2. Viết lại dưới dạng hiệu hai bình phương', math: '(3x)^2 - (4y)^2' },
      { desc: '3. Áp dụng công thức tích (Hiệu x Tổng)', math: '(3x - 4y)(3x + 4y)' }
    ],
    result: '(3x - 4y)(3x + 4y)',
    tips: 'Cực kỳ tiện lợi để phân tích đa thức thành nhân tử trong các bài toán rút gọn.'
  },
  {
    id: 'p4',
    label: '(x + 2)³',
    input: '(x + 2)^3',
    identityName: 'Lập phương của một tổng',
    identityNum: 4,
    identifyAB: { A: 'x', B: '2' },
    formula: '(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3',
    steps: [
      { desc: '1. Xác định biểu thức', math: 'A = x, \\quad B = 2' },
      { desc: '2. Áp dụng hệ số Pascal (1 - 3 - 3 - 1)', math: 'x^3 + 3 \\cdot x^2 \\cdot 2 + 3 \\cdot x \\cdot 2^2 + 2^3' },
      { desc: '3. Thu gọn', math: 'x^3 + 6x^2 + 12x + 8' }
    ],
    result: 'x^3 + 6x^2 + 12x + 8',
    tips: 'Nhớ hệ số 3 ở giữa: 3·x²·2 = 6x² và 3·x·4 = 12x.'
  },
  {
    id: 'p5',
    label: '(2x - 3)³',
    input: '(2x - 3)^3',
    identityName: 'Lập phương của một hiệu',
    identityNum: 5,
    identifyAB: { A: '2x', B: '3' },
    formula: '(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3',
    steps: [
      { desc: '1. Xác định biểu thức', math: 'A = 2x, \\quad B = 3' },
      { desc: '2. Khai triển với quy luật dấu (+ - + -)', math: '(2x)^3 - 3(2x)^2(3) + 3(2x)(3^2) - 3^3' },
      { desc: '3. Tính toán từng số hạng', math: '8x^3 - 36x^2 + 54x - 27' }
    ],
    result: '8x^3 - 36x^2 + 54x - 27',
    tips: 'Dấu đan xen: + 8x³ - 36x² + 54x - 27.'
  },
  {
    id: 'p6',
    label: '8x³ + 27',
    input: '8x^3 + 27',
    identityName: 'Tổng hai lập phương',
    identityNum: 6,
    identifyAB: { A: '2x', B: '3' },
    formula: 'A^3 + B^3 = (A + B)(A^2 - AB + B^2)',
    steps: [
      { desc: '1. Đưa về lũy thừa bậc 3', math: '8x^3 = (2x)^3, \\quad 27 = 3^3' },
      { desc: '2. Viết dạng tổng 2 lập phương', math: '(2x)^3 + 3^3' },
      { desc: '3. Áp dụng công thức (Tổng x Bình phương thiếu của hiệu)', math: '(2x + 3)((2x)^2 - (2x)(3) + 3^2)' },
      { desc: '4. Thu gọn ngoặc thứ hai', math: '(2x + 3)(4x^2 - 6x + 9)' }
    ],
    result: '(2x + 3)(4x^2 - 6x + 9)',
    tips: 'Chú ý ngoặc thứ hai là -6x (không có hệ số 2).'
  },
  {
    id: 'p7',
    label: '125 - x³',
    input: '125 - x^3',
    identityName: 'Hiệu hai lập phương',
    identityNum: 7,
    identifyAB: { A: '5', B: 'x' },
    formula: 'A^3 - B^3 = (A - B)(A^2 + AB + B^2)',
    steps: [
      { desc: '1. Đưa về dạng lập phương', math: '125 = 5^3 \\Rightarrow 5^3 - x^3' },
      { desc: '2. Khai triển', math: '(5 - x)(5^2 + 5 \\cdot x + x^2)' },
      { desc: '3. Thu gọn', math: '(5 - x)(25 + 5x + x^2)' }
    ],
    result: '(5 - x)(25 + 5x + x^2)',
    tips: 'Ngoặc đầu là (5 - x) thì ngoặc sau toàn bộ là dấu CỘNG (+).'
  }
];

export const IdentitySolver: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<PresetProblem>(PRESET_SOLVER_EXAMPLES[0]);

  const handleSelectPreset = (preset: PresetProblem) => {
    soundManager.playClick();
    setSelectedPreset(preset);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
              <Cpu className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">Máy Phân Tích & Khai Triển Từng Bước</h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Chọn biểu thức toán học để xem máy tự động bóc tách <MathView latex="A, B" /> và giải chi tiết từng bước!
          </p>
        </div>
      </div>

      {/* Preset Picker Buttons */}
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3">
          Chọn biểu thức mẫu cần phân tích:
        </div>
        <div className="flex flex-wrap gap-2.5">
          {PRESET_SOLVER_EXAMPLES.map((preset) => {
            const isSelected = selectedPreset.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-4 py-2 rounded-xl border text-sm font-mono font-bold transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200 hover:border-cyan-400/50'
                }`}
              >
                <MathView latex={preset.label} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Solution breakdown card */}
      <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 space-y-6">
        {/* Target display */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="text-xs font-mono text-cyan-400 font-bold uppercase">
              HẰNG ĐẲNG THỨC SỐ {selectedPreset.identityNum}: {selectedPreset.identityName.toUpperCase()}
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
              <MathView latex={selectedPreset.input} />
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono">
            <div className="text-slate-400 mb-0.5">Áp dụng công thức:</div>
            <div className="text-amber-300 font-bold">
              <MathView latex={selectedPreset.formula} />
            </div>
          </div>
        </div>

        {/* Step 1: Identify A & B */}
        <div className="p-4 bg-indigo-950/20 border border-indigo-500/30 rounded-2xl">
          <div className="text-xs uppercase font-bold text-indigo-400 mb-2 flex items-center gap-1.5">
            <Search className="w-4 h-4" /> Bước 1: Nhận diện biểu thức A và B
          </div>
          <div className="grid grid-cols-2 gap-3 font-mono text-sm">
            <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-semibold">Biểu thức A: </span>
              <span className="text-amber-300 font-bold">
                <MathView latex={selectedPreset.identifyAB.A} />
              </span>
            </div>
            <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-semibold">Biểu thức B: </span>
              <span className="text-cyan-300 font-bold">
                <MathView latex={selectedPreset.identifyAB.B} />
              </span>
            </div>
          </div>
        </div>

        {/* Step 2: Step-by-step breakdown */}
        <div>
          <div className="text-xs uppercase font-bold text-slate-400 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" /> Các bước biến đổi & tính toán:
          </div>
          <div className="space-y-3">
            {selectedPreset.steps.map((st, idx) => (
              <div key={idx} className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-slate-800 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div className="flex-1 space-y-1">
                  <div className="text-xs text-slate-300 font-medium">{st.desc}</div>
                  <div className="text-base font-mono font-bold text-white">
                    <MathView latex={st.math} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Result & Tip */}
        <div className="p-4 bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-950 border border-emerald-500/40 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-4 h-4" /> Kết quả cuối cùng:
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-emerald-300">
              <MathView latex={selectedPreset.result} />
            </div>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 max-w-md">
            <span className="font-bold text-amber-300 flex items-center gap-1 mb-0.5">
              <Lightbulb className="w-3.5 h-3.5" /> Mẹo ghi nhớ:
            </span>
            {selectedPreset.tips}
          </div>
        </div>
      </div>
    </div>
  );
};
