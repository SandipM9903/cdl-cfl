import React, { useState } from 'react';
import {
  FaPlus,
  FaComments,
  FaFileAlt,
  FaCalendarAlt,
  FaFolder,
  FaUsers,
  FaCheck,
  FaChevronRight,
  FaRegCommentDots
} from 'react-icons/fa';
import MentorNavbar from '../../components/navbar/MentorNavbar';
import MetricCard from '../../components/molecules/MetricCard';
import Button from '../../components/atoms/Button';
import { useAuth } from '../../context/AuthContext';

const MentorDashboard = () => {
  const { role, setRole } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [batchYear, setBatchYear] = useState('2026');

  // SVG Segment Calculations for Mentoring Overview Donut Chart
  // Total Sessions = 24
  // segments: Completed = 15 (62%), Upcoming = 6 (25%), Cancelled = 3 (13%)
  const radius = 30;
  const strokeWidth = 16;
  const circumference = 2 * Math.PI * radius; // 188.50
  
  const arcBlue = 0.62 * circumference; // 116.87
  const arcPurple = 0.25 * circumference; // 47.12
  const arcRed = 0.13 * circumference; // 24.51

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex font-inter select-none">
      {/* Sidebar Navbar */}
      <MentorNavbar activeTab={activeTab} onTabChange={setActiveTab} />

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
          <div className="bg-[#1FB6A6] text-white text-[10.5px] font-extrabold py-[6px] px-[14px] rounded-full tracking-wider shadow-[0_4px_12px_rgba(31,182,166,0.25)]">
            Mentor DASHBOARD
          </div>
        </header>

        {/* Dashboard Main Content Body Wrapper */}
        <main className="flex-1 p-[34px] space-y-8 max-w-[1400px] w-full">
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in duration-300">
              {/* Greetings Banner */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-[#1B1418] tracking-tight flex items-center gap-2 font-grotesk">
                    Good Morning, Mentor! 👋
                  </h2>
                  <p className="text-[13px] text-slate-500 mt-1 font-medium font-inter">
                    Here's what's happening with your mentees.
                  </p>
                </div>
                {/* Year Selection Dropdown & Schedule Meeting CTA */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <select
                      value={batchYear}
                      onChange={(e) => setBatchYear(e.target.value)}
                      className="appearance-none bg-white border border-[#EAE3E4] rounded-lg px-4 py-2 pr-9 text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#78161A]/10 focus:border-[#78161A] cursor-pointer"
                    >
                      <option value="2026">2026</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Opening Meeting Scheduler...')}
                    className="bg-[#78161A] hover:bg-[#631013] text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-md active:scale-95 transition-all text-center"
                  >
                    Schedule Meeting
                  </button>
                </div>
              </div>

              {/* Metrics Cards Grid Layout */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
                <MetricCard title="My Mentees" value="10" badgeText="Active" badgeVariant="green" />
                <MetricCard title="Mentoring This Month" value="6" badgeText="Sessions" badgeVariant="green" />
                <MetricCard title="Feedback Given" value="8" badgeText="This Month" badgeVariant="green" />
                <MetricCard title="Pending Feedback" value="2" badgeText="Due" badgeVariant="red" />
              </section>

              {/* Middle Section: Mentoring Overview Donut Chart and Mentees Progress Snapshot */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Mentoring Overview Card */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[350px]">
                  <h3 className="text-base font-bold text-[#78161A] tracking-tight font-grotesk mb-4">
                    Mentoring Overview
                  </h3>
                  <div className="flex-grow flex items-center justify-between gap-[25px] pb-2">
                    {/* Segmented Donut Chart SVG */}
                    <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {/* Segment 1: Completed (Blue) */}
                        <circle
                          cx="50"
                          cy="50"
                          r={radius}
                          fill="transparent"
                          stroke="#3B82F6"
                          strokeWidth={strokeWidth}
                          strokeDasharray={`${arcBlue} ${circumference}`}
                          strokeDashoffset="0"
                        />
                        {/* Segment 2: Upcoming (Purple) */}
                        <circle
                          cx="50"
                          cy="50"
                          r={radius}
                          fill="transparent"
                          stroke="#8B5CF6"
                          strokeWidth={strokeWidth}
                          strokeDasharray={`${arcPurple} ${circumference}`}
                          strokeDashoffset={-arcBlue}
                        />
                        {/* Segment 3: Cancelled (Red) */}
                        <circle
                          cx="50"
                          cy="50"
                          r={radius}
                          fill="transparent"
                          stroke="#EF4444"
                          strokeWidth={strokeWidth}
                          strokeDasharray={`${arcRed} ${circumference}`}
                          strokeDashoffset={-(arcBlue + arcPurple)}
                        />
                      </svg>
                    </div>

                    {/* Chart Legend */}
                    <div className="flex-grow flex flex-col gap-4 text-xs font-semibold text-slate-700 pl-4">
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-[#3B82F6]"></span>
                        <span>Completed — <span className="text-slate-900 font-bold">15 (62%)</span></span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-[#8B5CF6]"></span>
                        <span>Upcoming — <span className="text-slate-900 font-bold">6 (25%)</span></span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-[#EF4444]"></span>
                        <span>Cancelled — <span className="text-slate-900 font-bold">3 (13%)</span></span>
                      </div>
                    </div>

                    {/* Total Sessions Right Stats Block */}
                    <div className="flex flex-col items-center justify-center border-l border-[#EAE3E4] pl-6 flex-shrink-0">
                      <span className="text-[34px] font-bold text-slate-800 leading-none font-grotesk">24</span>
                      <span className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-wide text-center max-w-[80px]">Total Sessions</span>
                    </div>
                  </div>
                </div>

                {/* Progress Snapshot & Upcoming Meetings Column */}
                <div className="lg:col-span-5 bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[350px]">
                  <h3 className="text-base font-bold text-[#78161A] tracking-tight font-grotesk mb-4">
                    Mentees Progress Snapshot
                  </h3>
                  <div className="flex-grow flex flex-col justify-between">
                    {/* Progress stacked list - 3-column inline row layout */}
                    <div className="space-y-4">
                      {/* On Track */}
                      <div className="flex items-center gap-3 w-full">
                        <span className="w-36 flex-shrink-0 text-xs font-semibold text-[#1E8E5A] flex items-center gap-1.5">
                          <span className="text-[13px]">✓</span> On Track
                        </span>
                        <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-[#1E8E5A] h-full rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="w-10 flex-shrink-0 text-xs font-bold text-slate-800 text-right">
                          60%
                        </span>
                      </div>

                      {/* Needs Attention */}
                      <div className="flex items-center gap-3 w-full">
                        <span className="w-36 flex-shrink-0 text-xs font-semibold text-[#F97316] flex items-center gap-1.5">
                          <span className="text-[11px] font-bold">▲</span> Needs Attention
                        </span>
                        <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-[#F97316] h-full rounded-full" style={{ width: '30%' }}></div>
                        </div>
                        <span className="w-10 flex-shrink-0 text-xs font-bold text-slate-800 text-right">
                          30%
                        </span>
                      </div>

                      {/* At Risk */}
                      <div className="flex items-center gap-3 w-full">
                        <span className="w-36 flex-shrink-0 text-xs font-semibold text-[#EF4444] flex items-center gap-1.5">
                          <span className="text-[12px] font-extrabold font-grotesk">!</span> At Risk
                        </span>
                        <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-[#EF4444] h-full rounded-full" style={{ width: '10%' }}></div>
                        </div>
                        <span className="w-10 flex-shrink-0 text-xs font-bold text-slate-800 text-right">
                          10%
                        </span>
                      </div>
                    </div>

                    {/* Upcoming Meetings Row segment */}
                    <div className="pt-4 border-t border-slate-100 space-y-3 mt-4">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Upcoming Meetings</span>
                      <div className="space-y-2.5 text-xs font-semibold text-slate-700">
                        {/* Day 1 */}
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-slate-400 block text-[9.5px] uppercase font-bold">Today</span>
                            <span className="text-slate-800 font-bold">1:1 with Rohit Verma</span>
                          </div>
                          <span className="text-[10.5px] text-slate-400 font-semibold">10:00 AM - 10:30 AM</span>
                        </div>
                        {/* Day 2 */}
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-slate-400 block text-[9.5px] uppercase font-bold">Tomorrow</span>
                            <span className="text-slate-800 font-bold">Goal Discussion - Amit Chauhan</span>
                          </div>
                          <span className="text-[10.5px] text-slate-400 font-semibold">11:30 AM - 12:00 PM</span>
                        </div>
                        {/* Day 3 */}
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-slate-400 block text-[9.5px] uppercase font-bold">22 May</span>
                            <span className="text-slate-800 font-bold">Mentoring - Sneha Reddy</span>
                          </div>
                          <span className="text-[10.5px] text-slate-400 font-semibold">03:00 PM - 03:30 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lower Section (Recent Activity, Quick Actions) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {/* Recent Activity Card */}
                <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[220px]">
                  <h3 className="text-base font-bold text-[#78161A] tracking-tight font-grotesk mb-4">
                    Recent Activity
                  </h3>
                  <div className="flex-grow flex flex-col justify-center divide-y divide-slate-100">
                    {/* Item 1 */}
                    <div className="py-3 flex justify-between gap-3 first:pt-0">
                      <div className="flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-red-600 mt-1.5 flex-shrink-0"></span>
                        <span className="text-[12.5px] text-slate-700 font-semibold">You provided feedback for Amit Chauhan</span>
                      </div>
                      <span className="text-[10.5px] text-slate-400 font-semibold whitespace-nowrap">2h ago</span>
                    </div>
                    {/* Item 2 */}
                    <div className="py-3 flex justify-between gap-3 last:pb-0">
                      <div className="flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-red-650 mt-1.5 flex-shrink-0"></span>
                        <span className="text-[12.5px] text-slate-700 font-semibold">Mentoring completed with Yajnadutta Mishra</span>
                      </div>
                      <span className="text-[10.5px] text-slate-400 font-semibold whitespace-nowrap">5h ago</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Column */}
                <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[220px]">
                  <h3 className="text-base font-bold text-[#78161A] tracking-tight font-grotesk mb-4">
                    Quick Actions
                  </h3>
                  <div className="flex-grow grid grid-cols-3 gap-4">
                    {/* Action 1 */}
                    <button
                      onClick={() => alert('Opening Mentees details...')}
                      className="bg-white hover:bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:shadow-md group text-center"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#FCF5E3] text-[#D97706] flex items-center justify-center text-sm group-hover:scale-105 transition-transform">
                        <FaFolder className="w-[18px] h-[18px]" />
                      </div>
                      <span className="text-[11.5px] font-bold text-slate-700 leading-snug">Manage Mentees</span>
                    </button>
                    {/* Action 2 */}
                    <button
                      onClick={() => alert('Opening Meeting Scheduler...')}
                      className="bg-white hover:bg-slate-50 border border-slate-105 rounded-xl p-3 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:shadow-md group text-center"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#E5F2FE] text-[#2563EB] flex items-center justify-center text-sm group-hover:scale-105 transition-transform">
                        <FaCalendarAlt className="w-[18px] h-[18px]" />
                      </div>
                      <span className="text-[11.5px] font-bold text-slate-700 leading-snug">Schedule Meeting</span>
                    </button>
                    {/* Action 3 */}
                    <button
                      onClick={() => alert('Opening Feedback center...')}
                      className="bg-white hover:bg-slate-50 border border-slate-105 rounded-xl p-3 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:shadow-md group text-center"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#FDECEE] text-[#DB2777] flex items-center justify-center text-sm group-hover:scale-105 transition-transform">
                        <FaComments className="w-[18px] h-[18px]" />
                      </div>
                      <span className="text-[11.5px] font-bold text-slate-700 leading-snug">Provide Feedback</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'overview' && (
            <div className="text-center bg-white border border-slate-100 rounded-2xl py-24 shadow-sm animate-fade-in duration-300">
              <h3 className="text-xl font-bold text-slate-800 mb-2 font-grotesk">
                {activeTab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Section
              </h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto font-inter">
                This subsection is currently placeholder and will represent custom tasks, mentoring assignments, and files in production.
              </p>
            </div>
          )}
        </main>

        {/* Floating Chat Icon support */}
        <button
          onClick={() => alert('Need assistance? Our smart chatbot helper is here!')}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#1FB6A6] text-white rounded-full shadow-lg shadow-[#1FB6A6]/20 flex items-center justify-center hover:scale-105 hover:bg-[#1bb0a0] transition-all z-40 outline-none"
        >
          <FaComments className="w-6 h-6" />
        </button>

        {/* Demo Role switcher helper floating layout in bottom-left content area */}
        <div className="fixed bottom-6 left-[280px] z-40 bg-white border border-slate-200 shadow-xl rounded-xl p-3 flex flex-col gap-2 max-w-[210px] w-full">
          <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">
            Demo Role Control
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setRole('HR')}
              className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all bg-slate-100 text-slate-600 hover:bg-slate-200`}
            >
              HR
            </button>
            <button
              onClick={() => setRole('Employee')}
              className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all bg-slate-100 text-slate-600 hover:bg-slate-200`}
            >
              CFL
            </button>
            <button
              onClick={() => setRole('Manager')}
              className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all bg-slate-100 text-slate-600 hover:bg-slate-200`}
            >
              Mgr
            </button>
            <button
              onClick={() => setRole('Mentor')}
              className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all bg-rose-700 text-white`}
              style={{ backgroundColor: '#78161A' }}
            >
              Mentor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
