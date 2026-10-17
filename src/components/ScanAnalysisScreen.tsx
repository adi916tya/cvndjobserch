import React, { useState } from 'react';
import { ATSKeyword, CandidateDossier, CompetencyItem, OptimizationRecommendation, StudioBenchmark } from '../types';

interface ScanAnalysisScreenProps {
  benchmark: StudioBenchmark;
  dossier: CandidateDossier;
  onNavigateToReformat: () => void;
  onOpenDossierModal: () => void;
  onInspectKeyword: (keyword: ATSKeyword) => void;
  onApplyRecommendation: (rec: OptimizationRecommendation) => void;
  onResolveCompetencyGap: (item: CompetencyItem) => void;
}

export const ScanAnalysisScreen: React.FC<ScanAnalysisScreenProps> = ({
  benchmark,
  dossier,
  onNavigateToReformat,
  onOpenDossierModal,
  onInspectKeyword,
  onApplyRecommendation,
  onResolveCompetencyGap
}) => {
  const [bouncedChipId, setBouncedChipId] = useState<string | null>(null);

  const handleChipClick = (kw: ATSKeyword) => {
    setBouncedChipId(kw.id);
    setTimeout(() => setBouncedChipId(null), 250);
    onInspectKeyword(kw);
  };

  // Calculate live score
  const score = benchmark.overallMatch;
  // Circumference calculation for stroke-dasharray (r = 15.9155 -> C = 100)
  const dashoffset = 100 - score;

  const detectedKeywordsCount = benchmark.keywords.filter((k) => k.detected).length;
  const missingKeywordsCount = benchmark.keywords.filter((k) => !k.detected).length;
  const remainingRecommendationsCount = benchmark.recommendations.filter((r) => !r.applied).length;

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 md:px-6 pt-4 pb-12">
      {/* Dossier Alignment Header Card */}
      <div className="w-full bg-[#f3ede9] rounded-2xl p-5 shadow-xs mb-4 border border-[#e7e1de]/60">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#934525]">
            Dossier Alignment
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#d4e8d4] text-[#576959] text-[0.75rem] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#516353] animate-pulse"></span>
            Curatorial Review Live
          </span>
        </div>

        {/* Candidate vs Target JD Pair */}
        <div className="flex flex-col gap-2">
          {/* Active Dossier */}
          <div
            onClick={onOpenDossierModal}
            className="flex items-center gap-3 bg-[#ffffff] p-3 rounded-xl border border-[#e7e1de]/80 cursor-pointer hover:border-[#934525]/40 transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#f3ede9] flex items-center justify-center text-[#934525] shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">description</span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[0.6875rem] uppercase font-semibold text-[#55433c] block">
                Active Dossier
              </span>
              <p className="text-[0.875rem] font-semibold text-[#1d1b19] truncate">
                {dossier.fileName}
              </p>
            </div>
            <span className="text-[0.6875rem] font-bold text-[#516353] bg-[#d4e8d4]/70 px-2 py-0.5 rounded-full">
              {dossier.version}
            </span>
          </div>

          {/* Swap divider icon */}
          <div className="flex items-center justify-center -my-1">
            <button
              onClick={onOpenDossierModal}
              className="w-6 h-6 rounded-full bg-[#ede7e3] hover:bg-[#dfd9d5] flex items-center justify-center text-[#55433c] shadow-xs cursor-pointer transition-transform hover:rotate-180"
              title="Switch Dossier or Target Benchmark"
            >
              <span className="material-symbols-outlined text-[14px]">swap_vert</span>
            </button>
          </div>

          {/* Benchmark Specification */}
          <div
            onClick={onOpenDossierModal}
            className="flex items-center gap-3 bg-[#ffffff] p-3 rounded-xl border border-[#e7e1de]/80 cursor-pointer hover:border-[#934525]/40 transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#ffdbce] flex items-center justify-center text-[#934525] shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">apartment</span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[0.6875rem] uppercase font-semibold text-[#55433c] block">
                Benchmark Specification
              </span>
              <p className="text-[0.875rem] font-semibold text-[#1d1b19] truncate">
                {benchmark.studioName} — {benchmark.roleTitle}
              </p>
            </div>
            <span className="text-[0.6875rem] font-semibold text-[#55433c] bg-[#f3ede9] px-2 py-0.5 rounded-full">
              {benchmark.location}
            </span>
          </div>
        </div>
      </div>

      {/* Spatial ATS Index Archetype Card */}
      <div className="w-full bg-[#f9f2ef] rounded-2xl p-5 shadow-xs mb-5 relative overflow-hidden border border-[#e7e1de]/60">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#934525]/5 pointer-events-none"></div>

        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex flex-col">
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#55433c] mb-1">
              Spatial ATS Index
            </span>
            <h2 className="font-serif-headline text-2xl md:text-[1.75rem] text-[#1d1b19] font-semibold tracking-tight leading-snug">
              {score >= 90
                ? 'Ultra Architectural Affinity'
                : score >= 80
                ? 'High Architectural Affinity'
                : 'Moderate Alignment'}
            </h2>
            <p className="text-[0.8125rem] text-[#934525] font-semibold mt-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">info</span>
              {benchmark.criticalGapsCount > 0
                ? `Good fit with ${benchmark.criticalGapsCount} critical technical gaps`
                : 'Fully calibrated for partner review'}
            </p>
          </div>

          {/* Circular Metric Ring */}
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#e7e1de]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="text-[#934525] transition-all duration-700 ease-out"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={`${score}, 100`}
                strokeLinecap="round"
                strokeWidth="3"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="font-serif-headline text-[1.25rem] font-bold text-[#1d1b19] leading-none">
                {score}%
              </span>
              <span className="text-[0.625rem] text-[#55433c] uppercase font-bold tracking-wider mt-0.5">
                Match
              </span>
            </div>
          </div>
        </div>

        {/* Micro-Dimensional Progression Bars */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="bg-[#ffffff] p-2.5 rounded-xl border border-[#e7e1de]/60">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[0.6875rem] font-medium text-[#55433c]">Revit / BIM</span>
              <span className="text-[0.6875rem] text-[#516353] font-bold">
                {benchmark.subMetrics.bimLOD}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#e7e1de] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#516353] rounded-full transition-all duration-500"
                style={{ width: `${benchmark.subMetrics.bimLOD}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-[#ffffff] p-2.5 rounded-xl border border-[#e7e1de]/60">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[0.6875rem] font-medium text-[#55433c]">FF&amp;E Procurement</span>
              <span className="text-[0.6875rem] text-[#516353] font-bold">
                {benchmark.subMetrics.procurement}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#e7e1de] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#516353] rounded-full transition-all duration-500"
                style={{ width: `${benchmark.subMetrics.procurement}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-[#ffffff] p-2.5 rounded-xl border border-[#e7e1de]/60">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[0.6875rem] font-medium text-[#55433c]">Heritage Spec</span>
              <span
                className={`text-[0.6875rem] font-bold ${
                  benchmark.subMetrics.heritageSpec >= 70
                    ? 'text-[#516353]'
                    : 'text-[#934525]'
                }`}
              >
                {benchmark.subMetrics.heritageSpec}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#e7e1de] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  benchmark.subMetrics.heritageSpec >= 70
                    ? 'bg-[#516353]'
                    : 'bg-[#934525]'
                }`}
                style={{ width: `${benchmark.subMetrics.heritageSpec}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Studio Material Aesthetic Context Image */}
      <div className="w-full h-36 rounded-2xl overflow-hidden relative mb-5 shadow-xs border border-[#e7e1de]/60 group">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          alt="High-end architectural studio moodboard with limestone, patinated bronze, oak swatches"
          src={benchmark.aestheticImage}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1d1b19]/85 via-[#1d1b19]/35 to-transparent flex items-end p-4">
          <div className="flex items-center gap-2 text-[#fff8f4]">
            <span className="material-symbols-outlined text-[18px] text-[#ffdbce]">
              architecture
            </span>
            <span className="text-[0.75rem] font-semibold tracking-wide">
              Benchmarked to {benchmark.aestheticStandard}
            </span>
          </div>
        </div>
      </div>

      {/* Section 1: Core Competency Matrix */}
      <div className="w-full flex flex-col gap-3 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#934525]"></span>
            <h3 className="font-serif-headline text-lg md:text-xl font-semibold text-[#1d1b19]">
              Core Competency Matrix
            </h3>
          </div>
          <span className="text-[0.75rem] font-semibold text-[#55433c]">
            {benchmark.clusters.reduce((acc, c) => acc + c.matchCount, 0)} of{' '}
            {benchmark.clusters.reduce((acc, c) => acc + c.items.length, 0)} Verified
          </span>
        </div>

        {/* Competency Clusters */}
        {benchmark.clusters.map((cluster) => (
          <div
            key={cluster.id}
            className="bg-[#f3ede9] rounded-2xl p-4 flex flex-col gap-2.5 border border-[#e7e1de]/60"
          >
            <div className="flex items-center justify-between pb-1">
              <span className="text-[0.75rem] font-bold uppercase tracking-wider text-[#55433c] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#69594b]">
                  {cluster.icon}
                </span>
                {cluster.title}
              </span>
              <span className="text-[0.6875rem] font-semibold text-[#516353]">
                {cluster.matchCount} Matched {cluster.gapCount > 0 ? `· ${cluster.gapCount} Gap` : ''}
              </span>
            </div>

            {/* Competency Items */}
            {cluster.items.map((item) => {
              const isMatch = item.status === 'match';
              return (
                <div
                  key={item.id}
                  className="bg-[#ffffff] p-3 rounded-xl flex items-center justify-between gap-2.5 border border-[#e7e1de]/60 hover:shadow-xs transition-shadow"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-[0.875rem] font-semibold text-[#1d1b19]">
                        {item.name}
                      </p>
                      {isMatch ? (
                        <span
                          className="material-symbols-outlined text-[#516353] text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                      ) : (
                        <span className="material-symbols-outlined text-[#934525] text-[16px]">
                          warning
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-[0.8125rem] truncate mt-0.5 ${
                        isMatch ? 'text-[#55433c]' : 'text-[#934525]'
                      }`}
                    >
                      {item.candidateDetail}
                    </p>
                  </div>

                  {isMatch ? (
                    <span className="px-2.5 py-1 rounded-full bg-[#d4e8d4] text-[#576959] text-[0.6875rem] font-bold shrink-0">
                      Match ✓
                    </span>
                  ) : (
                    <button
                      onClick={() => onResolveCompetencyGap(item)}
                      className="px-2.5 py-1 rounded-full bg-[#ffdbce] text-[#783112] text-[0.6875rem] font-bold shrink-0 hover:bg-[#ffb599] transition-colors cursor-pointer flex items-center gap-1"
                      title="Click to resolve this gap in Reformat Studio"
                    >
                      <span>Gap ⚠️</span>
                      <span className="material-symbols-outlined text-[12px]">edit</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Section 2: ATS Keyword Detection & Missing Terms */}
      <div className="w-full bg-[#f9f2ef] rounded-2xl p-5 shadow-xs mb-5 border border-[#e7e1de]/60">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#934525] text-[20px]">
              filter_alt
            </span>
            <h3 className="font-serif-headline text-lg md:text-xl font-semibold text-[#1d1b19]">
              ATS Keyword Parsing
            </h3>
          </div>
          <span className="text-[0.75rem] font-medium text-[#55433c]">
            Tap chip to inspect
          </span>
        </div>

        <p className="text-[0.8125rem] text-[#55433c] mb-4 leading-relaxed">
          Live semantic scanner results across 42 industry descriptors extracted from {benchmark.studioName}’s listing.
        </p>

        {/* Interactive Chip Matrix */}
        <div className="flex flex-wrap gap-2 mb-4" id="keyword-container">
          {benchmark.keywords.map((kw) => {
            const isDetected = kw.detected;
            const isBouncing = bouncedChipId === kw.id;
            return (
              <button
                key={kw.id}
                type="button"
                onClick={() => handleChipClick(kw)}
                className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.75rem] font-semibold shadow-2xs transition-all duration-150 cursor-pointer ${
                  isBouncing ? 'scale-110 ring-2 ring-[#934525]' : 'hover:scale-102 active:scale-95'
                } ${
                  isDetected
                    ? 'bg-[#d4e8d4] text-[#576959] hover:bg-[#c3dec3]'
                    : 'bg-[#ffdbce] text-[#783112] hover:bg-[#ffb599]'
                }`}
                title={`Click to inspect '${kw.term}'`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {isDetected ? 'check' : 'add'}
                </span>
                <span>{kw.term}</span>
              </button>
            );
          })}
        </div>

        {/* Keyword Legend */}
        <div className="flex items-center gap-5 pt-2 text-[#55433c] text-[0.75rem] border-t border-[#e7e1de]/60">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d4e8d4]"></span>
            <span>Detected in CV ({detectedKeywordsCount})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffdbce]"></span>
            <span>Missing JD Tokens ({missingKeywordsCount})</span>
          </div>
        </div>
      </div>

      {/* Section 3: Curatorial Recommendations */}
      <div className="w-full flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#934525] text-[20px]">
              auto_awesome
            </span>
            <h3 className="font-serif-headline text-lg md:text-xl font-semibold text-[#1d1b19]">
              Optimization Editorial
            </h3>
          </div>
          <span className="text-[0.75rem] bg-[#934525]/10 text-[#934525] px-2.5 py-0.5 rounded-full font-bold">
            {remainingRecommendationsCount > 0
              ? `${remainingRecommendationsCount} Actions Recommended`
              : 'All Applied ✓'}
          </span>
        </div>

        {benchmark.recommendations.map((rec) => (
          <div
            key={rec.id}
            className={`bg-[#f3ede9] rounded-2xl p-4 shadow-xs flex flex-col gap-2.5 border transition-all ${
              rec.applied ? 'border-[#516353]/30 bg-[#f3ede9]/70' : 'border-[#e7e1de]/60'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  rec.boostType === 'primary'
                    ? 'bg-[#ffdbce] text-[#934525]'
                    : 'bg-[#d4e8d4] text-[#516353]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {rec.boostType === 'primary' ? 'straighten' : 'vertical_align_top'}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-[0.875rem] font-bold text-[#1d1b19]">
                    {rec.title}
                  </h4>
                  <span
                    className={`text-[0.6875rem] font-bold shrink-0 ${
                      rec.boostType === 'primary' ? 'text-[#934525]' : 'text-[#516353]'
                    }`}
                  >
                    {rec.boostBadge}
                  </span>
                </div>
                <p className="text-[0.8125rem] text-[#55433c] mt-1 leading-relaxed">
                  {rec.description}
                </p>
              </div>
            </div>

            <div className="bg-[#ffffff] p-2.5 rounded-xl flex items-center justify-between text-[#1d1b19] border border-[#e7e1de]/60">
              <span className="text-[0.6875rem] text-[#55433c] truncate pr-2">
                {rec.targetSection}
              </span>
              <button
                onClick={() => onApplyRecommendation(rec)}
                disabled={rec.applied}
                className={`text-[0.75rem] font-bold shrink-0 cursor-pointer transition-colors ${
                  rec.applied
                    ? 'text-[#516353] flex items-center gap-1 cursor-default'
                    : rec.boostType === 'primary'
                    ? 'text-[#934525] hover:text-[#b25d3a] underline underline-offset-2'
                    : 'text-[#516353] hover:text-[#3a4b3c] underline underline-offset-2'
                }`}
              >
                {rec.applied ? (
                  <>
                    <span className="material-symbols-outlined text-[14px]">check</span>
                    Applied to Dossier
                  </>
                ) : (
                  rec.buttonLabel
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Spatial Designer Quote Note */}
      <div className="w-full bg-[#ffffff] rounded-2xl p-6 mb-6 text-center flex flex-col items-center border border-[#e7e1de]/80 shadow-2xs">
        <span className="material-symbols-outlined text-[#934525] mb-2 text-2xl">
          format_quote
        </span>
        <p className="font-serif-headline text-lg md:text-xl italic text-[#1d1b19] max-w-sm leading-relaxed">
          "{benchmark.quote.text}"
        </p>
        <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#55433c] mt-2">
          — {benchmark.quote.author}
        </span>
      </div>

      {/* Primary Floating Reformat CTA */}
      <div className="w-full sticky bottom-20 z-20">
        <div className="bg-[#e7e1de]/90 backdrop-blur-md p-2 rounded-full shadow-lg border border-white/60 flex items-center justify-between gap-3">
          <div className="pl-4 py-1 flex flex-col">
            <span className="text-[0.6875rem] text-[#55433c] uppercase font-bold tracking-wider">
              Ready for studio dispatch
            </span>
            <span className="text-[0.875rem] text-[#1d1b19] font-bold">
              {benchmark.criticalGapsCount > 0
                ? `${benchmark.criticalGapsCount} Gaps Solvable in Studio`
                : '100% Calibrated for Dispatch'}
            </span>
          </div>
          <button
            onClick={onNavigateToReformat}
            className="px-5 py-3 rounded-full bg-[#934525] hover:bg-[#b25d3a] text-white font-semibold text-[0.875rem] flex items-center gap-2 shadow-md transition-all active:scale-98 shrink-0 cursor-pointer"
          >
            <span>Reformat &amp; Optimize</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
