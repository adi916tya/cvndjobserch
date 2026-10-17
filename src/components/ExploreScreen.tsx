import React, { useState } from 'react';
import { STUDIO_BENCHMARKS } from '../data/mockData';
import { StudioBenchmark } from '../types';

interface ExploreScreenProps {
  activeBenchmark: StudioBenchmark;
  onSelectBenchmark: (benchmark: StudioBenchmark) => void;
  onNavigateToScan: () => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  activeBenchmark,
  onSelectBenchmark,
  onNavigateToScan
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypology, setSelectedTypology] = useState<string>('All');

  const typologies = ['All', 'Residential', 'Hospitality', 'Warm Minimalist', 'High Jewelry'];

  const filtered = STUDIO_BENCHMARKS.filter((b) => {
    const matchesSearch =
      b.studioName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.location.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedTypology === 'All') return matchesSearch;
    return matchesSearch && b.firmType.toLowerCase().includes(selectedTypology.toLowerCase());
  });

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 md:px-6 pt-4 pb-20">
      {/* Explore Header */}
      <div className="mb-4">
        <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#934525] block">
          Spatial Benchmarks
        </span>
        <h2 className="font-serif-headline text-2xl font-bold text-[#1d1b19]">
          Elite Architectural Studios
        </h2>
        <p className="text-xs text-[#55433c] mt-0.5">
          Curated ATS specification criteria modeled directly from premier European &amp; Global ateliers.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-2.5 mb-5">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#55433c] text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search by studio, location, or typology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#f9f2ef] rounded-xl border border-[#e7e1de] text-xs text-[#1d1b19] focus:outline-none focus:border-[#934525]"
          />
        </div>

        {/* Typology Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {typologies.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTypology(t)}
              className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 cursor-pointer transition-all ${
                selectedTypology === t
                  ? 'bg-[#934525] text-white shadow-xs'
                  : 'bg-[#f3ede9] text-[#55433c] hover:bg-[#ede7e3]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Studio Benchmark Cards */}
      <div className="flex flex-col gap-4">
        {filtered.map((studio) => {
          const isActive = studio.id === activeBenchmark.id;
          return (
            <div
              key={studio.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-xs border transition-all ${
                isActive
                  ? 'border-[#934525] ring-2 ring-[#ffdbce]'
                  : 'border-[#e7e1de] hover:border-[#934525]/40'
              }`}
            >
              <div className="relative h-28 w-full overflow-hidden">
                <img
                  src={studio.aestheticImage}
                  alt={studio.studioName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-3">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[11px] font-bold text-white bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
                      {studio.location}
                    </span>
                    <span className="text-xs font-bold text-white bg-[#934525] px-2.5 py-0.5 rounded-full">
                      {studio.overallMatch}% Match
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif-headline text-lg font-bold text-[#1d1b19]">
                      {studio.studioName}
                    </h3>
                    <p className="text-xs font-semibold text-[#934525]">
                      {studio.roleTitle}
                    </p>
                    <p className="text-[11px] text-[#55433c] mt-0.5">
                      {studio.firmType}
                    </p>
                  </div>
                  {isActive && (
                    <span className="px-2.5 py-1 rounded-full bg-[#d4e8d4] text-[#576959] text-[10px] font-bold shrink-0">
                      Active Benchmark ✓
                    </span>
                  )}
                </div>

                {/* Submetrics preview */}
                <div className="grid grid-cols-3 gap-2 bg-[#f9f2ef] p-2.5 rounded-xl border border-[#e7e1de]/60 text-center">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#55433c] block">
                      BIM LOD
                    </span>
                    <span className="text-xs font-bold text-[#516353]">
                      {studio.subMetrics.bimLOD}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#55433c] block">
                      FF&amp;E Procurement
                    </span>
                    <span className="text-xs font-bold text-[#516353]">
                      {studio.subMetrics.procurement}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#55433c] block">
                      Heritage Spec
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        studio.subMetrics.heritageSpec >= 70 ? 'text-[#516353]' : 'text-[#934525]'
                      }`}
                    >
                      {studio.subMetrics.heritageSpec}%
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      onSelectBenchmark(studio);
                      onNavigateToScan();
                    }}
                    className={`flex-1 py-2 px-3 rounded-full text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                      isActive
                        ? 'bg-[#516353] text-white hover:bg-[#3a4b3c]'
                        : 'bg-[#934525] text-white hover:bg-[#b25d3a]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isActive ? 'check' : 'sync'}
                    </span>
                    {isActive ? 'View Live Analysis' : 'Calibrate Scan to this Studio'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
