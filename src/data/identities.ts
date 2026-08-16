import { IdentityItem } from '../types/math';

export const SEVEN_IDENTITIES: IdentityItem[] = [
  {
    id: 1,
    name: 'Bình phương của một tổng',
    nameEn: 'Square of a Sum',
    formulaLatex: '(A + B)^2 = A^2 + 2AB + B^2',
    leftSideLatex: '(A + B)^2',
    rightSideLatex: 'A^2 + 2AB + B^2',
    verbalVietnamese: 'Bình phương của một tổng hai biểu thức bằng bình phương biểu thức thứ nhất, cộng với hai lần tích của biểu thức thứ nhất và biểu thức thứ hai, cộng với bình phương biểu thức thứ hai.',
    mnemonicTip: 'Mọi dấu đều là dấu DƯƠNG (+). Nhớ nhân số 2 ở giữa (2AB)!',
    commonPitfall: 'Rất nhiều bạn quên mất số hạng 2AB ở giữa và viết nhầm thành (A + B)^2 = A^2 + B^2 (SAI!).',
    category: 'square',
    geometryDescription: 'Hình vuông cạnh (a + b) được chia thành 4 phần: 1 hình vuông a², 1 hình vuông b² và 2 hình chữ nhật có diện tích ab.',
    examples: [
      {
        problemLatex: '(x + 3)^2',
        identifyAB: 'A = x, B = 3',
        steps: [
          { desc: 'Áp dụng công thức (A + B)² = A² + 2AB + B²', latex: 'A^2 + 2AB + B^2' },
          { desc: 'Thay A = x, B = 3', latex: 'x^2 + 2 \\cdot x \\cdot 3 + 3^2' },
          { desc: 'Tính các tích và lũy thừa', latex: 'x^2 + 6x + 9' }
        ],
        resultLatex: 'x^2 + 6x + 9'
      },
      {
        problemLatex: '(2x + 5y)^2',
        identifyAB: 'A = 2x, B = 5y',
        steps: [
          { desc: 'Khai triển', latex: '(2x)^2 + 2 \\cdot (2x) \\cdot (5y) + (5y)^2' },
          { desc: 'Tính toán lũy thừa hệ số', latex: '4x^2 + 20xy + 25y^2' }
        ],
        resultLatex: '4x^2 + 20xy + 25y^2'
      },
      {
        problemLatex: '51^2',
        identifyAB: 'A = 50, B = 1',
        steps: [
          { desc: 'Tách số tính nhanh', latex: '(50 + 1)^2 = 50^2 + 2 \\cdot 50 \\cdot 1 + 1^2' },
          { desc: 'Cộng nhẩm', latex: '2500 + 100 + 1 = 2601' }
        ],
        resultLatex: '2601'
      }
    ]
  },
  {
    id: 2,
    name: 'Bình phương của một hiệu',
    nameEn: 'Square of a Difference',
    formulaLatex: '(A - B)^2 = A^2 - 2AB + B^2',
    leftSideLatex: '(A - B)^2',
    rightSideLatex: 'A^2 - 2AB + B^2',
    verbalVietnamese: 'Bình phương của một hiệu hai biểu thức bằng bình phương biểu thức thứ nhất, trừ đi hai lần tích của biểu thức thứ nhất và biểu thức thứ hai, cộng với bình phương biểu thức thứ hai.',
    mnemonicTip: 'Dấu trừ chỉ xuất hiện ở 2AB (-2AB), còn B² luôn mang dấu CỘNG (+B²)! Đặc biệt: (A - B)² = (B - A)²',
    commonPitfall: 'Viết nhầm -B² ở cuối. Hãy nhớ bình phương của số âm hay dương luôn là số không âm.',
    category: 'square',
    geometryDescription: 'Hình vuông cạnh (a - b) có diện tích bằng diện tích hình vuông lớn a² trừ đi 2 hình chữ nhật ab rồi bù lại phần giao nhau b².',
    examples: [
      {
        problemLatex: '(x - 4)^2',
        identifyAB: 'A = x, B = 4',
        steps: [
          { desc: 'Áp dụng (A - B)² = A² - 2AB + B²', latex: 'x^2 - 2 \\cdot x \\cdot 4 + 4^2' },
          { desc: 'Thu gọn', latex: 'x^2 - 8x + 16' }
        ],
        resultLatex: 'x^2 - 8x + 16'
      },
      {
        problemLatex: '(3x - 2y)^2',
        identifyAB: 'A = 3x, B = 2y',
        steps: [
          { desc: 'Khai triển', latex: '(3x)^2 - 2 \\cdot (3x) \\cdot (2y) + (2y)^2' },
          { desc: 'Thu gọn', latex: '9x^2 - 12xy + 4y^2' }
        ],
        resultLatex: '9x^2 - 12xy + 4y^2'
      },
      {
        problemLatex: '49^2',
        identifyAB: 'A = 50, B = 1',
        steps: [
          { desc: 'Tách tính nhanh', latex: '(50 - 1)^2 = 50^2 - 2 \\cdot 50 \\cdot 1 + 1^2' },
          { desc: 'Tính toán', latex: '2500 - 100 + 1 = 2401' }
        ],
        resultLatex: '2401'
      }
    ]
  },
  {
    id: 3,
    name: 'Hiệu hai bình phương',
    nameEn: 'Difference of Two Squares',
    formulaLatex: 'A^2 - B^2 = (A - B)(A + B)',
    leftSideLatex: 'A^2 - B^2',
    rightSideLatex: '(A - B)(A + B)',
    verbalVietnamese: 'Hiệu hai bình phương của hai biểu thức bằng tích của hiệu hai biểu thức đó và tổng của hai biểu thức đó.',
    mnemonicTip: 'Được mệnh danh là "Vua phân tích nhân tử" - Rất ngắn gọn: một ngoặc TRỪ nhân một ngoặc CỘNG.',
    commonPitfall: 'Dễ nhầm giữa Hiệu hai bình phương A² - B² với Bình phương của một hiệu (A - B)². Hai biểu thức này hoàn toàn khác nhau!',
    category: 'square',
    geometryDescription: 'Cắt một hình vuông nhỏ cạnh b ra khỏi hình vuông lớn cạnh a, phần còn lại ghép thành hình chữ nhật có kích thước (a - b) x (a + b).',
    examples: [
      {
        problemLatex: 'x^2 - 25',
        identifyAB: 'A = x, B = 5',
        steps: [
          { desc: 'Viết về dạng bình phương', latex: 'x^2 - 5^2' },
          { desc: 'Phân tích thành tích', latex: '(x - 5)(x + 5)' }
        ],
        resultLatex: '(x - 5)(x + 5)'
      },
      {
        problemLatex: '(2x - 3)(2x + 3)',
        identifyAB: 'A = 2x, B = 3',
        steps: [
          { desc: 'Thu gọn theo chiều ngược lại', latex: '(2x)^2 - 3^2' },
          { desc: 'Tính lũy thừa', latex: '4x^2 - 9' }
        ],
        resultLatex: '4x^2 - 9'
      },
      {
        problemLatex: '105 \\cdot 95',
        identifyAB: 'A = 100, B = 5',
        steps: [
          { desc: 'Biến đổi về hằng đẳng thức', latex: '(100 + 5)(100 - 5) = 100^2 - 5^2' },
          { desc: 'Tính nhanh', latex: '10000 - 25 = 9975' }
        ],
        resultLatex: '9975'
      }
    ]
  },
  {
    id: 4,
    name: 'Lập phương của một tổng',
    nameEn: 'Cube of a Sum',
    formulaLatex: '(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3',
    leftSideLatex: '(A + B)^3',
    rightSideLatex: 'A^3 + 3A^2B + 3AB^2 + B^3',
    verbalVietnamese: 'Lập phương của một tổng hai biểu thức bằng lập phương biểu thức thứ nhất, cộng ba lần tích bình phương biểu thức thứ nhất với biểu thức thứ hai, cộng ba lần tích biểu thức thứ nhất với bình phương biểu thức thứ hai, cộng lập phương biểu thức thứ hai.',
    mnemonicTip: 'Hệ số Pascal 1 - 3 - 3 - 1. Số mũ của A giảm dần (3, 2, 1, 0) còn số mũ của B tăng dần (0, 1, 2, 3).',
    commonPitfall: 'Quên hệ số 3 ở các số hạng giữa, hoặc viết nhầm (A+B)³ = A³ + B³ (SAI NGHIÊM TRỌNG!).',
    category: 'cube',
    geometryDescription: 'Khối lập phương kích thước (a + b)³ được rã thành: 1 khối a³, 3 khối a²b, 3 khối ab² và 1 khối b³.',
    examples: [
      {
        problemLatex: '(x + 2)^3',
        identifyAB: 'A = x, B = 2',
        steps: [
          { desc: 'Áp dụng công thức', latex: 'x^3 + 3 \\cdot x^2 \\cdot 2 + 3 \\cdot x \\cdot 2^2 + 2^3' },
          { desc: 'Tính các tích và lũy thừa', latex: 'x^3 + 6x^2 + 12x + 8' }
        ],
        resultLatex: 'x^3 + 6x^2 + 12x + 8'
      },
      {
        problemLatex: '(2x + y)^3',
        identifyAB: 'A = 2x, B = y',
        steps: [
          { desc: 'Khai triển', latex: '(2x)^3 + 3(2x)^2(y) + 3(2x)(y)^2 + y^3' },
          { desc: 'Tính toán hệ số', latex: '8x^3 + 12x^2y + 6xy^2 + y^3' }
        ],
        resultLatex: '8x^3 + 12x^2y + 6xy^2 + y^3'
      }
    ]
  },
  {
    id: 5,
    name: 'Lập phương của một hiệu',
    nameEn: 'Cube of a Difference',
    formulaLatex: '(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3',
    leftSideLatex: '(A - B)^3',
    rightSideLatex: 'A^3 - 3A^2B + 3AB^2 - B^3',
    verbalVietnamese: 'Lập phương của một hiệu hai biểu thức bằng lập phương biểu thức thứ nhất, trừ ba lần tích bình phương biểu thức thứ nhất với biểu thức thứ hai, cộng ba lần tích biểu thức thứ nhất với bình phương biểu thức thứ hai, trừ lập phương biểu thức thứ hai.',
    mnemonicTip: 'Quy luật dấu ĐAN XEN: DƯƠNG (+) rồi đến ÂM (-) rồi đến DƯƠNG (+) rồi đến ÂM (-). [ +  -  +  - ]',
    commonPitfall: 'Nhầm dấu ở 3AB² thành âm. Hãy nhớ (-B)² = +B² nên số hạng chứa B² sẽ có dấu DƯƠNG (+).',
    category: 'cube',
    geometryDescription: 'Thể tích khối lập phương lớn trừ đi các phần cắt bớt và bù thể tích giao cắt.',
    examples: [
      {
        problemLatex: '(x - 1)^3',
        identifyAB: 'A = x, B = 1',
        steps: [
          { desc: 'Áp dụng công thức dấu đan xen (+ - + -)', latex: 'x^3 - 3 \\cdot x^2 \\cdot 1 + 3 \\cdot x \\cdot 1^2 - 1^3' },
          { desc: 'Thu gọn', latex: 'x^3 - 3x^2 + 3x - 1' }
        ],
        resultLatex: 'x^3 - 3x^2 + 3x - 1'
      },
      {
        problemLatex: '(2x - 3)^3',
        identifyAB: 'A = 2x, B = 3',
        steps: [
          { desc: 'Khai triển', latex: '(2x)^3 - 3(2x)^2(3) + 3(2x)(3^2) - 3^3' },
          { desc: 'Tính hệ số', latex: '8x^3 - 36x^2 + 54x - 27' }
        ],
        resultLatex: '8x^3 - 36x^2 + 54x - 27'
      }
    ]
  },
  {
    id: 6,
    name: 'Tổng hai lập phương',
    nameEn: 'Sum of Two Cubes',
    formulaLatex: 'A^3 + B^3 = (A + B)(A^2 - AB + B^2)',
    leftSideLatex: 'A^3 + B^3',
    rightSideLatex: '(A + B)(A^2 - AB + B^2)',
    verbalVietnamese: 'Tổng hai lập phương của hai biểu thức bằng tích của tổng hai biểu thức đó và bình phương thiếu của hiệu hai biểu thức đó.',
    mnemonicTip: 'Ngoặc đầu mang dấu CỘNG (A + B). Ngoặc sau là "Bình phương thiếu của một hiệu" (A² - AB + B² - không có số 2 ở giữa!).',
    commonPitfall: 'Viết nhầm -2AB ở ngoặc thứ hai. Lưu ý: Chỉ là -AB chứ KHÔNG PHẢI -2AB!',
    category: 'cube',
    geometryDescription: 'Tổng thể tích hai khối hộp lập phương quy về tích diện tích đáy và chiều cao sau khi ghép.',
    examples: [
      {
        problemLatex: 'x^3 + 8',
        identifyAB: 'A = x, B = 2 (vì 8 = 2³)',
        steps: [
          { desc: 'Viết về dạng tổng 2 lập phương', latex: 'x^3 + 2^3' },
          { desc: 'Áp dụng A³ + B³ = (A + B)(A² - AB + B²)', latex: '(x + 2)(x^2 - x \\cdot 2 + 2^2)' },
          { desc: 'Thu gọn', latex: '(x + 2)(x^2 - 2x + 4)' }
        ],
        resultLatex: '(x + 2)(x^2 - 2x + 4)'
      },
      {
        problemLatex: '27x^3 + y^3',
        identifyAB: 'A = 3x, B = y',
        steps: [
          { desc: 'Viết dạng lập phương', latex: '(3x)^3 + y^3' },
          { desc: 'Phân tích', latex: '(3x + y)((3x)^2 - (3x)(y) + y^2)' },
          { desc: 'Thu gọn', latex: '(3x + y)(9x^2 - 3xy + y^2)' }
        ],
        resultLatex: '(3x + y)(9x^2 - 3xy + y^2)'
      }
    ]
  },
  {
    id: 7,
    name: 'Hiệu hai lập phương',
    nameEn: 'Difference of Two Cubes',
    formulaLatex: 'A^3 - B^3 = (A - B)(A^2 + AB + B^2)',
    leftSideLatex: 'A^3 - B^3',
    rightSideLatex: '(A - B)(A^2 + AB + B^2)',
    verbalVietnamese: 'Hiệu hai lập phương của hai biểu thức bằng tích của hiệu hai biểu thức đó và bình phương thiếu của tổng hai biểu thức đó.',
    mnemonicTip: 'Ngoặc đầu mang dấu TRỪ (A - B). Ngoặc sau là "Bình phương thiếu của một tổng" TOÀN DẤU CỘNG (A² + AB + B²).',
    commonPitfall: 'Nhầm dấu ở ngoặc thứ hai thành -AB. Hãy nhớ: Nếu ngoặc 1 đã là (A - B) thì ngoặc 2 toàn bộ là CỘNG (+AB).',
    category: 'cube',
    geometryDescription: 'Hiệu thể tích rã thành khối lăng trụ ghép tích.',
    examples: [
      {
        problemLatex: 'x^3 - 27',
        identifyAB: 'A = x, B = 3 (vì 27 = 3³)',
        steps: [
          { desc: 'Viết về dạng hiệu 2 lập phương', latex: 'x^3 - 3^3' },
          { desc: 'Áp dụng A³ - B³ = (A - B)(A² + AB + B²)', latex: '(x - 3)(x^2 + x \\cdot 3 + 3^2)' },
          { desc: 'Thu gọn', latex: '(x - 3)(x^2 + 3x + 9)' }
        ],
        resultLatex: '(x - 3)(x^2 + 3x + 9)'
      },
      {
        problemLatex: '8x^3 - 125',
        identifyAB: 'A = 2x, B = 5',
        steps: [
          { desc: 'Viết dạng lập phương', latex: '(2x)^3 - 5^3' },
          { desc: 'Phân tích', latex: '(2x - 5)((2x)^2 + (2x)(5) + 5^2)' },
          { desc: 'Thu gọn', latex: '(2x - 5)(4x^2 + 10x + 25)' }
        ],
        resultLatex: '(2x - 5)(4x^2 + 10x + 25)'
      }
    ]
  }
];

export const EXTENDED_IDENTITIES = [
  {
    id: 8,
    name: 'Bình phương của một tổng 3 số hạng',
    formulaLatex: '(A + B + C)^2 = A^2 + B^2 + C^2 + 2AB + 2BC + 2CA',
    verbalVietnamese: 'Bằng tổng bình phương từng số cộng hai lần tất cả các tích đôi một.',
    tip: 'Áp dụng rất nhiều trong các bài toán cực trị, rút gọn nâng cao lớp 8 và 9.'
  },
  {
    id: 9,
    name: 'Biến đổi bổ trợ lập phương',
    formulaLatex: '(A + B)^3 = A^3 + B^3 + 3AB(A + B)',
    verbalVietnamese: 'Dạng thu gọn nhân tử chung của số hạng giữa, cực kỳ hữu ích khi biết tổng (A+B) và tích (AB).',
    tip: 'Từ đây suy ra: A³ + B³ = (A + B)³ - 3AB(A + B)'
  },
  {
    id: 10,
    name: 'Hằng đẳng thức Euler (3 lập phương)',
    formulaLatex: 'A^3 + B^3 + C^3 - 3ABC = (A + B + C)(A^2 + B^2 + C^2 - AB - BC - CA)',
    verbalVietnamese: 'Đặc biệt: Nếu A + B + C = 0 thì A³ + B³ + C³ = 3ABC.',
    tip: 'Đây là bài toán kinh điển trong các đề thi học sinh giỏi và thi chuyên toán!'
  }
];

export const MEMORIZING_POEM = [
  {
    line: "Bình phương một tổng rõ ràng",
    sub: "A bình, hai AB, B bình thêm vào (+)"
  },
  {
    line: "Bình phương một hiệu chớ nao",
    sub: "Đổi dấu hai AB, còn lại giữ nguyên (-2AB, +B²)"
  },
  {
    line: "Hiệu hai bình phương diệu kỳ",
    sub: "Hiệu nhân với tổng tức thì ra ngay: (A-B)(A+B)"
  },
  {
    line: "Lập phương một tổng thẳng bay",
    sub: "1 - 3 - 3 - 1 nhớ ngay trong đầu"
  },
  {
    line: "Lập phương một hiệu có màu",
    sub: "Dấu đan xen nhé: cộng trừ cộng trừ (+ - + -)"
  },
  {
    line: "Tổng - Hiệu lập phương không lười",
    sub: "Ngoặc sau 'bình phương thiếu' mỉm cười nhớ nhung!"
  }
];
