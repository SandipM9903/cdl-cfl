import React from 'react';
import { 
  FaUsers, 
  FaHourglassHalf, 
  FaBuilding, 
  FaClipboardList, 
  FaCheckCircle, 
  FaBell, 
  FaClock, 
  FaLock, 
  FaRegEye 
} from 'react-icons/fa';

const Probation = () => {
  // Hardcoded mockup data to match the screenshot exactly
  const initialCflData = [
    {
      id: 1,
      name: 'Manpreet Kaur',
      initials: 'MK',
      avatarColor: 'bg-[#E06A3C]',
      employmentStatus: 'Probation',
      missingPlans: 'Missing: Thirty Days Plan, Sixty Days Plan, Ninety Days Plan, Final Review'
    },
    {
      id: 2,
      name: 'Amit Chauhan',
      initials: 'AC',
      avatarColor: 'bg-[#E06A3C]',
      employmentStatus: 'Probation',
      missingPlans: 'Missing: Thirty Days Plan, Sixty Days Plan, Ninety Days Plan, Final Review'
    },
    {
      id: 3,
      name: 'Yajnadutta Mishra',
      initials: 'YM',
      avatarColor: 'bg-[#E06A3C]',
      employmentStatus: 'Probation',
      missingPlans: 'Missing: Thirty Days Plan, Sixty Days Plan, Ninety Days Plan, Final Review'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      initials: 'SR',
      avatarColor: 'bg-[#E06A3C]',
      employmentStatus: 'Probation',
      missingPlans: 'Missing: Thirty Days Plan, Sixty Days Plan, Ninety Days Plan, Final Review'
    }
  ];

  const confirmedCfl = {
    id: 5,
    name: 'Rohit Verma',
    initials: 'RV',
    avatarColor: 'bg-[#E06A3C]',
    employmentStatus: 'Confirm'
  };

  return (
    <div className="space-y-8 animate-fade-in duration-300 font-inter select-none">
      
      {/* Header and Title */}
      <div>
        <h2 className="text-2xl font-bold text-[#1B1418] tracking-tight font-grotesk">
          Probation
        </h2>
        <p className="text-[13px] text-slate-500 mt-1 font-medium font-inter">
          Overview of probation confirmations across your team, with everything waiting on your action.
        </p>
      </div>

      {/* Summary / Metric Cards row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
        {/* TOTAL CFLS */}
        <div className="bg-white rounded-2xl border border-[#EAE3E4] p-5 flex flex-col items-center justify-center text-center shadow-[0_4px_15px_rgba(0,0,0,0.02)] min-h-[140px]">
          <div className="w-10 h-10 rounded-full bg-[#EEEFFC] text-[#5C6BC0] flex items-center justify-center text-lg mb-3 shadow-sm">
            <FaUsers />
          </div>
          <div className="text-[26px] font-bold text-slate-800 tracking-tight leading-none mb-1 font-grotesk">5</div>
          <div className="text-[10px] font-extrabold text-slate-400 tracking-wider font-inter">TOTAL CFLS</div>
        </div>

        {/* PENDING YOUR ACTION */}
        <div className="bg-white rounded-2xl border border-[#EAE3E4] p-5 flex flex-col items-center justify-center text-center shadow-[0_4px_15px_rgba(0,0,0,0.02)] min-h-[140px]">
          <div className="w-10 h-10 rounded-full bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center text-base mb-3 shadow-sm">
            <FaHourglassHalf className="animate-pulse" />
          </div>
          <div className="text-[26px] font-bold text-slate-800 tracking-tight leading-none mb-1 font-grotesk">0</div>
          <div className="text-[10px] font-extrabold text-slate-400 tracking-wider font-inter">PENDING YOUR ACTION</div>
        </div>

        {/* AWAITING BU HEAD */}
        <div className="bg-white rounded-2xl border border-[#EAE3E4] p-5 flex flex-col items-center justify-center text-center shadow-[0_4px_15px_rgba(0,0,0,0.02)] min-h-[140px]">
          <div className="w-10 h-10 rounded-full bg-[#F0F9FF] text-[#0284C7] flex items-center justify-center text-base mb-3 shadow-sm">
            <FaBuilding />
          </div>
          <div className="text-[26px] font-bold text-slate-800 tracking-tight leading-none mb-1 font-grotesk">0</div>
          <div className="text-[10px] font-extrabold text-slate-400 tracking-wider font-inter">AWAITING BU HEAD</div>
        </div>

        {/* AWAITING HR */}
        <div className="bg-white rounded-2xl border border-[#EAE3E4] p-5 flex flex-col items-center justify-center text-center shadow-[0_4px_15px_rgba(0,0,0,0.02)] min-h-[140px]">
          <div className="w-10 h-10 rounded-full bg-[#FAF5FF] text-[#9333EA] flex items-center justify-center text-base mb-3 shadow-sm">
            <FaClipboardList />
          </div>
          <div className="text-[26px] font-bold text-slate-800 tracking-tight leading-none mb-1 font-grotesk">0</div>
          <div className="text-[10px] font-extrabold text-slate-400 tracking-wider font-inter">AWAITING HR</div>
        </div>

        {/* CONFIRMED / CLOSED */}
        <div className="bg-white rounded-2xl border border-[#EAE3E4] p-5 flex flex-col items-center justify-center text-center shadow-[0_4px_15px_rgba(0,0,0,0.02)] min-h-[140px]">
          <div className="w-10 h-10 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center text-base mb-3 shadow-sm">
            <FaCheckCircle />
          </div>
          <div className="text-[26px] font-bold text-slate-800 tracking-tight leading-none mb-1 font-grotesk">1</div>
          <div className="text-[10px] font-extrabold text-slate-400 tracking-wider font-inter">CONFIRMED / CLOSED</div>
        </div>
      </div>

      {/* 1. Pending Your Action */}
      <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] space-y-6">
        <div className="flex justify-between items-center pb-2 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <FaBell className="text-amber-500 w-4 h-4" />
            <h3 className="text-sm font-extrabold text-[#78161A] font-grotesk uppercase tracking-wider">
              Pending Your Action
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-semibold font-inter">
            0 CFL(s) eligible and awaiting probation confirmation
          </span>
        </div>
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="text-[13px] text-slate-450 font-semibold font-inter">
            No CFLs are currently waiting on you. 🎉
          </p>
        </div>
      </div>

      {/* 2. In Approval Pipeline */}
      <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] space-y-6">
        <div className="flex justify-between items-center pb-2 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <FaClock className="text-slate-400 w-4 h-4" />
            <h3 className="text-sm font-extrabold text-[#78161A] font-grotesk uppercase tracking-wider">
              In Approval Pipeline
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-semibold font-inter">
            Submitted and awaiting BU/Division Head or HR sign-off
          </span>
        </div>
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="text-[13px] text-slate-450 font-semibold font-inter">
            Nothing currently in the approval pipeline.
          </p>
        </div>
      </div>

      {/* 3. Not Yet Eligible */}
      <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] space-y-5">
        <div className="flex justify-between items-center pb-2 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <FaLock className="text-amber-600 w-3.5 h-3.5" />
            <h3 className="text-sm font-extrabold text-[#78161A] font-grotesk uppercase tracking-wider">
              Not Yet Eligible
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-semibold font-inter">
            Still completing review cycles
          </span>
        </div>
        
        <div className="divide-y divide-[#EAE3E4]">
          {initialCflData.map((cfl) => (
            <div key={cfl.id} className="flex items-center justify-between py-4 hover:bg-slate-50/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${cfl.avatarColor} text-white flex items-center justify-center font-extrabold text-[12px] uppercase shadow-sm flex-shrink-0 font-inter`}>
                  {cfl.initials}
                </div>
                <div>
                  <h4 className="text-[13.5px] font-bold text-slate-800 leading-tight font-inter">{cfl.name}</h4>
                  <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-400 font-medium font-inter">
                    <span>Employment Status:</span>
                    <span className="px-2 py-0.5 rounded-[5px] text-[9.5px] font-bold bg-[#FFFAF3] text-[#C2410C] border border-[#FDBA74] uppercase tracking-wider ml-0.5">
                      {cfl.employmentStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <span className="px-[12px] py-[5px] rounded-full text-[10.5px] font-bold bg-[#F8FAFC]/90 text-slate-500 border border-[#E2E8F0] shadow-sm select-all">
                  {cfl.missingPlans}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Confirmed / Closed */}
      <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] space-y-5">
        <div className="flex justify-between items-center pb-2 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-emerald-500 w-4 h-4" />
            <h3 className="text-sm font-extrabold text-[#78161A] font-grotesk uppercase tracking-wider">
              Confirmed / Closed
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${confirmedCfl.avatarColor} text-white flex items-center justify-center font-extrabold text-[12px] uppercase shadow-sm flex-shrink-0 font-inter`}>
              {confirmedCfl.initials}
            </div>
            <div>
              <h4 className="text-[13.5px] font-bold text-slate-800 leading-tight font-inter">{confirmedCfl.name}</h4>
              <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-400 font-medium font-inter">
                <span>Employment Status:</span>
                <span className="px-2 py-0.5 rounded-[5px] text-[9.5px] font-bold bg-[#EBFDF5] text-[#15803d] border border-[#A7F3D0] uppercase tracking-wider ml-0.5">
                  {confirmedCfl.employmentStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button className="px-3 py-1 rounded-[5px] text-[10.5px] font-extrabold bg-[#EBFDF5] text-[#15803d] border border-[#a7f3d0] hover:bg-[#dcfce7] active:scale-95 transition-all outline-none">
              Confirm
            </button>
            <button 
              onClick={() => alert(`Reviewing details for ${confirmedCfl.name}`)}
              className="w-7 h-7 rounded-full border border-slate-205 flex items-center justify-center text-slate-400 hover:text-[#78161A] hover:bg-slate-50 shadow-sm active:scale-95 transition-all outline-none cursor-pointer"
            >
              <FaRegEye className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Probation;
