import React from 'react';

interface HeaderProps {
  onProfileClick: () => void;
  onDossierClick?: () => void;
  currentRoleTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onProfileClick,
  currentRoleTitle = 'Senior Spatial Designer'
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top,0px)] bg-[#fff8f4]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(28,26,24,0.04)] border-b border-[#e7e1de]/40">
      <div className="max-w-2xl mx-auto h-16 px-4 md:px-6 flex items-center justify-between">
        {/* Brand & Monogram */}
        <div className="flex items-center gap-3">
          <img
            alt="AtelierMatch Monogram Logo"
            className="h-8 w-auto object-contain cursor-pointer transition-transform hover:scale-105 active:scale-95"
            src="https://lh3.googleusercontent.com/aida/AEtjO1V8-4wUudIXNCynEsjsQD02QiiWs6yAuc-9k4imBJkTkJfHO-izR_aG6YyT1BOX9FD2f1p47CeqmE3UuVbrWERQmB3_V6xmIOtYmUqoKmZR7LEoNjw72QRvdnM3hECJVY9KbuQ7Kjhq-QWXcpyf7Ieki_h8HX_49eh2F8fXk25cW4lILdZvARkFMoaTBmpNFRDnQ4Zvl3bINM4mg2DWhduysgPsXCeUnZ9Dqka69_qsC8IP2zJtRcmz6_I"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif-headline text-[1.25rem] font-semibold tracking-tight text-[#1d1b19]">
                AtelierMatch
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#934525]/50"></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#934525]">
                Scan Analysis
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#d4e8d4]/70 text-[#576959] text-[0.6875rem] font-semibold leading-none">
                {currentRoleTitle}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Avatar with Indicator */}
        <div className="flex items-center gap-2">
          <button
            onClick={onProfileClick}
            type="button"
            className="relative p-1 rounded-full flex items-center justify-center focus:outline-none min-h-[44px] min-w-[44px] hover:ring-2 hover:ring-[#934525]/20 transition-all"
            aria-label="Designer Profile and Credentials"
          >
            <img
              alt="Camille Vasseur Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#e7e1de]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsYiDs600m7lgxQJ7a_MWnMecJ75KMqNgTCj6XxH6NkwXjRZvilw_GFzlzYaE-Giq8loTAokz8KUUJJhCU-R9kVFLvjhzCTWx6H6XZXl9x6D3bhZjuuHe1v_n543bHTgx_LIdrraC3a_v5tTNQMv83liEsX0Bev25IfErXzQHLiaYmOzjpE2Rq8ae_qRmBXa6Ok39zuCKpSnMmQ0qhsJfUshDJr1Q8rMfD_WUiCh2fLQV8fcPAFG_"
            />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#934525] ring-2 ring-[#fff8f4]"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
