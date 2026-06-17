import { useState, useRef } from 'react';
import { PageProps } from '../types';
import { Cpu, Download, UploadCloud, CheckSquare, Square, FileText, Link2, Send, Video, Code2, BookOpen, AlertCircle, Check } from 'lucide-react';

const req1Steps = [
  'Xác định tổng tải công suất của 3 phân xưởng nhỏ (chia đều từ tải cũ)',
  'Vẽ Tủ phân phối tổng → 3 tủ phân phối nhánh độc lập',
  'Mỗi nhánh chia tiếp thành: Tủ động lực (máy móc) + Tủ chiếu sáng',
  'Ghi chú thông số: điện áp, dòng định mức, loại cầu dao bảo vệ',
  'Kiểm tra: cân bằng tải (mỗi nhánh ≤ 1/3 tổng tải)',
];

const req2Steps = [
  'Kết nối cảm biến PIR (chuyển động) với Arduino pin 7',
  'Kết nối động cơ bơm nước mini qua mạch relay vào Arduino pin 8',
  'Kết nối màn hình LCD I2C (SDA→A4, SCL→A5) để hiển thị trạng thái',
  'Nạp code: đèn LED tự bật khi cảm biến phát hiện chuyển động',
  'Thử nghiệm: motor bơm chạy khi nhấn nút, LCD hiển thị "DONG CO: ON"',
  'Mở rộng (nâng cao): thêm cảm biến dòng điện để cảnh báo quá tải',
];

const docs = [
  {
    name: 'Sơ đồ đấu nối Arduino – Relay – Motor',
    desc: 'Schematics đầy đủ, chuẩn Fritzing (PDF, 1.2 MB)',
    type: 'PDF',
    color: 'red',
    url: 'https://drive.google.com/file/d/1_example_arduino_schematic/view',
  },
  {
    name: 'Datasheet Cảm biến PIR HC-SR501',
    desc: 'Thông số kỹ thuật, ngưỡng chỉnh độ nhạy (PDF, 380 KB)',
    type: 'PDF',
    color: 'red',
    url: 'https://drive.google.com/file/d/1_example_pir_datasheet/view',
  },
  {
    name: 'Mẫu bản vẽ sơ đồ A0 (Template)',
    desc: 'File mẫu khung tên, ký hiệu điện chuẩn IEC (PDF, 2.1 MB)',
    type: 'PDF',
    color: 'red',
    url: 'https://drive.google.com/file/d/1_example_a0_template/view',
  },
  {
    name: 'Thư viện LiquidCrystal_I2C',
    desc: 'Arduino library cho màn hình LCD (ZIP, 45 KB)',
    type: 'ZIP',
    color: 'amber',
    url: 'https://github.com/johnrickman/LiquidCrystal_I2C/archive/refs/heads/master.zip',
  },
  {
    name: 'Code mẫu – Tủ điện thông minh',
    desc: 'Sketch hoàn chỉnh: PIR + Relay + LCD (.ino, 3 KB)',
    type: 'INO',
    color: 'green',
    url: 'https://drive.google.com/file/d/1_example_sketch/view',
  },
  {
    name: 'Video hướng dẫn nạp code Arduino',
    desc: 'Hướng dẫn từng bước cài IDE + nạp firmware (MP4, 12:45)',
    type: 'VID',
    color: 'blue',
    url: 'https://www.youtube.com/watch?v=fJWR7dBuc18',
  },
  {
    name: 'Tiêu chuẩn an toàn điện TCVN 9208',
    desc: 'Quy định lắp đặt tủ điện và thiết bị bảo vệ (PDF, 4.5 MB)',
    type: 'PDF',
    color: 'red',
    url: 'https://drive.google.com/file/d/1_example_tcvn/view',
  },
  {
    name: 'Rubric chấm điểm (bản in)',
    desc: 'Bảng tiêu chí đánh giá 4 mức dành cho giáo viên (PDF, 200 KB)',
    type: 'PDF',
    color: 'red',
    url: 'https://drive.google.com/file/d/1_example_rubric/view',
  },
];

const typeStyle: Record<string, string> = {
  PDF: 'bg-red-100 text-red-700',
  ZIP: 'bg-amber-100 text-amber-700',
  INO: 'bg-green-100 text-green-700',
  VID: 'bg-blue-100 text-blue-700',
};

const codeSnippet = `// Tủ điện chiếu sáng + động lực thông minh
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

const int PIR_PIN    = 7;   // Cảm biến PIR
const int LED_PIN    = 6;   // Đèn chiếu sáng
const int RELAY_MOTOR = 8;  // Relay điều khiển motor
const int BTN_PIN    = 4;   // Nút nhấn bật/tắt motor

bool motorOn = false;

void setup() {
  pinMode(PIR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(RELAY_MOTOR, OUTPUT);
  pinMode(BTN_PIN, INPUT_PULLUP);
  lcd.init(); lcd.backlight();
  lcd.print("HE THONG DIEN");
}

void loop() {
  // Tủ chiếu sáng: tự động theo PIR
  bool motion = digitalRead(PIR_PIN);
  digitalWrite(LED_PIN, motion ? HIGH : LOW);
  lcd.setCursor(0, 0);
  lcd.print(motion ? "CHIEU SANG: ON " : "CHIEU SANG: OFF");

  // Tủ động lực: nút nhấn bật/tắt motor
  if (digitalRead(BTN_PIN) == LOW) {
    motorOn = !motorOn;
    digitalWrite(RELAY_MOTOR, motorOn ? HIGH : LOW);
    delay(300); // chống dội nút
  }
  lcd.setCursor(0, 1);
  lcd.print(motorOn ? "DONG CO   : ON " : "DONG CO   : OFF");

  delay(200);
}`;

type SubmitStatus = 'idle' | 'submitting' | 'done' | 'error';

export function Elaborate({ onNavigate }: PageProps) {
  const [checkedR1, setCheckedR1] = useState<boolean[]>(Array(req1Steps.length).fill(false));
  const [checkedR2, setCheckedR2] = useState<boolean[]>(Array(req2Steps.length).fill(false));
  const [showCode, setShowCode] = useState(false);
  const [tab, setTab] = useState<'checklist' | 'docs' | 'form'>('checklist');

  // Form state
  const [group, setGroup] = useState('');
  const [members, setMembers] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [driveUrl, setDriveUrl] = useState('');
  const [note, setNote] = useState('');
  const [drawingFile, setDrawingFile] = useState<File | null>(null);
  const [codeFile, setCodeFile] = useState<File | null>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const drawingRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  const toggle = (arr: boolean[], i: number, set: (v: boolean[]) => void) => {
    const next = [...arr]; next[i] = !next[i]; set(next);
  };

  const progress1 = checkedR1.filter(Boolean).length;
  const progress2 = checkedR2.filter(Boolean).length;

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!group || !members) return;
    setSubmitStatus('submitting');
    setTimeout(() => setSubmitStatus('done'), 1800);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Header */}
      <div className="bg-[#1e293b] text-white p-4 rounded shadow-inner flex justify-between items-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-blue-400 font-bold text-sm uppercase mb-1">Giai đoạn 4 - Vận dụng</h2>
          <p className="text-xs font-bold text-white max-w-xl">
            Dự án: "Giải cứu Phân xưởng A" — Thiết kế lại mạng điện và chế tạo mô hình thông minh với Arduino.
          </p>
        </div>
        <span className="relative z-10 text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-500/50 font-bold hidden sm:inline-block">
          THỰC HÀNH CỐT LÕI
        </span>
        <Cpu size={64} className="absolute right-4 text-blue-500/10" />
      </div>

      {/* Project brief */}
      <div className="bg-blue-50 border border-blue-200 rounded p-4 text-[11px] text-blue-900 leading-relaxed">
        <p className="font-bold text-blue-800 mb-1 uppercase text-[10px]">📋 Nhiệm vụ dự án</p>
        Vận dụng kiến thức Bài 5 và Bài 6 để <strong>thiết kế lại hệ thống điện</strong> cho Phân xưởng A gồm 12 máy cắt CNC, 1 máy hàn, khu kho chiếu sáng 24/7.
        Yêu cầu chia thành 3 phân xưởng nhỏ <em>cân bằng tải và độc lập</em>.
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-white border border-gray-300 rounded p-1 shadow-sm">
        {[
          { id: 'checklist', label: '✅ Tiến độ làm việc' },
          { id: 'docs',      label: '📂 Tài liệu kỹ thuật' },
          { id: 'form',      label: '📤 Nộp sản phẩm' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
            className={`flex-1 py-1.5 text-[10px] font-bold rounded transition-colors ${tab === t.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Checklist ── */}
      {tab === 'checklist' && (
        <div className="grid md:grid-cols-2 gap-4">
          {/* Yêu cầu 1 */}
          <section className="bg-white border border-gray-300 p-4 rounded shadow-sm flex flex-col border-t-4 border-t-indigo-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold uppercase text-gray-800">Yêu cầu 1 — Bản vẽ sơ đồ (Giấy A0)</p>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">{progress1}/{req1Steps.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
              <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${(progress1 / req1Steps.length) * 100}%` }} />
            </div>
            <ul className="space-y-1.5 flex-1">
              {req1Steps.map((step, i) => (
                <li key={i} onClick={() => toggle(checkedR1, i, setCheckedR1)}
                  className="flex items-start gap-2 text-[11px] text-gray-700 cursor-pointer hover:bg-gray-50 rounded p-1 select-none">
                  {checkedR1[i] ? <CheckSquare size={13} className="text-indigo-600 shrink-0 mt-0.5" /> : <Square size={13} className="text-gray-400 shrink-0 mt-0.5" />}
                  <span className={checkedR1[i] ? 'line-through text-gray-400' : ''}>{step}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 p-2 bg-indigo-50 border border-indigo-100 rounded text-[10px] text-indigo-700">
              <strong>Tiêu chí:</strong> Phân cấp đúng, tách nhánh rõ ràng, ghi chú thông số đủ.
            </div>
          </section>

          {/* Yêu cầu 2 */}
          <section className="bg-white border border-gray-300 p-4 rounded shadow-sm flex flex-col border-t-4 border-t-green-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold uppercase text-gray-800">Yêu cầu 2 — Mô hình Arduino thông minh</p>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">{progress2}/{req2Steps.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
              <div className="bg-green-500 h-1.5 rounded-full transition-all" style={{ width: `${(progress2 / req2Steps.length) * 100}%` }} />
            </div>
            <ul className="space-y-1.5 flex-1">
              {req2Steps.map((step, i) => (
                <li key={i} onClick={() => toggle(checkedR2, i, setCheckedR2)}
                  className="flex items-start gap-2 text-[11px] text-gray-700 cursor-pointer hover:bg-gray-50 rounded p-1 select-none">
                  {checkedR2[i] ? <CheckSquare size={13} className="text-green-600 shrink-0 mt-0.5" /> : <Square size={13} className="text-gray-400 shrink-0 mt-0.5" />}
                  <span className={checkedR2[i] ? 'line-through text-gray-400' : ''}>{step}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 p-2 bg-green-50 border border-green-100 rounded text-[10px] text-green-700">
              <strong>Linh kiện:</strong> Arduino Uno, cảm biến PIR, relay, motor bơm mini, LCD I2C, LED, jumper.
            </div>
          </section>

          {/* Code mẫu */}
          <section className="bg-gray-900 border border-gray-700 p-4 rounded shadow-inner text-white md:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase text-gray-300 flex items-center">
                <Code2 size={14} className="mr-2 text-green-400" /> Code mẫu Arduino — Tủ điện thông minh
              </p>
              <button onClick={() => setShowCode(v => !v)}
                className="text-[10px] bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded font-bold text-gray-300 transition-colors">
                {showCode ? 'Ẩn code' : 'Xem code mẫu'}
              </button>
            </div>
            {showCode && (
              <pre className="overflow-auto text-[9px] text-green-300 font-mono leading-relaxed bg-gray-950 rounded p-3 border border-gray-700 max-h-64">
                {codeSnippet}
              </pre>
            )}
            {!showCode && (
              <p className="text-[10px] text-gray-500 italic text-center py-2">Nhấn "Xem code mẫu" để tham khảo template Arduino hoàn chỉnh.</p>
            )}
          </section>
        </div>
      )}

      {/* ── Tab: Tài liệu kỹ thuật ── */}
      {tab === 'docs' && (
        <section className="bg-white border border-gray-300 p-4 rounded shadow-sm">
          <p className="text-xs font-bold mb-1 uppercase text-gray-800 flex items-center">
            <BookOpen size={14} className="mr-2 text-blue-600" /> Kho tài liệu kỹ thuật
          </p>
          <p className="text-[11px] text-gray-500 mb-4 border-l-2 border-blue-200 pl-3">
            Tải về các tài liệu cần thiết trước khi bắt đầu chế tạo. Nhấn vào từng dòng để mở/tải.
          </p>
          <div className="divide-y divide-gray-100 border border-gray-200 rounded overflow-hidden">
            {docs.map((doc, i) => (
              <a key={i} href={doc.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors group">
                <span className={`text-[9px] font-bold px-2 py-1 rounded shrink-0 ${typeStyle[doc.type]}`}>{doc.type}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-gray-800 group-hover:text-blue-700 truncate">{doc.name}</p>
                  <p className="text-[10px] text-gray-500">{doc.desc}</p>
                </div>
                <Download size={13} className="text-gray-300 group-hover:text-blue-500 shrink-0 transition-colors" />
              </a>
            ))}
          </div>
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded p-3 flex items-start gap-2">
            <AlertCircle size={13} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-800 leading-relaxed">
              <strong>Lưu ý:</strong> Đọc kỹ TCVN 9208 và sơ đồ đấu nối trước khi lắp ráp mạch thực. Luôn rút nguồn trước khi thay đổi kết nối.
            </p>
          </div>
        </section>
      )}

      {/* ── Tab: Nộp sản phẩm ── */}
      {tab === 'form' && (
        <section className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
          <div className="bg-blue-700 text-white px-4 py-3 flex items-center gap-2">
            <Send size={14} />
            <p className="text-[11px] font-bold uppercase">Form nộp sản phẩm — Dự án Giải cứu Phân xưởng A</p>
          </div>

          {submitStatus === 'done' ? (
            <div className="p-10 flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <Check size={28} className="text-green-600" />
              </div>
              <p className="text-base font-bold text-green-700">Nộp bài thành công!</p>
              <p className="text-[11px] text-gray-500 text-center">Giáo viên sẽ xem xét và phản hồi trong buổi Triển lãm (Giai đoạn 5).</p>
              <button onClick={() => { setSubmitStatus('idle'); setGroup(''); setMembers(''); setVideoUrl(''); setDriveUrl(''); setNote(''); setDrawingFile(null); setCodeFile(null); }}
                className="mt-2 text-[10px] text-blue-600 underline">Nộp lại bài khác</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {/* Thông tin nhóm */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Tên nhóm <span className="text-red-500">*</span></label>
                  <input value={group} onChange={e => setGroup(e.target.value)} required
                    placeholder="VD: Nhóm 01 — Future Engineers"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[11px] focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Thành viên <span className="text-red-500">*</span></label>
                  <input value={members} onChange={e => setMembers(e.target.value)} required
                    placeholder="VD: An, Bình, Chi, Dũng"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[11px] focus:outline-none focus:border-blue-400" />
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Nộp file */}
              <p className="text-[10px] font-bold uppercase text-gray-500">Tệp đính kèm</p>
              <div className="grid md:grid-cols-3 gap-3">
                {/* Bản vẽ */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1 flex items-center gap-1">
                    <FileText size={12} className="text-indigo-500" /> Bản vẽ sơ đồ (PDF/JPG)
                  </label>
                  <div
                    onClick={() => drawingRef.current?.click()}
                    className={`border-2 border-dashed rounded p-3 flex flex-col items-center justify-center cursor-pointer transition-colors min-h-[80px] ${drawingFile ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300 hover:bg-indigo-50/50'}`}>
                    {drawingFile ? (
                      <>
                        <Check size={16} className="text-indigo-600 mb-1" />
                        <p className="text-[10px] font-bold text-indigo-700 text-center truncate max-w-full px-1">{drawingFile.name}</p>
                      </>
                    ) : (
                      <>
                        <UploadCloud size={18} className="text-gray-400 mb-1" />
                        <p className="text-[10px] text-gray-500 text-center">Click để chọn tệp</p>
                      </>
                    )}
                    <input ref={drawingRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden"
                      onChange={e => setDrawingFile(e.target.files?.[0] ?? null)} />
                  </div>
                </div>

                {/* File code */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1 flex items-center gap-1">
                    <Code2 size={12} className="text-green-500" /> File code Arduino (.ino/.zip)
                  </label>
                  <div
                    onClick={() => codeRef.current?.click()}
                    className={`border-2 border-dashed rounded p-3 flex flex-col items-center justify-center cursor-pointer transition-colors min-h-[80px] ${codeFile ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-green-300 hover:bg-green-50/50'}`}>
                    {codeFile ? (
                      <>
                        <Check size={16} className="text-green-600 mb-1" />
                        <p className="text-[10px] font-bold text-green-700 text-center truncate max-w-full px-1">{codeFile.name}</p>
                      </>
                    ) : (
                      <>
                        <UploadCloud size={18} className="text-gray-400 mb-1" />
                        <p className="text-[10px] text-gray-500 text-center">Click để chọn tệp</p>
                      </>
                    )}
                    <input ref={codeRef} type="file" accept=".ino,.zip,.txt" className="hidden"
                      onChange={e => setCodeFile(e.target.files?.[0] ?? null)} />
                  </div>
                </div>

                {/* Link Drive */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1 flex items-center gap-1">
                    <Link2 size={12} className="text-blue-500" /> Link Google Drive (bản vẽ A0)
                  </label>
                  <textarea value={driveUrl} onChange={e => setDriveUrl(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    rows={3}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[10px] focus:outline-none focus:border-blue-400 resize-none font-mono" />
                </div>
              </div>

              {/* Video demo */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 flex items-center gap-1">
                  <Video size={12} className="text-rose-500" /> Link video demo mô hình hoạt động
                </label>
                <input value={videoUrl} onChange={e => setVideoUrl(e.target.value)}
                  placeholder="YouTube, Google Drive, hoặc bất kỳ link video nào..."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-[11px] focus:outline-none focus:border-rose-400" />
              </div>

              {/* Ghi chú */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Ghi chú / Giải thích thêm</label>
                <textarea value={note} onChange={e => setNote(e.target.value)}
                  rows={3} placeholder="Mô tả ngắn về sáng kiến đặc biệt của nhóm, hoặc lý do chưa hoàn thành một phần..."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-[11px] focus:outline-none focus:border-gray-400 resize-none" />
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <p className="text-[10px] text-gray-400 italic">
                  {!group || !members ? '⚠ Điền đủ Tên nhóm và Thành viên để nộp bài.' : '✓ Sẵn sàng nộp bài.'}
                </p>
                <button type="submit" disabled={submitStatus === 'submitting' || !group || !members}
                  className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-[11px] font-bold rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm">
                  {submitStatus === 'submitting' ? (
                    <><span className="animate-spin inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full" /> Đang nộp...</>
                  ) : (
                    <><Send size={13} /> Nộp sản phẩm</>
                  )}
                </button>
              </div>
            </form>
          )}
        </section>
      )}
    </div>
  );
}
