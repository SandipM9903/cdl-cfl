import React, { useState } from 'react';
import HrNavbar from '../../components/navbar/HrNavbar';
import HrDashboard from './HrDashboard';
import CflManagement from './CflManagement';
import CflProfileOverview from './CflProfileOverview';
import GoalsProbation from './GoalsProbation';
import HrProbation from './HrProbation';
import HrPerformance from './HrPerformance';
import HrMeetings from './HrMeetings';
import { FaComments } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const HrPortal = () => {
  const { role, setRole } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCfl, setSelectedCfl] = useState(null);
  const [openModalOnCfl, setOpenModalOnCfl] = useState(false);

  const navigateToTab = (tabId, params = {}) => {
    setActiveTab(tabId);
    setSelectedCfl(null);
    if (tabId === 'cfl-management' && params.openOnboard) {
      setOpenModalOnCfl(true);
    } else {
      setOpenModalOnCfl(false);
    }
  };

  return (
    <div className="flex bg-[#F8F9FA] min-h-screen">
      {/* Sidebar Navbar */}
      <HrNavbar activeTab={activeTab} onTabChange={(tabId) => navigateToTab(tabId)} />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Breadcrumbs Bar */}
        <header className="h-[70px] bg-white border-b border-[#EAE3E4] sticky top-0 z-30 flex items-center justify-between px-[34px] w-full">
          <div className="flex items-center">
            <button className="flex items-center gap-[6px] text-[12.5px] font-bold text-[#4A5568] hover:text-[#78161A] transition-colors bg-none border-none outline-none">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
              <span>Digital Lounge</span>
            </button>
            <div className="text-[11.5px] text-[#94A3B8] font-semibold ml-[14px]">
              Home / Pravlin / <span className="text-[#78161A] font-bold">Start Smart</span>
            </div>
          </div>
          <div className="bg-[#1FB6A6] text-white text-[10.5px] font-extrabold py-[6px] px-[14px] rounded-full tracking-wider shadow-[0_4px_12px_rgba(31,182,166,0.25)] select-none">
            HR DASHBOARD
          </div>
        </header>

        {/* Dashboard Main Content Body wrapper */}
        <main className="flex-1 p-[34px] space-y-8 max-w-[1400px] w-full">
          {activeTab === 'overview' && (
            <HrDashboard onNavigate={navigateToTab} />
          )}

          {activeTab === 'cfl-management' && (
            selectedCfl ? (
              <CflProfileOverview 
                cfl={selectedCfl} 
                onBack={() => setSelectedCfl(null)} 
              />
            ) : (
              <CflManagement 
                openModalInitially={openModalOnCfl} 
                onCloseModalInitially={() => setOpenModalOnCfl(false)} 
                onSelectCfl={(cfl) => setSelectedCfl(cfl)}
              />
            )
          )}

          {activeTab === 'probation' && (
            <HrProbation />
          )}

          {activeTab === 'performance' && (
            <HrPerformance />
          )}

          {activeTab === 'meetings' && (
            <HrMeetings />
          )}

          {activeTab === 'goals-probation' && (
            <GoalsProbation />
          )}

          {activeTab !== 'overview' && activeTab !== 'cfl-management' && activeTab !== 'probation' && activeTab !== 'performance' && activeTab !== 'meetings' && activeTab !== 'goals-probation' && (
            <div className="text-center bg-white border border-[#EAE3E4] rounded-2xl py-24 shadow-sm animate-fade-in duration-300">
              <h3 className="text-xl font-bold text-slate-800 mb-2 font-grotesk">
                {activeTab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Section
              </h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto font-inter">
                This subsection is currently hardcoded and will list custom analytics, templates, or setup pages in production.
              </p>
            </div>
          )}
        </main>

        {/* Floating Chat Icon support */}
        <button
          onClick={() => alert('Need assistance? Our HR chatbot helper is here!')}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#1FB6A6] text-white rounded-full shadow-lg shadow-[#1FB6A6]/20 flex items-center justify-center hover:scale-105 hover:bg-[#1bb0a0] transition-all z-40 outline-none"
        >
          <FaComments className="w-6 h-6" />
        </button>

        {/* Demo Role switcher helper floating layout in bottom-left content area */}
        <div className="fixed bottom-6 left-[280px] z-45 bg-white border border-slate-200 shadow-xl rounded-xl p-3 flex flex-col gap-2 max-w-[210px] w-full">
          <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">
            Demo Role Control
          </div>
          <div className="flex flex-wrap gap-1.5 font-grotesk">
            <button
              onClick={() => setRole('HR')}
              className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${role === 'HR'
                ? 'bg-rose-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              style={role === 'HR' ? { backgroundColor: '#78161A' } : {}}
            >
              HR
            </button>
            <button
              onClick={() => setRole('Employee')}
              className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${role === 'Employee'
                ? 'bg-rose-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              style={role === 'Employee' ? { backgroundColor: '#78161A' } : {}}
            >
              CFL
            </button>
            <button
              onClick={() => setRole('Manager')}
              className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${role === 'Manager'
                ? 'bg-rose-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              style={role === 'Manager' ? { backgroundColor: '#78161A' } : {}}
            >
              Mgr
            </button>
            <button
              onClick={() => setRole('Mentor')}
              className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${role === 'Mentor'
                ? 'bg-rose-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              style={role === 'Mentor' ? { backgroundColor: '#78161A' } : {}}
            >
              Mentor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrPortal;
