import React from 'react';
import { CandidateDossier } from '../types';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  dossier: CandidateDossier;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  dossier
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full max-w-sm bg-[#fff8f4] h-full p-6 shadow-2xl flex flex-col justify-between border-l border-[#e7e1de] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#e7e1de]">
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#934525]">
              Architect Dossier Profile
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#f3ede9] hover:bg-[#ede7e3] text-[#55433c] flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Profile Card */}
          <div className="flex items-center gap-3.5 my-6">
            <div className="relative">
              <img
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-[#934525]/30"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsYiDs600m7lgxQJ7a_MWnMecJ75KMqNgTCj6XxH6NkwXjRZvilw_GFzlzYaE-Giq8loTAokz8KUUJJhCU-R9kVFLvjhzCTWx6H6XZXl9x6D3bhZjuuHe1v_n543bHTgx_LIdrraC3a_v5tTNQMv83liEsX0Bev25IfErXzQHLiaYmOzjpE2Rq8ae_qRmBXa6Ok39zuCKpSnMmQ0qhsJfUshDJr1Q8rMfD_WUiCh2fLQV8fcPAFG_"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#516353] ring-2 ring-[#fff8f4]"></span>
            </div>
            <div>
              <h3 className="font-serif-headline text-lg font-bold text-[#1d1b19]">
                {dossier.candidateName}
              </h3>
              <p className="text-xs text-[#55433c]">{dossier.title}</p>
              <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-[#516353] bg-[#d4e8d4] px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#516353]"></span>
                HMONP Certified • Ordre des Architectes
              </span>
            </div>
          </div>

          {/* Credentials Matrix */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#934525]">
              Spatial Credentials &amp; Standards
            </span>
            <div className="bg-white p-3.5 rounded-xl border border-[#e7e1de] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#1d1b19] block">
                  Haussmannian Heritage Familiarity
                </span>
                <span className="text-[11px] text-[#55433c]">
                  Classified interiors &amp; ABF protocols
                </span>
              </div>
              <span className="text-xs font-bold text-[#934525]">Grade A</span>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-[#e7e1de] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#1d1b19] block">
                  BIM Level of Detail (LOD)
                </span>
                <span className="text-[11px] text-[#55433c]">
                  Autodesk Revit 2024 / Dynamo
                </span>
              </div>
              <span className="text-xs font-bold text-[#516353]">LOD 350+</span>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-[#e7e1de] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#1d1b19] block">
                  Artisan Network (France &amp; Italy)
                </span>
                <span className="text-[11px] text-[#55433c]">
                  Ebénisterie, Bronzerie, Marbrerie
                </span>
              </div>
              <span className="text-xs font-bold text-[#516353]">42 Houses</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#e7e1de]">
          <p className="text-[11px] text-[#55433c] text-center mb-3">
            AtelierMatch Studio Engine v3.4 • Paris
          </p>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-[#ede7e3] hover:bg-[#dfd9d5] text-xs font-semibold text-[#1d1b19] transition-colors cursor-pointer"
          >
            Close Settings
          </button>
        </div>
      </div>
    </div>
  );
};
