import React, { useState, useRef, useEffect } from 'react';
import { MathView } from './MathView';
import { Send, Loader2, User, RefreshCw, Sparkles, BookCheck } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  'Khai triển biểu thức (3x - 2y)^2',
  'Rút gọn biểu thức (x + 2)^3 - (x - 2)^3',
  'Giải thích chi tiết vì sao (a - b)^2 = (b - a)^2',
  'Kiểm tra tính đúng sai của đẳng thức: (x - y)(x^2 + xy + y^2) = x^3 - y^3',
  'Tìm giá trị của x thỏa mãn: x^2 - 6x + 9 = 0',
];

// Helper to parse and render text mixed with LaTeX $...$ or $$...$$ or \(...\)
const FormattedMessage: React.FC<{ content: string; isUser: boolean }> = ({ content, isUser }) => {
  if (isUser) {
    return <div className="text-sm font-medium">{content}</div>;
  }

  // Remove any unintentional emoji characters from text
  const cleanContent = content.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

  // Split into paragraphs to prevent erratic line-breaking
  const paragraphs = cleanContent.split(/\n{2,}/).filter((p) => p.trim().length > 0);

  return (
    <div className="space-y-2.5 text-sm leading-relaxed text-slate-200">
      {paragraphs.map((para, pIdx) => {
        // Flatten single newlines within paragraph to maintain continuous reading flow
        const cleanPara = para.replace(/\n(?!\n)/g, ' ');

        // Split paragraph by math delimiters: $$...$$, $...$, \[...\], \(...\)
        const parts: React.ReactNode[] = [];
        const regex = /(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g;
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = regex.exec(cleanPara)) !== null) {
          if (match.index > lastIndex) {
            const textPart = cleanPara.substring(lastIndex, match.index);
            parts.push(<span key={`text-${lastIndex}`}>{textPart}</span>);
          }

          const mathString = match[0];
          let latex = '';
          let isBlock = false;

          if (mathString.startsWith('$$') && mathString.endsWith('$$')) {
            latex = mathString.slice(2, -2).trim();
            isBlock = true;
          } else if (mathString.startsWith('$') && mathString.endsWith('$')) {
            latex = mathString.slice(1, -1).trim();
          } else if (mathString.startsWith('\\[') && mathString.endsWith('\\]')) {
            latex = mathString.slice(2, -2).trim();
            isBlock = true;
          } else if (mathString.startsWith('\\(') && mathString.endsWith('\\)')) {
            latex = mathString.slice(2, -2).trim();
          }

          parts.push(
            <span key={`math-${match.index}`} className="inline-flex mx-0.5 align-middle">
              <MathView latex={latex} block={isBlock} />
            </span>
          );

          lastIndex = regex.lastIndex;
        }

        if (lastIndex < cleanPara.length) {
          parts.push(<span key={`text-${lastIndex}`}>{cleanPara.substring(lastIndex)}</span>);
        }

        return (
          <p key={pIdx} className="m-0 leading-relaxed">
            {parts}
          </p>
        );
      })}
    </div>
  );
};

export const AITutorChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Xin chào. Tôi là Trợ lý Học thuật Đại số. Tôi hỗ trợ giải đáp, tính toán và kiểm tra các bài toán liên quan đến 7 hằng đẳng thức đáng nhớ. Quý vị có thể gửi biểu thức hoặc câu hỏi cần hỗ trợ.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    soundManager.playClick();
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: chatHistory,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        soundManager.playCorrect();
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error(data.error || 'Lỗi xử lý');
      }
    } catch (e: any) {
      console.error('Chat error:', e);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Hệ thống chưa thể phản hồi vào lúc này do kết nối bị gián đoạn. Vui lòng gửi lại câu hỏi.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl flex flex-col h-[700px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <BookCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">Trợ Lý Học Thuật Đại Số</h2>
              <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Trực tuyến
              </span>
            </div>
            <p className="text-xs text-slate-400">Hỗ trợ tra cứu, khai triển, rút gọn và giải toán hằng đẳng thức</p>
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            setMessages([
              {
                id: 'welcome',
                role: 'assistant',
                content:
                  'Đoạn hội thoại đã được làm mới. Quý vị có thể gửi biểu thức hoặc câu hỏi cần xử lý tiếp theo.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ]);
          }}
          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl border border-slate-700 transition-colors"
          title="Làm mới hội thoại"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {messages.map((msg) => {
          const isMe = msg.role === 'user';
          return (
            <div key={msg.id} className={`flex gap-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
              {!isMe && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0 mt-1">
                  <BookCheck className="w-4 h-4 text-indigo-400" />
                </div>
              )}
              <div
                className={`max-w-[85%] sm:max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-md ${
                  isMe
                    ? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-tr-sm font-medium'
                    : 'bg-slate-950/90 text-slate-200 border border-slate-800 rounded-tl-sm'
                }`}
              >
                <FormattedMessage content={msg.content} isUser={isMe} />
                <div className={`text-[10px] mt-2 font-mono ${isMe ? 'text-indigo-200 text-right' : 'text-slate-500'}`}>
                  {msg.timestamp}
                </div>
              </div>
              {isMe && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-sm flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-indigo-300" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 items-center text-slate-400 text-xs">
            <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0">
              <BookCheck className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
              <span>Đang tính toán và xử lý văn bản...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="pt-2 pb-3 border-t border-slate-800/80 flex-shrink-0">
        <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Câu hỏi gợi ý:
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-200 text-xs rounded-xl whitespace-nowrap transition-colors flex-shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="pt-2 flex-shrink-0">
        <div className="flex gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 focus-within:border-indigo-500/60 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Nhập biểu thức hoặc câu hỏi (Ví dụ: Khai triển (2x - 3y)^2 hoặc Rút gọn biểu thức)..."
            className="flex-1 bg-transparent px-3.5 text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            disabled={!input.trim() || isLoading}
            onClick={() => handleSend()}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm transition-all flex items-center gap-1.5 shadow-md shadow-indigo-500/10"
          >
            <Send className="w-4 h-4" /> Gửi
          </button>
        </div>
      </div>
    </div>
  );
};
