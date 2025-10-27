import React from 'react';
import { SnakeEngineLogo, HomeIcon, AiStudioIcon, CoursesIcon, SignOutIcon, CollapseIcon } from './Icons';

type Page = 'chat' | 'ai_studio';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  onSignOut: () => void;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed, onSignOut, currentPage, onNavigate }) => {
  
  const navItemClasses = "flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-700/50";
  const activeNavItemClasses = "bg-gray-700/50 text-white";
  
  return (
    <div className={`hidden md:flex flex-col bg-[#111827] text-gray-300 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center h-16 px-6 border-b border-gray-700 flex-shrink-0">
        <SnakeEngineLogo className="w-8 h-8 text-sky-400" />
        <span className={`ml-3 font-semibold text-lg text-white whitespace-nowrap overflow-hidden transition-opacity ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>SnakeEngine</span>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        <p className={`px-2 py-1 text-xs text-gray-400 uppercase tracking-wider ${isCollapsed ? 'text-center' : ''}`}>Main</p>
        <button onClick={() => onNavigate('chat')} className={`${navItemClasses} w-full text-left ${currentPage === 'chat' ? activeNavItemClasses : ''}`}>
          <HomeIcon className="w-5 h-5 flex-shrink-0" />
          <span className={`ml-4 whitespace-nowrap overflow-hidden ${isCollapsed ? 'hidden' : 'block'}`}>Home</span>
        </button>
        <button onClick={() => onNavigate('ai_studio')} className={`${navItemClasses} w-full text-left ${currentPage === 'ai_studio' ? activeNavItemClasses : ''}`}>
          <AiStudioIcon className="w-5 h-5 flex-shrink-0" />
          <span className={`ml-4 whitespace-nowrap overflow-hidden ${isCollapsed ? 'hidden' : 'block'}`}>AI Studio</span>
        </button>
        <a href="https://aisnake-718c.vercel.app/courses.html" target="_blank" rel="noopener noreferrer" className={navItemClasses}>
          <CoursesIcon className="w-5 h-5 flex-shrink-0" />
          <span className={`ml-4 whitespace-nowrap overflow-hidden ${isCollapsed ? 'hidden' : 'block'}`}>Courses</span>
        </a>
        <p className={`mt-4 px-2 py-1 text-xs text-gray-400 uppercase tracking-wider ${isCollapsed ? 'text-center' : ''}`}>Admin</p>
        <button onClick={onSignOut} className="w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-700/50 text-left">
          <SignOutIcon className="w-5 h-5 flex-shrink-0" />
          <span className={`ml-4 whitespace-nowrap overflow-hidden ${isCollapsed ? 'hidden' : 'block'}`}>Sign Out</span>
        </button>
      </nav>
      <div className="px-4 py-4 border-t border-gray-700">
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-700/50">
          <CollapseIcon className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
          <span className={`ml-4 whitespace-nowrap overflow-hidden ${isCollapsed ? 'hidden' : 'block'}`}>Collapse</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
