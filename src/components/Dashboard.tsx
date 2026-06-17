import { PageProps } from '../types';
import { Lightbulb, Compass, Presentation, Wrench, CheckSquare } from 'lucide-react';

export function Dashboard({ onNavigate }: PageProps) {
  const steps = [
    { id: 'engage', title: '01. Gắn kết', icon: Lightbulb, color: 'text-blue-700 bg-blue-100 border-blue-300', description: 'Xác định vấn đề thực tiễn' },
    { id: 'explore', title: '02. Khám phá', icon: Compass, color: 'text-blue-700 bg-blue-100 border-blue-300', description: 'Nghiên cứu kiến thức nền' },
    { id: 'explain', title: '03. Giải thích', icon: Presentation, color: 'text-blue-700 bg-blue-100 border-blue-300', description: 'Hội nghị năng lượng' },
    { id: 'elaborate', title: '04. Vận dụng', icon: Wrench, color: 'text-blue-700 bg-blue-100 border-blue-300', description: 'Chế tạo mô hình thông minh' },
    { id: 'evaluate', title: '05. Đánh giá', icon: CheckSquare, color: 'text-blue-700 bg-blue-100 border-blue-300', description: 'Triển lãm & Phản biện' },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-blue-50 border border-blue-200 px-8 py-4 shrink-0 italic text-blue-800 text-sm rounded shadow-sm">
        "Chào mừng các kỹ sư tương lai! Dự án này sẽ giúp các bạn hiểu về hành trình của điện năng từ nhà máy đến các phân xưởng sản xuất, đồng thời tự tay chế tạo mô hình mạng điện thông minh với Arduino."
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <button
              key={step.id}
              onClick={() => onNavigate(step.id)}
              className="group flex flex-col text-left bg-white border border-gray-300 p-4 rounded shadow-sm hover:border-blue-500 hover:shadow transition-all"
            >
              <div className="flex justify-between items-start mb-2 w-full">
                <h2 className="text-blue-700 font-bold text-sm uppercase">{step.title}</h2>
              </div>
              <p className="text-xs font-bold mb-2 text-gray-800">{step.description}</p>
              
              <div className="mt-4 flex items-center justify-between w-full">
                 <div className={`p-2 rounded border ${step.color}`}>
                   <Icon size={16} />
                 </div>
                 <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full uppercase font-bold border border-gray-200">
                    Mở Giai Đoạn
                 </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
