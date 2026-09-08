import React, { useState, useEffect } from 'react';
import { goalService } from '../../services/goalService';
import { cflAssignmentService } from '../../services/cflAssignmentService';

const Performance = () => {
  const CFL_EMP_ID = 9085488;
  const [activeTab, setActiveTab] = useState('thirty-days');
  const [workflows, setWorkflows] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch workflows and profile details on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [workflowsData, profileRes] = await Promise.all([
          goalService.getWorkflowByCfl(CFL_EMP_ID),
          cflAssignmentService.getByCfl(CFL_EMP_ID)
        ]);
        setWorkflows(workflowsData || []);
        setProfileData(profileRes || null);
      } catch (err) {
        console.warn('Error fetching performance details:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [CFL_EMP_ID]);

  const userData = {
    name: profileData?.cflName || 'Manpreet Kaur',
    role: profileData?.role || 'Jr Developer – Java Full Stack',
    empId: String(profileData?.cflEmpCode || '9085499'),
    location: (profileData?.location && profileData.location.includes('Bengaluru'))
      ? 'RO (Bengaluru)'
      : (profileData?.location || 'RO (Bengaluru)'),
    department: profileData?.businessUnit || profileData?.department || 'SSD',
    reportingTo: profileData?.managerName || 'Amit Chauhan'
  };

  const planDetails = {
    financialYear: '2026-2027',
    reviewType: 'Quarterly',
    currentPlan: 'Thirty Days Plan',
    cycleEndDate: '31 Jul 2026'
  };

  return (
    <div className="space-y-6 animate-fade-in duration-300 font-inter select-none">
      {/* Page Title Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#1B1418] tracking-tight font-grotesk">
          My Performance
        </h2>
        <p className="text-xs text-slate-500 mt-1 font-medium font-inter">
          Set your SMART goals and track them through to final sign-off.
        </p>
      </div>

      {/* 1. User Info Header Card */}
      <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 min-w-[240px]">
          <div className="w-14 h-14 rounded-full bg-[#78161A] text-white flex items-center justify-center font-bold text-xl font-grotesk shadow-sm flex-shrink-0">
            M
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 tracking-tight font-grotesk">
              {userData.name}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5 font-inter">
              {userData.role}
            </p>
          </div>
        </div>

        {/* Horizontal metadata columns */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 w-full border-t md:border-t-0 md:border-l border-[#EAE3E4] pt-4 md:pt-0 md:pl-8">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-inter">EMPLOYEE CODE</div>
            <div className="text-xs font-black text-slate-800 mt-1 font-inter">{userData.empId}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-inter">LOCATION</div>
            <div className="text-xs font-black text-slate-800 mt-1 font-inter">{userData.location}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-inter">DEPARTMENT</div>
            <div className="text-xs font-black text-slate-800 mt-1 font-inter">{userData.department}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-inter">REPORTING TO</div>
            <div className="text-xs font-black text-slate-800 mt-1 font-inter">{userData.reportingTo}</div>
          </div>
        </div>
      </div>

      {/* 2. Financial Year & Plan Details Card */}
      <div className="bg-white rounded-2xl border border-[#EAE3E4] px-8 py-4 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-inter">FINANCIAL YEAR</div>
          <div className="text-xs font-black text-slate-800 mt-1 font-inter">{planDetails.financialYear}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-inter">REVIEW TYPE</div>
          <div className="text-xs font-bold text-[#78161A] mt-1 font-inter">{planDetails.reviewType}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-inter">CURRENT PLAN</div>
          <div className="text-xs font-bold text-[#78161A] mt-1 font-inter">{planDetails.currentPlan}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-inter">CYCLE END DATE</div>
          <div className="text-xs font-black text-slate-800 mt-1 font-inter">{planDetails.cycleEndDate}</div>
        </div>
      </div>

      {/* 3. Horizontal Pill Tabs Selection Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setActiveTab('thirty-days')}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${activeTab === 'thirty-days'
              ? 'bg-[#78161A] text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
        >
          Thirty Days Plan
        </button>

        <button
          onClick={() => setActiveTab('sixty-days')}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${activeTab === 'sixty-days'
              ? 'bg-[#78161A] text-white'
              : 'bg-white border border-slate-200 text-slate-400 hover:bg-slate-50'
            }`}
        >
          Sixty Days Plan <span className="font-normal text-slate-400">(Not Created)</span>
        </button>

        <button
          onClick={() => setActiveTab('ninety-days')}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${activeTab === 'ninety-days'
              ? 'bg-[#78161A] text-white'
              : 'bg-white border border-slate-200 text-slate-400 hover:bg-slate-50'
            }`}
        >
          Ninety Days Plan <span className="font-normal text-slate-400">(Not Created)</span>
        </button>

        <button
          onClick={() => setActiveTab('final-review')}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${activeTab === 'final-review'
              ? 'bg-[#78161A] text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
        >
          <span className="text-amber-500">🎖️</span> Final Review
        </button>
      </div>

      {/* 4. Thirty Days Plan Box */}
      <div className="bg-white rounded-2xl border border-[#EAE3E4] shadow-sm overflow-hidden">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-[#B91C1C] via-[#78161A] to-[#43080A] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-grotesk tracking-wide text-white">
              Thirty Days Plan
            </h3>
            <p className="text-xs text-white/80 font-medium font-inter mt-0.5">
              01 Apr 2026 to 30 Apr 2026
            </p>
          </div>

          <div className="text-right">
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/70 block">CYCLE END DATE</span>
            <span className="text-sm font-black text-white font-grotesk mt-0.5 block">30 Apr 2026</span>
          </div>
        </div>

        {/* 5 Stage Cards Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Card 1: Goal Creation */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between items-center text-center shadow-sm min-h-[190px]">
            <div className="flex flex-col items-center w-full">
              <div className="w-9 h-9 rounded-full bg-[#FDF2F2] text-[#E05252] flex items-center justify-center text-sm mb-2">
                🎯
              </div>
              <h4 className="text-xs font-bold text-slate-800 font-inter">Goal Creation</h4>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-2 block">STATUS</span>

              <div className="w-full bg-[#FFF6E5] border border-[#FFE8C2] text-[#945400] rounded-lg p-2 text-[11px] font-bold mt-1 text-center">
                Draft — not yet submitted
              </div>
            </div>

            <button
              onClick={() => alert('Add Goal clicked')}
              className="mt-3 w-full py-2 bg-[#78161A] hover:bg-[#631013] active:scale-95 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-1"
            >
              + Add Goal
            </button>
          </div>

          {/* Card 2: Manager Approval */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center text-center shadow-sm min-h-[190px]">
            <div className="w-9 h-9 rounded-full bg-[#FDF2F2] text-[#78161A] flex items-center justify-center text-sm mb-2">
              👤
            </div>
            <h4 className="text-xs font-bold text-slate-800 font-inter">Manager Approval</h4>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-2 block">STATUS</span>

            <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] rounded-lg p-2.5 text-[11px] font-bold mt-1 text-center">
              No Goals Submitted
            </div>
          </div>

          {/* Card 3: Self Review */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center text-center shadow-sm min-h-[190px]">
            <div className="w-9 h-9 rounded-full bg-[#FDF2F2] text-[#78161A] flex items-center justify-center text-sm mb-2">
              👤
            </div>
            <h4 className="text-xs font-bold text-slate-800 font-inter">Self Review</h4>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-2 block">STATUS</span>

            <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] rounded-lg p-2.5 text-[11px] font-bold mt-1 text-center">
              Waiting for Approval
            </div>
          </div>

          {/* Card 4: Manager Final Review */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center text-center shadow-sm min-h-[190px]">
            <div className="w-9 h-9 rounded-full bg-[#FEFCE8] text-[#EAB308] flex items-center justify-center text-sm mb-2">
              ⭐
            </div>
            <h4 className="text-xs font-bold text-slate-800 font-inter">Manager Final Review</h4>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-2 block">STATUS</span>

            <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] rounded-lg p-2 text-[10.5px] font-bold mt-1 text-center">
              Waiting for Self Review
            </div>
          </div>

          {/* Card 5: Self Acceptance */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center text-center shadow-sm min-h-[190px]">
            <div className="w-9 h-9 rounded-full bg-[#F0FDF4] text-[#22C55E] flex items-center justify-center text-sm mb-2">
              ☑
            </div>
            <h4 className="text-xs font-bold text-slate-800 font-inter">Self Acceptance</h4>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-2 block">STATUS</span>

            <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] rounded-lg p-2 text-[10px] font-bold mt-1 text-center">
              Waiting for Manager Final Review
            </div>
          </div>
        </div>
      </div>

      {/* 5. Cycle Status Banner */}
      <div className="bg-[#E6F6EE] border border-[#CEECD3] text-[#1E8E5A] rounded-xl px-5 py-3 flex items-center gap-2 text-xs font-extrabold shadow-sm">
        <span className="bg-[#1E8E5A] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-black">ℹ</span>
        <span>Cycle Status: <span className="font-black">ACTIVE</span></span>
      </div>

      {/* 6. Quarterly Timeline Section */}
      <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-slate-800 font-grotesk">
          Quarterly Timeline
        </h3>

        <div className="flex items-start justify-between relative px-6 py-2">
          {/* Connecting line */}
          <div className="absolute left-[50px] right-[50px] top-[18px] h-[2px] bg-slate-200 z-0"></div>

          {/* Timeline Node 1 */}
          <div className="flex flex-col items-center text-center z-10 relative">
            <div className="w-9 h-9 rounded-full bg-[#78161A] text-white flex items-center justify-center font-bold text-xs shadow-md">
              1
            </div>
            <span className="text-[11px] font-bold text-slate-800 mt-2 font-inter">Goal Creation</span>
            <span className="text-[9.5px] font-bold text-[#78161A] uppercase tracking-wider mt-0.5">DRAFT</span>
          </div>

          {/* Timeline Node 2 */}
          <div className="flex flex-col items-center text-center z-10 relative">
            <div className="w-9 h-9 rounded-full bg-white border-2 border-slate-300 text-slate-400 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <span className="text-[11px] font-bold text-slate-700 mt-2 font-inter">Manager Approval</span>
            <span className="text-[9.5px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">PENDING</span>
          </div>

          {/* Timeline Node 3 */}
          <div className="flex flex-col items-center text-center z-10 relative">
            <div className="w-9 h-9 rounded-full bg-white border-2 border-slate-300 text-slate-400 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <span className="text-[11px] font-bold text-slate-700 mt-2 font-inter">Self Review</span>
            <span className="text-[9.5px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">PENDING</span>
          </div>

          {/* Timeline Node 4 */}
          <div className="flex flex-col items-center text-center z-10 relative">
            <div className="w-9 h-9 rounded-full bg-white border-2 border-slate-300 text-slate-400 flex items-center justify-center font-bold text-xs">
              4
            </div>
            <span className="text-[11px] font-bold text-slate-700 mt-2 font-inter">Manager Final Review</span>
            <span className="text-[9.5px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">PENDING</span>
          </div>

          {/* Timeline Node 5 */}
          <div className="flex flex-col items-center text-center z-10 relative">
            <div className="w-9 h-9 rounded-full bg-white border-2 border-slate-300 text-slate-400 flex items-center justify-center font-bold text-xs">
              5
            </div>
            <span className="text-[11px] font-bold text-slate-700 mt-2 font-inter">Self Acceptance</span>
            <span className="text-[9.5px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">PENDING</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 pt-3 border-t border-slate-100 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Draft</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#78161A]"></span>
            <span>Pending / In Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
