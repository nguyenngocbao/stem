import { useState } from 'react';
import { PageProps } from '../types';
import { ClipboardCheck, CheckSquare, Pencil, Users } from 'lucide-react';

const rubricRows = [
  {
    cat: 'Nội dung thiết kế',
    criteria: [
      {
        label: 'Sơ đồ phân cấp tủ điện',
        pts: 2,
        levels: [
          { score: '0.5đ', desc: 'Sơ đồ đi ngược nguyên lý hoàn toàn' },
          { score: '1đ', desc: 'Có sơ đồ nhưng thiếu cấp bảo vệ nhánh' },
          { score: '1.5đ', desc: 'Sơ đồ đúng chuẩn an toàn điện phân cấp' },
          { score: '2đ', desc: 'Logic phân nhánh chặt chẽ, tối ưu đường dẫn' },
        ],
      },
      {
        label: 'Giải thích chức năng thiết bị',
        pts: 2,
        levels: [
          { score: '0.5đ', desc: 'Không giải thích được' },
          { score: '1đ', desc: 'Giải thích được nhưng còn sai sót' },
          { score: '1.5đ', desc: 'Giải thích đúng cơ bản chức năng' },
          { score: '2đ', desc: 'Chi tiết, mạch lạc tính cần thiết của từng vị trí' },
        ],
      },
    ],
    color: 'blue',
    total: 4,
  },
  {
    cat: 'Tính sáng tạo & Giải quyết vấn đề',
    criteria: [
      {
        label: 'Đề xuất giải pháp tự động hoá',
        pts: 2,
        levels: [
          { score: '0.5đ', desc: 'Không có tính mới, chỉ sao chép y nguyên' },
          { score: '1đ', desc: 'Có đề xuất ý tưởng nhưng chưa thực tiễn' },
          { score: '1.5đ', desc: 'Tích hợp được yếu tố mới (tự ngắt, cảm biến)' },
          { score: '2đ', desc: 'Giải pháp đột phá, giải quyết triệt để sự cố' },
        ],
      },
      {
        label: 'Chế tạo mô hình hoạt động',
        pts: 2,
        levels: [
          { score: '0.5đ', desc: 'Mô hình không hoạt động được' },
          { score: '1đ', desc: 'Hoạt động nhưng chập chờn, lỗi nhiều' },
          { score: '1.5đ', desc: 'Động cơ và đèn hoạt động đúng chức năng' },
          { score: '2đ', desc: 'Vận hành mượt mà, cảm biến nhạy, nguyên lý rõ' },
        ],
      },
    ],
    color: 'amber',
    total: 4,
  },
  {
    cat: 'Hình thức sản phẩm',
    criteria: [
      {
        label: 'Bản vẽ & độ chắc chắn mô hình',
        pts: 2,
        levels: [
          { score: '0.5đ', desc: 'Lộn xộn, thiếu thẩm mỹ' },
          { score: '1đ', desc: 'Cơ bản nhưng còn sơ sài, lỏng lẻo' },
          { score: '1.5đ', desc: 'Gọn gàng, chú thích rõ ràng, mô hình chắc chắn' },
          { score: '2đ', desc: 'Bản vẽ chuyên nghiệp, mô hình thẩm mỹ cao' },
        ],
      },
    ],
    color: 'green',
    total: 2,
  },
];

const generalChecklist = [
  { group: 'Năng lực giải quyết vấn đề và sáng tạo (Trọng tâm)', items: [
    'Phân tích được nguyên nhân cốt lõi gây ra sự cố điện lãng phí và quá tải trong phân xưởng.',
    'Đề xuất được giải pháp công nghệ mới (tự động hóa) để tối ưu hệ thống điện.',
  ]},
  { group: 'Năng lực giao tiếp và hợp tác', items: [
    'Trình bày được lập luận cá nhân thuyết phục khi thảo luận bản thiết kế.',
    'Phối hợp hiệu quả với thành viên để phân chia công việc chế tạo nguyên mẫu.',
  ]},
];

const phcChecklist = [
  'Tích cực nghiên cứu tài liệu SGK về cấu trúc mạng điện quy mô nhỏ.',
  'Kiên trì thử nghiệm nhiều lần để tìm lỗi kỹ thuật khi chế tạo mô hình.',
  'Hoàn thiện bản vẽ và mô hình chỉn chu, đúng hạn.',
  'Thể hiện ý thức tiết kiệm năng lượng qua giải pháp thiết kế thực tế.',
];

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 border-blue-200 text-blue-800',
  amber: 'bg-amber-50 border-amber-200 text-amber-800',
  green: 'bg-green-50 border-green-200 text-green-800',
};
const headerMap: Record<string, string> = {
  blue: 'bg-blue-700',
  amber: 'bg-amber-600',
  green: 'bg-green-700',
};

export function Evaluate({ onNavigate }: PageProps) {
  const [tab, setTab] = useState<'rubric' | 'general' | 'journal'>('rubric');
  const [generalChecked, setGeneralChecked] = useState<Record<string, boolean>>({});
  const [phcChecked, setPhcChecked] = useState<boolean[]>(Array(phcChecklist.length).fill(false));

  const toggleGeneral = (key: string) => setGeneralChecked(v => ({ ...v, [key]: !v[key] }));
  const togglePhc = (i: number) => { const n = [...phcChecked]; n[i] = !n[i]; setPhcChecked(n); };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex justify-between items-center bg-white border border-gray-300 p-3 rounded shadow-sm">
        <h2 className="text-blue-700 font-bold text-sm uppercase">Giai đoạn 5 - Đánh giá: Triển lãm & Phản biện</h2>
        <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold border border-rose-200">ĐÁNH GIÁ KẾT QUẢ</span>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-white border border-gray-300 rounded p-1 shadow-sm">
        {[
          { id: 'rubric', label: '📋 Rubric sản phẩm' },
          { id: 'general', label: '✅ Bảng kiểm năng lực' },
          { id: 'journal', label: '✏️ Nhật ký cá nhân' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as typeof tab)}
            className={`flex-1 py-1.5 text-[10px] font-bold rounded transition-colors ${tab === t.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Rubric */}
      {tab === 'rubric' && (
        <div className="space-y-4">
          {rubricRows.map((row, ri) => (
            <section key={ri} className={`border rounded shadow-sm overflow-hidden`}>
              <div className={`${headerMap[row.color]} text-white px-4 py-2 flex justify-between items-center`}>
                <p className="text-[11px] font-bold uppercase">{row.cat}</p>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">{row.total} điểm</span>
              </div>
              <div className="p-4 bg-white">
                {row.criteria.map((crit, ci) => (
                  <div key={ci} className={`mb-3 last:mb-0 ${ci < row.criteria.length - 1 ? 'pb-3 border-b border-gray-100' : ''}`}>
                    <p className="text-[11px] font-bold text-gray-800 mb-2">{crit.label} <span className="text-gray-400 font-normal">({crit.pts} điểm)</span></p>
                    <div className="grid grid-cols-4 gap-2">
                      {crit.levels.map((lv, li) => (
                        <div key={li} className={`rounded border p-2 text-[10px] ${colorMap[row.color]}`}>
                          <p className="font-bold mb-1">{lv.score}</p>
                          <p className="leading-relaxed">{lv.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Tổng điểm */}
          <div className="bg-white border border-gray-300 rounded p-3 flex items-center justify-between shadow-sm">
            <span className="text-sm font-bold text-gray-700 uppercase">Tổng điểm tối đa</span>
            <span className="text-xl font-black text-blue-700 font-mono">10 điểm</span>
          </div>

          {/* Chấm đồng đẳng */}
          <section className="bg-white border border-gray-300 p-4 rounded shadow-sm">
            <p className="text-xs font-bold mb-2 uppercase text-gray-800 flex items-center">
              <Users size={14} className="mr-2 text-green-600" /> Chấm đồng đẳng — Quét QR tại bàn triển lãm
            </p>
            <div className="flex items-center gap-4">
              <div className="bg-gray-50 border border-dashed border-green-300 rounded p-4 flex flex-col items-center">
                <div className="w-16 h-16 bg-white border-4 border-gray-800 p-1 flex flex-wrap gap-0.5 justify-between content-between">
                  <div className="w-4 h-4 bg-gray-800"></div><div className="w-3 h-3 bg-gray-800 ml-auto"></div>
                  <div className="w-full h-1"></div>
                  <div className="w-3 h-3 bg-gray-800 mt-auto"></div><div className="w-4 h-4 bg-gray-800 mt-auto"></div>
                </div>
                <p className="text-[9px] mt-1 font-mono text-gray-500">SCAN_FORM_01</p>
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-gray-600 mb-3">Quan sát trình diễn mô hình của nhóm khác, chấm điểm vào phiếu dựa trên bảng Rubric ở trên.</p>
                <button className="px-4 py-2 bg-green-600 text-white text-[10px] uppercase font-bold rounded hover:bg-green-700 transition-colors shadow-sm">
                  Mở Form Chấm Điểm Online
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Tab: Bảng kiểm năng lực */}
      {tab === 'general' && (
        <div className="space-y-4">
          {generalChecklist.map((group, gi) => (
            <section key={gi} className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
              <div className="bg-blue-700 text-white px-4 py-2">
                <p className="text-[11px] font-bold">{group.group}</p>
              </div>
              <ul className="divide-y divide-gray-100">
                {group.items.map((item, ii) => {
                  const key = `${gi}-${ii}`;
                  return (
                    <li key={ii}
                      onClick={() => toggleGeneral(key)}
                      className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors select-none"
                    >
                      <div className="flex gap-3 items-center mt-0.5">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input type="radio" name={`g${gi}-${ii}-dat`} className="accent-green-600" checked={generalChecked[key] === true} onChange={() => toggleGeneral(key)} />
                          <span className="text-[10px] text-green-700 font-bold">Đạt</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input type="radio" name={`g${gi}-${ii}-dat`} className="accent-red-500" checked={generalChecked[key] === false} onChange={() => {}} />
                          <span className="text-[10px] text-red-600 font-bold">Chưa đạt</span>
                        </label>
                      </div>
                      <span className="text-[11px] text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}

          <section className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
            <div className="bg-purple-700 text-white px-4 py-2">
              <p className="text-[11px] font-bold">Phẩm chất học sinh</p>
            </div>
            <ul className="divide-y divide-gray-100">
              {phcChecklist.map((item, i) => (
                <li key={i}
                  onClick={() => togglePhc(i)}
                  className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors select-none"
                >
                  {phcChecked[i]
                    ? <CheckSquare size={14} className="text-purple-600 shrink-0 mt-0.5" />
                    : <div className="w-3.5 h-3.5 border-2 border-gray-300 rounded-sm shrink-0 mt-0.5" />}
                  <span className={`text-[11px] text-gray-700 leading-relaxed ${phcChecked[i] ? 'line-through text-gray-400' : ''}`}>{item}</span>
                  <span className={`ml-auto shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${phcChecked[i] ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {phcChecked[i] ? 'Đạt' : 'Chưa'}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {/* Tab: Nhật ký */}
      {tab === 'journal' && (
        <section className="bg-white border border-gray-300 p-6 rounded shadow-sm max-w-2xl mx-auto">
          <p className="text-xs font-bold mb-4 uppercase text-gray-800 flex items-center">
            <Pencil size={14} className="mr-2 text-purple-600" /> Nhật ký cá nhân — Tự phản ánh (Reflection)
          </p>
          <p className="text-[11px] text-gray-500 mb-5 border-l-2 border-purple-300 pl-3 italic">
            Đối chiếu lại với suy nghĩ ban đầu ở Hoạt động 1. Điều gì đã thay đổi trong cách hiểu của bạn?
          </p>
          {[
            'Trước khi học, bạn nghĩ nguyên nhân sập cầu dao là gì? Bây giờ bạn giải thích thế nào?',
            'Giải pháp sáng tạo nhất mà nhóm bạn đưa ra là gì? Bạn đóng góp phần nào?',
            'Nếu được làm lại, bạn sẽ thay đổi điều gì trong thiết kế mạng điện của nhóm?',
            'Kiến thức về mạng điện phân xưởng có thể áp dụng cho cuộc sống thực tế như thế nào?',
          ].map((q, i) => (
            <div key={i} className="mb-4">
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                <span className="text-purple-600 font-mono mr-1">{i + 1}.</span>{q}
              </label>
              <textarea
                className="w-full border border-gray-300 rounded p-2 text-[11px] focus:outline-none focus:border-purple-400 resize-none leading-relaxed"
                rows={3}
                placeholder="Viết suy nghĩ của bạn..."
              />
            </div>
          ))}
          <button className="w-full py-2 bg-purple-600 text-white text-[11px] uppercase font-bold rounded hover:bg-purple-700 transition-colors shadow-sm">
            Lưu nhật ký
          </button>
        </section>
      )}
    </div>
  );
}
