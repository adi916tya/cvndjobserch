export interface CompetencyItem {
  id: string;
  name: string;
  candidateDetail: string;
  jobDetail?: string;
  status: 'match' | 'gap' | 'warning';
  category: 'cad-bim' | 'design-domain' | 'procurement' | 'licensing';
  tip?: string;
  suggestedPatch?: string;
}

export interface CompetencyCluster {
  id: string;
  title: string;
  icon: string;
  matchCount: number;
  gapCount: number;
  items: CompetencyItem[];
}

export interface ATSKeyword {
  id: string;
  term: string;
  detected: boolean;
  frequencyInJD: number;
  category: string;
  relevance: 'critical' | 'high' | 'recommended';
  suggestedContext: string;
  applied?: boolean;
}

export interface OptimizationRecommendation {
  id: string;
  title: string;
  boostBadge: string;
  boostType: 'primary' | 'secondary';
  description: string;
  targetSection: string;
  buttonLabel: string;
  applied: boolean;
  draftText: string;
  originalText?: string;
}

export interface StudioBenchmark {
  id: string;
  studioName: string;
  roleTitle: string;
  location: string;
  firmType: string;
  aestheticStandard: string;
  aestheticImage: string;
  quote: {
    text: string;
    author: string;
  };
  overallMatch: number;
  subMetrics: {
    bimLOD: number;
    procurement: number;
    heritageSpec: number;
  };
  criticalGapsCount: number;
  clusters: CompetencyCluster[];
  keywords: ATSKeyword[];
  recommendations: OptimizationRecommendation[];
}

export interface CandidateDossier {
  id: string;
  fileName: string;
  version: string;
  candidateName: string;
  title: string;
  experienceYears: number;
  lastUpdated: string;
  sections: {
    executiveSummary: string;
    experience: {
      role: string;
      studio: string;
      period: string;
      bullets: string[];
    }[];
    skills: {
      category: string;
      items: string[];
    }[];
  };
}
