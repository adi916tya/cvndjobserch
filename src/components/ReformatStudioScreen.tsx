import React, { useState } from 'react';
import { ATSKeyword, CandidateDossier, CompetencyItem, OptimizationRecommendation, StudioBenchmark } from '../types';

interface ReformatStudioScreenProps {
  benchmark: StudioBenchmark;
  dossier: CandidateDossier;
  onUpdateDossier: (updatedDossier: CandidateDossier) => void;
  onApplyRecommendation: (rec: OptimizationRecommendation) => void;
  onResolveCompetencyGap: (item: CompetencyItem) => void;
  onNavigateToScan: () => void;
}

export const ReformatStudioScreen: React.FC<ReformatStudioScreenProps> = ({
  benchmark,
  dossier,
  onUpdateDossier,
  onApplyRecommendation,
  onResolveCompetencyGap,
  onNavigateToScan
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'editor' | 'diff'>('preview');
  const [copiedToast, setCopiedToast] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);

  // Editable fields
  const [summaryText, setSummaryText] = useState(dossier.sections.executiveSummary);
  const [bulletText0, setBulletText0] = useState(dossier.sections.experience[0]?.bullets[0] || '');
  const [bulletText3, setBulletText3] = useState(dossier.sections.experience[0]?.bullets[3] || '');

  const handleCopy = () => {
    const fullText = `# ${dossier.candidateName} — ${dossier.title}
Version: ${dossier.version} (Optimized for ${benchmark.studioName})
Target Spec: ${benchmark.roleTitle} (${benchmark.location})

## Executive Dossier
${summaryText}

## Professional Experience
### Atelier Chardon (2021 – 2024) — Senior Project Architect
- ${bulletText0}
- ${dossier.sections.experience[0]?.bullets[1]}
- ${dossier.sections.experience[0]?.bullets[2]}
- ${bulletText3}

### Studio Gilles & Boissier (2017 – 2021) — Interior Architect
- ${dossier.sections.experience[1]?.bullets[0]}
- ${dossier.sections.experience[1]?.bullets[1]}
- ${dossier.sections.experience[1]?.bullets[2]}

## Spatial & Technical Proficiencies
${dossier.sections.skills.map((s) => `- ${s.category}: ${s.items.join(', ')}`).join('\n')}
`;
    navigator.clipboard.writeText(fullText);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const handleAiAutoCurate = () => {
    setAiGenerating(true);
    setTimeout(() => {
      // Auto apply remaining recommendations
      benchmark.recommendations.forEach((r) => {
        if (!r.applied) onApplyRecommendation(r);
      });
      // Resolve missing gaps
      benchmark.clusters.forEach((c) => {
        c.items.forEach((item) => {
          if (item.status === 'gap') onResolveCompetencyGap(item);
        });
      });
      setAiGenerating(false);
    }, 1200);
  };

  const gapItems = benchmark.clusters.flatMap((c) => c.items.filter((i) => i.status === 'gap'));

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 md:px-6 pt-4 pb-20">
      {/* Studio Header & Score Calibration */}
      <div className="bg-[#f3ede9] rounded-2xl p-5 mb-4 border border-[#e7e1de]/60 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#934525]">
              Reformat &amp; Curatorial Studio
            </span>
            <span className="text-xs bg-[#d4e8d4] text-[#576959] px-2 py-0.5 rounded-full font-semibold">
              Live Calibration
            </span>
          </div>
          <button
            onClick={onNavigateToScan}
            className="text-xs text-[#934525] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            Back to Scan
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif-headline text-2xl font-bold text-[#1d1b19]">
              {dossier.candidateName}
            </h2>
            <p className="text-xs text-[#55433c]">
              Tailored for <span className="font-semibold text-[#1d1b19]">{benchmark.studioName}</span> • {benchmark.location}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-baseline justify-end gap-1">
              <span className="font-serif-headline text-2xl font-bold text-[#934525]">
                {benchmark.overallMatch}%
              </span>
              <span className="text-[10px] text-[#55433c] font-semibold uppercase">
                ATS Match
              </span>
            </div>
            <span className="text-[11px] text-[#516353] font-semibold">
              {gapItems.length === 0 ? 'All 3 Gaps Solved ✓' : `${gapItems.length} Gaps Remaining`}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Gap Solvers Bar */}
      {gapItems.length > 0 && (
        <div className="bg-[#fff8f4] p-4 rounded-2xl border border-[#dbc1b8] mb-4 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#934525] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">build</span>
              Quick Gap Solvers (1-Click Curatorial Injections)
            </span>
            <button
              onClick={handleAiAutoCurate}
              disabled={aiGenerating}
              className="text-xs px-3 py-1 rounded-full bg-[#934525] hover:bg-[#b25d3a] text-white font-semibold transition-all flex items-center gap-1 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[14px]">
                {aiGenerating ? 'hourglass_top' : 'auto_awesome'}
              </span>
              {aiGenerating ? 'Synthesizing...' : 'Resolve All with AI'}
            </button>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            {gapItems.map((gap) => (
              <div
                key={gap.id}
                className="bg-white p-3 rounded-xl border border-[#e7e1de] flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#934525] text-[16px]">
                      warning
                    </span>
                    <span className="text-xs font-bold text-[#1d1b19]">{gap.name}</span>
                  </div>
                  <p className="text-[11px] text-[#55433c] truncate mt-0.5">
                    {gap.suggestedPatch || gap.tip}
                  </p>
                </div>
                <button
                  onClick={() => onResolveCompetencyGap(gap)}
                  className="px-3 py-1 rounded-full bg-[#ffdbce] hover:bg-[#ffb599] text-[#783112] text-xs font-bold shrink-0 transition-colors cursor-pointer"
                >
                  Inject Patch +6%
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Studio View Selector */}
      <div className="flex bg-[#ede7e3] p-1 rounded-xl mb-4">
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'preview'
              ? 'bg-white text-[#1d1b19] shadow-xs'
              : 'text-[#55433c] hover:text-[#1d1b19]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">visibility</span>
          Dossier Presentation
        </button>
        <button
          onClick={() => setActiveTab('diff')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'diff'
              ? 'bg-white text-[#1d1b19] shadow-xs'
              : 'text-[#55433c] hover:text-[#1d1b19]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
          ATS Keyword Diff
        </button>
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'editor'
              ? 'bg-white text-[#1d1b19] shadow-xs'
              : 'text-[#55433c] hover:text-[#1d1b19]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">edit</span>
          Live Text Editor
        </button>
      </div>

      {/* Tab 1: Clean Presentation Dossier */}
      {activeTab === 'preview' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e7e1de] flex flex-col gap-5">
          {/* Header */}
          <div className="border-b border-[#e7e1de] pb-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-serif-headline text-2xl font-bold text-[#1d1b19]">
                  {dossier.candidateName}
                </h1>
                <p className="text-xs font-semibold text-[#934525] mt-0.5 tracking-wide">
                  {dossier.title} • HMONP Architect
                </p>
                <p className="text-[11px] text-[#55433c] mt-0.5">
                  Paris, France • camille.vasseur@spatial-atelier.fr • +33 (0)6 12 34 56 78
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#516353] bg-[#d4e8d4] px-2.5 py-1 rounded-full">
                Liaigre Benchmark Spec
              </span>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#934525] mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#934525]"></span>
              Executive Spatial Dossier
            </h3>
            <p className="text-xs md:text-sm text-[#1d1b19] leading-relaxed bg-[#f9f2ef] p-3.5 rounded-xl border border-[#e7e1de]/60">
              {summaryText}
            </p>
          </div>

          {/* Experience Section */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#934525] mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#934525]"></span>
              Key Spatial Commissions &amp; Leadership
            </h3>
            <div className="flex flex-col gap-4">
              {/* Atelier Chardon */}
              <div className="border-l-2 border-[#934525]/40 pl-3.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#1d1b19]">
                    Senior Project Architect &amp; Lead Designer — Atelier Chardon
                  </h4>
                  <span className="text-[11px] text-[#55433c]">2021 – 2024</span>
                </div>
                <ul className="mt-2 space-y-1.5 text-xs text-[#55433c]">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#934525] font-bold">•</span>
                    <span>{bulletText0}</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#934525] font-bold">•</span>
                    <span>{dossier.sections.experience[0]?.bullets[1]}</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#934525] font-bold">•</span>
                    <span>{dossier.sections.experience[0]?.bullets[2]}</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#934525] font-bold">•</span>
                    <span>{bulletText3}</span>
                  </li>
                </ul>
              </div>

              {/* Studio Gilles & Boissier */}
              <div className="border-l-2 border-[#e7e1de] pl-3.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#1d1b19]">
                    Interior Architect — Studio Gilles &amp; Boissier
                  </h4>
                  <span className="text-[11px] text-[#55433c]">2017 – 2021</span>
                </div>
                <ul className="mt-2 space-y-1.5 text-xs text-[#55433c]">
                  {dossier.sections.experience[1]?.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#55433c]">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Technical & Craft competencies */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#934525] mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#934525]"></span>
              BIM, Typologies &amp; Artisan Sourcing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {dossier.sections.skills.map((cat, idx) => (
                <div key={idx} className="bg-[#f9f2ef] p-3 rounded-xl border border-[#e7e1de]/60">
                  <span className="text-[11px] font-bold text-[#934525] block mb-1">
                    {cat.category}
                  </span>
                  <p className="text-[11px] text-[#55433c] leading-relaxed">
                    {cat.items.join(' • ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: ATS Semantic Diff */}
      {activeTab === 'diff' && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e7e1de] flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#e7e1de]">
            <h3 className="font-serif-headline text-lg font-bold text-[#1d1b19]">
              Semantic ATS Keyword Injections
            </h3>
            <span className="text-xs font-semibold text-[#516353] bg-[#d4e8d4] px-2 py-0.5 rounded-full">
              Real-time Token Diff
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="bg-[#f9f2ef] p-3.5 rounded-xl border border-[#e7e1de]">
              <span className="text-[11px] font-bold text-[#934525] block mb-1">
                Liaigre Benchmark Requirement: Heritage &amp; ABF Compliance
              </span>
              <p className="text-xs text-[#55433c] line-through mb-1">
                "Supervised on-site construction coordination and millwork prototyping..."
              </p>
              <p className="text-xs text-[#516353] font-medium bg-[#d4e8d4]/40 p-2 rounded-lg border border-[#516353]/20">
                + "Administered regulatory filings and heritage liaison with the <span className="font-bold underline">Architectes des Bâtiments de France (ABF)</span> for protected Haussmannian structural alterations."
              </p>
            </div>

            <div className="bg-[#f9f2ef] p-3.5 rounded-xl border border-[#e7e1de]">
              <span className="text-[11px] font-bold text-[#934525] block mb-1">
                Liaigre Benchmark Requirement: Capital Scale &amp; Budget Metrics
              </span>
              <p className="text-xs text-[#55433c] line-through mb-1">
                "Led end-to-end spatial architecture and interior fit-outs for prestigious private residences..."
              </p>
              <p className="text-xs text-[#516353] font-medium bg-[#d4e8d4]/40 p-2 rounded-lg border border-[#516353]/20">
                + "Led end-to-end spatial architecture for 3 private Haussmannian residences <span className="font-bold underline">(380–520 m²)</span> in the 7e arrondissement with FF&amp;E capital budgets up to <span className="font-bold underline">€3.8M</span>."
              </p>
            </div>

            <div className="bg-[#f9f2ef] p-3.5 rounded-xl border border-[#e7e1de]">
              <span className="text-[11px] font-bold text-[#934525] block mb-1">
                Liaigre Benchmark Requirement: Organic Casework &amp; Parametric CAD
              </span>
              <p className="text-xs text-[#516353] font-medium bg-[#d4e8d4]/40 p-2 rounded-lg border border-[#516353]/20">
                + "Integrated <span className="font-bold underline">Rhino 3D</span> modeling for organic curved casework partitions and custom patinated bronze escutcheon profiles."
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Live Text Editor */}
      {activeTab === 'editor' && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e7e1de] flex flex-col gap-4">
          <h3 className="font-serif-headline text-lg font-bold text-[#1d1b19]">
            Direct Dossier Content Editor
          </h3>

          <div>
            <label className="text-xs font-bold text-[#1d1b19] block mb-1">
              Executive Summary Section
            </label>
            <textarea
              rows={4}
              value={summaryText}
              onChange={(e) => setSummaryText(e.target.value)}
              className="w-full p-3 text-xs rounded-xl border border-[#dbc1b8] bg-[#f9f2ef] focus:outline-none focus:border-[#934525] leading-relaxed"
            ></textarea>
          </div>

          <div>
            <label className="text-xs font-bold text-[#1d1b19] block mb-1">
              Atelier Chardon — Lead Bullet (Quantified Metrics)
            </label>
            <textarea
              rows={3}
              value={bulletText0}
              onChange={(e) => setBulletText0(e.target.value)}
              className="w-full p-3 text-xs rounded-xl border border-[#dbc1b8] bg-[#f9f2ef] focus:outline-none focus:border-[#934525] leading-relaxed"
            ></textarea>
          </div>

          <div>
            <label className="text-xs font-bold text-[#1d1b19] block mb-1">
              BIM Leadership &amp; ABF Coordination
            </label>
            <textarea
              rows={3}
              value={bulletText3}
              onChange={(e) => setBulletText3(e.target.value)}
              className="w-full p-3 text-xs rounded-xl border border-[#dbc1b8] bg-[#f9f2ef] focus:outline-none focus:border-[#934525] leading-relaxed"
            ></textarea>
          </div>

          <button
            onClick={() => {
              onUpdateDossier({
                ...dossier,
                sections: {
                  ...dossier.sections,
                  executiveSummary: summaryText,
                  experience: [
                    {
                      ...dossier.sections.experience[0],
                      bullets: [
                        bulletText0,
                        dossier.sections.experience[0].bullets[1],
                        dossier.sections.experience[0].bullets[2],
                        bulletText3
                      ]
                    },
                    dossier.sections.experience[1]
                  ]
                }
              });
              alert('Dossier updated successfully!');
            }}
            className="py-2.5 rounded-full bg-[#934525] hover:bg-[#b25d3a] text-white text-xs font-semibold cursor-pointer"
          >
            Save Revisions
          </button>
        </div>
      )}

      {/* Floating Action Bar */}
      <div className="fixed bottom-20 left-0 right-0 z-30 px-4">
        <div className="max-w-2xl mx-auto bg-[#1d1b19]/90 backdrop-blur-md p-3 rounded-full shadow-2xl flex items-center justify-between gap-3 text-white">
          <div className="pl-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffdbce] text-[20px]">
              task_alt
            </span>
            <span className="text-xs font-semibold">
              Curated v3.3 Ready
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
              {copiedToast ? 'Copied ✓' : 'Copy Dossier'}
            </button>
            <button
              onClick={() => {
                alert('Exporting high-resolution curatorial PDF package with bespoke Haussmannian typography formatting...');
              }}
              className="px-5 py-2.5 rounded-full bg-[#934525] hover:bg-[#b25d3a] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
