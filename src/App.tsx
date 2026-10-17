import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { ScanAnalysisScreen } from './components/ScanAnalysisScreen';
import { ReformatStudioScreen } from './components/ReformatStudioScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { MatchesScreen } from './components/MatchesScreen';
import { KeywordModal } from './components/KeywordModal';
import { DossierModal } from './components/DossierModal';
import { ProfileDrawer } from './components/ProfileDrawer';
import { INITIAL_DOSSIER, OTHER_DEMO_DOSSIERS, STUDIO_BENCHMARKS } from './data/mockData';
import { ATSKeyword, CandidateDossier, CompetencyItem, OptimizationRecommendation, StudioBenchmark } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('scan');
  const [benchmarks, setBenchmarks] = useState<StudioBenchmark[]>(STUDIO_BENCHMARKS);
  const [activeBenchmarkId, setActiveBenchmarkId] = useState<string>('studio-liaigre');
  const [dossier, setDossier] = useState<CandidateDossier>(INITIAL_DOSSIER);

  // Modals & Drawers
  const [inspectingKeyword, setInspectingKeyword] = useState<ATSKeyword | null>(null);
  const [isDossierModalOpen, setIsDossierModalOpen] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeBenchmark =
    benchmarks.find((b) => b.id === activeBenchmarkId) || benchmarks[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Apply Curatorial Recommendation
  const handleApplyRecommendation = (rec: OptimizationRecommendation) => {
    const boostNum = parseInt(rec.boostBadge.replace(/\D/g, ''), 10) || 5;

    setBenchmarks((prev) =>
      prev.map((b) => {
        if (b.id !== activeBenchmark.id) return b;
        return {
          ...b,
          overallMatch: Math.min(99, b.overallMatch + boostNum),
          recommendations: b.recommendations.map((r) =>
            r.id === rec.id ? { ...r, applied: true } : r
          ),
          subMetrics: {
            ...b.subMetrics,
            procurement: rec.id === 'rec-quantify-budgets' ? Math.min(98, b.subMetrics.procurement + 8) : b.subMetrics.procurement,
            bimLOD: rec.id === 'rec-elevate-revit' ? Math.min(99, b.subMetrics.bimLOD + 5) : b.subMetrics.bimLOD
          }
        };
      })
    );

    // Also update dossier text to reflect the applied draft
    if (rec.id === 'rec-quantify-budgets') {
      setDossier((prev) => ({
        ...prev,
        sections: {
          ...prev.sections,
          experience: [
            {
              ...prev.sections.experience[0],
              bullets: [
                rec.draftText,
                prev.sections.experience[0].bullets[1],
                prev.sections.experience[0].bullets[2],
                prev.sections.experience[0].bullets[3]
              ]
            },
            prev.sections.experience[1]
          ]
        }
      }));
    } else if (rec.id === 'rec-elevate-revit') {
      setDossier((prev) => ({
        ...prev,
        sections: {
          ...prev.sections,
          executiveSummary: `${rec.draftText} ${prev.sections.executiveSummary}`
        }
      }));
    }

    showToast(`Applied "${rec.title}" • ${rec.boostBadge} dynamic boost!`);
  };

  // Resolve Competency Gap
  const handleResolveCompetencyGap = (item: CompetencyItem) => {
    setBenchmarks((prev) =>
      prev.map((b) => {
        if (b.id !== activeBenchmark.id) return b;
        return {
          ...b,
          overallMatch: Math.min(99, b.overallMatch + 6),
          criticalGapsCount: Math.max(0, b.criticalGapsCount - 1),
          subMetrics: {
            ...b.subMetrics,
            heritageSpec: item.id === 'historic-french-abf' ? 88 : b.subMetrics.heritageSpec,
            bimLOD: item.id === 'rhino-grasshopper' ? 98 : b.subMetrics.bimLOD
          },
          clusters: b.clusters.map((c) => ({
            ...c,
            matchCount: c.items.some((i) => i.id === item.id) ? c.matchCount + 1 : c.matchCount,
            gapCount: c.items.some((i) => i.id === item.id) ? Math.max(0, c.gapCount - 1) : c.gapCount,
            items: c.items.map((i) =>
              i.id === item.id
                ? {
                    ...i,
                    status: 'match',
                    candidateDetail: item.suggestedPatch || 'Resolved & verified in dossier'
                  }
                : i
            )
          })),
          keywords: b.keywords.map((kw) => {
            if (
              (item.id === 'rhino-grasshopper' && kw.term === 'Rhino 3D') ||
              (item.id === 'historic-french-abf' && (kw.term === 'ABF Approvals' || kw.term === 'Heritage Restoration'))
            ) {
              return { ...kw, detected: true };
            }
            return kw;
          })
        };
      })
    );

    // Insert into dossier
    if (item.suggestedPatch) {
      setDossier((prev) => ({
        ...prev,
        sections: {
          ...prev.sections,
          experience: [
            {
              ...prev.sections.experience[0],
              bullets: [
                prev.sections.experience[0].bullets[0],
                prev.sections.experience[0].bullets[1],
                prev.sections.experience[0].bullets[2],
                `${prev.sections.experience[0].bullets[3]} ${item.suggestedPatch}`
              ]
            },
            prev.sections.experience[1]
          ]
        }
      }));
    }

    showToast(`Resolved "${item.name}" • Added to Active Dossier!`);
  };

  // Insert Keyword from Modal
  const handleInsertKeyword = (keyword: ATSKeyword) => {
    setBenchmarks((prev) =>
      prev.map((b) => {
        if (b.id !== activeBenchmark.id) return b;
        return {
          ...b,
          overallMatch: Math.min(99, b.overallMatch + 3),
          keywords: b.keywords.map((k) =>
            k.id === keyword.id ? { ...k, detected: true } : k
          )
        };
      })
    );
    showToast(`Token "${keyword.term}" inserted & indexed (+3%)`);
  };

  // Switch Benchmark Studio
  const handleSelectBenchmark = (benchmark: StudioBenchmark) => {
    setActiveBenchmarkId(benchmark.id);
    showToast(`Scan recalibrated to ${benchmark.studioName} standard`);
  };

  // Switch Candidate Demo
  const handleSelectDemoDossier = (id: string) => {
    const found = OTHER_DEMO_DOSSIERS.find((d) => d.id === id);
    if (found) {
      setDossier((prev) => ({
        ...prev,
        fileName: found.fileName,
        version: found.version,
        candidateName: found.candidateName,
        title: found.role
      }));
      showToast(`Active dossier switched to ${found.fileName}`);
    }
  };

  // Upload Custom CV
  const handleUploadCustomCV = (fileName: string, text: string) => {
    setDossier({
      id: `dossier-custom-${Date.now()}`,
      fileName,
      version: 'v1.0-raw',
      candidateName: 'Custom Candidate',
      title: 'Architectural Designer',
      experienceYears: 5,
      lastUpdated: 'Just now',
      sections: {
        executiveSummary: text.slice(0, 240) + '...',
        experience: [
          {
            role: 'Lead Architect',
            studio: 'Self-Directed Architecture',
            period: '2020 – Present',
            bullets: [
              text.slice(0, 140),
              'Supervised construction documentation and physical craft delivery.',
              'Client presentation coordination.'
            ]
          }
        ],
        skills: [
          {
            category: 'Parsed Architectural Keywords',
            items: ['Revit BIM', 'CAD Sets', 'Custom Millwork', 'FF&E']
          }
        ]
      }
    });
    showToast(`Loaded ${fileName} • Running curatorial scan`);
  };

  return (
    <div className="min-h-screen bg-[#fff8f4] text-[#1d1b19] flex flex-col font-sans selection:bg-[#ffdbce] selection:text-[#370e00]">
      {/* Top Header */}
      <Header
        onProfileClick={() => setIsProfileDrawerOpen(true)}
        onDossierClick={() => setIsDossierModalOpen(true)}
        currentRoleTitle={activeBenchmark.roleTitle}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16 pb-20">
        {currentTab === 'scan' && (
          <ScanAnalysisScreen
            benchmark={activeBenchmark}
            dossier={dossier}
            onNavigateToReformat={() => setCurrentTab('reformat')}
            onOpenDossierModal={() => setIsDossierModalOpen(true)}
            onInspectKeyword={(kw) => setInspectingKeyword(kw)}
            onApplyRecommendation={handleApplyRecommendation}
            onResolveCompetencyGap={handleResolveCompetencyGap}
          />
        )}

        {currentTab === 'reformat' && (
          <ReformatStudioScreen
            benchmark={activeBenchmark}
            dossier={dossier}
            onUpdateDossier={(up) => setDossier(up)}
            onApplyRecommendation={handleApplyRecommendation}
            onResolveCompetencyGap={handleResolveCompetencyGap}
            onNavigateToScan={() => setCurrentTab('scan')}
          />
        )}

        {currentTab === 'explore' && (
          <ExploreScreen
            activeBenchmark={activeBenchmark}
            onSelectBenchmark={handleSelectBenchmark}
            onNavigateToScan={() => setCurrentTab('scan')}
          />
        )}

        {currentTab === 'matches' && (
          <MatchesScreen
            benchmark={activeBenchmark}
            dossier={dossier}
            onNavigateToScan={() => setCurrentTab('scan')}
            onNavigateToReformat={() => setCurrentTab('reformat')}
          />
        )}
      </main>

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1d1b19] text-[#fff8f4] px-4 py-2.5 rounded-full shadow-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top duration-200 border border-white/20">
          <span className="material-symbols-outlined text-[#ffdbce] text-[18px]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={(t) => setCurrentTab(t)}
        gapsCount={activeBenchmark.criticalGapsCount}
      />

      {/* Modals & Drawers */}
      <KeywordModal
        keyword={inspectingKeyword}
        onClose={() => setInspectingKeyword(null)}
        onInsertKeyword={handleInsertKeyword}
      />

      <DossierModal
        isOpen={isDossierModalOpen}
        onClose={() => setIsDossierModalOpen(false)}
        activeDossier={dossier}
        onSelectDemoDossier={handleSelectDemoDossier}
        benchmarks={benchmarks}
        activeBenchmark={activeBenchmark}
        onSelectBenchmark={handleSelectBenchmark}
        onUploadCustomCV={handleUploadCustomCV}
      />

      <ProfileDrawer
        isOpen={isProfileDrawerOpen}
        onClose={() => setIsProfileDrawerOpen(false)}
        dossier={dossier}
      />
    </div>
  );
}
