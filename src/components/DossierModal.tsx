import React, { useState } from 'react';
import { OTHER_DEMO_DOSSIERS } from '../data/mockData';
import { CandidateDossier, StudioBenchmark } from '../types';

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDossier: CandidateDossier;
  onSelectDemoDossier: (id: string) => void;
  benchmarks: StudioBenchmark[];
  activeBenchmark: StudioBenchmark;
  onSelectBenchmark: (benchmark: StudioBenchmark) => void;
  onUploadCustomCV: (fileName: string, text: string) => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({
  isOpen,
  onClose,
  activeDossier,
  onSelectDemoDossier,
  benchmarks,
  activeBenchmark,
  onSelectBenchmark,
  onUploadCustomCV
}) => {
  const [activeTab, setActiveTab] = useState<'switch' | 'upload' | 'benchmark'>('switch');
  const [customName, setCustomName] = useState('');
  const [customText, setCustomText] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[#fff8f4] rounded-2xl p-6 shadow-2xl border border-[#e7e1de] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e7e1de]">
          <div>
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#934525] block">
              Dossier &amp; Benchmark Alignment
            </span>
            <h3 className="font-serif-headline text-xl font-bold text-[#1d1b19]">
              Curatorial File Configuration
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f3ede9] hover:bg-[#ede7e3] text-[#55433c] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#ede7e3] p-1 rounded-xl mt-4 mb-4">
          <button
            onClick={() => setActiveTab('switch')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'switch'
                ? 'bg-white text-[#1d1b19] shadow-xs'
                : 'text-[#55433c] hover:text-[#1d1b19]'
            }`}
          >
            Select Dossier
          </button>
          <button
            onClick={() => setActiveTab('benchmark')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'benchmark'
                ? 'bg-white text-[#1d1b19] shadow-xs'
                : 'text-[#55433c] hover:text-[#1d1b19]'
            }`}
          >
            Studio Benchmark
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-white text-[#1d1b19] shadow-xs'
                : 'text-[#55433c] hover:text-[#1d1b19]'
            }`}
          >
            Upload / Paste CV
          </button>
        </div>

        {/* Tab 1: Select Demo Dossier */}
        {activeTab === 'switch' && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-[#55433c]">
              Select from curated spatial design portfolios or toggle between candidate dossiers:
            </p>
            {OTHER_DEMO_DOSSIERS.map((d) => {
              const isSelected = activeDossier.fileName === d.fileName;
              return (
                <div
                  key={d.id}
                  onClick={() => {
                    onSelectDemoDossier(d.id);
                    onClose();
                  }}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#934525] bg-[#ffdbce]/30'
                      : 'border-[#e7e1de] bg-white hover:bg-[#f9f2ef]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#934525] text-white'
                          : 'bg-[#f3ede9] text-[#55433c]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        description
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1d1b19]">
                        {d.fileName}
                      </p>
                      <p className="text-xs text-[#55433c]">
                        {d.candidateName} • {d.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#d4e8d4] text-[#576959]">
                      {d.version}
                    </span>
                    {isSelected && (
                      <span className="material-symbols-outlined text-[#934525] text-[18px]">
                        check_circle
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Target Benchmark Studio */}
        {activeTab === 'benchmark' && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-[#55433c]">
              Calibrate parsing filters against specific architectural studio benchmarks:
            </p>
            {benchmarks.map((b) => {
              const isSelected = activeBenchmark.id === b.id;
              return (
                <div
                  key={b.id}
                  onClick={() => {
                    onSelectBenchmark(b);
                    onClose();
                  }}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#934525] bg-[#ffdbce]/30'
                      : 'border-[#e7e1de] bg-white hover:bg-[#f9f2ef]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#934525] text-white'
                          : 'bg-[#ffdbce] text-[#934525]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        apartment
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1d1b19]">
                        {b.studioName}
                      </p>
                      <p className="text-xs text-[#55433c]">
                        {b.roleTitle} — {b.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#934525] block">
                      {b.overallMatch}% Match
                    </span>
                    <span className="text-[10px] text-[#55433c]">
                      {b.aestheticStandard.slice(0, 18)}...
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Upload / Paste Custom CV */}
        {activeTab === 'upload' && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-[#55433c]">
              Paste your CV markdown or plain text to scan against the {activeBenchmark.studioName} standard:
            </p>
            <div>
              <label className="text-xs font-semibold text-[#1d1b19] block mb-1">
                Dossier Label
              </label>
              <input
                type="text"
                placeholder="e.g. My_Spatial_Portfolio_CV.pdf"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#dbc1b8] bg-white focus:outline-none focus:border-[#934525]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#1d1b19] block mb-1">
                CV Experience &amp; Skills Text
              </label>
              <textarea
                rows={6}
                placeholder="Paste work experience, architectural proficiencies, and software competencies here..."
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#dbc1b8] bg-white focus:outline-none focus:border-[#934525] font-mono"
              ></textarea>
            </div>
            <button
              onClick={() => {
                if (!customText.trim()) return;
                onUploadCustomCV(customName || 'Custom_Dossier_2025.pdf', customText);
                onClose();
              }}
              className="w-full py-2.5 rounded-full bg-[#934525] hover:bg-[#b25d3a] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Run Curatorial Scan Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
