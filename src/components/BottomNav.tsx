import React from 'react';

export type NavTab = 'explore' | 'scan' | 'reformat' | 'matches';

interface BottomNavProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  gapsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  gapsCount = 3
}) => {
  const tabs = [
    {
      id: 'explore' as NavTab,
      label: 'Explore',
      icon: 'explore'
    },
    {
      id: 'scan' as NavTab,
      label: 'CV Scan',
      icon: 'document_scanner'
    },
    {
      id: 'reformat' as NavTab,
      label: 'Reformat',
      icon: 'edit_note',
      badge: gapsCount > 0 ? gapsCount : undefined
    },
    {
      id: 'matches' as NavTab,
      label: 'Matches',
      icon: 'bookmarks'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom,0px)] bg-[#fff8f4]/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(28,26,24,0.05)] border-t border-[#e7e1de]/50">
      <div className="max-w-2xl mx-auto h-16 px-4 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`group relative flex flex-col items-center justify-center min-w-[54px] min-h-[48px] py-1 transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-[#934525] font-semibold'
                  : 'text-[#55433c] hover:text-[#1d1b19]'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <span
                  className={`material-symbols-outlined text-2xl transition-transform duration-200 ${
                    isActive ? 'scale-110 text-[#934525]' : 'group-hover:scale-105'
                  }`}
                >
                  {tab.icon}
                </span>
                {tab.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full bg-[#934525] text-white text-[9px] font-bold leading-tight">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[0.75rem] tracking-wide mt-0.5">
                {tab.label}
              </span>
              <span
                className={`absolute bottom-0 h-0.5 rounded-full transition-all duration-300 ${
                  isActive ? 'w-6 bg-[#934525]' : 'w-0'
                }`}
              ></span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
