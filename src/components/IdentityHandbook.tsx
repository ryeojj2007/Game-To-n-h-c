import React, { useState } from 'react';
import { MathView } from './MathView';
import { SEVEN_IDENTITIES, EXTENDED_IDENTITIES, MEMORIZING_POEM } from '../data/identities';
import { GeometryVisualizer } from './GeometryVisualizer';
import { BookOpen, Sparkles, AlertTriangle, Lightbulb, ChevronDown, ChevronUp, CheckCircle, Flame } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const IdentityHandbook: React.FC = () => {
  const [selectedIdentityId, setSelectedIdentityId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'cards' | 'geometry' | 'poem' | 'extended'>('cards');
  const [expandedExampleIdx, setExpandedExampleIdx] = useState<number | null>(0);

  const selectedIdentity = SEVEN_IDENTITIES.find((item) => item.id === selectedIdentityId) || SEVEN_IDENTITIES[0];

  const handleSelectIdentity = (id: number) => {
    soundManager.playClick();
    setSelectedIdentityId(id);
    setExpandedExampleIdx(0);
  };

  return (
    <div className="space-y-6">
      {/* Subnav Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-2 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('cards');
            }}
            className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'cards'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" /> 7 Hằng Đẳng Thức Chi Tiết
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('geometry');
            }}
            className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'geometry'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Minh Họa Hình Học 2D/3D
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('poem');
            }}
            className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'poem'
                ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Flame className="w-4 h-4" /> Thơ Vần Nhớ Nhanh
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('extended');
            }}
            className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'extended'
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" /> HĐT Mở Rộng & Nâng Cao
          </button>
        </div>
      </div>

      {activeTab === 'geometry' && <GeometryVisualizer />}

      {activeTab === 'poem' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
            <span className="p-2 bg-pink-500/10 text-pink-400 rounded-xl">
              <Flame className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white">Bài Ca 7 Hằng Đẳng Thức Đáng Nhớ</h2>
              <p className="text-xs text-slate-400">Ghi nhớ quy luật dấu và hệ số siêu dễ thuộc bằng vần điệu dân gian!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MEMORIZING_POEM.map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 hover:border-pink-500/40 transition-all">
                <div className="text-xs font-mono font-bold text-pink-400 mb-1">Khổ thơ {idx + 1}:</div>
                <div className="text-base font-bold text-white mb-1">{item.line}</div>
                <div className="text-xs text-slate-400 italic">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'extended' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
            <span className="p-2 bg-purple-500/10 text-purple-400 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white">Các Hằng Đẳng Thức Mở Rộng Thường Gặp</h2>
              <p className="text-xs text-slate-400">Bảo bối cho học sinh giỏi và các kì thi tuyển sinh vào lớp 10 chuyên!</p>
            </div>
          </div>

          <div className="space-y-4">
            {EXTENDED_IDENTITIES.map((ext) => (
              <div key={ext.id} className="p-5 bg-slate-950/70 rounded-2xl border border-slate-800">
                <div className="text-base font-bold text-purple-300 mb-2">{ext.name}</div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center my-3">
                  <MathView latex={ext.formulaLatex} block className="text-lg text-amber-300 font-bold" />
                </div>
                <div className="text-xs text-slate-300 mb-1">
                  <span className="font-semibold text-white">Phát biểu: </span>
                  {ext.verbalVietnamese}
                </div>
                <div className="text-xs text-slate-400">
                  <span className="font-semibold text-emerald-400">Ứng dụng: </span>
                  {ext.tip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'cards' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: List of 7 identities */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs uppercase tracking-wider font-bold text-slate-400 px-1 mb-2">
              Danh Sách 7 Hằng Đẳng Thức:
            </div>
            {SEVEN_IDENTITIES.map((item) => {
              const isSelected = selectedIdentityId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectIdentity(item.id)}
                  className={`w-full p-3.5 rounded-2xl text-left border transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/10 border-amber-500/60 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-xl font-mono font-black text-sm flex items-center justify-center ${
                        isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.id}
                    </span>
                    <div>
                      <div className={`font-bold text-sm ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">{item.nameEn}</div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    {item.category === 'square' ? 'Bậc 2' : 'Bậc 3'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Card for selected identity */}
          <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  HẰNG ĐẲNG THỨC SỐ {selectedIdentity.id}
                </span>
                <h3 className="text-2xl font-black text-white">{selectedIdentity.name}</h3>
              </div>
              <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-400">
                {selectedIdentity.nameEn}
              </span>
            </div>

            {/* Formula Banner */}
            <div className="p-6 bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950 rounded-2xl border border-indigo-500/30 text-center mb-6 shadow-inner">
              <div className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-2">
                Công Thức Tổng Quát:
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono my-2">
                <MathView latex={selectedIdentity.formulaLatex} block />
              </div>
            </div>

            {/* Verbal explanation */}
            <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 mb-4 text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-white block mb-1">📖 Phát biểu bằng lời:</span>
              {selectedIdentity.verbalVietnamese}
            </div>

            {/* Tips & Pitfalls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-2">
                  <Lightbulb className="w-4 h-4" /> Mẹo Nhớ Nhanh:
                </div>
                <p className="text-xs text-emerald-200/90 leading-relaxed">{selectedIdentity.mnemonicTip}</p>
              </div>

              <div className="p-4 bg-rose-950/20 border border-rose-500/30 rounded-2xl">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs mb-2">
                  <AlertTriangle className="w-4 h-4" /> Lỗi Thường Gặp (Bẫy Sai Lầm):
                </div>
                <p className="text-xs text-rose-200/90 leading-relaxed">{selectedIdentity.commonPitfall}</p>
              </div>
            </div>

            {/* Step-by-step Examples */}
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3">
                Ví Dụ Áp Dụng Từng Bước:
              </div>
              <div className="space-y-3">
                {selectedIdentity.examples.map((ex, idx) => {
                  const isExpanded = expandedExampleIdx === idx;
                  return (
                    <div key={idx} className="bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden">
                      <button
                        onClick={() => setExpandedExampleIdx(isExpanded ? null : idx)}
                        className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-900 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-indigo-950 text-indigo-400 font-mono text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-sm font-bold text-white font-mono">
                            Khai triển: <MathView latex={ex.problemLatex} />
                          </span>
                        </div>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </button>

                      {isExpanded && (
                        <div className="p-4 pt-2 border-t border-slate-800/80 bg-slate-950/40 text-xs space-y-2.5 animate-in fade-in duration-200">
                          <div className="p-2 bg-indigo-950/40 rounded-xl border border-indigo-500/20 text-indigo-300 font-mono">
                            🔍 <span className="font-semibold">Xác định biểu thức: </span> {ex.identifyAB}
                          </div>
                          <div className="space-y-1.5 pl-2 border-l-2 border-slate-800">
                            {ex.steps.map((st, sIdx) => (
                              <div key={sIdx} className="space-y-0.5">
                                <div className="text-slate-400">{st.desc}:</div>
                                <div className="font-mono text-amber-300 font-bold">
                                  <MathView latex={st.latex} />
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="p-2 bg-emerald-950/40 rounded-xl border border-emerald-500/20 text-emerald-300 font-mono font-bold flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" /> Kết quả: <MathView latex={ex.resultLatex} />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
