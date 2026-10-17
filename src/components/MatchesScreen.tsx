import React from 'react';
import { CandidateDossier, StudioBenchmark } from '../types';

interface MatchesScreenProps {
  benchmark: StudioBenchmark;
  dossier: CandidateDossier;
  onNavigateToScan: () => void;
  onNavigateToReformat: () => void;
}

export const MatchesScreen: React.FC<MatchesScreenProps> = ({
  benchmark,
  dossier,
  onNavigateToScan,
  onNavigateToReformat
}) => {
  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 md:px-6 pt-4 pb-20">
      {/* Header */}
      <div className="mb-4">
        <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#934525] block">
          Curatorial Applications &amp; Matches
        </span>
        <h2 className="font-serif-headline text-2xl font-bold text-[#1d1b19]">
          Studio Pipeline &amp; Readiness
        </h2>
        <p className="text-xs text-[#55433c] mt-0.5">
          Track matched architectural studios, dossier revisions, and physical portfolio submissions.
        </p>
      </div>

      {/* Primary Active Match Banner */}
      <div className="bg-[#f3ede9] rounded-2xl p-5 mb-5 border border-[#e7e1de]/60 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-[#934525] uppercase tracking-wider">
            Primary Target Studio
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#d4e8d4] text-[#576959] text-[11px] font-bold">
            Curatorial Review Open
          </span>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-serif-headline text-xl font-bold text-[#1d1b19]">
              {benchmark.studioName}
            </h3>
            <p className="text-xs text-[#55433c]">
              {benchmark.roleTitle} • {benchmark.location}
            </p>
          </div>
          <div className="text-right">
            <span className="font-serif-headline text-2xl font-bold text-[#934525]">
              {benchmark.overallMatch}%
            </span>
            <span className="text-[10px] text-[#55433c] block font-semibold uppercase">
              Affinity Score
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#e7e1de]">
          <button
            onClick={onNavigateToScan}
            className="flex-1 py-2 rounded-full bg-white hover:bg-[#ede7e3] text-[#1d1b19] border border-[#e7e1de] text-xs font-semibold transition-colors cursor-pointer"
          >
            Review Scan
          </button>
          <button
            onClick={onNavigateToReformat}
            className="flex-1 py-2 rounded-full bg-[#934525] hover:bg-[#b25d3a] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Optimize Dossier
          </button>
        </div>
      </div>

      {/* Curatorial Submission Package Checklist */}
      <div className="bg-white rounded-2xl p-5 mb-5 border border-[#e7e1de] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#934525] text-[20px]">
              checklist
            </span>
            <h3 className="font-serif-headline text-lg font-bold text-[#1d1b19]">
              Dossier Dispatch Checklist
            </h3>
          </div>
          <span className="text-xs font-semibold text-[#516353]">3 of 4 Ready</span>
        </div>

        <div className="space-y-2.5">
          <div className="p-3 rounded-xl bg-[#f9f2ef] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#516353] text-[18px]">
                check_circle
              </span>
              <div>
                <p className="text-xs font-bold text-[#1d1b19]">
                  Spatial Architecture CV ({dossier.fileName})
                </p>
                <p className="text-[11px] text-[#55433c]">
                  Calibrated to {benchmark.studioName} standard
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#516353] bg-[#d4e8d4] px-2 py-0.5 rounded-full">
              Ready ✓
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#f9f2ef] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#516353] text-[18px]">
                check_circle
              </span>
              <div>
                <p className="text-xs font-bold text-[#1d1b19]">
                  1:5 Bespoke Millwork Workshop Plate Sample
                </p>
                <p className="text-[11px] text-[#55433c]">
                  Detailed ébénisterie drawings from Atelier Chardon
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#516353] bg-[#d4e8d4] px-2 py-0.5 rounded-full">
              Ready ✓
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#f9f2ef] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#516353] text-[18px]">
                check_circle
              </span>
              <div>
                <p className="text-xs font-bold text-[#1d1b19]">
                  Tactile Material Moodboard (High-Res 300 DPI)
                </p>
                <p className="text-[11px] text-[#55433c]">
                  Haussmannian French limestone, patinated bronze &amp; dark oak
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#516353] bg-[#d4e8d4] px-2 py-0.5 rounded-full">
              Ready ✓
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#f9f2ef] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#934525] text-[18px]">
                pending
              </span>
              <div>
                <p className="text-xs font-bold text-[#1d1b19]">
                  Bâtiments de France (ABF) Appendix
                </p>
                <p className="text-[11px] text-[#55433c]">
                  Required for Parisian classified heritage projects
                </p>
              </div>
            </div>
            <button
              onClick={onNavigateToReformat}
              className="text-[10px] font-bold text-[#783112] bg-[#ffdbce] px-2 py-0.5 rounded-full hover:bg-[#ffb599] transition-colors cursor-pointer"
            >
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* Submission Pipeline */}
      <div className="bg-white rounded-2xl p-5 border border-[#e7e1de] shadow-xs">
        <h3 className="font-serif-headline text-lg font-bold text-[#1d1b19] mb-3">
          Saved Studio Dossiers
        </h3>
        <div className="space-y-3">
          <div className="p-3 rounded-xl border border-[#e7e1de] flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#1d1b19]">Studio KO — Marrakech &amp; Paris</p>
              <p className="text-[11px] text-[#55433c]">Lead Hospitality Architect • 84% Affinity</p>
            </div>
            <span className="text-xs font-semibold text-[#55433c]">Standby</span>
          </div>
          <div className="p-3 rounded-xl border border-[#e7e1de] flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#1d1b19]">Vincent Van Duysen — Antwerp</p>
              <p className="text-[11px] text-[#55433c]">Head of Residential Spatial Design • 81% Affinity</p>
            </div>
            <span className="text-xs font-semibold text-[#55433c]">Drafting</span>
          </div>
        </div>
      </div>
    </div>
  );
};
