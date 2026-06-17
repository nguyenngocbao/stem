import { useState } from 'react';
import { PageProps } from '../types';
import { BookOpen, Layers, Zap, Droplets, Wind, Sun, Atom } from 'lucide-react';

const powerPlants = [
  {
    id: 'thuy',
    name: 'Thuỷ điện',
    icon: Droplets,
    color: 'blue',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    iconColor: 'text-blue-600',
    chain: 'Thế năng nước → Động năng turbine → Điện năng',
    pros: ['Không phát thải CO₂', 'Chi phí vận hành thấp', 'Điều tiết linh hoạt'],
    cons: ['Phụ thuộc lượng mưa', 'Tác động hệ sinh thái', 'Chi phí đầu tư lớn'],
    note: 'Chiếm ~38% sản lượng điện Việt Nam',
  },
  {
    id: 'nhiet',
    name: 'Nhiệt điện',
    icon: Zap,
    color: 'orange',
    borderColor: 'border-orange-500',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-800',
    iconColor: 'text-orange-600',
    chain: 'Nhiệt năng (than/dầu/khí) → Hơi nước → Turbine → Điện năng',
    pros: ['Công suất lớn, ổn định', 'Không phụ thuộc thời tiết', 'Kỹ thuật đã trưởng thành'],
    cons: ['Phát thải CO₂ nhiều', 'Phụ thuộc nhiên liệu hoá thạch', 'Ô nhiễm không khí'],
    note: 'Chiếm ~44% sản lượng điện Việt Nam',
  },
  {
    id: 'hat_nhan',
    name: 'Điện hạt nhân',
    icon: Atom,
    color: 'purple',
    borderColor: 'border-purple-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-800',
    iconColor: 'text-purple-600',
    chain: 'Năng lượng phân hạch (Uranium) → Nhiệt → Hơi nước → Turbine → Điện năng',
    pros: ['Công suất cực lớn', 'Phát thải CO₂ gần bằng 0', 'Ổn định, không phụ thuộc thời tiết'],
    cons: ['Rủi ro phóng xạ', 'Xử lý chất thải phức tạp', 'Chi phí và thời gian xây dựng cao'],
    note: 'Việt Nam đang nghiên cứu tái khởi động dự án ĐHN',
  },
  {
    id: 'gio',
    name: 'Điện gió',
    icon: Wind,
    color: 'teal',
    borderColor: 'border-teal-500',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-800',
    iconColor: 'text-teal-600',
    chain: 'Động năng gió → Cánh quạt → Máy phát → Điện năng',
    pros: ['Tái tạo, sạch hoàn toàn', 'Chi phí ngày càng giảm', 'Có thể kết hợp với nông nghiệp'],
    cons: ['Không ổn định (phụ thuộc gió)', 'Tiếng ồn, ảnh hưởng cảnh quan', 'Cần hệ thống lưu trữ điện'],
    note: 'Tiềm năng rất lớn ở vùng duyên hải và Tây Nguyên',
  },
  {
    id: 'mat_troi',
    name: 'Điện mặt trời',
    icon: Sun,
    color: 'yellow',
    borderColor: 'border-yellow-500',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-800',
    iconColor: 'text-yellow-600',
    chain: 'Quang năng (photon) → Pin quang điện (PV) → Điện năng',
    pros: ['Tái tạo, không phát thải', 'Lắp đặt linh hoạt (áp mái)', 'Chi phí giảm nhanh'],
    cons: ['Chỉ phát điện ban ngày', 'Hiệu suất giảm khi nhiều mây', 'Cần pin lưu trữ (đắt)'],
    note: 'Phát triển bùng nổ tại Việt Nam từ 2019 đến nay',
  },
];

export function Explore({ onNavigate }: PageProps) {
  const [selected, setSelected] = useState<string>('thuy');
  const plant = powerPlants.find(p => p.id === selected)!;
  const Icon = plant.icon;

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex justify-between items-center bg-white border border-gray-300 p-3 rounded shadow-sm mb-4">
        <h2 className="text-blue-700 font-bold text-sm uppercase">Giai đoạn 2 - Khám phá: Nghiên cứu kiến thức nền</h2>
        <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold border border-blue-200">ĐANG THỰC HIỆN</span>
      </div>

      {/* Trạm 1: 5 loại nhà máy điện */}
      <section className="bg-white border border-gray-300 p-4 rounded shadow-sm">
        <p className="text-xs font-bold mb-3 uppercase text-gray-800 flex items-center">
          <BookOpen size={14} className="mr-2 text-blue-600" /> Trạm 1 — Hành trình của điện năng (5 phương pháp sản xuất điện)
        </p>
        <p className="text-[11px] text-gray-500 mb-3 border-l-2 border-blue-200 pl-3">
          Chọn từng loại nhà máy để xem chuỗi biến đổi năng lượng, ưu điểm và hạn chế. Xem thêm video bài giảng bên dưới.
        </p>
        <div className="aspect-video w-full rounded overflow-hidden border border-gray-200 mb-4">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/g8ur6q5fd4Q"
            title="Bài 6 - Mạng điện sản xuất quy mô nhỏ"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        {/* Tabs */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {powerPlants.map(p => {
            const TabIcon = p.icon;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-[10px] font-bold uppercase transition-colors ${
                  selected === p.id
                    ? `${p.bgColor} ${p.borderColor} ${p.textColor}`
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <TabIcon size={12} />
                {p.name}
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className={`${plant.bgColor} border ${plant.borderColor} rounded p-4 grid md:grid-cols-3 gap-4`}>
          {/* Chuỗi biến đổi */}
          <div className="md:col-span-3">
            <p className="text-[10px] font-bold uppercase text-gray-500 mb-1">⚡ Chuỗi biến đổi năng lượng</p>
            <div className={`${plant.textColor} font-mono text-[11px] font-bold bg-white/60 border border-white rounded px-3 py-2`}>
              {plant.chain}
            </div>
          </div>
          {/* Ưu điểm */}
          <div>
            <p className="text-[10px] font-bold uppercase text-green-700 mb-2">✓ Ưu điểm</p>
            <ul className="space-y-1">
              {plant.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[11px] text-gray-700">
                  <span className="text-green-600 font-bold shrink-0">+</span>{pro}
                </li>
              ))}
            </ul>
          </div>
          {/* Hạn chế */}
          <div>
            <p className="text-[10px] font-bold uppercase text-red-700 mb-2">✗ Hạn chế</p>
            <ul className="space-y-1">
              {plant.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[11px] text-gray-700">
                  <span className="text-red-500 font-bold shrink-0">−</span>{con}
                </li>
              ))}
            </ul>
          </div>
          {/* Ghi chú */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase text-gray-500 mb-2">📌 Thực tế Việt Nam</p>
              <p className={`text-[11px] italic ${plant.textColor} bg-white/60 rounded p-2 border border-white`}>{plant.note}</p>
            </div>
            <div className={`mt-3 flex items-center gap-2 ${plant.iconColor}`}>
              <Icon size={32} className="opacity-40" />
              <span className={`text-lg font-black opacity-30 ${plant.textColor}`}>{plant.name.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trạm 2: Sơ đồ mạng điện */}
      <section className="bg-white border border-gray-300 p-4 rounded shadow-sm">
        <p className="text-xs font-bold mb-3 uppercase text-gray-800 flex items-center">
          <Layers size={14} className="mr-2 text-indigo-600" /> Trạm 2 — Hoạt động nhóm: Lắp ghép sơ đồ mạng điện phân xưởng
        </p>
        <p className="text-[11px] text-gray-500 mb-4 border-l-2 border-indigo-200 pl-3">
          Dựa vào sơ đồ tham khảo (Hình 6.3 SGK), thảo luận nhóm để nối đúng thứ tự các thiết bị từ lưới 22kV xuống máy CNC.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Sơ đồ trực quan */}
          <div className="bg-gray-50 border border-gray-200 rounded p-4 flex flex-col items-center">
            <p className="text-[10px] font-bold uppercase text-gray-500 mb-4">Sơ đồ phân cấp mạng điện hạ áp</p>
            <div className="flex flex-col items-center w-full max-w-xs">
              <div className="w-44 py-2 border-2 border-blue-600 bg-blue-50 text-blue-800 text-[9px] flex items-center justify-center font-bold rounded shadow-sm text-center px-1">TRẠM BIẾN ÁP<br/>(22kV → 380V/220V)</div>
              <div className="w-0.5 h-5 bg-gray-500"></div>
              <div className="w-44 py-2 border-2 border-indigo-600 bg-indigo-50 text-indigo-800 text-[9px] flex items-center justify-center font-bold rounded shadow-sm">TỦ PHÂN PHỐI TỔNG (MSB)</div>
              <div className="w-0.5 h-5 bg-gray-500"></div>
              <div className="flex gap-2">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-5 bg-gray-500"></div>
                  <div className="w-28 py-2 border-2 border-green-600 bg-green-50 text-green-800 text-[8px] flex items-center justify-center font-bold rounded shadow-sm text-center px-1">TỦ PHÂN PHỐI NHÁNH<br/>(Xưởng 1)</div>
                  <div className="flex gap-1 mt-2">
                    <div className="w-12 py-1.5 border border-green-500 bg-green-100 text-green-900 text-[7px] flex items-center justify-center font-bold rounded text-center">TỦ ĐỘNG LỰC</div>
                    <div className="w-12 py-1.5 border border-amber-500 bg-amber-100 text-amber-900 text-[7px] flex items-center justify-center font-bold rounded text-center">TỦ CHIẾU SÁNG</div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-5 bg-gray-500"></div>
                  <div className="w-28 py-2 border-2 border-teal-600 bg-teal-50 text-teal-800 text-[8px] flex items-center justify-center font-bold rounded shadow-sm text-center px-1">TỦ PHÂN PHỐI NHÁNH<br/>(Xưởng 2)</div>
                  <div className="flex gap-1 mt-2">
                    <div className="w-12 py-1.5 border border-teal-500 bg-teal-100 text-teal-900 text-[7px] flex items-center justify-center font-bold rounded text-center">TỦ ĐỘNG LỰC</div>
                    <div className="w-12 py-1.5 border border-amber-500 bg-amber-100 text-amber-900 text-[7px] flex items-center justify-center font-bold rounded text-center">TỦ CHIẾU SÁNG</div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[8px] text-gray-400 italic mt-4 text-center border-t border-gray-200 pt-2 max-w-xs">
              * Tủ động lực và tủ chiếu sáng hoạt động độc lập là nguyên tắc thiết kế bắt buộc để chống sụt áp cục bộ.
            </p>
          </div>

          {/* Câu hỏi thảo luận nhóm */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase text-gray-500 mb-2">Câu hỏi truy vấn (Thảo luận nhóm)</p>
            {[
              {
                q: 'Nếu máy khoan bị chập điện, bóng đèn khu vực có bị tắt theo không? Tại sao?',
                hint: 'Gợi ý: So sánh mạng điện khi tủ động lực và chiếu sáng dùng chung hay tách riêng.',
              },
              {
                q: 'Vai trò của Tủ phân phối tổng (MSB) là gì? Tại sao không nối thẳng từ trạm biến áp xuống từng xưởng?',
                hint: 'Gợi ý: Nghĩ đến bảo vệ toàn mạng và việc cắt/cấp điện cho từng khu vực.',
              },
              {
                q: 'Nguồn điện nào sẽ tối ưu nhất cho một phân xưởng nhỏ ở nông thôn? Vì sao?',
                hint: 'Gợi ý: Cân nhắc chi phí, tính ổn định và điều kiện địa lý.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-blue-50 border border-blue-100 rounded p-3">
                <p className="text-[11px] font-bold text-blue-900 mb-1">
                  <span className="text-blue-500 font-mono mr-1">{String(i + 1).padStart(2, '0')}.</span>
                  {item.q}
                </p>
                <p className="text-[10px] text-blue-600 italic">{item.hint}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
