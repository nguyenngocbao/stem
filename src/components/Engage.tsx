import { PageProps } from '../types';
import { MessageCircle, AlertTriangle, FileText } from 'lucide-react';

export function Engage({ onNavigate }: PageProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex justify-between items-center bg-white border border-gray-300 p-3 rounded shadow-sm mb-4">
        <h2 className="text-blue-700 font-bold text-sm uppercase">Giai đoạn 1 - Gắn kết: Xác định vấn đề thực tiễn</h2>
        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold border border-green-200">HOẠT ĐỘNG CHÍNH</span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <section className="bg-white border border-gray-300 p-4 rounded shadow-sm flex flex-col">
          <p className="text-xs font-bold mb-2 uppercase text-gray-800 flex items-center">
             <AlertTriangle size={14} className="mr-2 text-rose-600"/> Sự cố tại Phân xưởng A
          </p>
          <div className="aspect-video w-full rounded overflow-hidden border border-gray-800 mb-3">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/bafF3Kacn3o"
              title="Cảnh giác nguy cơ cháy nổ tại kho xưởng sản xuất - sự cố điện"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <p className="text-[11px] leading-relaxed text-gray-600 mb-2 border-l-2 border-rose-400 pl-3">
            Mời bạn xem video về sự cố sập cầu dao tại Phân xưởng A. Hãy chú ý đến những biểu hiện của hệ thống điện ngay trước khi sự cố xảy ra.
          </p>
        </section>

        <div className="space-y-4 flex flex-col">
          <section className="bg-white border border-gray-300 p-4 rounded shadow-sm">
            <p className="text-xs font-bold mb-3 uppercase text-gray-800 flex items-center">
               <FileText size={14} className="mr-2 text-indigo-600"/> Nhiệm vụ của bạn
            </p>
            <ul className="space-y-2">
              <li className="flex items-start text-[11px] text-gray-700 border-b border-gray-100 pb-2">
                <span className="text-[10px] text-blue-600 font-mono font-bold w-4">01.</span>
                Quan sát video và ghi chú các hiện tượng bất thường.
              </li>
              <li className="flex items-start text-[11px] text-gray-700 border-b border-gray-100 pb-2">
                <span className="text-[10px] text-blue-600 font-mono font-bold w-4">02.</span>
                Mô tả lại thiết kế hiện tại của phân xưởng.
              </li>
              <li className="flex items-start text-[11px] text-gray-700">
                <span className="text-[10px] text-blue-600 font-mono font-bold w-4">03.</span>
                Đề xuất sơ bộ nguyên nhân gây lãng phí điện năng.
              </li>
            </ul>
          </section>

          <section className="bg-white border border-gray-300 p-4 rounded shadow-sm flex-1 flex flex-col">
            <p className="text-xs font-bold mb-2 uppercase text-gray-800 flex items-center">
              <MessageCircle size={14} className="mr-2 text-blue-600"/> Phiếu thảo luận
            </p>
            <div className="flex-1 bg-white border border-gray-300 rounded overflow-hidden flex flex-col w-full shadow-inner mt-2">
              <div className="h-1.5 bg-purple-600 w-full shrink-0"></div>
              <div className="p-3 flex flex-col h-full bg-gray-50/50">
                <h3 className="text-[12px] font-bold text-gray-800 mb-1">Phiếu số 1: Hiện trạng Phân xưởng A</h3>
                <p className="text-[9px] text-gray-500 mb-3 pb-2 border-b border-gray-200">Hãy ghi lại nhận xét của bạn sau khi xem đoạn ghi hình.</p>
                
                <label className="text-[10px] font-bold text-gray-700 mb-1">1. Dấu hiệu bất thường quan sát được? <span className="text-red-500">*</span></label>
                <textarea className="w-full border border-gray-300 rounded p-1.5 text-[10px] mb-2 focus:outline-none focus:border-purple-500 resize-none" rows={2} placeholder="Câu trả lời của bạn..."></textarea>

                <label className="text-[10px] font-bold text-gray-700 mb-1">2. Nguyên nhân sập cầu dao là do đâu?</label>
                <div className="space-y-1 mb-3 text-[10px] text-gray-600">
                  <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="reason" className="accent-purple-600" /> Quá tải công suất</label>
                  <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="reason" className="accent-purple-600" /> Chập điện do dây cũ</label>
                  <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="reason" className="accent-purple-600" /> Lỗi thiết bị đo lường</label>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <button className="bg-purple-600 text-white text-[10px] font-bold px-4 py-1.5 rounded hover:bg-purple-700 shadow-sm transition-colors">Gửi ý kiến</button>
                  <span className="text-[8px] text-gray-400 font-mono">Đã lưu nháp lúc 08:42</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
