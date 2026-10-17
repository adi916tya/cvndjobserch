import { CandidateDossier, StudioBenchmark } from '../types';

export const INITIAL_DOSSIER: CandidateDossier = {
  id: 'dossier-camille-2025',
  fileName: 'Camille_Vasseur_CV_2025.pdf',
  version: 'v3.2',
  candidateName: 'Camille Vasseur',
  title: 'Senior Spatial Designer & Interior Architect',
  experienceYears: 9,
  lastUpdated: 'October 2025',
  sections: {
    executiveSummary:
      'Senior Spatial Designer and Interior Architect with 9+ years directing high-end residential and hospitality commissions across Paris and the Côte d’Azur. Specialized in bespoke millwork detailing, natural limestone joinery, and turn-key curatorial procurement for private discerning clients.',
    experience: [
      {
        role: 'Senior Project Architect & Lead Designer',
        studio: 'Atelier Chardon',
        period: '2021 – 2024',
        bullets: [
          'Led end-to-end spatial architecture and interior fit-outs for prestigious private residences in the 6th and 7th arrondissements.',
          'Supervised on-site construction coordination and millwork prototyping with master ébénistes and stone artisans across France and Italy.',
          'Formulated comprehensive tender packages, schematic drawing sets, and curatorial FF&E material specifications.',
          'Coordinated Revit BIM LOD 300+ models, clash detection, and MEP integration across multidisciplinary engineering teams.'
        ]
      },
      {
        role: 'Interior Architect',
        studio: 'Studio Gilles & Boissier',
        period: '2017 – 2021',
        bullets: [
          'Developed detailed 1:5 workshop drawings for bespoke custom cabinetry, patinated bronze metalwork, and integrated lighting troughs.',
          'Directly managed artisan sourcing partnerships with Promemoria, De Padova, and Pierre Frey.',
          'Authored client presentations and tactile physical material boards presented directly to high-net-worth patrons.'
        ]
      }
    ],
    skills: [
      {
        category: 'Software & BIM',
        items: ['Revit (BIM LOD 300+)', 'AutoCAD Architectural Sets', 'Enscape', 'SketchUp Pro', 'Photoshop', 'InDesign']
      },
      {
        category: 'Spatial & Craftsmanship',
        items: ['Bespoke Millwork & Joinery (1:5 / 1:1)', 'Haussmannian Moulding Protocols', 'Stone & Marble Sourcing', 'Custom Bronze & Hardware', 'FF&E Procurement']
      },
      {
        category: 'Project Delivery',
        items: ['Site Supervision', 'Tender Packages', 'Client Presentations', 'Turnkey FF&E Budgeting', 'Contractor Coordination']
      }
    ]
  }
};

export const STUDIO_BENCHMARKS: StudioBenchmark[] = [
  {
    id: 'studio-liaigre',
    studioName: 'Studio Liaigre',
    roleTitle: 'Senior Interior Architect',
    location: 'Paris, 7e',
    firmType: 'High-End Luxury Residential & Yachting',
    aestheticStandard: 'Haussmannian Residential Standard',
    aestheticImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCAOasoDTOpfoAuo-NZYcs-F48XeoVGMRbgS_Vhv3b-5ZUTnt9TDktFDmYzdyxv0Xty50tbQLQ25iahAcC9DyVB3MYVskvD_RhMSaHBViW8yNtsqMgmSTMOZ5NypbUabCo_1c7rONHRP787nqp-pps44K-siMc5PdbpObqJnD4oIyd960xR-JXr8yOVbDgRsFZI8LaJPOy2RbsAsUv5LZe7vKk9u_NzdJwmf7Fmmrt5qwlKrO2fDtuF',
    quote: {
      text: 'Simplicity is not a lack of clutter, but the anatomy of harmony.',
      author: 'CHRISTIAN LIAIGRE'
    },
    overallMatch: 78,
    subMetrics: {
      bimLOD: 92,
      procurement: 88,
      heritageSpec: 54
    },
    criticalGapsCount: 3,
    clusters: [
      {
        id: 'cluster-cad-bim',
        title: 'CAD & BIM Proficiency',
        icon: 'layers',
        matchCount: 2,
        gapCount: 1,
        items: [
          {
            id: 'revit-bim',
            name: 'Revit (BIM LOD 300+)',
            candidateDetail: 'Candidate: 6 yrs Lead • JD: 5+ yrs Required',
            status: 'match',
            category: 'cad-bim'
          },
          {
            id: 'autocad-sets',
            name: 'AutoCAD Architectural Sets',
            candidateDetail: 'Candidate: Mastered (10+ yrs)',
            status: 'match',
            category: 'cad-bim'
          },
          {
            id: 'rhino-grasshopper',
            name: 'Rhino 3D + Grasshopper',
            candidateDetail: 'JD prefers for organic casework; missing in dossier',
            status: 'gap',
            category: 'cad-bim',
            tip: 'Studio Liaigre utilizes Rhino for complex sculptured solid wood partitions and custom brass escutcheon profiles.',
            suggestedPatch: 'Integrated Rhino 3D modeling for organic curved teak millwork and custom architectural hardware sets.'
          }
        ]
      },
      {
        id: 'cluster-design-domain',
        title: 'Design Domain & Typology',
        icon: 'holiday_village',
        matchCount: 2,
        gapCount: 1,
        items: [
          {
            id: 'luxury-residential',
            name: 'Luxury Residential Architecture',
            candidateDetail: 'Matches Liaigre private villa profile',
            status: 'match',
            category: 'design-domain'
          },
          {
            id: 'bespoke-millwork',
            name: 'Bespoke Millwork & Joinery Detailing',
            candidateDetail: 'Full 1:5 workshop drawings evidenced',
            status: 'match',
            category: 'design-domain'
          },
          {
            id: 'historic-french-abf',
            name: 'Historic French Conservation (ABF)',
            candidateDetail: 'JD requires Bâtiments de France regulatory filing',
            status: 'gap',
            category: 'design-domain',
            tip: 'Projects in Paris 7e and 8e require strict coordination with the Architectes des Bâtiments de France for classified facade and parquet alterations.',
            suggestedPatch: 'Administered regulatory filings and heritage liaison with the Architectes des Bâtiments de France (ABF) for protected Haussmannian structural alterations.'
          }
        ]
      },
      {
        id: 'cluster-procurement',
        title: 'FF&E & Procurement Logistics',
        icon: 'chair',
        matchCount: 1,
        gapCount: 0,
        items: [
          {
            id: 'artisan-sourcing',
            name: 'High-End Italian & French Artisan Sourcing',
            candidateDetail: 'Verified suppliers: Promemoria, De Padova, Pierre Frey',
            status: 'match',
            category: 'procurement'
          }
        ]
      }
    ],
    keywords: [
      {
        id: 'kw-custom-millwork',
        term: 'Custom Millwork',
        detected: true,
        frequencyInJD: 12,
        category: 'Fabrication',
        relevance: 'critical',
        suggestedContext: 'Found across Atelier Chardon and Studio Gilles & Boissier project descriptions.'
      },
      {
        id: 'kw-site-supervision',
        term: 'Site Supervision',
        detected: true,
        frequencyInJD: 9,
        category: 'Execution',
        relevance: 'high',
        suggestedContext: 'Direct on-site coordination with French artisans recognized by parsing engine.'
      },
      {
        id: 'kw-client-presentations',
        term: 'Client Presentations',
        detected: true,
        frequencyInJD: 8,
        category: 'Client Care',
        relevance: 'high',
        suggestedContext: 'Highlighted in high-net-worth client interaction records.'
      },
      {
        id: 'kw-bim-lod300',
        term: 'BIM LOD 300',
        detected: true,
        frequencyInJD: 7,
        category: 'Technical',
        relevance: 'critical',
        suggestedContext: 'LOD 300+ models referenced in project delivery.'
      },
      {
        id: 'kw-ffe-budgets',
        term: 'FF&E Budgets',
        detected: true,
        frequencyInJD: 6,
        category: 'Procurement',
        relevance: 'high',
        suggestedContext: 'Detected in skills list, though monetary scale can be quantified further.'
      },
      {
        id: 'kw-tender-packages',
        term: 'Tender Packages',
        detected: true,
        frequencyInJD: 5,
        category: 'Contractual',
        relevance: 'high',
        suggestedContext: 'Recognized under Atelier Chardon project leadership.'
      },
      // Missing chips
      {
        id: 'kw-rhino-3d',
        term: 'Rhino 3D',
        detected: false,
        frequencyInJD: 6,
        category: 'Parametric CAD',
        relevance: 'high',
        suggestedContext: 'Mentioned in JD Section 3: "Proficiency in Rhino 3D for curved freeform cabinetry prototypes is an advantage."'
      },
      {
        id: 'kw-heritage-restoration',
        term: 'Heritage Restoration',
        detected: false,
        frequencyInJD: 8,
        category: 'Typology',
        relevance: 'critical',
        suggestedContext: 'Liaigre’s Paris atelier primarily handles 18th & 19th-century private hôtels particuliers.'
      },
      {
        id: 'kw-turnkey-handover',
        term: 'Turnkey Handover',
        detected: false,
        frequencyInJD: 5,
        category: 'Delivery',
        relevance: 'recommended',
        suggestedContext: 'Full white-glove architectural delivery token expected by senior hiring partners.'
      },
      {
        id: 'kw-abf-approvals',
        term: 'ABF Approvals',
        detected: false,
        frequencyInJD: 7,
        category: 'Regulatory',
        relevance: 'critical',
        suggestedContext: 'Architectes des Bâtiments de France approval workflows are mandatory for central Paris sites.'
      }
    ],
    recommendations: [
      {
        id: 'rec-quantify-budgets',
        title: 'Quantify Scale & Capital Budgets',
        boostBadge: '+8% ATS Boost',
        boostType: 'primary',
        description:
          '3 experience bullets mention "luxury residences" without metric square footage or FF&E contract values (€1.8M–€4.5M). Adding these aligns with Liaigre’s partner-level evaluation.',
        targetSection: 'Target: Role at Atelier Chardon (2021-2024)',
        buttonLabel: 'Apply Draft',
        applied: false,
        draftText:
          'Led end-to-end spatial architecture for 3 private Haussmannian residences (380–520 m²) in the 7e arrondissement with FF&E capital budgets up to €3.8M.'
      },
      {
        id: 'rec-elevate-revit',
        title: 'Elevate Revit LOD 350 to Profile Header',
        boostBadge: '+5% Visibility',
        boostType: 'secondary',
        description:
          'Your technical BIM leadership is currently positioned at bullet 4 in your latest role. Elevating it to your summary dossier prevents rapid recruiter skips.',
        targetSection: 'Target: Executive Summary Section',
        buttonLabel: 'Reposition',
        applied: false,
        draftText:
          'Revit LOD 350 Lead & Spatial Architect with 9+ years directing high-end residential commissions across Paris...'
      }
    ]
  },
  {
    id: 'studio-ko',
    studioName: 'Studio KO',
    roleTitle: 'Lead Luxury Hospitality Architect',
    location: 'Paris & Marrakech',
    firmType: 'Sculptural Vernacular & Luxury Hospitality',
    aestheticStandard: 'Ochre Earth & Monolithic Brutalism',
    aestheticImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    quote: {
      text: 'Architecture is not about creating novel shapes, but carving sunlight into mineral silence.',
      author: 'KARL FOURNIER & OLIVIER MARTY'
    },
    overallMatch: 84,
    subMetrics: {
      bimLOD: 86,
      procurement: 94,
      heritageSpec: 72
    },
    criticalGapsCount: 2,
    clusters: [
      {
        id: 'cluster-ko-material',
        title: 'Vernacular Earth & Mineral Detailing',
        icon: 'landscape',
        matchCount: 3,
        gapCount: 0,
        items: [
          {
            id: 'mineral-sourcing',
            name: 'Raw Pisé, Tadelakt & Terracotta',
            candidateDetail: 'Evidenced in Mediterranean private villa commissions',
            status: 'match',
            category: 'design-domain'
          },
          {
            id: 'bespoke-millwork',
            name: 'Chiselled Cedar & Natural Joinery',
            candidateDetail: 'Evidenced across bespoke workshop drawings',
            status: 'match',
            category: 'design-domain'
          }
        ]
      },
      {
        id: 'cluster-ko-bim',
        title: 'Hospitality Masterplanning & BIM',
        icon: 'layers',
        matchCount: 2,
        gapCount: 1,
        items: [
          {
            id: 'revit-hospitality',
            name: 'Revit Multi-zone MEP Coordination',
            candidateDetail: 'Matches Studio KO luxury lodge requirement',
            status: 'match',
            category: 'cad-bim'
          },
          {
            id: 'arid-climate',
            name: 'Arid Climate Passive Thermal Strategy',
            candidateDetail: 'Candidate CV lacks specific bioclimatic ventilation notes',
            status: 'gap',
            category: 'design-domain',
            tip: 'Studio KO projects in Ourika Valley require earth-wall thermal lag modeling.'
          }
        ]
      }
    ],
    keywords: [
      {
        id: 'kw-tadelakt',
        term: 'Tadelakt Finishes',
        detected: true,
        frequencyInJD: 9,
        category: 'Material',
        relevance: 'high',
        suggestedContext: 'Artisanal Moroccan plaster craftsmanship.'
      },
      {
        id: 'kw-hospitality-suites',
        term: 'Key Suite Layouts',
        detected: true,
        frequencyInJD: 11,
        category: 'Typology',
        relevance: 'critical',
        suggestedContext: 'Hotel room flow and acoustic decoupling.'
      },
      {
        id: 'kw-bioclimatic',
        term: 'Bioclimatic Thermal Mass',
        detected: false,
        frequencyInJD: 5,
        category: 'Sustainability',
        relevance: 'critical',
        suggestedContext: 'Studio KO signature earthen passive cooling methods.'
      }
    ],
    recommendations: [
      {
        id: 'rec-ko-thermal',
        title: 'Highlight Earthen & Rammed Earth Experience',
        boostBadge: '+9% ATS Boost',
        boostType: 'primary',
        description:
          'Studio KO prioritizes raw mineral earth construction. Add your southern France rammed-earth villa facade case study.',
        targetSection: 'Target: Atelier Chardon Project Section',
        buttonLabel: 'Inject Case Study',
        applied: false,
        draftText:
          'Engineered rammed earth and natural hydraulic lime perimeter walls for an eco-luxury residence in Provence.'
      }
    ]
  },
  {
    id: 'studio-van-duysen',
    studioName: 'Vincent Van Duysen Architects',
    roleTitle: 'Head of Residential Spatial Design',
    location: 'Antwerp, Belgium',
    firmType: 'Warm Minimalist Monoliths & Interior Architecture',
    aestheticStandard: 'Flemish Bone Linen & Belgian Bluestone',
    aestheticImage:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    quote: {
      text: 'I consider myself an architect who also works as an interior designer: I don’t see any boundary between the two.',
      author: 'VINCENT VAN DUYSEN'
    },
    overallMatch: 81,
    subMetrics: {
      bimLOD: 90,
      procurement: 84,
      heritageSpec: 68
    },
    criticalGapsCount: 2,
    clusters: [
      {
        id: 'cluster-vvd-minimalism',
        title: 'Monolithic Volumetric Detailing',
        icon: 'crop_square',
        matchCount: 3,
        gapCount: 1,
        items: [
          {
            id: 'vvd-bluestone',
            name: 'Belgian Bluestone Solid Block Fabrication',
            candidateDetail: 'Missing direct quarry specification tokens',
            status: 'gap',
            category: 'procurement',
            tip: 'Van Duysen demands precise massive stone detailing without perimeter expansion visible beads.'
          },
          {
            id: 'vvd-millwork',
            name: 'Flush Pocket Pivot Doors & Shadow Gaps',
            candidateDetail: 'Mastered 1:5 workshop detailing evidenced',
            status: 'match',
            category: 'design-domain'
          }
        ]
      }
    ],
    keywords: [
      {
        id: 'kw-shadow-gap',
        term: 'Shadow Gap Detailing',
        detected: true,
        frequencyInJD: 8,
        category: 'Craftsmanship',
        relevance: 'critical',
        suggestedContext: 'Seamless floor-to-ceiling baseboard eliminations.'
      },
      {
        id: 'kw-bluestone',
        term: 'Belgian Bluestone',
        detected: false,
        frequencyInJD: 7,
        category: 'Material',
        relevance: 'critical',
        suggestedContext: 'Antwerp atelier staple monolithic stone masonry.'
      }
    ],
    recommendations: [
      {
        id: 'rec-vvd-shadow',
        title: 'Feature Monolithic Joinery Drawings in Executive Summary',
        boostBadge: '+7% ATS Boost',
        boostType: 'primary',
        description:
          'Emphasize pure reductive detailing, concealed hardware hinges, and seamless acoustic ceiling integrations.',
        targetSection: 'Target: Executive Summary',
        buttonLabel: 'Apply Refinement',
        applied: false,
        draftText:
          'Architectural spatial designer specializing in monolithic stone massing, trimless flush apertures, and warm reductive textures.'
      }
    ]
  }
];

export const OTHER_DEMO_DOSSIERS = [
  {
    id: 'dossier-camille-2025',
    candidateName: 'Camille Vasseur',
    role: 'Senior Spatial Designer & Interior Architect',
    fileName: 'Camille_Vasseur_CV_2025.pdf',
    version: 'v3.2',
    matchScore: 78,
    status: 'Active'
  },
  {
    id: 'dossier-alexandre-2025',
    candidateName: 'Alexandre Mercier',
    role: 'BIM LOD 400 Technical Architect',
    fileName: 'Alexandre_Mercier_Dossier_2025.pdf',
    version: 'v2.8',
    matchScore: 89,
    status: 'Standby'
  },
  {
    id: 'dossier-elena-2025',
    candidateName: 'Elena Rostova',
    role: 'Luxury Retail & Yacht Interior Architect',
    fileName: 'Elena_Rostova_Dossier_Portfolio.pdf',
    version: 'v4.0',
    matchScore: 82,
    status: 'Standby'
  }
];
