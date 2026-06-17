import { useState } from 'react';
import { PageProps } from '../types';
import { Presentation, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: '1. BỐI CẢNH VẤN ĐỀ',
    content: (
      <div className="space-y-4">
        <p className="text-[12px] text-gray-700 leading-relaxed border-l-4 border-red-500 pl-3">
          <strong className="text-red-700 block mb-1">Tình huống thực tế — Phân xưởng A:</strong>
          Xưởng cơ khí thường xuyên sập cầu dao khi bật đồng loạt các máy cắt. Đồng thời khu nhà kho luôn bật đèn sáng suốt dù không có người làm việc.
        </p>
        <div className="grid grid-cols-2 gap-3 text-[11px]">
          <div className="bg-red-50 border border-red-200 rounded p-3">
            <p className="font-bold text-red-800 mb-1">❌ Vấn đề 1: Quá tải</p>
            <p className="text-red-700">Nhiều thiết bị công suất lớn dùng chung một nhánh điện → cầu dao tổng bị kích hoạt.</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded p-3">
            <p className="font-bold text-amber-800 mb-1">❌ Vấn đề 2: Lãng phí</p>
            <p className="text-amber-700">Chiếu sáng không được kiểm soát tự động → tiêu tốn điện năng không cần thiết.</p>
          </div>
        </div>
        <p className="text-[11px] text-gray-600 italic text-center">→ Hai vấn đề này có thể được giải quyết bằng thiết kế mạng điện đúng nguyên lý.</p>
      </div>
    ),
  },
  {
    id: 2,
    title: '2. TẠI SAO CẦN TÁCH NHÁNH?',
    content: (
      <div className="space-y-3 text-[12px]">
        {[
          {
            title: 'Chống sụt áp cục bộ',
            body: 'Động cơ khởi động tiêu thụ dòng khởi động (Inrush current) lớn gấp 5–7 lần định mức, làm sụt áp toàn mạng chung.',
            color: 'blue',
          },
          {
            title: 'Bảo vệ thiết bị nhạy cảm',
            body: 'Đèn LED và cảm biến điện tử sẽ bị nháy hoặc hỏng nếu điện áp không ổn định do ảnh hưởng từ nhánh động cơ.',
            color: 'amber',
          },
          {
            title: 'Dễ dàng bảo trì',
            body: 'Hệ thống chiếu sáng vẫn hoạt động bình thường khi cần cắt điện để sửa chữa dàn máy CNC mà không ảnh hưởng toàn xưởng.',
            color: 'green',
          },
        ].map((item, i) => (
          <div key={i} className={`bg-${item.color}-50 border border-${item.color}-200 rounded p-3 flex items-start gap-2`}>
            <span className={`text-${item.color}-700 font-black text-lg leading-none shrink-0`}>◆</span>
            <div>
              <p className={`font-bold text-${item.color}-900 mb-0.5`}>{item.title}:</p>
              <p className={`text-${item.color}-800`}>{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 3,
    title: '3. SO SÁNH CÁC NGUỒN ĐIỆN',
    content: (
      <div className="overflow-auto">
        <table className="w-full text-[10px] border-collapse">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="p-2 text-left font-bold border border-blue-600">Loại nhà máy</th>
              <th className="p-2 text-center font-bold border border-blue-600">Ổn định</th>
              <th className="p-2 text-center font-bold border border-blue-600">Tái tạo</th>
              <th className="p-2 text-center font-bold border border-blue-600">Phát thải CO₂</th>
              <th className="p-2 text-left font-bold border border-blue-600">Điểm đặc trưng</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Thuỷ điện', '★★★★', '✓', 'Không', 'Phụ thuộc lượng mưa, tác động sinh thái'],
              ['Nhiệt điện', '★★★★★', '✗', 'Cao', 'Ổn định nhất, nhưng ô nhiễm cao'],
              ['Điện hạt nhân', '★★★★★', '✗', 'Rất thấp', 'Công suất rất lớn, rủi ro phóng xạ'],
              ['Điện gió', '★★', '✓', 'Không', 'Không ổn định, cần lưu trữ điện'],
              ['Điện mặt trời', '★★', '✓', 'Không', 'Chỉ ban ngày, cần pin lưu trữ'],
            ].map(([name, stable, renew, co2, note], i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-2 font-bold text-gray-800 border border-gray-200">{name}</td>
                <td className="p-2 text-center border border-gray-200 text-amber-500">{stable}</td>
                <td className="p-2 text-center border border-gray-200">{renew === '✓' ? <span className="text-green-600 font-bold">✓</span> : <span className="text-red-500 font-bold">✗</span>}</td>
                <td className="p-2 text-center border border-gray-200">
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${co2 === 'Không' ? 'bg-green-100 text-green-700' : co2 === 'Rất thấp' ? 'bg-teal-100 text-teal-700' : 'bg-red-100 text-red-700'}`}>{co2}</span>
                </td>
                <td className="p-2 text-gray-600 border border-gray-200">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[9px] text-gray-400 mt-2 italic">→ Kết hợp nhiều nguồn và hệ thống lưu trữ là xu hướng tối ưu hiện nay.</p>
      </div>
    ),
  },
  {
    id: 4,
    title: '4. CẤU TRÚC MẠNG ĐIỆN CHUẨN',
    content: (
      <div className="space-y-3 text-[12px]">
        <p className="text-gray-600 text-[11px] border-l-2 border-indigo-400 pl-3">Sơ đồ phân cấp bảo vệ từ lưới điện quốc gia xuống thiết bị sản xuất:</p>
        <div className="flex flex-col gap-1.5">
          {[
            { label: 'Trạm hạ áp', desc: 'Hạ điện áp 22kV/35kV xuống 380V/220V phù hợp phân xưởng', color: 'bg-blue-600' },
            { label: 'Tủ phân phối tổng (MSB)', desc: 'Cấp nguồn và bảo vệ cho toàn bộ hệ thống điện nội bộ', color: 'bg-indigo-600' },
            { label: 'Tủ phân phối nhánh', desc: 'Cấp điện riêng cho từng khu vực/xưởng → cách ly sự cố', color: 'bg-teal-600' },
            { label: 'Tủ động lực', desc: 'Điều khiển và bảo vệ các động cơ máy móc sản xuất', color: 'bg-green-600' },
            { label: 'Tủ chiếu sáng', desc: 'Cấp điện cho hệ thống đèn — độc lập với tủ động lực', color: 'bg-amber-500' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              {i > 0 && <div className="w-4 shrink-0 flex justify-center"><div className="w-0.5 h-3 bg-gray-400 -mt-3"></div></div>}
              {i === 0 && <div className="w-4 shrink-0"></div>}
              <div className={`flex-1 flex items-center gap-2 rounded px-3 py-2 ${item.color} text-white`}>
                <span className="font-bold text-[11px]">{item.label}</span>
                <span className="text-white/80 text-[10px] hidden sm:block">— {item.desc}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-gray-500 italic border-t border-gray-100 pt-2">
          ★ Nguyên tắc vàng: Tủ động lực và tủ chiếu sáng PHẢI hoạt động độc lập hoàn toàn.
        </p>
      </div>
    ),
  },
];

const discussionQuestions = [
  '"Tại sao cần tủ phân phối tổng trước khi chia về các xưởng nhỏ?"',
  '"Năng lượng nào là tối ưu nhất hiện nay cho một phân xưởng nhỏ?"',
  '"Nếu điện mặt trời gặp ngày nhiều mây, hệ thống sẽ xử lý thế nào?"',
];

export function Explain({ onNavigate }: PageProps) {
  const [slideIdx, setSlideIdx] = useState(0);
  const slide = slides[slideIdx];

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex justify-between items-center bg-white border border-gray-300 p-3 rounded shadow-sm mb-4">
        <h2 className="text-blue-700 font-bold text-sm uppercase">Giai đoạn 3 - Giải thích: Hội nghị Năng lượng</h2>
        <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold border border-amber-200">TRỌNG TÂM</span>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Nhiệm vụ + câu hỏi */}
        <section className="bg-white border border-gray-300 p-4 rounded shadow-sm col-span-1 flex flex-col gap-3">
          <div>
            <p className="text-xs font-bold mb-2 uppercase text-gray-800 flex items-center">
              <Users size={14} className="mr-2 text-blue-600" /> Nhiệm vụ báo cáo
            </p>
            <p className="text-[11px] leading-relaxed text-gray-600 border-l-2 border-blue-400 pl-3">
              Mỗi nhóm có <strong>5 phút</strong> thuyết trình về cấu trúc mạng điện đã xây dựng ở Trạm 2. Sử dụng sơ đồ thẻ bài để minh hoạ.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3 rounded flex-1">
            <p className="text-amber-800 font-bold uppercase text-[10px] mb-2">Câu hỏi Hội nghị:</p>
            <ul className="space-y-2">
              {discussionQuestions.map((q, i) => (
                <li key={i} className="text-amber-900 text-[11px] leading-relaxed italic border-b border-amber-100 pb-2 last:border-b-0 last:pb-0">
                  <span className="not-italic font-bold text-amber-700 mr-1">{i + 1}.</span>{q}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-3 rounded">
            <p className="text-[10px] font-bold text-blue-800 uppercase mb-1">Kĩ thuật: Sân khấu hóa</p>
            <p className="text-[10px] text-blue-700 leading-relaxed">
              Nhóm trình bày đóng vai "công ty kỹ thuật điện" bảo vệ phương án thiết kế trước Hội đồng đầu tư.
            </p>
          </div>
        </section>

        {/* Slide bài giảng */}
        <section className="bg-white border border-gray-300 p-4 rounded shadow-sm col-span-1 md:col-span-2 flex flex-col">
          <p className="text-xs font-bold mb-3 uppercase text-gray-800 flex items-center shrink-0">
            <Presentation size={14} className="mr-2 text-indigo-600" /> Slide đối chiếu — Bài giảng hệ thống hoá kiến thức
          </p>

          <div className="flex-1 bg-gray-100 border border-gray-300 rounded flex flex-col overflow-hidden min-h-0">
            {/* Toolbar */}
            <div className="p-2 border-b border-gray-300 flex items-center bg-gray-50 shrink-0 gap-2">
              <span className="text-[9px] bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded font-bold">SLIDESHOW</span>
              <span className="text-[10px] font-mono text-gray-700 uppercase font-bold truncate">Bai_giang_toi_uu_mang_dien.pptx</span>
            </div>

            {/* Slide content */}
            <div className="flex-1 bg-gray-800 flex items-center justify-center p-4">
              <div className="w-full max-w-lg bg-white shadow-2xl rounded-sm p-6 relative" style={{ minHeight: 260 }}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 rounded-bl-full opacity-10"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-amber-400 rounded-tr-full opacity-10"></div>
                <h2 className="text-base font-bold text-[#1e3a8a] border-l-4 border-amber-500 pl-3 mb-4 tracking-tight">{slide.title}</h2>
                <div className="text-[11px]">{slide.content}</div>
                <div className="mt-4 border-t border-gray-200 pt-2 flex justify-between items-end text-[8px] text-gray-400 font-mono">
                  <span>Khoa Điện – Điện Tử</span>
                  <span>SLIDE {slide.id} / {slides.length}</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="p-2 border-t border-gray-300 flex justify-between items-center bg-gray-50 text-[10px] text-gray-600 font-bold shrink-0">
              <div className="flex gap-1">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setSlideIdx(i)}
                    className={`w-6 h-6 rounded text-[9px] font-bold border transition-colors ${slideIdx === i ? 'bg-blue-600 text-white border-blue-700' : 'bg-white border-gray-300 text-gray-600 hover:bg-blue-50'}`}
                  >
                    {s.id}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSlideIdx(i => Math.max(0, i - 1))}
                  disabled={slideIdx === 0}
                  className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-blue-50 text-gray-700 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-sm disabled:opacity-40 flex items-center gap-1"
                >
                  <ChevronLeft size={12} /> TRƯỚC
                </button>
                <button
                  onClick={() => setSlideIdx(i => Math.min(slides.length - 1, i + 1))}
                  disabled={slideIdx === slides.length - 1}
                  className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-blue-50 text-gray-700 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-sm disabled:opacity-40 flex items-center gap-1"
                >
                  SAU <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
