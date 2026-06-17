/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Page } from './types';
import { Dashboard } from './components/Dashboard';
import { Engage } from './components/Engage';
import { Explore } from './components/Explore';
import { Explain } from './components/Explain';
import { Elaborate } from './components/Elaborate';
import { Evaluate } from './components/Evaluate';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'engage':
        return <Engage onNavigate={setCurrentPage} />;
      case 'explore':
        return <Explore onNavigate={setCurrentPage} />;
      case 'explain':
        return <Explain onNavigate={setCurrentPage} />;
      case 'elaborate':
        return <Elaborate onNavigate={setCurrentPage} />;
      case 'evaluate':
        return <Evaluate onNavigate={setCurrentPage} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="h-screen bg-[#F8F9FA] text-[#1A1A1B] flex flex-col font-sans overflow-hidden">
      <header className="h-20 bg-[#1E293B] text-white flex items-center justify-between px-8 shrink-0 border-b-4 border-[#3B82F6]">
        <div>
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className="text-2xl font-bold tracking-tight uppercase hover:text-blue-300 transition-colors text-left"
          >
            Dự án STEM: Thiết kế Mạng điện Thông minh
          </button>
          <p className="text-xs text-blue-300 font-mono tracking-widest mt-1">SYSTEM ARCHITECTURE & ENERGY OPTIMIZATION</p>
        </div>
        <div className="hidden md:flex gap-4">
          <div className="bg-blue-900/50 px-4 py-2 rounded border border-blue-500/30 text-center">
            <p className="text-[10px] uppercase opacity-60">Tiến độ dự án</p>
            <p className="text-sm font-bold">ACTIVE</p>
          </div>
          <div className="bg-green-900/50 px-4 py-2 rounded border border-green-500/30 text-center">
            <p className="text-[10px] uppercase opacity-60">Nhóm thực hiện</p>
            <p className="text-sm font-bold uppercase">Future Engineers</p>
          </div>
        </div>
      </header>

      <nav className="flex h-14 bg-white border-b border-gray-200 shrink-0 overflow-x-auto">
        <button onClick={() => setCurrentPage('engage')} className={`flex-1 min-w-[120px] font-bold text-xs uppercase tracking-tighter border-r border-gray-200 transition-colors ${currentPage === 'engage' ? 'bg-blue-600 text-white border-blue-700' : 'hover:bg-gray-50 text-gray-600'}`}>01. Gắn kết</button>
        <button onClick={() => setCurrentPage('explore')} className={`flex-1 min-w-[120px] font-bold text-xs uppercase tracking-tighter border-r border-gray-200 transition-colors ${currentPage === 'explore' ? 'bg-blue-600 text-white border-blue-700' : 'hover:bg-gray-50 text-gray-600'}`}>02. Khám phá</button>
        <button onClick={() => setCurrentPage('explain')} className={`flex-1 min-w-[120px] font-bold text-xs uppercase tracking-tighter border-r border-gray-200 transition-colors ${currentPage === 'explain' ? 'bg-blue-600 text-white border-blue-700' : 'hover:bg-gray-50 text-gray-600'}`}>03. Giải thích</button>
        <button onClick={() => setCurrentPage('elaborate')} className={`flex-1 min-w-[120px] font-bold text-xs uppercase tracking-tighter border-r border-gray-200 transition-colors ${currentPage === 'elaborate' ? 'bg-blue-600 text-white border-blue-700' : 'hover:bg-gray-50 text-gray-600'}`}>04. Vận dụng</button>
        <button onClick={() => setCurrentPage('evaluate')} className={`flex-1 min-w-[120px] font-bold text-xs uppercase tracking-tighter transition-colors ${currentPage === 'evaluate' ? 'bg-blue-600 text-white border-blue-700' : 'hover:bg-gray-50 text-gray-600'}`}>05. Đánh giá</button>
      </nav>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {renderPage()}
      </main>
      
      <footer className="h-8 bg-gray-100 border-t border-gray-300 flex items-center justify-between px-6 text-[10px] text-gray-500 shrink-0 uppercase font-mono mt-auto hidden md:flex">
        <div className="flex gap-6">
          <span>SYSTEM: ONLINE</span>
          <span>GRID_STABILITY: 98.2%</span>
        </div>
        <div>
          © 2024 STEM PROJECT HUB • PHÒNG THÍ NGHIỆM ĐIỆN
        </div>
      </footer>
    </div>
  );
}
