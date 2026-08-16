import { FillBlankQuestion, QuizQuestion, BossMonster, Badge } from '../types/math';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ==========================================
  // NHÓM 1: HẰNG ĐẲNG THỨC 1, 2, 3 (BÌNH PHƯƠNG)
  // ==========================================

  // --- MỨC ĐỘ NHẬN BIẾT (NB) ---
  {
    id: 'hdt123_nb_1',
    identityId: 1,
    difficulty: 'NB',
    group: '123',
    questionLatex: '(A + B)^2 = A^2 + 2AB + B^2',
    questionText: 'Hằng đẳng thức (A + B)² = A² + 2AB + B² có tên là:',
    options: [
      { id: 'A', latex: '\\text{Bình phương của một tổng}', isCorrect: true },
      { id: 'B', latex: '\\text{Tổng hai bình phương}', isCorrect: false },
      { id: 'C', latex: '\\text{Bình phương của một hiệu}', isCorrect: false },
      { id: 'D', latex: '\\text{Hiệu hai bình phương}', isCorrect: false }
    ],
    explanation: '(A + B)² là bình phương của một tổng hai biểu thức A và B.',
    hint: 'Bên trong ngoặc là phép cộng (tổng), bên ngoài là lũy thừa 2 (bình phương).'
  },
  {
    id: 'hdt123_nb_2',
    identityId: 2,
    difficulty: 'NB',
    group: '123',
    questionLatex: '(A - B)^2 = A^2 - 2AB + B^2',
    questionText: 'Hằng đẳng thức (A - B)² = A² - 2AB + B² có tên là:',
    options: [
      { id: 'A', latex: '\\text{Bình phương của một tổng}', isCorrect: false },
      { id: 'B', latex: '\\text{Tổng hai bình phương}', isCorrect: false },
      { id: 'C', latex: '\\text{Bình phương của một hiệu}', isCorrect: true },
      { id: 'D', latex: '\\text{Hiệu hai bình phương}', isCorrect: false }
    ],
    explanation: '(A - B)² là bình phương của một hiệu hai biểu thức A và B.',
    hint: 'Bên trong ngoặc là dấu trừ (hiệu), bên ngoài là mũ 2 (bình phương).'
  },
  {
    id: 'hdt123_nb_3',
    identityId: 3,
    difficulty: 'NB',
    group: '123',
    questionLatex: 'A^2 - B^2 = (A - B)(A + B)',
    questionText: 'Hằng đẳng thức A² - B² = (A - B)(A + B) có tên là:',
    options: [
      { id: 'A', latex: '\\text{Bình phương của một tổng}', isCorrect: false },
      { id: 'B', latex: '\\text{Tổng hai bình phương}', isCorrect: false },
      { id: 'C', latex: '\\text{Bình phương của một hiệu}', isCorrect: false },
      { id: 'D', latex: '\\text{Hiệu hai bình phương}', isCorrect: true }
    ],
    explanation: 'A² - B² là hiệu giữa hai bình phương A² và B².',
    hint: 'Hai số hạng đều có mũ 2 trừ cho nhau.'
  },
  {
    id: 'hdt123_nb_4',
    identityId: 1,
    difficulty: 'NB',
    group: '123',
    questionLatex: '(A + B)^2 = \\ ?',
    questionText: 'Hằng đẳng thức bình phương của một tổng là:',
    options: [
      { id: 'A', latex: '(A + B)^2 = A^2 + 2AB + B^2', isCorrect: true },
      { id: 'B', latex: '(A + B)^2 = A^2 - 2AB + B^2', isCorrect: false },
      { id: 'C', latex: '(A + B)^2 = A^2 + 2AB - B^2', isCorrect: false },
      { id: 'D', latex: '(A + B)^2 = A^2 - 2AB - B^2', isCorrect: false }
    ],
    explanation: 'Khai triển đúng: (A + B)² = A² + 2AB + B².',
    hint: 'Tất cả các dấu đều là dấu CỘNG (+).'
  },
  {
    id: 'hdt123_nb_5',
    identityId: 2,
    difficulty: 'NB',
    group: '123',
    questionLatex: '(A - B)^2 = \\ ?',
    questionText: 'Hằng đẳng thức bình phương của một hiệu là:',
    options: [
      { id: 'A', latex: '(A + B)^2 = A^2 + 2AB + B^2', isCorrect: false },
      { id: 'B', latex: '(A - B)^2 = A^2 - 2AB + B^2', isCorrect: true },
      { id: 'C', latex: '(A - B)^2 = A^2 + 2AB + B^2', isCorrect: false },
      { id: 'D', latex: '(A - B)^2 = A^2 - 2AB - B^2', isCorrect: false }
    ],
    explanation: 'Khai triển đúng: (A - B)² = A² - 2AB + B². Lưu ý (-B)² luôn là +B²!',
    hint: 'Dấu trừ chỉ ở số hạng -2AB, số hạng cuối luôn là +B².'
  },
  {
    id: 'hdt123_nb_6',
    identityId: 3,
    difficulty: 'NB',
    group: '123',
    questionLatex: 'A^2 - B^2 = \\ ?',
    questionText: 'Hằng đẳng thức hiệu hai bình phương là:',
    options: [
      { id: 'A', latex: 'A^2 - B^2 = A^2 - 2AB + B^2', isCorrect: false },
      { id: 'B', latex: 'A^2 - B^2 = (A - B)^2', isCorrect: false },
      { id: 'C', latex: 'A^2 - B^2 = (A - B)(A + B)', isCorrect: true },
      { id: 'D', latex: 'A^2 - B^2 = (A + B)(B - A)', isCorrect: false }
    ],
    explanation: 'A² - B² = (A - B)(A + B).',
    hint: 'Hiệu nhân Tổng: (A - B)(A + B).'
  },
  {
    id: 'hdt123_nb_7',
    identityId: 1,
    difficulty: 'NB',
    group: '123',
    questionLatex: '(x + 2)^2 = x^2 + [\\dots] + 4',
    questionText: 'Điền vào chỗ trống: (x + 2)² = x² + [...] + 4',
    options: [
      { id: 'A', latex: '2x', isCorrect: false },
      { id: 'B', latex: '4x', isCorrect: true },
      { id: 'C', latex: '2', isCorrect: false },
      { id: 'D', latex: '4', isCorrect: false }
    ],
    explanation: 'Số hạng ở giữa là 2AB = 2 · x · 2 = 4x.',
    hint: '2 · A · B = 2 · x · 2'
  },
  {
    id: 'hdt123_nb_8',
    identityId: 3,
    difficulty: 'NB',
    group: '123',
    questionLatex: 'x^2 - [\\dots] = (x - 4)(x + 4)',
    questionText: 'Điền vào chỗ trống: x² - [...] = (x - 4)(x + 4)',
    options: [
      { id: 'A', latex: '2', isCorrect: false },
      { id: 'B', latex: '4', isCorrect: false },
      { id: 'C', latex: '8', isCorrect: false },
      { id: 'D', latex: '16', isCorrect: true }
    ],
    explanation: '(x - 4)(x + 4) = x² - 4² = x² - 16.',
    hint: 'B² = 4² = 16'
  },

  // --- MỨC ĐỘ THÔNG HIỂU (TH) ---
  {
    id: 'hdt123_th_9',
    identityId: 1,
    difficulty: 'TH',
    group: '123',
    questionLatex: '(x + 5y)^2 = \\ ?',
    questionText: 'Khai triển của hằng đẳng thức (x + 5y)² là:',
    options: [
      { id: 'A', latex: 'x^2 + 5x + 25y^2', isCorrect: false },
      { id: 'B', latex: 'x^2 + 2x + 25y^2', isCorrect: false },
      { id: 'C', latex: 'x^2 + 10x + 10y^2', isCorrect: false },
      { id: 'D', latex: 'x^2 + 10xy + 25y^2', isCorrect: true }
    ],
    explanation: '(x + 5y)² = x² + 2(x)(5y) + (5y)² = x² + 10xy + 25y².',
    hint: '2 · x · 5y = 10xy và (5y)² = 25y²'
  },
  {
    id: 'hdt123_th_10',
    identityId: 2,
    difficulty: 'TH',
    group: '123',
    questionLatex: '(2x - 4y)^2 = \\ ?',
    questionText: 'Khai triển của hằng đẳng thức (2x - 4y)² là:',
    options: [
      { id: 'A', latex: '2x^2 - 8xy + 4y^2', isCorrect: false },
      { id: 'B', latex: '4x^2 - 8xy + 16y^2', isCorrect: false },
      { id: 'C', latex: '4x^2 - 16xy + 16y^2', isCorrect: true },
      { id: 'D', latex: '4x^2 - 8xy - 16y^2', isCorrect: false }
    ],
    explanation: '(2x - 4y)² = (2x)² - 2(2x)(4y) + (4y)² = 4x² - 16xy + 16y².',
    hint: '(2x)² = 4x², 2·(2x)·(4y) = 16xy, (4y)² = 16y²'
  },
  {
    id: 'hdt123_th_11',
    identityId: 1,
    difficulty: 'TH',
    group: '123',
    questionLatex: 'x^2 + x + \\frac{1}{4} = \\ ?',
    questionText: 'Dạng bình phương của một tổng của biểu thức x² + x + 1/4 là:',
    options: [
      { id: 'A', latex: '\\left(x + \\frac{1}{4}\\right)^2', isCorrect: false },
      { id: 'B', latex: '\\left(x + \\frac{1}{2}\\right)^2', isCorrect: true },
      { id: 'C', latex: '(x + 2)^2', isCorrect: false },
      { id: 'D', latex: '(x + 4)^2', isCorrect: false }
    ],
    explanation: 'x² + 2 · x · (1/2) + (1/2)² = (x + 1/2)².',
    hint: 'B² = 1/4 => B = 1/2. Kiểm tra: 2AB = 2·x·(1/2) = x (khớp!)'
  },
  {
    id: 'hdt123_th_12',
    identityId: 3,
    difficulty: 'TH',
    group: '123',
    questionLatex: '(x^2 - 4y)(x^2 + 4y) = \\ ?',
    questionText: 'Dạng hiệu hai bình phương của biểu thức (x² - 4y)(x² + 4y) là:',
    options: [
      { id: 'A', latex: 'x^2 - 16y^2', isCorrect: false },
      { id: 'B', latex: 'x^4 - 4y^2', isCorrect: false },
      { id: 'C', latex: 'x^4 - 16y^2', isCorrect: true },
      { id: 'D', latex: 'x^2 - 4y', isCorrect: false }
    ],
    explanation: '(x²)² - (4y)² = x⁴ - 16y².',
    hint: 'A = x² => A² = x⁴; B = 4y => B² = 16y²'
  },
  {
    id: 'hdt123_th_13',
    identityId: 2,
    difficulty: 'TH',
    group: '123',
    questionLatex: '(x + 2)^2 - 4(x + 2) + 4 = \\ ?',
    questionText: 'Rút gọn biểu thức: (x + 2)² - 4(x + 2) + 4',
    options: [
      { id: 'A', latex: 'x^2 + 16', isCorrect: false },
      { id: 'B', latex: 'x^2 + 8x + 16', isCorrect: false },
      { id: 'C', latex: 'x^2 - 4x', isCorrect: false },
      { id: 'D', latex: 'x^2', isCorrect: true }
    ],
    explanation: 'Đặt u = x + 2, biểu thức trở thành u² - 4u + 4 = (u - 2)² = (x + 2 - 2)² = x².',
    hint: 'Dạng A² - 2AB + B² với A = (x+2) và B = 2'
  },
  {
    id: 'hdt123_th_14',
    identityId: 3,
    difficulty: 'TH',
    group: '123',
    questionLatex: '(x - 5)^2 - (x + 5)^2 = \\ ?',
    questionText: 'Kết quả của biểu thức (x - 5)² - (x + 5)² là:',
    options: [
      { id: 'A', latex: '50', isCorrect: false },
      { id: 'B', latex: '2x^2 + 50', isCorrect: false },
      { id: 'C', latex: '20x', isCorrect: false },
      { id: 'D', latex: '-20x', isCorrect: true }
    ],
    explanation: 'Cách 1: (x² - 10x + 25) - (x² + 10x + 25) = -20x. Cách 2: [(x-5)-(x+5)][(x-5)+(x+5)] = (-10)(2x) = -20x.',
    hint: 'Áp dụng A² - B² = (A - B)(A + B)'
  },

  // --- MỨC ĐỘ VẬN DỤNG (VD) ---
  {
    id: 'hdt123_vd_15',
    identityId: 1,
    difficulty: 'VD',
    group: '123',
    questionLatex: '999^2x + 1998x + x = \\ ?',
    questionText: 'Tính nhanh kết quả của biểu thức 999²x + 1998x + x:',
    options: [
      { id: 'A', latex: '1000x', isCorrect: false },
      { id: 'B', latex: '1\\,000\\,000x', isCorrect: true },
      { id: 'C', latex: '10\\,000x', isCorrect: false },
      { id: 'D', latex: '100\\,000x', isCorrect: false }
    ],
    explanation: 'Đặt x làm nhân tử chung: x(999² + 2·999·1 + 1²) = x(999 + 1)² = x(1000)² = 1 000 000x.',
    hint: '1998 = 2 · 999. Đưa về x(999 + 1)²'
  },
  {
    id: 'hdt123_vd_16',
    identityId: 3,
    difficulty: 'VD',
    group: '123',
    questionLatex: '305 \\cdot 295 \\cdot y = \\ ?',
    questionText: 'Tính nhanh kết quả của biểu thức 305 · 295 · y:',
    options: [
      { id: 'A', latex: '89975(x + y)', isCorrect: false },
      { id: 'B', latex: '305295xy', isCorrect: false },
      { id: 'C', latex: '89975y', isCorrect: true },
      { id: 'D', latex: '90025xy', isCorrect: false }
    ],
    explanation: '305 · 295 · y = (300 + 5)(300 - 5)y = (300² - 5²)y = (90000 - 25)y = 89975y.',
    hint: '(300 + 5)(300 - 5) = 300² - 5² = 90000 - 25'
  },
  {
    id: 'hdt123_vd_17',
    identityId: 1,
    difficulty: 'VD',
    group: '123',
    questionLatex: 'M = x^2 - 4x + 10',
    questionText: 'Giá trị nhỏ nhất của biểu thức M = x² - 4x + 10 là:',
    options: [
      { id: 'A', latex: '8', isCorrect: false },
      { id: 'B', latex: '6', isCorrect: true },
      { id: 'C', latex: '4', isCorrect: false },
      { id: 'D', latex: '2', isCorrect: false }
    ],
    explanation: 'M = (x² - 4x + 4) + 6 = (x - 2)² + 6. Vì (x - 2)² >= 0 nên M >= 6. Dấu "=" khi x = 2.',
    hint: 'Tách 10 = 4 + 6 để tạo thành bình phương (x - 2)²'
  },
  {
    id: 'hdt123_vd_18',
    identityId: 3,
    difficulty: 'VD',
    group: '123',
    questionLatex: '3(2^2 + 1)(2^4 + 1)(2^8 + 1)(2^{16} + 1)(2^{32} + 1) = \\ ?',
    questionText: 'Rút gọn biểu thức tích liên tiếp trên:',
    options: [
      { id: 'A', latex: '2^{64} - 1', isCorrect: true },
      { id: 'B', latex: '2^{64} + 1', isCorrect: false },
      { id: 'C', latex: '2^{32} - 1', isCorrect: false },
      { id: 'D', latex: '2^{32} + 1', isCorrect: false }
    ],
    explanation: 'Vì 3 = 2² - 1, nhân liên tiếp hiệu hai bình phương: (2²-1)(2²+1) = 2⁴-1; (2⁴-1)(2⁴+1) = 2⁸-1; ... Cuối cùng được 2⁶⁴ - 1.',
    hint: 'Thay số 3 bằng (2² - 1) rồi áp dụng A² - B² liên hoàn'
  },

  // --- MỨC ĐỘ VẬN DỤNG CAO (VDC) ---
  {
    id: 'hdt123_vdc_19',
    identityId: 1,
    difficulty: 'VDC',
    group: '123',
    questionLatex: 'x^2 - 6x + 4y^2 + 4y + 10 = 0',
    questionText: 'Tìm cặp số (x; y) thỏa mãn đẳng thức trên:',
    options: [
      { id: 'A', latex: 'x = 3;\\ y = \\frac{1}{2}', isCorrect: false },
      { id: 'B', latex: 'x = -3;\\ y = -\\frac{1}{2}', isCorrect: false },
      { id: 'C', latex: 'x = -3;\\ y = \\frac{1}{2}', isCorrect: false },
      { id: 'D', latex: 'x = 3;\\ y = -\\frac{1}{2}', isCorrect: true }
    ],
    explanation: '(x² - 6x + 9) + (4y² + 4y + 1) = 0 => (x - 3)² + (2y + 1)² = 0 => x = 3 và 2y + 1 = 0 => y = -1/2.',
    hint: 'Tách 10 = 9 + 1 rồi nhóm thành tổng hai bình phương'
  },
  {
    id: 'hdt123_vdc_20',
    identityId: 2,
    difficulty: 'VDC',
    group: '123',
    questionLatex: 'M = 9x^2 + 6y^2 + 18x - 12xy - 12y - 27',
    questionText: 'Khẳng định nào sau đây là đúng về giá trị của M?',
    options: [
      { id: 'A', latex: 'M \\ge 0', isCorrect: false },
      { id: 'B', latex: 'M \\le 0', isCorrect: false },
      { id: 'C', latex: 'M \\ge 36', isCorrect: false },
      { id: 'D', latex: 'M \\ge -36', isCorrect: true }
    ],
    explanation: 'M = (9x² - 12xy + 4y² + 18x - 12y + 9) + 2(y² - 6y + 9) - 36 - 18 + 18 = (3x - 2y + 3)² + 2(y - 3)² - 36 >= -36.',
    hint: 'Nhóm tạo thành tổng các bình phương: (3x - 2y + 3)² + 2(y - 3)² - 36'
  },

  // ==========================================
  // NHÓM 2: HẰNG ĐẲNG THỨC 4, 5 (LẬP PHƯƠNG)
  // ==========================================

  // --- MỨC ĐỘ NHẬN BIẾT (NB) ---
  {
    id: 'hdt45_nb_1',
    identityId: 4,
    difficulty: 'NB',
    group: '45',
    questionLatex: '(x + 3)^3 = \\ ?',
    questionText: 'Khai triển (x + 3)³ ta được:',
    options: [
      { id: 'A', latex: 'x^3 + 9x^2 + 27x + 27', isCorrect: true },
      { id: 'B', latex: 'x^3 + 9x^2 + 27x + 81', isCorrect: false },
      { id: 'C', latex: 'x^3 + 3x^2 + 9x + 27', isCorrect: false },
      { id: 'D', latex: 'x^3 + 3x^2 + 9x + 81', isCorrect: false }
    ],
    explanation: 'x³ + 3·x²·3 + 3·x·3² + 3³ = x³ + 9x² + 27x + 27.',
    hint: 'Hệ số 1 - 3 - 3 - 1: 3·3 = 9, 3·9 = 27, 3³ = 27'
  },
  {
    id: 'hdt45_nb_2',
    identityId: 5,
    difficulty: 'NB',
    group: '45',
    questionLatex: '(x - 2)^3 = x^3 - [\\dots] + 12x - 8',
    questionText: 'Cho (x - 2)³ = x³ - [...] + 12x - 8. Điền đơn thức phù hợp vào chỗ trống:',
    options: [
      { id: 'A', latex: '2x^2', isCorrect: false },
      { id: 'B', latex: '6x^2', isCorrect: true },
      { id: 'C', latex: '-2x^2', isCorrect: false },
      { id: 'D', latex: '-6x^2', isCorrect: false }
    ],
    explanation: 'Số hạng thứ hai là 3A²B = 3 · x² · 2 = 6x². Đã có sẵn dấu trừ ở trước nên điền 6x².',
    hint: '3 · A² · B = 3 · x² · 2 = 6x²'
  },
  {
    id: 'hdt45_nb_3',
    identityId: 4,
    difficulty: 'NB',
    group: '45',
    questionLatex: '\\text{Phát biểu HĐT 4}',
    questionText: 'Chọn phương án đúng nhất: "... bằng lập phương biểu thức thứ nhất cộng ba lần tích của bình phương biểu thức thứ nhất với biểu thức thứ hai cộng ba lần tích của biểu thức thứ nhất với bình phương biểu thức thứ hai rồi cộng lập phương biểu thức thứ hai."',
    options: [
      { id: 'A', latex: '\\text{Bình phương của một tổng hai biểu thức}', isCorrect: false },
      { id: 'B', latex: '\\text{Bình phương của một hiệu hai biểu thức}', isCorrect: false },
      { id: 'C', latex: '\\text{Lập phương của một tổng hai biểu thức}', isCorrect: true },
      { id: 'D', latex: '\\text{Lập phương của một hiệu hai biểu thức}', isCorrect: false }
    ],
    explanation: 'Đây là định nghĩa phát biểu bằng lời của (A + B)³.',
    hint: 'Có "cộng lập phương" và các dấu đều là "cộng" -> Lập phương của một tổng'
  },
  {
    id: 'hdt45_nb_4',
    identityId: 5,
    difficulty: 'NB',
    group: '45',
    questionLatex: '\\text{Phát biểu HĐT 5}',
    questionText: 'Chọn phương án đúng nhất: "... bằng lập phương biểu thức thứ nhất trừ đi ba lần tích của bình phương biểu thức thứ nhất với biểu thức thứ hai, cộng ba lần tích của biểu thức thứ nhất với bình phương biểu thức thứ hai rồi trừ đi lập phương biểu thức thứ hai."',
    options: [
      { id: 'A', latex: '\\text{Bình phương của một tổng hai biểu thức}', isCorrect: false },
      { id: 'B', latex: '\\text{Bình phương của một hiệu hai biểu thức}', isCorrect: false },
      { id: 'C', latex: '\\text{Lập phương của một tổng hai biểu thức}', isCorrect: false },
      { id: 'D', latex: '\\text{Lập phương của một hiệu hai biểu thức}', isCorrect: true }
    ],
    explanation: 'Đây là định nghĩa phát biểu bằng lời của (A - B)³.',
    hint: 'Dấu trừ đan xen (+ - + -) -> Lập phương của một hiệu'
  },
  {
    id: 'hdt45_nb_5',
    identityId: 4,
    difficulty: 'NB',
    group: '45',
    questionLatex: 'x^3 + 12x^2 + 48x + 64 = (x + a)^3',
    questionText: 'Cho x³ + 12x² + 48x + 64 = (x + a)³. Giá trị của a là:',
    options: [
      { id: 'A', latex: '4', isCorrect: true },
      { id: 'B', latex: '-4', isCorrect: false },
      { id: 'C', latex: '64', isCorrect: false },
      { id: 'D', latex: '-64', isCorrect: false }
    ],
    explanation: 'a³ = 64 => a = 4. Thử lại: 3·a = 12, 3·a² = 48 (hoàn toàn chính xác).',
    hint: 'a³ = 64 => a = 4'
  },
  {
    id: 'hdt45_nb_6',
    identityId: 5,
    difficulty: 'NB',
    group: '45',
    questionLatex: '8x^3 - 36x^2 + 54x - 27 = \\ ?',
    questionText: 'Viết biểu thức 8x³ - 36x² + 54x - 27 dưới dạng lập phương của một hiệu:',
    options: [
      { id: 'A', latex: '(2x + 3)^3', isCorrect: false },
      { id: 'B', latex: '(2x - 3)^3', isCorrect: true },
      { id: 'C', latex: '(3x - 2)^3', isCorrect: false },
      { id: 'D', latex: '(3x + 2)^3', isCorrect: false }
    ],
    explanation: '(2x)³ - 3(2x)²(3) + 3(2x)(3²) - 3³ = (2x - 3)³.',
    hint: 'A = 2x, B = 3 với các dấu đan xen (+ - + -)'
  },
  {
    id: 'hdt45_nb_7',
    identityId: 5,
    difficulty: 'NB',
    group: '45',
    questionLatex: '\\text{Chọn phương án SAI}',
    questionText: 'Trong các công thức dưới đây, phương án nào SAI?',
    options: [
      { id: 'A', latex: '(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3', isCorrect: false },
      { id: 'B', latex: '(-a - b)^3 = -a^3 - 3a^2b - 3ab^2 - b^3', isCorrect: false },
      { id: 'C', latex: '(-a + b)^3 = -a^3 - 3a^2b + 3ab^2 + b^3', isCorrect: true },
      { id: 'D', latex: '(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3', isCorrect: false }
    ],
    explanation: '(-a + b)³ = (b - a)³ = b³ - 3b²a + 3ba² - a³ = -a³ + 3a²b - 3ab² + b³. Do đó phương án C sai dấu ở số hạng thứ 2 và 3.',
    hint: '(-a + b)³ chính là (b - a)³'
  },
  {
    id: 'hdt45_nb_8',
    identityId: 5,
    difficulty: 'NB',
    group: '45',
    questionLatex: 'M = 27x^3 - 135x^2 + 225x - 130',
    questionText: 'Cho biểu thức M như trên. Chọn khẳng định đúng nhất:',
    options: [
      { id: 'A', latex: 'M - 5 = (3x - 5)^3', isCorrect: false },
      { id: 'B', latex: 'M + 5 = (3x + 5)^3', isCorrect: false },
      { id: 'C', latex: 'M - 5 = (3x + 5)^3', isCorrect: false },
      { id: 'D', latex: 'M + 5 = (3x - 5)^3', isCorrect: true }
    ],
    explanation: 'Ta có (3x - 5)³ = 27x³ - 135x² + 225x - 125 = M + 5.',
    hint: '-130 = -125 - 5 => M + 5 = (3x - 5)³'
  },

  // --- MỨC ĐỘ THÔNG HIỂU (TH) ---
  {
    id: 'hdt45_th_9',
    identityId: 4,
    difficulty: 'TH',
    group: '45',
    questionLatex: 'A = 8x^3 + 12x^2 + 6x + 1 \\quad \\text{tại } x = 9{,}5',
    questionText: 'Tính giá trị biểu thức A tại x = 9,5:',
    options: [
      { id: 'A', latex: '20', isCorrect: false },
      { id: 'B', latex: '400', isCorrect: false },
      { id: 'C', latex: '4\\,000', isCorrect: false },
      { id: 'D', latex: '8\\,000', isCorrect: true }
    ],
    explanation: 'A = (2x + 1)³. Thay x = 9,5: A = (2 · 9,5 + 1)³ = (19 + 1)³ = 20³ = 8 000.',
    hint: 'Đưa về dạng (2x + 1)³ rồi mới thay số'
  },
  {
    id: 'hdt45_th_10',
    identityId: 5,
    difficulty: 'TH',
    group: '45',
    questionLatex: 'M = -x^3 + 6x^2 - 12x + 8 \\quad \\text{tại } x = -28',
    questionText: 'Giá trị của biểu thức M tại x = -28 là:',
    options: [
      { id: 'A', latex: '30', isCorrect: false },
      { id: 'B', latex: '-30', isCorrect: false },
      { id: 'C', latex: '27\\,000', isCorrect: true },
      { id: 'D', latex: '-27\\,000', isCorrect: false }
    ],
    explanation: 'M = 8 - 12x + 6x² - x³ = (2 - x)³. Thay x = -28: M = (2 - (-28))³ = 30³ = 27 000.',
    hint: 'M = (2 - x)³'
  },
  {
    id: 'hdt45_th_11',
    identityId: 4,
    difficulty: 'TH',
    group: '45',
    questionLatex: 'M = (x + 2)^3 - (x - 2)^3 + (x - 4)(x + 4)',
    questionText: 'Hệ số tự do của đa thức M sau khi thu gọn là:',
    options: [
      { id: 'A', latex: '21', isCorrect: false },
      { id: 'B', latex: '16', isCorrect: false },
      { id: 'C', latex: '0', isCorrect: true },
      { id: 'D', latex: '-16', isCorrect: false }
    ],
    explanation: 'Hệ số tự do = 2³ - (-2)³ + (-16) = 8 - (-8) - 16 = 8 + 8 - 16 = 0.',
    hint: 'Thay x = 0 để tìm nhanh hệ số tự do'
  },
  {
    id: 'hdt45_th_12',
    identityId: 4,
    difficulty: 'TH',
    group: '45',
    questionLatex: 'A = (a + b)^3 + (a - b)^3 - 6ab^2',
    questionText: 'Rút gọn biểu thức A ta thu được:',
    options: [
      { id: 'A', latex: '2b^3', isCorrect: false },
      { id: 'B', latex: '2a^3', isCorrect: true },
      { id: 'C', latex: '-2b^3', isCorrect: false },
      { id: 'D', latex: '-2a^3', isCorrect: false }
    ],
    explanation: '(a³ + 3a²b + 3ab² + b³) + (a³ - 3a²b + 3ab² - b³) - 6ab² = 2a³ + 6ab² - 6ab² = 2a³.',
    hint: 'Các số hạng chứa b triệt tiêu lẫn nhau'
  },
  {
    id: 'hdt45_th_13',
    identityId: 4,
    difficulty: 'TH',
    group: '45',
    questionLatex: 'P = -(4x + 1)^3 + (4x + 3)(16x^2 + 3), \\ Q = (x - 2)^3 - x(x - 3)^2 - 3x',
    questionText: 'So sánh giá trị của P và Q:',
    options: [
      { id: 'A', latex: 'P = Q', isCorrect: false },
      { id: 'B', latex: 'P < Q', isCorrect: false },
      { id: 'C', latex: 'P > -Q', isCorrect: false },
      { id: 'D', latex: 'P = -Q', isCorrect: true }
    ],
    explanation: 'Khai triển thu gọn: P = 8 và Q = -8 => P = -Q.',
    hint: 'Tính giá trị cụ thể của P và Q không phụ thuộc vào x'
  },
  {
    id: 'hdt45_th_14',
    identityId: 5,
    difficulty: 'TH',
    group: '45',
    questionLatex: 'A = x^6 - \\frac{3}{2}x^4y + \\frac{3}{4}x^2y^2 - \\frac{1}{8}y^3 \\quad (x = 4, y = 28)',
    questionText: 'Tính giá trị của biểu thức A tại x = 4 và y = 28:',
    options: [
      { id: 'A', latex: '8', isCorrect: true },
      { id: 'B', latex: '-8', isCorrect: false },
      { id: 'C', latex: '2', isCorrect: false },
      { id: 'D', latex: '-2', isCorrect: false }
    ],
    explanation: 'A = (x² - 1/2 y)³ = (4² - 1/2 · 28)³ = (16 - 14)³ = 2³ = 8.',
    hint: 'A = (x² - y/2)³'
  },

  // --- MỨC ĐỘ VẬN DỤNG (VD) ---
  {
    id: 'hdt45_vd_15',
    identityId: 5,
    difficulty: 'VD',
    group: '45',
    questionLatex: '1 - \\frac{3}{2}x + \\frac{3}{4}x^2 - \\frac{1}{8}x^3 = 0',
    questionText: 'Giá trị nào của x là nghiệm của đa thức trên?',
    options: [
      { id: 'A', latex: '2', isCorrect: true },
      { id: 'B', latex: '-2', isCorrect: false },
      { id: 'C', latex: '\\frac{1}{2}', isCorrect: false },
      { id: 'D', latex: '-\\frac{1}{2}', isCorrect: false }
    ],
    explanation: '(1 - 1/2 x)³ = 0 => 1 - 1/2 x = 0 => x = 2.',
    hint: 'Biến đổi về (1 - x/2)³ = 0'
  },
  {
    id: 'hdt45_vd_16',
    identityId: 4,
    difficulty: 'VD',
    group: '45',
    questionLatex: '(x + 1)^3 - x(x^2 + 3) = 4',
    questionText: 'Có bao nhiêu giá trị của x thỏa mãn phương trình trên?',
    options: [
      { id: 'A', latex: '0', isCorrect: false },
      { id: 'B', latex: '1', isCorrect: false },
      { id: 'C', latex: '2', isCorrect: true },
      { id: 'D', latex: '3', isCorrect: false }
    ],
    explanation: 'x³ + 3x² + 3x + 1 - x³ - 3x = 4 => 3x² + 1 = 4 => 3x² = 3 => x² = 1 => x = ±1 (có 2 giá trị).',
    hint: 'Thu gọn vế trái được 3x² + 1'
  },
  {
    id: 'hdt45_vd_17',
    identityId: 5,
    difficulty: 'VD',
    group: '45',
    questionLatex: 'M = (x - 3)^3 + (-x - 1)^3',
    questionText: 'Giá trị lớn nhất của biểu thức M là:',
    options: [
      { id: 'A', latex: '-1', isCorrect: false },
      { id: 'B', latex: '1', isCorrect: false },
      { id: 'C', latex: '-16', isCorrect: true },
      { id: 'D', latex: '16', isCorrect: false }
    ],
    explanation: 'M = (x - 3)³ - (x + 1)³ = -12x² + 24x - 28 = -12(x - 1)² - 16 <= -16. GTLN là -16 khi x = 1.',
    hint: 'Khai triển thu gọn thành tam thức bậc 2: -12x² + 24x - 28'
  },
  {
    id: 'hdt45_vd_18',
    identityId: 4,
    difficulty: 'VD',
    group: '45',
    questionLatex: 'A = x^3 + 9x^2y + 27xy^2 + 27y^3 \\quad \\left(\\frac{1}{3}x + y + 1 = 0\\right)',
    questionText: 'Tính giá trị của biểu thức A biết rằng 1/3 x + y + 1 = 0:',
    options: [
      { id: 'A', latex: '-3', isCorrect: false },
      { id: 'B', latex: '3', isCorrect: false },
      { id: 'C', latex: '-27', isCorrect: true },
      { id: 'D', latex: '27', isCorrect: false }
    ],
    explanation: '1/3 x + y = -1 => x + 3y = -3. Ta có A = (x + 3y)³ = (-3)³ = -27.',
    hint: 'Nhân 3 hai vế để có x + 3y = -3, sau đó tính (x + 3y)³'
  },

  // --- MỨC ĐỘ VẬN DỤNG CAO (VDC) ---
  {
    id: 'hdt45_vdc_19',
    identityId: 4,
    difficulty: 'VDC',
    group: '45',
    questionLatex: 'P = a^3 + b^3 + c^3 - 3abc \\quad (a + b + c = 0)',
    questionText: 'Với mọi a, b, c thỏa mãn a + b + c = 0, giá trị của biểu thức P là:',
    options: [
      { id: 'A', latex: '-3', isCorrect: false },
      { id: 'B', latex: '-1', isCorrect: false },
      { id: 'C', latex: '0', isCorrect: true },
      { id: 'D', latex: '3', isCorrect: false }
    ],
    explanation: 'Hằng đẳng thức mở rộng: a³ + b³ + c³ - 3abc = (a + b + c)(a² + b² + c² - ab - bc - ca). Vì a + b + c = 0 nên P = 0.',
    hint: 'HĐT Euler: a³ + b³ + c³ - 3abc = (a+b+c)(a²+b²+c²-ab-bc-ca)'
  },
  {
    id: 'hdt45_vdc_20',
    identityId: 4,
    difficulty: 'VDC',
    group: '45',
    questionLatex: 'A = n^3 + (n + 1)^3 + (n + 2)^3 \\quad (n \\in \\mathbb{Z})',
    questionText: 'Cho biểu thức A với mọi n thuộc Z. Khẳng định nào sau đây đúng?',
    options: [
      { id: 'A', latex: '\\text{A không chia hết cho cả 3 và 9}', isCorrect: false },
      { id: 'B', latex: '\\text{A chia hết cho 3 và không chia hết cho 9}', isCorrect: false },
      { id: 'C', latex: '\\text{A chia hết cho cả 3 và 9}', isCorrect: true },
      { id: 'D', latex: '\\text{A là số nguyên tố}', isCorrect: false }
    ],
    explanation: 'A = 3n³ + 9n² + 15n + 9 = 3n(n² - 1) + 18n + 9(n² + 1) = 3(n-1)n(n+1) + 9(n² + 2n + 1). Vì (n-1)n(n+1) chia hết cho 3 nên 3(n-1)n(n+1) chia hết cho 9 => A chia hết cho 9 với mọi n.',
    hint: 'Tích 3 số nguyên liên tiếp luôn chia hết cho 3'
  },

  // ==========================================
  // NHÓM 3: HẰNG ĐẲNG THỨC 6, 7 (TỔNG & HIỆU LẬP PHƯƠNG)
  // ==========================================

  // --- MỨC ĐỘ NHẬN BIẾT (NB) ---
  {
    id: 'hdt67_nb_1',
    identityId: 6,
    difficulty: 'NB',
    group: '67',
    questionLatex: 'x^3 + 125 = (x + 5)(x^2 + [\\dots] + 25)',
    questionText: 'Điền đơn thức thích hợp vào chỗ trống:',
    options: [
      { id: 'A', latex: '5x', isCorrect: false },
      { id: 'B', latex: '-5x', isCorrect: true },
      { id: 'C', latex: '10x', isCorrect: false },
      { id: 'D', latex: '-10x', isCorrect: false }
    ],
    explanation: 'A³ + B³ = (A + B)(A² - AB + B²). Với A = x, B = 5 => -AB = -5x.',
    hint: 'Bình phương thiếu của hiệu mang dấu TRỪ: -AB = -5x'
  },
  {
    id: 'hdt67_nb_2',
    identityId: 7,
    difficulty: 'NB',
    group: '67',
    questionLatex: 'x^3 - 27 = \\ ?',
    questionText: 'Khai triển của x³ - 27 là:',
    options: [
      { id: 'A', latex: '(x - 3)(x^2 - 3x + 9)', isCorrect: false },
      { id: 'B', latex: '(x - 3)(x^2 + 3x + 9)', isCorrect: true },
      { id: 'C', latex: '(x - 3)(x^2 + 6x + 9)', isCorrect: false },
      { id: 'D', latex: '(x - 3)(x^2 - 6x + 9)', isCorrect: false }
    ],
    explanation: 'x³ - 3³ = (x - 3)(x² + 3x + 3²) = (x - 3)(x² + 3x + 9).',
    hint: 'Ngoặc đầu là (x - 3), ngoặc sau là dấu CỘNG: (x² + 3x + 9)'
  },
  {
    id: 'hdt67_nb_3',
    identityId: 6,
    difficulty: 'NB',
    group: '67',
    questionLatex: '\\text{Phát biểu HĐT 6}',
    questionText: 'Chọn phương án đúng nhất: "... bằng tích của tổng hai biểu thức với bình phương thiếu của hiệu hai biểu thức đó."',
    options: [
      { id: 'A', latex: '\\text{Hiệu hai bình phương}', isCorrect: false },
      { id: 'B', latex: '\\text{Hiệu hai lập phương}', isCorrect: false },
      { id: 'C', latex: '\\text{Tổng hai bình phương}', isCorrect: false },
      { id: 'D', latex: '\\text{Tổng hai lập phương}', isCorrect: true }
    ],
    explanation: 'A³ + B³ = (A + B)(A² - AB + B²) gọi là Tổng hai lập phương.',
    hint: 'Tích của "tổng" với "bình phương thiếu của hiệu" -> Tổng hai lập phương'
  },
  {
    id: 'hdt67_nb_4',
    identityId: 7,
    difficulty: 'NB',
    group: '67',
    questionLatex: '\\text{Phát biểu HĐT 7}',
    questionText: 'Điền vào các chỗ trống: "Hiệu hai lập phương bằng tích của [...] hai biểu thức với bình phương thiếu của [...] hai biểu thức đó."',
    options: [
      { id: 'A', latex: '\\text{tổng -- hiệu}', isCorrect: false },
      { id: 'B', latex: '\\text{tổng -- tổng}', isCorrect: false },
      { id: 'C', latex: '\\text{hiệu -- tổng}', isCorrect: true },
      { id: 'D', latex: '\\text{hiệu -- hiệu}', isCorrect: false }
    ],
    explanation: 'A³ - B³ = (A - B)(A² + AB + B²) = (hiệu) · (bình phương thiếu của tổng).',
    hint: '(A - B) là hiệu, (A² + AB + B²) là bình phương thiếu của tổng'
  },
  {
    id: 'hdt67_nb_5',
    identityId: 6,
    difficulty: 'NB',
    group: '67',
    questionLatex: '\\left(\\frac{y}{3} + 5\\right)\\left(\\frac{y^2}{9} - \\frac{5}{3}y + 25\\right) = \\frac{y^3}{27} + a',
    questionText: 'Tìm giá trị của a trong đẳng thức trên:',
    options: [
      { id: 'A', latex: '-5', isCorrect: false },
      { id: 'B', latex: '5', isCorrect: false },
      { id: 'C', latex: '125', isCorrect: true },
      { id: 'D', latex: '-125', isCorrect: false }
    ],
    explanation: '(y/3)³ + 5³ = y³/27 + 125 => a = 125.',
    hint: 'a = 5³ = 125'
  },
  {
    id: 'hdt67_nb_6',
    identityId: 7,
    difficulty: 'NB',
    group: '67',
    questionLatex: '(3x - 2)(9x^2 + 6x + 4) = \\ ?',
    questionText: 'Viết biểu thức trên dưới dạng hiệu:',
    options: [
      { id: 'A', latex: '27x^3 + 8', isCorrect: false },
      { id: 'B', latex: '27x^3 - 8', isCorrect: true },
      { id: 'C', latex: '27x^3 + 2', isCorrect: false },
      { id: 'D', latex: '27x^3 - 2', isCorrect: false }
    ],
    explanation: '(3x)³ - 2³ = 27x³ - 8.',
    hint: 'A = 3x, B = 2 => A³ - B³ = (3x)³ - 2³'
  },
  {
    id: 'hdt67_nb_7',
    identityId: 6,
    difficulty: 'NB',
    group: '67',
    questionLatex: '\\text{Chọn phương án SAI}',
    questionText: 'Trong các công thức dưới đây, khẳng định nào SAI?',
    options: [
      { id: 'A', latex: 'a^3 - b^3 = (a - b)^3 + 3ab(a - b)', isCorrect: false },
      { id: 'B', latex: 'a^3 - b^3 = (a - b)(a^2 + ab + b^2)', isCorrect: false },
      { id: 'C', latex: 'a^3 + b^3 = (a + b)^3 - 3ab(a + b)', isCorrect: false },
      { id: 'D', latex: 'a^3 + b^3 = (a + b)(a^2 + ab + b^2)', isCorrect: true }
    ],
    explanation: 'Công thức đúng là a³ + b³ = (a + b)(a² - ab + b²). Phương án D sai vì ghi +ab.',
    hint: 'Tổng hai lập phương phải đi với bình phương thiếu của hiệu (mang dấu trừ -ab)'
  },
  {
    id: 'hdt67_nb_8',
    identityId: 7,
    difficulty: 'NB',
    group: '67',
    questionLatex: 'x^m - 64y^n = (x^2 - 4y)(x^4 + 4x^2y + 16y^2)',
    questionText: 'Tổng của m và n trong hằng đẳng thức trên là:',
    options: [
      { id: 'A', latex: '2', isCorrect: false },
      { id: 'B', latex: '3', isCorrect: false },
      { id: 'C', latex: '6', isCorrect: false },
      { id: 'D', latex: '9', isCorrect: true }
    ],
    explanation: '(x²)³ - (4y)³ = x⁶ - 64y³ => m = 6, n = 3 => m + n = 6 + 3 = 9.',
    hint: 'm = 2 · 3 = 6 và n = 1 · 3 = 3'
  },

  // --- MỨC ĐỘ THÔNG HIỂU (TH) ---
  {
    id: 'hdt67_th_9',
    identityId: 7,
    difficulty: 'TH',
    group: '67',
    questionLatex: 'A = (x - 2y)(x^2 + 2xy + 4y^2) \\quad (x = 5, y = 3)',
    questionText: 'Tính giá trị của A tại x = 5 và y = 3:',
    options: [
      { id: 'A', latex: '98', isCorrect: false },
      { id: 'B', latex: '-98', isCorrect: false },
      { id: 'C', latex: '91', isCorrect: false },
      { id: 'D', latex: '-91', isCorrect: true }
    ],
    explanation: 'A = x³ - (2y)³ = 5³ - 8 · 3³ = 125 - 8 · 27 = 125 - 216 = -91.',
    hint: 'A = x³ - 8y³'
  },
  {
    id: 'hdt67_th_10',
    identityId: 6,
    difficulty: 'TH',
    group: '67',
    questionLatex: 'P = (x + 4)(x^2 - 4x + 16) - (64 - x^3) \\quad (x = -20)',
    questionText: 'Tính giá trị của biểu thức P khi x = -20:',
    options: [
      { id: 'A', latex: '16\\,000', isCorrect: false },
      { id: 'B', latex: '40', isCorrect: false },
      { id: 'C', latex: '-16\\,000', isCorrect: true },
      { id: 'D', latex: '-40', isCorrect: false }
    ],
    explanation: 'P = (x³ + 64) - (64 - x³) = 2x³. Tại x = -20: P = 2(-20)³ = 2(-8000) = -16 000.',
    hint: 'P = 2x³'
  },
  {
    id: 'hdt67_th_11',
    identityId: 6,
    difficulty: 'TH',
    group: '67',
    questionLatex: '(2x + 3)(4x^2 - 6x + 9) - 2(4x^3 - 1) = \\ ?',
    questionText: 'Với mọi x, giá trị của biểu thức trên bằng:',
    options: [
      { id: 'A', latex: '29', isCorrect: true },
      { id: 'B', latex: '-29', isCorrect: false },
      { id: 'C', latex: '25', isCorrect: false },
      { id: 'D', latex: '-25', isCorrect: false }
    ],
    explanation: '(8x³ + 27) - (8x³ - 2) = 27 + 2 = 29.',
    hint: '(2x + 3)(4x² - 6x + 9) = 8x³ + 27'
  },
  {
    id: 'hdt67_th_12',
    identityId: 6,
    difficulty: 'TH',
    group: '67',
    questionLatex: 'M = (x - y)(x^2 + xy + y^2) + (y^2 - y + 1)(1 + y) + 2y^3',
    questionText: 'Hệ số của y³ sau khi thu gọn đa thức M là:',
    options: [
      { id: 'A', latex: '4', isCorrect: false },
      { id: 'B', latex: '-4', isCorrect: false },
      { id: 'C', latex: '0', isCorrect: false },
      { id: 'D', latex: '2', isCorrect: true }
    ],
    explanation: 'M = (x³ - y³) + (y³ + 1) + 2y³ = x³ + 2y³ + 1 => Hệ số của y³ là 2.',
    hint: '-y³ + y³ + 2y³ = 2y³'
  },
  {
    id: 'hdt67_th_13',
    identityId: 6,
    difficulty: 'TH',
    group: '67',
    questionLatex: 'A = (x + y)^3 + x^3 \\quad (2x + y = 0)',
    questionText: 'Biết rằng 2x + y = 0. Biểu thức A đạt giá trị nào sau đây?',
    options: [
      { id: 'A', latex: '-1', isCorrect: false },
      { id: 'B', latex: '0', isCorrect: true },
      { id: 'C', latex: '2', isCorrect: false },
      { id: 'D', latex: '1', isCorrect: false }
    ],
    explanation: '2x + y = 0 => x + y = -x. Do đó A = (-x)³ + x³ = -x³ + x³ = 0.',
    hint: 'Thay (x + y) = -x vào biểu thức A'
  },
  {
    id: 'hdt67_th_14',
    identityId: 7,
    difficulty: 'TH',
    group: '67',
    questionLatex: 'M = 8(x - 1)(x^2 + x + 1) - (2x - 1)^3 + 7, \\ N = (x + 2)(x^2 - 2x + 4) - x(x - 1)^2 - 8',
    questionText: 'Khẳng định nào sau đây là đúng về mối quan hệ giữa M và N?',
    options: [
      { id: 'A', latex: 'M = -N', isCorrect: false },
      { id: 'B', latex: 'M = -6N', isCorrect: false },
      { id: 'C', latex: 'M = N', isCorrect: false },
      { id: 'D', latex: 'M = 6N', isCorrect: true }
    ],
    explanation: 'M = 8(x³ - 1) - (8x³ - 12x² + 6x - 1) + 7 = 12x² - 6x. N = (x³ + 8) - (x³ - 2x² + x) - 8 = 2x² - x. Suy ra M = 6N.',
    hint: 'M = 12x² - 6x = 6(2x² - x) = 6N'
  },

  // --- MỨC ĐỘ VẬN DỤNG (VD) ---
  {
    id: 'hdt67_vd_15',
    identityId: 7,
    difficulty: 'VD',
    group: '67',
    questionLatex: '(1 - x)(1 + x + x^2) + x(x^2 - 5) = 11',
    questionText: 'Giá trị nào của x thỏa mãn phương trình trên?',
    options: [
      { id: 'A', latex: '2', isCorrect: false },
      { id: 'B', latex: '\\frac{1}{2}', isCorrect: false },
      { id: 'C', latex: '-\\frac{1}{2}', isCorrect: false },
      { id: 'D', latex: '-2', isCorrect: true }
    ],
    explanation: '(1 - x³) + (x³ - 5x) = 11 => 1 - 5x = 11 => -5x = 10 => x = -2.',
    hint: '1 - x³ + x³ - 5x = 11'
  },
  {
    id: 'hdt67_vd_16',
    identityId: 7,
    difficulty: 'VD',
    group: '67',
    questionLatex: 'A = a^3 - b^3 \\quad (a = b + 5, \\ ab = -3)',
    questionText: 'Tính giá trị của A với a = b + 5 và ab = -3:',
    options: [
      { id: 'A', latex: '170', isCorrect: false },
      { id: 'B', latex: '80', isCorrect: true },
      { id: 'C', latex: '-170', isCorrect: false },
      { id: 'D', latex: '-80', isCorrect: false }
    ],
    explanation: 'a - b = 5. Ta có a³ - b³ = (a - b)³ + 3ab(a - b) = 5³ + 3(-3)(5) = 125 - 45 = 80.',
    hint: 'Sử dụng biến đổi: a³ - b³ = (a - b)³ + 3ab(a - b)'
  },
  {
    id: 'hdt67_vd_17',
    identityId: 6,
    difficulty: 'VD',
    group: '67',
    questionLatex: '\\frac{35^3 + 13^3}{48} - 35 \\cdot 13 = \\ ?',
    questionText: 'Tính nhanh kết quả của phép tính trên:',
    options: [
      { id: 'A', latex: '22', isCorrect: false },
      { id: 'B', latex: '48', isCorrect: false },
      { id: 'C', latex: '484', isCorrect: true },
      { id: 'D', latex: '2304', isCorrect: false }
    ],
    explanation: '(35 + 13)(35² - 35·13 + 13²)/48 - 35·13 = (35² - 35·13 + 13²) - 35·13 = 35² - 2·35·13 + 13² = (35 - 13)² = 22² = 484.',
    hint: '35 + 13 = 48 rút gọn mẫu số, biểu thức trở thành (35 - 13)²'
  },
  {
    id: 'hdt67_vd_18',
    identityId: 7,
    difficulty: 'VD',
    group: '67',
    questionLatex: 'M = x^2 + 2x - (2 + x)(4 - 2x + x^2) + x^3',
    questionText: 'Với giá trị nào của x thì biểu thức M đạt giá trị nhỏ nhất?',
    options: [
      { id: 'A', latex: '-1', isCorrect: true },
      { id: 'B', latex: '0', isCorrect: false },
      { id: 'C', latex: '1', isCorrect: false },
      { id: 'D', latex: '-9', isCorrect: false }
    ],
    explanation: 'M = x² + 2x - (8 + x³) + x³ = x² + 2x - 8 = (x + 1)² - 9 >= -9. Đạt GTNN là -9 khi x = -1.',
    hint: 'M = (x + 1)² - 9 => đạt min khi x = -1'
  },

  // --- MỨC ĐỘ VẬN DỤNG CAO (VDC) ---
  {
    id: 'hdt67_vdc_19',
    identityId: 6,
    difficulty: 'VDC',
    group: '67',
    questionLatex: 'x^3 + y^3 \\quad (x + y = m, \\ x^2 + y^2 = n)',
    questionText: 'Nếu x + y = m và x² + y² = n thì x³ + y³ bằng:',
    options: [
      { id: 'A', latex: '\\frac{-m^3 - 3mn}{2}', isCorrect: false },
      { id: 'B', latex: '\\frac{-m^3 + 3mn}{2}', isCorrect: true },
      { id: 'C', latex: '\\frac{m^3 - 3mn}{2}', isCorrect: false },
      { id: 'D', latex: '\\frac{m^3 + 3mn}{2}', isCorrect: false }
    ],
    explanation: '2xy = (x + y)² - (x² + y²) = m² - n => xy = (m² - n)/2. Khi đó x³ + y³ = (x + y)(x² - xy + y²) = m[n - (m² - n)/2] = m(3n - m²)/2 = (-m³ + 3mn)/2.',
    hint: 'Tính xy theo m và n, sau đó thay vào x³ + y³ = (x+y)(x² - xy + y²)'
  },
  {
    id: 'hdt67_vdc_20',
    identityId: 6,
    difficulty: 'VDC',
    group: '67',
    questionLatex: 'A = 22^3 + 23^3 + 24^3 + \\dots + 87^3 + 88^3 \\pmod{110}',
    questionText: 'Số dư trong phép chia biểu thức A cho 110 là:',
    options: [
      { id: 'A', latex: '44', isCorrect: false },
      { id: 'B', latex: '0', isCorrect: true },
      { id: 'C', latex: '1', isCorrect: false },
      { id: 'D', latex: '55', isCorrect: false }
    ],
    explanation: 'Ghép cặp đối xứng: a³ + b³ = (a + b)(a² - ab + b²). Ta có 22 + 88 = 110 chia hết cho 110, 23 + 87 = 110 chia hết cho 110, ... Các cặp đều chia hết cho 110 nên số dư là 0.',
    hint: 'Ghép các cặp có tổng bằng 110: 22³ + 88³ = (22+88)(...) chia hết cho 110'
  }
];

export const FILL_BLANK_QUESTIONS: FillBlankQuestion[] = [
  {
    id: 'fb1',
    prompt: 'Khai triển bình phương của một tổng:',
    fullEquationLatex: '(x + 2)^2 = x^2 + 4x + 4',
    displayTemplateLatex: '(x + 2)^2 = x^2 + [BLANK1] + 4',
    blanks: [
      { id: 'BLANK1', correctAnswer: '4x', displayLatex: '4x' }
    ],
    optionsPool: ['2x', '4x', '8x', '2', '4', 'x^2'],
    identityId: 1,
    explanation: '2 · A · B = 2 · x · 2 = 4x.'
  },
  {
    id: 'fb2',
    prompt: 'Hiệu hai bình phương thành nhân tử:',
    fullEquationLatex: 'x^2 - 16 = (x - 4)(x + 4)',
    displayTemplateLatex: 'x^2 - [BLANK1] = (x - 4)(x + 4)',
    blanks: [
      { id: 'BLANK1', correctAnswer: '16', displayLatex: '16' }
    ],
    optionsPool: ['4', '8', '16', '2', 'x', '32'],
    identityId: 3,
    explanation: '(x - 4)(x + 4) = x² - 4² = x² - 16.'
  },
  {
    id: 'fb3',
    prompt: 'Lập phương của một hiệu:',
    fullEquationLatex: '(x - 2)^3 = x^3 - 6x^2 + 12x - 8',
    displayTemplateLatex: '(x - 2)^3 = x^3 - [BLANK1] + 12x - 8',
    blanks: [
      { id: 'BLANK1', correctAnswer: '6x^2', displayLatex: '6x^2' }
    ],
    optionsPool: ['2x^2', '4x^2', '6x^2', '8x^2', '3x^2'],
    identityId: 5,
    explanation: '3 · A² · B = 3 · x² · 2 = 6x².'
  },
  {
    id: 'fb4',
    prompt: 'Tổng hai lập phương:',
    fullEquationLatex: 'x^3 + 125 = (x + 5)(x^2 - 5x + 25)',
    displayTemplateLatex: 'x^3 + 125 = (x + 5)(x^2 + [BLANK1] + 25)',
    blanks: [
      { id: 'BLANK1', correctAnswer: '-5x', displayLatex: '-5x' }
    ],
    optionsPool: ['5x', '-5x', '10x', '-10x', '25x'],
    identityId: 6,
    explanation: 'A³ + B³ = (A + B)(A² - AB + B²). Ở đây -AB = -5x.'
  },
  {
    id: 'fb5',
    prompt: 'Khai triển hằng đẳng thức bậc 3:',
    fullEquationLatex: 'x^3 + 12x^2 + 48x + 64 = (x + 4)^3',
    displayTemplateLatex: 'x^3 + [BLANK1] + 48x + [BLANK2] = (x + 4)^3',
    blanks: [
      { id: 'BLANK1', correctAnswer: '12x^2', displayLatex: '12x^2' },
      { id: 'BLANK2', correctAnswer: '64', displayLatex: '64' }
    ],
    optionsPool: ['12x^2', '6x^2', '64', '16', '48x^2', '8'],
    identityId: 4,
    explanation: '3 · x² · 4 = 12x² và 4³ = 64.'
  },
  {
    id: 'fb6',
    prompt: 'Thu gọn dạng bình phương của một tổng:',
    fullEquationLatex: 'x^2 + x + \\frac{1}{4} = \\left(x + \\frac{1}{2}\\right)^2',
    displayTemplateLatex: 'x^2 + [BLANK1] + \\frac{1}{4} = \\left(x + [BLANK2]\\right)^2',
    blanks: [
      { id: 'BLANK1', correctAnswer: 'x', displayLatex: 'x' },
      { id: 'BLANK2', correctAnswer: '\\frac{1}{2}', displayLatex: '\\frac{1}{2}' }
    ],
    optionsPool: ['x', '2x', '\\frac{1}{2}', '\\frac{1}{4}', '4x', '1'],
    identityId: 1,
    explanation: 'B = 1/2 thì 2AB = 2 · x · 1/2 = x.'
  }
];

export const MEMORY_CARD_PAIRS = [
  { id: 'p1', left: '(A + B)^2', right: 'A^2 + 2AB + B^2', label: 'Bình phương một tổng' },
  { id: 'p2', left: '(A - B)^2', right: 'A^2 - 2AB + B^2', label: 'Bình phương một hiệu' },
  { id: 'p3', left: 'A^2 - B^2', right: '(A - B)(A + B)', label: 'Hiệu hai bình phương' },
  { id: 'p4', left: '(A + B)^3', right: 'A^3 + 3A^2B + 3AB^2 + B^3', label: 'Lập phương một tổng' },
  { id: 'p5', left: '(A - B)^3', right: 'A^3 - 3A^2B + 3AB^2 - B^3', label: 'Lập phương một hiệu' },
  { id: 'p6', left: 'A^3 + B^3', right: '(A + B)(A^2 - AB + B^2)', label: 'Tổng hai lập phương' },
  { id: 'p7', left: 'A^3 - B^3', right: '(A - B)(A^2 + AB + B^2)', label: 'Hiệu hai lập phương' },
  { id: 'p8', left: '(x + 5y)^2', right: 'x^2 + 10xy + 25y^2', label: 'Ví dụ HĐT 1' },
  { id: 'p9', left: '(2x - 4y)^2', right: '4x^2 - 16xy + 16y^2', label: 'Ví dụ HĐT 2' },
  { id: 'p10', left: 'x^4 - 16y^2', right: '(x^2 - 4y)(x^2 + 4y)', label: 'Ví dụ HĐT 3' },
  { id: 'p11', left: '(x + 3)^3', right: 'x^3 + 9x^2 + 27x + 27', label: 'Ví dụ HĐT 4' },
  { id: 'p12', left: '27x^3 - 8', right: '(3x - 2)(9x^2 + 6x + 4)', label: 'Ví dụ HĐT 7' }
];

export const BLOCK_BUILDER_LEVELS = [
  {
    id: 'lvl1',
    targetExpressionLatex: 'x^2 + 10xy + 25y^2',
    instruction: 'Lắp ghép biểu thức thành dạng bình phương đúng:',
    availableBlocks: ['(', 'x', '+', '5y', ')', '^2', '-', '25y', '10x'],
    correctSequence: ['(', 'x', '+', '5y', ')', '^2'],
    explanation: 'x² + 10xy + 25y² = (x + 5y)².'
  },
  {
    id: 'lvl2',
    targetExpressionLatex: '4x^2 - 16xy + 16y^2',
    instruction: 'Lắp ghép thành bình phương của một hiệu:',
    availableBlocks: ['(', '2x', '-', '4y', ')', '^2', '+', '16y', '4x'],
    correctSequence: ['(', '2x', '-', '4y', ')', '^2'],
    explanation: '4x² - 16xy + 16y² = (2x - 4y)².'
  },
  {
    id: 'lvl3',
    targetExpressionLatex: 'x^4 - 16y^2',
    instruction: 'Phân tích đa thức thành nhân tử (Hiệu x Tổng):',
    availableBlocks: ['(', 'x^2', '-', '4y', ')', '(', 'x^2', '+', '4y', ')', '^2'],
    correctSequence: ['(', 'x^2', '-', '4y', ')', '(', 'x^2', '+', '4y', ')'],
    explanation: 'x⁴ - 16y² = (x² - 4y)(x² + 4y).'
  },
  {
    id: 'lvl4',
    targetExpressionLatex: 'x^3 + 9x^2 + 27x + 27',
    instruction: 'Lắp ghép thành lập phương của một tổng:',
    availableBlocks: ['(', 'x', '+', '3', ')', '^3', '-', '9', '^2'],
    correctSequence: ['(', 'x', '+', '3', ')', '^3'],
    explanation: 'x³ + 9x² + 27x + 27 = (x + 3)³.'
  },
  {
    id: 'lvl5',
    targetExpressionLatex: '27x^3 - 8',
    instruction: 'Phân tích hiệu hai lập phương thành nhân tử:',
    availableBlocks: ['(', '3x', '-', '2', ')', '(', '9x^2', '+', '6x', '+', '4', ')'],
    correctSequence: ['(', '3x', '-', '2', ')', '(', '9x^2', '+', '6x', '+', '4', ')'],
    explanation: '27x³ - 8 = (3x - 2)(9x² + 6x + 4).'
  }
];

export const BOSS_LIST: BossMonster[] = [
  {
    id: 'boss_1',
    name: 'Quái Thú Bình Phương',
    title: 'Tầng 1: Đền Thờ Bình Phương Bậc 2',
    avatar: '🐲',
    maxHp: 100,
    currentHp: 100,
    identityFocus: [1, 2, 3],
    dialogueIntro: 'Ngươi muốn vượt qua tầng 1? Hãy giải mã bình phương của một tổng và hiệu trước đã!',
    dialogueDefeated: 'Không thể nào! Ngươi nắm quá rõ (A±B)² và A²-B²...',
    attackPower: 15,
    bgGradient: 'from-blue-900 via-indigo-900 to-slate-950'
  },
  {
    id: 'boss_2',
    name: 'Lãnh Chúa Khối Lập Phương',
    title: 'Tầng 2: Vực Thẳm Lập Phương Bậc 3',
    avatar: '🧊',
    maxHp: 120,
    currentHp: 120,
    identityFocus: [4, 5],
    dialogueIntro: 'Hệ số 1 - 3 - 3 - 1 của ta sẽ nghiền nát ngươi!',
    dialogueDefeated: 'Ngươi đã làm chủ được (A+B)³ và (A-B)³ siêu đẳng!',
    attackPower: 20,
    bgGradient: 'from-purple-900 via-pink-900 to-slate-950'
  },
  {
    id: 'boss_3',
    name: 'Ma Tướng Lập Phương Thiếu',
    title: 'Tầng 3: Điện Thờ Tổng & Hiệu Lập Phương',
    avatar: '⚡',
    maxHp: 150,
    currentHp: 150,
    identityFocus: [6, 7],
    dialogueIntro: 'Hãy cẩn thận dấu của bình phương thiếu (A² ± AB + B²)!',
    dialogueDefeated: 'Tuyệt vời! Ngươi không hề bị mắc bẫy dấu của ta!',
    attackPower: 25,
    bgGradient: 'from-amber-900 via-orange-900 to-slate-950'
  },
  {
    id: 'boss_4',
    name: 'Cự Thần Vận Dụng Toán Học',
    title: 'Tầng 4: Đấu Trường Tính Nhanh & Rút Gọn',
    avatar: '🗿',
    maxHp: 180,
    currentHp: 180,
    identityFocus: [1, 2, 3, 4, 5, 6, 7],
    dialogueIntro: 'Ngươi có đủ tốc độ để tính nhanh 999²x + 1998x + x hay 305 · 295?',
    dialogueDefeated: 'Tốc độ biến đổi đại số của ngươi vượt xa ta!',
    attackPower: 30,
    bgGradient: 'from-emerald-900 via-teal-900 to-slate-950'
  },
  {
    id: 'boss_5',
    name: 'Đại Ma Vương Hằng Đẳng Thức Tối Cao',
    title: 'Tầng 5: Đỉnh Tháp Huyền Thoại',
    avatar: '👑',
    maxHp: 220,
    currentHp: 220,
    identityFocus: [1, 2, 3, 4, 5, 6, 7],
    dialogueIntro: 'Ta là trùm cuối! Các bài toán VDC và hằng đẳng thức mở rộng sẽ thử thách giới hạn của ngươi!',
    dialogueDefeated: 'Tâm phục khẩu phục! Ngươi chính thức là Kiện Tướng Hằng Đẳng Thức Đáng Nhớ!',
    attackPower: 35,
    bgGradient: 'from-rose-950 via-red-950 to-slate-950'
  }
];

export const BADGES: Badge[] = [
  { id: 'first_quiz', title: 'Tập Sự Đại Số', description: 'Hoàn thành câu hỏi đầu tiên trong đấu trường', icon: '🌱', unlocked: false, requiredExp: 50 },
  { id: 'speed_master', title: 'Thần Tốc 60 Giây', description: 'Đạt trên 200 điểm trong chế độ Đua Tốc Độ', icon: '⚡', unlocked: false, requiredExp: 200 },
  { id: 'boss_slayer_1', title: 'Dũng Sĩ Leo Tháp', description: 'Đánh bại Boss Tầng 1 (Quái Thú Bình Phương)', icon: '🛡️', unlocked: false, requiredExp: 350 },
  { id: 'boss_slayer_5', title: 'Vua Hằng Đẳng Thức', description: 'Phá đảo toàn bộ 5 tầng Tháp Boss', icon: '👑', unlocked: false, requiredExp: 1000 },
  { id: 'memory_ace', title: 'Trí Nhớ Siêu Phàm', description: 'Hoàn thành bàn Lật thẻ ghép đôi độ khó 16 thẻ', icon: '🧠', unlocked: false, requiredExp: 500 },
  { id: 'streak_3', title: 'Chăm Chỉ Vô Song', description: 'Duy trì chuỗi học tập 3 ngày liên tục', icon: '🔥', unlocked: false },
  { id: 'perfect_mastery', title: 'Đại Sư 7 HĐT', description: 'Thuần thục chính xác cả 7 Hằng Đẳng Thức', icon: '⭐', unlocked: false, requiredExp: 800 },
  { id: 'vdc_champion', title: 'Chiến Binh Vận Dụng Cao', description: 'Giải đúng các câu hỏi Vận dụng cao (VDC)', icon: '💎', unlocked: false, requiredExp: 1200 }
];
