import React, { useState } from 'react';
import {
  FaRegEye,
  FaSearch,
  FaFileExport,
  FaLock
} from 'react-icons/fa';

const Performance = () => {
  const [activePlan, setActivePlan] = useState('thirty-days');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('All Stages');

  // Thirty Days reviews data
  const thirtyDaysData = [
    {
      name: 'Manpreet Kaur',
      initials: 'MK',
      avatarBg: 'bg-[#C084FC]',
      progress: 0,
      goalCreation: { text: 'Draft — not yet submitted', type: 'warning' },
      managerApproval: { text: 'No Goals Submitted', type: 'gray' },
      selfReview: { text: 'Waiting for Approval', type: 'gray' },
      managerReview: { text: 'Waiting for Self Review', type: 'gray' },
      selfAcceptance: { text: 'Waiting for Manager Final Review', type: 'gray' }
    },
    {
      name: 'Amit Chauhan',
      initials: 'AC',
      avatarBg: 'bg-[#F472B6]',
      progress: 15,
      goalCreation: { text: 'Created', date: '08 Jun 2026', type: 'success' },
      managerApproval: { text: 'Pending Manager Review', type: 'warning' },
      selfReview: { text: 'Waiting for Approval', type: 'gray' },
      managerReview: { text: 'Waiting for Self Review', type: 'gray' },
      selfAcceptance: { text: 'Waiting for Manager Final Review', type: 'gray' }
    },
    {
      name: 'Yajnadutta Mishra',
      initials: 'YM',
      avatarBg: 'bg-[#60A5FA]',
      progress: 0,
      goalCreation: { text: 'Not Created', type: 'none' },
      managerApproval: { text: 'No Goals Submitted', type: 'gray' },
      selfReview: { text: 'Waiting for Approval', type: 'gray' },
      managerReview: { text: 'Waiting for Self Review', type: 'gray' },
      selfAcceptance: { text: 'Waiting for Manager Final Review', type: 'gray' }
    },
    {
      name: 'Rohit Verma',
      initials: 'RV',
      avatarBg: 'bg-[#34D399]',
      progress: 100,
      goalCreation: { text: 'Created', date: '01 Jun 2026', type: 'success' },
      managerApproval: { text: 'Approved', date: '02 Jun 2026', type: 'success' },
      selfReview: { text: 'Completed', date: '20 Jun 2026', type: 'success' },
      managerReview: { text: 'Completed', date: '25 Jun 2026', type: 'success' },
      selfAcceptance: { text: 'Accepted', date: '26 Jun 2026', type: 'success' }
    },
    {
      name: 'Sneha Reddy',
      initials: 'SR',
      avatarBg: 'bg-[#FBBF24]',
      progress: 0,
      goalCreation: { text: 'Not Created', type: 'none' },
      managerApproval: { text: 'No Goals Submitted', type: 'gray' },
      selfReview: { text: 'Waiting for Approval', type: 'gray' },
      managerReview: { text: 'Waiting for Self Review', type: 'gray' },
      selfAcceptance: { text: 'Waiting for Manager Final Review', type: 'gray' }
    }
  ];

  // Final Review / Annual assessment data
  const finalReviewData = [
    {
      name: 'Manpreet Kaur',
      title: 'Java Developer',
      initials: 'MK',
      avatarBg: 'bg-[#C084FC]',
      thirtyDays: 'Draft',
      sixtyDays: 'Not Started',
      ninetyDays: 'Not Started',
      finalReviewStatus: 'conduct',
      overallProgress: 0
    },
    {
      name: 'Amit Chauhan',
      title: 'Java Developer',
      initials: 'AC',
      avatarBg: 'bg-[#F472B6]',
      thirtyDays: 'Pending Manager Approval',
      sixtyDays: 'Not Started',
      ninetyDays: 'Not Started',
      finalReviewStatus: 'conduct',
      overallProgress: 0
    },
    {
      name: 'Yajnadutta Mishra',
      title: 'Software Engineer',
      initials: 'YM',
      avatarBg: 'bg-[#60A5FA]',
      thirtyDays: 'Not Started',
      sixtyDays: 'Not Started',
      ninetyDays: 'Not Started',
      finalReviewStatus: 'conduct',
      overallProgress: 0
    },
    {
      name: 'Rohit Verma',
      title: 'DevOps Engineer',
      initials: 'RV',
      avatarBg: 'bg-[#34D399]',
      thirtyDays: 'Completed',
      sixtyDays: 'Completed',
      ninetyDays: 'Completed',
      finalReviewStatus: 'view',
      overallProgress: 100
    },
    {
      name: 'Sneha Reddy',
      title: 'QA Engineer',
      initials: 'SR',
      avatarBg: 'bg-[#FBBF24]',
      thirtyDays: 'Not Started',
      sixtyDays: 'Not Started',
      ninetyDays: 'Not Started',
      finalReviewStatus: 'conduct',
      overallProgress: 0
    }
  ];

  // Render status badge for table
  const renderBadge = (status) => {
    if (!status) return null;

    if (status.type === 'success') {
      return (
        <div className="flex flex-col items-center">
          <span className="px-[10px] py-[4px] rounded-full text-[10.5px] font-bold bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6] tracking-tight">
            {status.text}
          </span>
          {status.date && (
            <span className="text-[9.5px] text-[#5F6368] font-bold mt-0.5 whitespace-nowrap">
              {status.date}
            </span>
          )}
        </div>
      );
    }

    if (status.type === 'warning') {
      return (
        <div className="flex flex-col items-center">
          <span className="px-[10px] py-[4px] rounded-[30px] text-[10.5px] font-bold bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A] tracking-tight text-center leading-tight">
            {status.text}
          </span>
        </div>
      );
    }

    if (status.type === 'none') {
      return (
        <div className="flex flex-col items-center">
          <span className="px-[10px] py-[4px] rounded-full text-[10.5px] font-bold bg-[#F1F3F4] text-[#5F6368] border border-[#DADCE0] tracking-tight">
            {status.text}
          </span>
        </div>
      );
    }

    // Default Gray status
    return (
      <div className="flex flex-col items-center">
        <span className="px-[10px] py-[4px] rounded-full text-[10.5px] font-bold bg-[#F1F3F4] text-[#5F6368] border border-[#DADCE0] tracking-tight text-center leading-snug">
          {status.text}
        </span>
      </div>
    );
  };

  // Render red eye button
  const renderEyeBtn = (status) => {
    if (!status || status.type === 'none') return null;
    return (
      <button
        onClick={() => alert(`Reviewing stage detail: ${status.text}`)}
        className="mt-2 w-[24px] h-[24px] rounded-full border border-slate-205 flex items-center justify-center text-slate-400 hover:text-[#78161A] hover:bg-slate-50 shadow-sm active:scale-95 transition-all outline-none"
      >
        <FaRegEye className="w-3 h-3" />
      </button>
    );
  };

  // Helper for final review page badge style
  const getBadgeClassAndStyle = (val) => {
    if (val === 'Completed') {
      return 'bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]';
    }
    if (val === 'Pending Manager Approval') {
      return 'bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]';
    }
    return 'bg-[#F1F3F4] text-[#5F6368] border border-[#DADCE0]';
  };

  // Filters logic
  const filteredThirtyDays = thirtyDaysData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const filteredFinalReview = finalReviewData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in duration-300 font-inter select-none">
      
      {/* Header and Title */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-[#1B1418] tracking-tight flex items-center gap-2 font-grotesk">
            Performance
          </h2>
          <p className="text-[13px] text-slate-500 mt-1 font-medium font-inter">
            Review your team's quarterly SMART goals and annual performance, approve, and finalize ratings.
          </p>
        </div>
        
        {/* Top Right Year Selection Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Year</span>
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none bg-white border border-[#EAE3E4] rounded-lg px-4 py-2 pr-9 text-xs font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#78161A]/10 focus:border-[#78161A] cursor-pointer"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-550">
              <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Pill Selection Sub-Navigation Tabs */}
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={() => setActivePlan('thirty-days')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm ${
            activePlan === 'thirty-days'
              ? 'bg-[#530E11] text-white'
              : 'bg-white border border-[#EAE3E4] text-[#4A5568] hover:bg-[#F8F9FA]'
          }`}
        >
          Thirty Days Plan
        </button>
        <button
          onClick={() => setActivePlan('sixty-days')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm ${
            activePlan === 'sixty-days'
              ? 'bg-[#530E11] text-white'
              : 'bg-white border border-[#EAE3E4] text-[#4A5568] hover:bg-[#F8F9FA]'
          }`}
        >
          Sixty Days Plan <span className="text-[10px] text-slate-450 font-normal ml-0.5">(Not Created)</span>
        </button>
        <button
          onClick={() => setActivePlan('ninety-days')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm ${
            activePlan === 'ninety-days'
              ? 'bg-[#530E11] text-white'
              : 'bg-white border border-[#EAE3E4] text-[#4A5568] hover:bg-[#F8F9FA]'
          }`}
        >
          Ninety Days Plan <span className="text-[10px] text-slate-450 font-normal ml-0.5">(Not Created)</span>
        </button>
        <button
          onClick={() => setActivePlan('final-review')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm ${
            activePlan === 'final-review'
              ? 'bg-[#530E11] text-white'
              : 'bg-white border border-[#EAE3E4] text-[#4A5568] hover:bg-[#F8F9FA]'
          }`}
        >
          🏅 Final Review
        </button>
      </div>

      {/* Main Inner State Renderings */}
      {activePlan === 'thirty-days' && (
        <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] space-y-6 animate-fade-in duration-300">
          
          {/* Burgundy Red solid dashboard banner */}
          <div className="bg-[#78161A] text-white rounded-2xl p-6 relative overflow-hidden flex justify-between items-center shadow-sm">
            <div>
              <h3 className="text-lg font-bold font-grotesk tracking-wide text-white">
                Thirty Days Plan (Apr – Apr)
              </h3>
              <p className="text-xs text-white/70 font-semibold font-inter mt-1.5">
                01 Apr 2026 - 30 Apr 2026
              </p>
            </div>
            
            {/* Display Block Badges on right side */}
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5 text-center min-w-[75px]">
                <div className="text-[7.5px] uppercase tracking-widest text-white/50 font-extrabold font-inter">Year</div>
                <div className="text-sm font-extrabold text-white mt-0.5">{selectedYear}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5 text-center min-w-[100px]">
                <div className="text-[7.5px] uppercase tracking-widest text-white/50 font-extrabold font-inter">Review Type</div>
                <div className="text-sm font-extrabold text-white mt-0.5">Quarterly</div>
              </div>
            </div>
          </div>

          {/* Filter bars and search block */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <FaSearch className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by CFL name..."
                className="w-full pl-9 pr-4 py-2 border border-[#EAE3E4] rounded-lg text-xs font-semibold text-slate-700 bg-[#F9FAFB]/50 focus:outline-none focus:bg-white focus:border-[#78161A] transition-colors shadow-inner"
              />
            </div>

            <div className="relative w-full md:w-auto">
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="appearance-none bg-white border border-[#EAE3E4] rounded-lg pl-4 pr-10 py-2.5 text-xs font-bold text-slate-700 shadow-sm focus:outline-none focus:border-[#78161A] cursor-pointer w-full md:w-[150px]"
              >
                <option value="All Stages">All Stages</option>
                <option value="Goal Creation">Goal Creation</option>
                <option value="Manager Approval">Manager Approval</option>
                <option value="Self Review">Self Review</option>
                <option value="Manager Review">Manager Review</option>
                <option value="Self Acceptance">Self Acceptance</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <svg className="fill-current h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* List Review Progress Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left font-inter table-fixed min-w-[900px]">
              <thead>
                <tr className="border-b border-[#EAE3E4] text-[10.5px] font-extrabold uppercase text-slate-400 tracking-wider">
                    <th className="px-6 py-[14px] w-[185px]">CFL</th>
                    <th className="px-4 py-[14px] w-[120px] text-center">Progress</th>
                    <th className="px-4 py-[14px] w-[140px] text-center">Goal Creation</th>
                    <th className="px-4 py-[14px] w-[150px] text-center">Manager Approval</th>
                    <th className="px-4 py-[14px] w-[130px] text-center">Self Review</th>
                    <th className="px-4 py-[14px] w-[140px] text-center">Manager Review</th>
                    <th className="px-4 py-[14px] w-[140px] text-center">Self Acceptance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE3E4]">
                  {filteredThirtyDays.map((cfl, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                      {/* Name Card */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${cfl.avatarBg} text-white flex items-center justify-center text-[11px] font-extrabold`}>
                            {cfl.initials}
                          </div>
                          <span className="text-[13.5px] font-bold text-slate-800 leading-tight">
                            {cfl.name}
                          </span>
                        </div>
                      </td>

                      {/* Progress overall slider */}
                      <td className="px-4 py-5">
                        <div className="flex items-center justify-center flex-col">
                          <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden relative">
                            <div
                              style={{ width: `${cfl.progress}%` }}
                              className={`h-full ${
                                cfl.progress === 100
                                  ? 'bg-[#1E8E5A]'
                                  : cfl.progress > 0
                                  ? 'bg-rose-700'
                                  : 'bg-slate-200'
                              }`}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Goal Creation Column */}
                      <td className="px-4 py-5">
                        <div className="flex flex-col items-center">
                          {renderBadge(cfl.goalCreation)}
                          {renderEyeBtn(cfl.goalCreation)}
                        </div>
                      </td>

                      {/* Manager Approval */}
                      <td className="px-4 py-5">
                        <div className="flex flex-col items-center">
                          {renderBadge(cfl.managerApproval)}
                          {renderEyeBtn(cfl.managerApproval)}
                        </div>
                      </td>

                      {/* Self Review */}
                      <td className="px-4 py-5">
                        <div className="flex flex-col items-center">
                          {renderBadge(cfl.selfReview)}
                          {renderEyeBtn(cfl.selfReview)}
                        </div>
                      </td>

                      {/* Manager Review */}
                      <td className="px-4 py-5">
                        <div className="flex flex-col items-center">
                          {renderBadge(cfl.managerReview)}
                          {renderEyeBtn(cfl.managerReview)}
                        </div>
                      </td>

                      {/* Self Acceptance */}
                      <td className="px-4 py-5">
                        <div className="flex flex-col items-center">
                          {renderBadge(cfl.selfAcceptance)}
                          {renderEyeBtn(cfl.selfAcceptance)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      )}

      {/* Sixty & Ninety Days Empty / Lock state rendering */}
      {(activePlan === 'sixty-days' || activePlan === 'ninety-days') && (
        <div className="bg-white rounded-2xl border border-[#EAE3E4] p-16 shadow-[0_4px_15px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center max-w-[1200px] w-full min-h-[350px] animate-fade-in duration-300">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-rose-800 text-[26px]">
            <FaLock className="text-amber-500 w-6 h-6" />
          </div>
          <h3 className="text-base font-extrabold text-slate-800 mt-5 font-grotesk tracking-tight">
            {activePlan === 'sixty-days' ? 'Sixty Days Plan' : 'Ninety Days Plan'} has not been configured yet
          </h3>
          <p className="text-[13px] text-slate-500 mt-2 font-medium max-w-sm font-inter">
            Ask HR to configure and activate this review cycle from <span className="font-semibold text-slate-700">Performance &gt; Configure Review Cycles</span>.
          </p>
        </div>
      )}

      {/* Final Review state rendering */}
      {activePlan === 'final-review' && (
        <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] space-y-6 animate-fade-in duration-300">
          {/* Annual Review Banner card detail */}
          <div className="bg-[#78161A] text-white rounded-2xl p-6 relative overflow-hidden flex justify-between items-center shadow-sm">
            <div>
              <h3 className="text-lg font-bold font-grotesk tracking-wide text-white">
                Annual Performance Review 2025-2026
              </h3>
              <p className="text-xs text-white/70 font-semibold font-inter mt-1.5">
                Full Year Assessment
              </p>
            </div>
            {/* Display Block Badges on right side */}
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5 text-center min-w-[120px]">
                <div className="text-[7.5px] uppercase tracking-widest text-white/50 font-extrabold font-inter">Financial Year</div>
                <div className="text-sm font-extrabold text-white mt-0.5">2025-2026</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5 text-center min-w-[90px]">
                <div className="text-[7.5px] uppercase tracking-widest text-white/50 font-extrabold font-inter">Review Type</div>
                <div className="text-sm font-extrabold text-white mt-0.5">Annual</div>
              </div>
            </div>
          </div>

          {/* Filter/Search bar for Final Review */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <FaSearch className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by employee name, ID, or email..."
                className="w-full pl-9 pr-4 py-2 border border-[#EAE3E4] rounded-lg text-xs font-semibold text-slate-700 bg-[#F9FAFB]/50 focus:outline-none focus:bg-white focus:border-[#78161A] transition-colors shadow-inner"
              />
            </div>

            <div className="relative w-full md:w-auto">
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="appearance-none bg-white border border-[#EAE3E4] rounded-lg pl-4 pr-10 py-2.5 text-xs font-bold text-slate-700 shadow-sm focus:outline-none focus:border-[#78161A] cursor-pointer w-full md:w-[150px]"
              >
                <option value="All Stages">All Stages</option>
                <option value="Goal Creation">Goal Creation</option>
                <option value="Manager Approval">Manager Approval</option>
                <option value="Self Review">Self Review</option>
                <option value="Manager Review">Manager Review</option>
                <option value="Self Acceptance">Self Acceptance</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <svg className="fill-current h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Final Review employee list table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left font-inter table-fixed min-w-[900px]">
              <thead>
                <tr className="border-b border-[#EAE3E4] text-[10.5px] font-extrabold uppercase text-slate-400 tracking-wider">
                    <th className="px-6 py-[14px] w-[210px]">Employee</th>
                    <th className="px-4 py-[14px] w-[130px] text-center">Thirty Days</th>
                    <th className="px-4 py-[14px] w-[130px] text-center">Sixty Days</th>
                    <th className="px-4 py-[14px] w-[130px] text-center">Ninety Days</th>
                    <th className="px-4 py-[14px] w-[160px] text-center font-bold">Final Review</th>
                    <th className="px-4 py-[14px] w-[140px] text-center">Overall Progress</th>
                    <th className="px-4 py-[14px] w-[90px] text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE3E4]">
                  {filteredFinalReview.map((emp, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                      {/* Employee details avatar and sub-job name */}
                      <td className="px-6 py-[15px]">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${emp.avatarBg} text-white flex items-center justify-center text-[11px] font-extrabold`}>
                            {emp.initials}
                          </div>
                          <div>
                            <div className="text-[13.5px] font-bold text-slate-800 leading-tight">
                              {emp.name}
                            </div>
                            <div className="text-[10.5px] text-slate-400 font-semibold tracking-tight mt-0.5">
                              {emp.title}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Thirty Days badge */}
                      <td className="px-4 py-5">
                        <div className="flex justify-center">
                          <span className={`px-[10px] py-[3.5px] rounded-full text-[10.5px] font-bold ${getBadgeClassAndStyle(emp.thirtyDays)}`}>
                            {emp.thirtyDays}
                          </span>
                        </div>
                      </td>

                      {/* Sixty Days badge */}
                      <td className="px-4 py-5">
                        <div className="flex justify-center">
                          <span className={`px-[10px] py-[3.5px] rounded-full text-[10.5px] font-bold ${getBadgeClassAndStyle(emp.sixtyDays)}`}>
                            {emp.sixtyDays}
                          </span>
                        </div>
                      </td>

                      {/* Ninety Days badge */}
                      <td className="px-4 py-5">
                        <div className="flex justify-center">
                          <span className={`px-[10px] py-[3.5px] rounded-full text-[10.5px] font-bold ${getBadgeClassAndStyle(emp.ninetyDays)}`}>
                            {emp.ninetyDays}
                          </span>
                        </div>
                      </td>

                      {/* Final review action button */}
                      <td className="px-4 py-[15px]">
                        <div className="flex justify-center">
                          {emp.finalReviewStatus === 'conduct' ? (
                            <button
                              onClick={() => alert(`Conducting Annual Review for ${emp.name}...`)}
                              className="px-[16px] py-[6px] border border-[#78161A] text-[#78161A] hover:bg-rose-50 text-[11.5px] font-extrabold rounded-lg shadow-sm outline-none transition-colors"
                            >
                              Conduct Review
                            </button>
                          ) : (
                            <button
                              onClick={() => alert(`Viewing Annual Review for ${emp.name}...`)}
                              className="px-[16px] py-[6px] border border-[#EAE3E4] text-slate-700 hover:bg-slate-50 text-[11.5px] font-extrabold rounded-lg shadow-sm outline-none transition-colors flex items-center gap-1.5"
                            >
                              <FaRegEye className="w-3.5 h-3.5 text-slate-400" />
                              View
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Overall progress bar */}
                      <td className="px-4 py-5">
                        <div className="flex justify-center">
                          <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden relative">
                            <div
                              style={{ width: `${emp.overallProgress}%` }}
                              className={`h-full ${
                                emp.overallProgress === 100
                                  ? 'bg-[#1E8E5A]'
                                  : 'bg-slate-200'
                              }`}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Actions button */}
                      <td className="px-4 py-[15px]">
                        <div className="flex justify-center">
                          {emp.finalReviewStatus === 'view' ? (
                            <button
                              onClick={() => alert(`Accessing dashboard actions for ${emp.name}...`)}
                              className="w-[26px] h-[26px] rounded-full border border-slate-205 flex items-center justify-center text-slate-400 hover:text-[#78161A] hover:bg-slate-50 shadow-sm active:scale-95 transition-all outline-none"
                            >
                              <FaRegEye className="w-3.5 h-3.5" />
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      )}
    </div>
  );
};

export default Performance;
