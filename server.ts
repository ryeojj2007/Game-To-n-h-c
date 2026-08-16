import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google Gemini API on server side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// AI Math Tutor endpoint
app.post('/api/tutor/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemInstruction = `Bạn là Trợ lý Học thuật Chuyên sâu về Đại số và 7 Hằng đẳng thức đáng nhớ (Toán THCS Việt Nam).

Quy tắc ứng xử và hình thức trình bày bắt buộc:
1. Phong cách ngôn ngữ: Sử dụng ngôn phong học thuật, trang trọng, chuẩn mực và lịch sự. Xưng hô chuẩn mực, không dùng ngôn ngữ thân mật suồng sã hoặc cợt nhả.
2. Tuyệt đối KHÔNG sử dụng bất kỳ biểu tượng cảm xúc (icon, emoji) nào trong câu trả lời.
3. Cấu trúc văn bản: Trình bày liền mạch theo các đoạn văn hoàn chỉnh. Tuyệt đối không xuống dòng tùy tiện, không ngắt dòng giữa câu và không sử dụng danh sách liệt kê vụn vặt trừ khi cần phân định các trường hợp toán học cụ thể.
4. Nguyên tắc trả lời và giải thích: CHỈ giải thích nguyên lý hoặc quy trình thực hiện khi người dùng có yêu cầu giải thích rõ ràng (ví dụ: chứa các từ khóa "tại sao", "vì sao", "giải thích", "hướng dẫn", "chứng minh"). Đối với các yêu cầu tính toán, khai triển, rút gọn hoặc kiểm tra thông thường, hãy đưa ra kết quả trực tiếp, chính xác và ngắn gọn mà không diễn giải thêm.
5. Biểu thức toán học: Viết chuẩn xác công thức toán học dưới dạng ký hiệu toán rõ ràng hoặc đặt trong cặp dấu $...$ đối với LaTeX để hiển thị chuẩn xác, không làm sai lệch cú pháp.`;

    const chatHistory = history.map((h: { role: string; content: string }) => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: [
        ...chatHistory,
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ],
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    const reply = response.text || 'Hệ thống chưa thể xử lý yêu cầu tại thời điểm này. Vui lòng gửi lại câu hỏi.';
    return res.json({ reply });
  } catch (error: any) {
    console.error('Gemini Chat Error:', error);
    return res.status(500).json({
      error: 'Không thể kết nối với dịch vụ trợ lý học thuật.',
      details: error.message,
    });
  }
});

// AI Generate Practice Problem / Explanation
app.post('/api/tutor/generate-challenge', async (req, res) => {
  try {
    const { level = 'medium', identityType = 'all' } = req.body;

    const prompt = `Hãy tạo một bài toán trắc nghiệm thú vị về 7 Hằng Đẳng Thức Đáng Nhớ cho học sinh lớp 8.
Cấp độ: ${level} (easy: cơ bản nhận biết, medium: vận dụng tính toán/rút gọn, hard: nâng cao/tìm x/chứng minh).
Chủ đề HĐT: ${identityType}.

Trả về kết quả dưới định dạng JSON với cấu trúc:
{
  "question": "Nội dung câu hỏi bài toán",
  "identityHint": "Tên hoặc gợi ý hằng đẳng thức sử dụng",
  "options": [
    {"id": "A", "text": "Phương án A", "isCorrect": boolean},
    {"id": "B", "text": "Phương án B", "isCorrect": boolean},
    {"id": "C", "text": "Phương án C", "isCorrect": boolean},
    {"id": "D", "text": "Phương án D", "isCorrect": boolean}
  ],
  "explanation": "Lời giải thích chi tiết từng bước, chỉ rõ A = ?, B = ?, áp dụng công thức nào"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.8,
      },
    });

    const text = response.text;
    if (text) {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    }
    throw new Error('No response text');
  } catch (error: any) {
    console.error('Challenge Generation Error:', error);
    return res.status(500).json({
      error: 'Không thể tạo câu hỏi thử thách AI',
      details: error.message,
    });
  }
});

// Setup Vite middleware in dev or serve static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
