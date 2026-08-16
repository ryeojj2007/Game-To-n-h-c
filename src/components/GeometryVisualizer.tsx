import React, { useState } from 'react';
import { MathView } from './MathView';
import { Sparkles, Eye, Info, Layers } from 'lucide-react';

export const GeometryVisualizer: React.FC = () => {
  const [selectedProof, setSelectedProof] = useState<1 | 2 | 3 | 4>(1);
  const [a, setA] = useState<number>(4);
  const [b, setB] = useState<number>(2);

  // Scaled coordinates
  const scale = 28;
  const aPx = a * scale;
  const bPx = b * scale;
  const totalPx = (a + b) * scale;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <Eye className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">Phòng Thí Nghiệm Hình Học Trực Quan</h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Khám phá nguồn gốc và bản chất của hằng đẳng thức qua hình học diện tích và thể tích!
          </p>
        </div>

        {/* Proof Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedProof(1)}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              selectedProof === 1
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            (a + b)²
          </button>
          <button
            onClick={() => setSelectedProof(2)}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              selectedProof === 2
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            (a - b)²
          </button>
          <button
            onClick={() => setSelectedProof(3)}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              selectedProof === 3
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            a² - b²
          </button>
          <button
            onClick={() => setSelectedProof(4)}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              selectedProof === 4
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            (a + b)³ (3D)
          </button>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
              Độ dài đoạn <MathView latex="a" />:
            </span>
            <span className="font-bold text-amber-400 font-mono text-base">{a} đơn vị</span>
          </div>
          <input
            type="range"
            min={3}
            max={7}
            step={1}
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"></span>
              Độ dài đoạn <MathView latex="b" />:
            </span>
            <span className="font-bold text-cyan-400 font-mono text-base">{b} đơn vị</span>
          </div>
          <input
            type="range"
            min={1}
            max={Math.min(a - 1, 4)}
            step={1}
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>
      </div>

      {/* Canvas / SVG Geometric Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-slate-950/80 rounded-2xl border border-slate-800/80 min-h-[340px]">
          {selectedProof === 1 && (
            <div className="relative">
              {/* Top & Left measurement labels */}
              <div className="absolute -top-7 left-0 right-0 flex text-xs font-mono text-slate-400 justify-between px-1">
                <span className="text-amber-400 font-bold" style={{ width: `${aPx}px`, textAlign: 'center' }}>a = {a}</span>
                <span className="text-cyan-400 font-bold" style={{ width: `${bPx}px`, textAlign: 'center' }}>b = {b}</span>
              </div>

              {/* Main SVG Grid for (a+b)^2 */}
              <svg
                width={totalPx}
                height={totalPx}
                className="border-2 border-slate-700 rounded-lg shadow-xl overflow-hidden transition-all duration-300"
              >
                {/* a^2 square */}
                <rect
                  x="0"
                  y="0"
                  width={aPx}
                  height={aPx}
                  className="fill-amber-500/25 stroke-amber-400/80 stroke-2 hover:fill-amber-500/40 transition-colors"
                />
                <text
                  x={aPx / 2}
                  y={aPx / 2}
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="fill-amber-300 font-bold text-sm font-mono"
                >
                  a² = {a * a}
                </text>

                {/* ab rectangle 1 (top right) */}
                <rect
                  x={aPx}
                  y="0"
                  width={bPx}
                  height={aPx}
                  className="fill-emerald-500/25 stroke-emerald-400/80 stroke-2 hover:fill-emerald-500/40 transition-colors"
                />
                <text
                  x={aPx + bPx / 2}
                  y={aPx / 2}
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="fill-emerald-300 font-bold text-xs font-mono"
                >
                  ab = {a * b}
                </text>

                {/* ab rectangle 2 (bottom left) */}
                <rect
                  x="0"
                  y={aPx}
                  width={aPx}
                  height={bPx}
                  className="fill-emerald-500/25 stroke-emerald-400/80 stroke-2 hover:fill-emerald-500/40 transition-colors"
                />
                <text
                  x={aPx / 2}
                  y={aPx + bPx / 2}
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="fill-emerald-300 font-bold text-xs font-mono"
                >
                  ab = {a * b}
                </text>

                {/* b^2 square (bottom right) */}
                <rect
                  x={aPx}
                  y={aPx}
                  width={bPx}
                  height={bPx}
                  className="fill-cyan-500/30 stroke-cyan-400/80 stroke-2 hover:fill-cyan-500/50 transition-colors"
                />
                <text
                  x={aPx + bPx / 2}
                  y={aPx + bPx / 2}
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="fill-cyan-300 font-bold text-xs font-mono"
                >
                  b² = {b * b}
                </text>
              </svg>
            </div>
          )}

          {selectedProof === 2 && (
            <div className="relative">
              <svg
                width={aPx}
                height={aPx}
                className="border-2 border-slate-700 rounded-lg shadow-xl overflow-hidden transition-all duration-300"
              >
                {/* Full large square a^2 */}
                <rect x="0" y="0" width={aPx} height={aPx} className="fill-slate-800/40 stroke-slate-600 stroke-1" />

                {/* (a-b)^2 remaining square */}
                <rect
                  x="0"
                  y="0"
                  width={(a - b) * scale}
                  height={(a - b) * scale}
                  className="fill-cyan-500/30 stroke-cyan-400 stroke-2"
                />
                <text
                  x={((a - b) * scale) / 2}
                  y={((a - b) * scale) / 2}
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="fill-cyan-300 font-bold text-xs font-mono"
                >
                  (a - b)² = {(a - b) ** 2}
                </text>

                {/* Subtracted rectangles */}
                <rect
                  x={(a - b) * scale}
                  y="0"
                  width={bPx}
                  height={aPx}
                  className="fill-rose-500/20 stroke-rose-400/60 stroke-dashed stroke-1"
                />
                <rect
                  x="0"
                  y={(a - b) * scale}
                  width={aPx}
                  height={bPx}
                  className="fill-rose-500/20 stroke-rose-400/60 stroke-dashed stroke-1"
                />

                {/* Overlapped b^2 region */}
                <rect
                  x={(a - b) * scale}
                  y={(a - b) * scale}
                  width={bPx}
                  height={bPx}
                  className="fill-amber-500/40 stroke-amber-400 stroke-2"
                />
                <text
                  x={(a - b) * scale + bPx / 2}
                  y={(a - b) * scale + bPx / 2}
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="fill-amber-300 font-bold text-[10px] font-mono"
                >
                  +b²
                </text>
              </svg>
            </div>
          )}

          {selectedProof === 3 && (
            <div className="flex flex-col items-center gap-4">
              <div className="text-xs text-slate-400 font-medium">
                Cắt góc <MathView latex="b^2" /> khỏi hình vuông <MathView latex="a^2" /> rồi ghép thành hình chữ nhật kích thước <MathView latex="(a-b) \times (a+b)" />:
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6">
                {/* Cutout shape */}
                <svg width={aPx} height={aPx} className="border border-slate-700 rounded-lg">
                  {/* remaining polygon */}
                  <path
                    d={`M 0 0 L ${aPx} 0 L ${aPx} ${(a - b) * scale} L ${(a - b) * scale} ${(a - b) * scale} L ${(a - b) * scale} ${aPx} L 0 ${aPx} Z`}
                    className="fill-emerald-500/30 stroke-emerald-400 stroke-2"
                  />
                  {/* cut b^2 corner */}
                  <rect
                    x={(a - b) * scale}
                    y={(a - b) * scale}
                    width={bPx}
                    height={bPx}
                    className="fill-rose-500/10 stroke-rose-400 stroke-dashed stroke-1"
                  />
                  <text
                    x={(a - b) * scale + bPx / 2}
                    y={(a - b) * scale + bPx / 2}
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="fill-rose-400 font-mono text-[10px]"
                  >
                    -b²
                  </text>
                  <text
                    x={((a - b) * scale) / 2}
                    y={aPx / 2}
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="fill-emerald-300 font-bold text-xs font-mono"
                  >
                    a² - b² = {a * a - b * b}
                  </text>
                </svg>

                <span className="text-xl font-bold text-amber-400">=</span>

                {/* Reassembled rectangle */}
                <svg width={(a + b) * (scale * 0.8)} height={(a - b) * (scale * 0.8)} className="border border-slate-700 rounded-lg">
                  <rect
                    x="0"
                    y="0"
                    width={(a + b) * (scale * 0.8)}
                    height={(a - b) * (scale * 0.8)}
                    className="fill-emerald-500/40 stroke-emerald-300 stroke-2"
                  />
                  <text
                    x={((a + b) * (scale * 0.8)) / 2}
                    y={((a - b) * (scale * 0.8)) / 2}
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="fill-emerald-200 font-bold text-xs font-mono"
                  >
                    (a - b)(a + b) = {(a - b) * (a + b)}
                  </text>
                </svg>
              </div>
            </div>
          )}

          {selectedProof === 4 && (
            <div className="flex flex-col items-center text-center p-4">
              <div className="relative w-64 h-56 flex items-center justify-center">
                {/* 3D Isometric representation preview */}
                <div className="p-4 bg-purple-950/40 border border-purple-500/30 rounded-2xl backdrop-blur-md">
                  <div className="text-purple-300 font-bold text-sm mb-2 flex items-center justify-center gap-1.5">
                    <Layers className="w-4 h-4 text-purple-400" /> Khối Lập Phương (a + b)³
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-left">
                    <div className="p-2 bg-purple-900/40 rounded-lg border border-purple-700/50">
                      <span className="text-purple-300 font-semibold">1 khối a³</span>: {a}³ = {a ** 3}
                    </div>
                    <div className="p-2 bg-indigo-900/40 rounded-lg border border-indigo-700/50">
                      <span className="text-indigo-300 font-semibold">3 khối a²b</span>: 3·{a}²·{b} = {3 * a * a * b}
                    </div>
                    <div className="p-2 bg-pink-900/40 rounded-lg border border-pink-700/50">
                      <span className="text-pink-300 font-semibold">3 khối ab²</span>: 3·{a}·{b}² = {3 * a * b * b}
                    </div>
                    <div className="p-2 bg-cyan-900/40 rounded-lg border border-cyan-700/50">
                      <span className="text-cyan-300 font-semibold">1 khối b³</span>: {b}³ = {b ** 3}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-400 mt-2">
                Tổng thể tích = <span className="text-purple-400 font-bold">{a ** 3} + {3 * a * a * b} + {3 * a * b * b} + {b ** 3} = {(a + b) ** 3}</span> = <MathView latex={`(${a} + ${b})^3`} />
              </div>
            </div>
          )}
        </div>

        {/* Breakdown details */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Công thức và Giá trị thực tế:
            </h3>

            {selectedProof === 1 && (
              <div className="space-y-3">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-amber-400 text-sm font-semibold mb-1">Khai triển đại số:</div>
                  <MathView latex={`(a + b)^2 = a^2 + 2ab + b^2`} block />
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                  <div className="text-slate-300">Vế trái: ({a} + {b})² = {a + b}² = <span className="text-amber-400 font-bold">{(a + b) ** 2}</span></div>
                  <div className="text-slate-300">Vế phải: {a}² + 2·({a})·({b}) + {b}² = {a * a} + {2 * a * b} + {b * b} = <span className="text-emerald-400 font-bold">{a * a + 2 * a * b + b * b}</span></div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Nhìn vào hình: Diện tích hình vuông lớn cạnh <MathView latex="(a+b)" /> chính là tổng diện tích của 4 mảnh ghép con: 1 hình vuông vàng <MathView latex="a^2" />, 2 hình chữ nhật xanh lá <MathView latex="ab" />, và 1 hình vuông xanh ngọc <MathView latex="b^2" />!
                </p>
              </div>
            )}

            {selectedProof === 2 && (
              <div className="space-y-3">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-cyan-400 text-sm font-semibold mb-1">Khai triển đại số:</div>
                  <MathView latex={`(a - b)^2 = a^2 - 2ab + b^2`} block />
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                  <div className="text-slate-300">Vế trái: ({a} - {b})² = {a - b}² = <span className="text-cyan-400 font-bold">{(a - b) ** 2}</span></div>
                  <div className="text-slate-300">Vế phải: {a}² - 2·({a})·({b}) + {b}² = {a * a} - {2 * a * b} + {b * b} = <span className="text-emerald-400 font-bold">{a * a - 2 * a * b + b * b}</span></div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Khi lấy hình vuông lớn <MathView latex="a^2" /> trừ đi 2 dải chữ nhật <MathView latex="ab" />, phần góc vuông <MathView latex="b^2" /> bị trừ 2 lần (bị trừ lố) nên ta phải <span className="text-amber-400 font-bold">cộng bù lại +b²</span>!
                </p>
              </div>
            )}

            {selectedProof === 3 && (
              <div className="space-y-3">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-emerald-400 text-sm font-semibold mb-1">Hằng đẳng thức:</div>
                  <MathView latex={`a^2 - b^2 = (a - b)(a + b)`} block />
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                  <div className="text-slate-300">Hiệu 2 bình phương: {a}² - {b}² = {a * a} - {b * b} = <span className="text-emerald-400 font-bold">{a * a - b * b}</span></div>
                  <div className="text-slate-300">Tích (Hiệu x Tổng): ({a} - {b})({a} + {b}) = {a - b} · {a + b} = <span className="text-amber-400 font-bold">{(a - b) * (a + b)}</span></div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Hình chữ L còn lại sau khi khoét bỏ góc <MathView latex="b^2" /> được cắt và ghép lại hoàn hảo thành 1 hình chữ nhật có chiều rộng <MathView latex="a-b" /> và chiều dài <MathView latex="a+b" />.
                </p>
              </div>
            )}

            {selectedProof === 4 && (
              <div className="space-y-3">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-purple-400 text-sm font-semibold mb-1">Hằng đẳng thức lập phương:</div>
                  <MathView latex={`(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3`} block />
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                  <div className="text-slate-300">Khối lớn: ({a} + {b})³ = <span className="text-purple-400 font-bold">{(a + b) ** 3}</span></div>
                  <div className="text-slate-300">Tổng 8 khối con: <span className="text-pink-400 font-bold">{a ** 3 + 3 * a * a * b + 3 * a * b * b + b ** 3}</span></div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Khối lập phương 3 chiều cạnh <MathView latex="(a+b)" /> được phân rã thành đúng <span className="text-purple-300 font-bold">8 khối hộp</span> (1 khối a³, 3 khối a²b, 3 khối ab², 1 khối b³).
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
