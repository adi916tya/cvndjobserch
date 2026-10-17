import React from 'react';
import { ATSKeyword } from '../types';

interface KeywordModalProps {
  keyword: ATSKeyword | null;
  onClose: () => void;
  onInsertKeyword: (keyword: ATSKeyword) => void;
}

export const KeywordModal: React.FC<KeywordModalProps> = ({
  keyword,
  onClose,
  onInsertKeyword
}) => {
  if (!keyword) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[#fff8f4] rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl border border-[#e7e1de] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e7e1de]">
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                keyword.detected ? 'bg-[#516353]' : 'bg-[#934525]'
              }`}
            ></span>
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#934525]">
              ATS Keyword Inspector
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f3ede9] hover:bg-[#ede7e3] text-[#55433c] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="pt-4 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-serif-headline text-2xl font-bold text-[#1d1b19]">
                {keyword.term}
              </h3>
              <p className="text-xs text-[#55433c] mt-0.5">
                Category: <span className="font-semibold text-[#1d1b19]">{keyword.category}</span>
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                keyword.detected
                  ? 'bg-[#d4e8d4] text-[#576959]'
                  : 'bg-[#ffdbce] text-[#783112]'
              }`}
            >
              {keyword.detected ? 'Detected in Dossier ✓' : 'Missing Token ⚠️'}
            </span>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-3 bg-[#f9f2ef] p-3.5 rounded-xl border border-[#e7e1de]/60">
            <div>
              <span className="text-[0.6875rem] uppercase text-[#55433c] block font-semibold">
                JD Frequency
              </span>
              <p className="text-lg font-bold text-[#1d1b19]">
                {keyword.frequencyInJD} <span className="text-xs font-normal text-[#55433c]">occurrences</span>
              </p>
            </div>
            <div>
              <span className="text-[0.6875rem] uppercase text-[#55433c] block font-semibold">
                Parsing Weight
              </span>
              <p className="text-lg font-bold text-[#934525] capitalize">
                {keyword.relevance}
              </p>
            </div>
          </div>

          {/* Curatorial Context */}
          <div className="bg-[#f3ede9] p-4 rounded-xl flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#934525] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              Studio Benchmark Context
            </span>
            <p className="text-sm text-[#1d1b19] leading-relaxed">
              {keyword.suggestedContext}
            </p>
          </div>

          {/* Suggested Placement in CV */}
          {!keyword.detected && (
            <div className="bg-white p-4 rounded-xl border border-[#dbc1b8] flex flex-col gap-2">
              <span className="text-xs font-bold text-[#783112] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">auto_fix_high</span>
                Recommended CV Bullet Insertion
              </span>
              <blockquote className="italic text-xs text-[#55433c] border-l-2 border-[#934525] pl-3 py-1">
                "Spearheaded {keyword.term} protocols for high-net-worth spatial architecture commissions, aligning material craft with European compliance standards."
              </blockquote>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            {!keyword.detected ? (
              <button
                onClick={() => {
                  onInsertKeyword(keyword);
                  onClose();
                }}
                className="flex-1 py-3 px-4 rounded-full bg-[#934525] hover:bg-[#b25d3a] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                Insert into Active Dossier (+3% Boost)
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-full bg-[#516353] hover:bg-[#3a4b3c] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">check</span>
                Keyword Verified in Dossier
              </button>
            )}
            <button
              onClick={onClose}
              className="py-3 px-5 rounded-full bg-[#ede7e3] hover:bg-[#dfd9d5] text-[#1d1b19] font-semibold text-sm transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
