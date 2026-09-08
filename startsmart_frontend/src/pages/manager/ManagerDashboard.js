import React, { useState } from 'react';
import {
  FaFileAlt,
  FaCalendarAlt,
  FaBullseye,
  FaHourglassHalf
} from 'react-icons/fa';
import MetricCard from '../../components/molecules/MetricCard';

const ManagerDashboard = ({ onNavigate }) => {
  const [batchYear, setBatchYear] = useState('2026');

  // SVG Segment Calculations for Team Overview Donut Chart
  // Total CFLs = 12
  // segments: On Track = 7 (58%), Needs Attention = 3 (25%), At Risk = 2 (17%)
  const radius = 38;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius; // 238.76
  
  const arcGreen = 0.58 * circumference;
  const arcOrange = 0.25 * circumference;
  const arcRed = 0.17 * circumference;

  return (
    <div className="space-y-8 animate-fade-in duration-300">
      {/* Greetings Banner */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-[#1B1418] tracking-tight flex items-center gap-2 font-grotesk">
            Good Morning, Manpreet! 🖐👋
          </h2>
          <p className="text-[13px] text-slate-500 mt-1 font-medium font-inter">
            Here's your team overview.
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
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
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
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="My CFLs" value="12" badgeText="On Track" badgeVariant="green" />
        <MetricCard title="Goals Under Review" value="8" badgeText="Sessions" badgeVariant="green" />
        <MetricCard title="Probation Due" value="2" badgeText="This Month" badgeVariant="green" />
        <MetricCard title="Pending Reviews" value="3" badgeText="Due" badgeVariant="red" />
      </section>

      {/* Middle Section: Team Overview Donut Chart and My Action Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
        {/* Team Overview Card */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[300px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-[#78161A] tracking-tight font-grotesk uppercase">
              Team Overview
            </h3>
          </div>
          <div className="flex-1 flex items-center justify-around gap-[20px] font-inter">
            {/* Segmented Donut Chart SVG */}
            <div className="relative w-[155px] h-[155px] flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Segment 1: On Track (Green) */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke="#1E8E5A"
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${arcGreen} ${circumference}`}
                  strokeDashoffset="0"
                />
                {/* Segment 2: Needs Attention (Orange) */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke="#E28743"
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${arcOrange} ${circumference}`}
                  strokeDashoffset={-arcGreen}
                />
                {/* Segment 3: At Risk (Red) */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke="#C0392B"
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${arcRed} ${circumference}`}
                  strokeDashoffset={-(arcGreen + arcOrange)}
                />
              </svg>
              {/* Central Label inside Donut Chart */}
              <div className="absolute text-center flex flex-col items-center">
                <span className="text-[26px] font-bold text-slate-800 tracking-tight leading-none">12</span>
                <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-widest mt-1">CFLs</span>
              </div>
            </div>

            {/* Side Legend with detailed counters */}
            <div className="flex flex-col gap-3 font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#1E8E5A]"></span>
                <span className="text-[12.5px]">On Track — <strong className="text-slate-800">7 (58%)</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#E28743]"></span>
                <span className="text-[12.5px]">Needs Attention — <strong className="text-slate-800">3 (25%)</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#C0392B]"></span>
                <span className="text-[12.5px]">At Risk — <strong className="text-slate-800">2 (17%)</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* My Action Center Card Grid Panel */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[300px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-[#78161A] tracking-tight font-grotesk uppercase">
              My Action Center
            </h3>
            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate('my-cfls');
                } else {
                  alert('Navigating to CFL list...');
                }
              }}
              className="text-[11.5px] font-extrabold text-[#78161A] hover:underline uppercase tracking-wider"
            >
              View All Actions
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center divide-y divide-slate-100 font-inter">
            {/* Goal Review Item */}
            <div className="py-3 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <span className="text-[13px] text-amber-500 bg-amber-50 p-2 rounded-xl border border-amber-100 flex items-center justify-center">
                  <FaBullseye />
                </span>
                <span className="text-[13px] text-slate-700 font-bold">Goal reviews pending</span>
              </div>
              <span className="text-[13px] font-black text-rose-700">8 CFLs</span>
            </div>
            {/* Performance Reviews Item */}
            <div className="py-3 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <span className="text-[13px] text-blue-500 bg-blue-50 p-2 rounded-xl border border-blue-105 flex items-center justify-center">
                  <FaFileAlt />
                </span>
                <span className="text-[13px] text-slate-700 font-bold">Performance reviews pending</span>
              </div>
              <span className="text-[13px] font-black text-rose-700">3 CFLs</span>
            </div>
            {/* Probation Confirmations Item */}
            <div className="py-3 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <span className="text-[13px] text-indigo-500 bg-indigo-50 p-2 rounded-xl border border-indigo-105 flex items-center justify-center">
                  <FaHourglassHalf />
                </span>
                <span className="text-[13px] text-slate-700 font-bold">Probation confirmations due</span>
              </div>
              <span className="text-[13px] font-black text-rose-700">2 CFLs</span>
            </div>
            {/* Meetings Today Item */}
            <div className="py-3 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <span className="text-[13px] text-emerald-500 bg-emerald-50 p-2 rounded-xl border border-emerald-100 flex items-center justify-center">
                  <FaCalendarAlt />
                </span>
                <span className="text-[13px] text-slate-700 font-bold">Meetings today</span>
              </div>
              <span className="text-[13px] font-black text-rose-700">1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Upcoming Meetings and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-2">
        {/* Meetings Card */}
        <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[300px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-[#78161A] tracking-tight font-grotesk uppercase">
              Upcoming Meetings
            </h3>
            <button className="text-[11.5px] font-extrabold text-[#78161A] hover:underline uppercase tracking-wider">
              View Calendar
            </button>
          </div>
          <div className="flex-1 flex flex-col gap-4 font-inter">
            {/* Meeting Row 1 */}
            <div className="flex items-start gap-4 p-3 bg-slate-50/70 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="bg-rose-50 border border-rose-100 text-[#78161A] rounded-lg p-2 flex flex-col items-center justify-center min-w-[50px] font-bold">
                <span className="text-[15px] font-extrabold">12</span>
                <span className="text-[9.5px] uppercase font-bold tracking-wider mt-0.5">May</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[13.5px] font-bold text-slate-800 truncate">1:1 with Amit Chauhan</h4>
                <p className="text-[11px] text-slate-400 mt-1 font-semibold">Today · 11:00 AM</p>
              </div>
              <button className="bg-[#1FB6A6] text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-[#1db0a0] transition-colors self-center">
                Join
              </button>
            </div>

            {/* Meeting Row 2 */}
            <div className="flex items-start gap-4 p-3 bg-slate-50/70 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="bg-rose-50 border border-rose-100 text-[#78161A] rounded-lg p-2 flex flex-col items-center justify-center min-w-[50px] font-bold">
                <span className="text-[15px] font-extrabold">13</span>
                <span className="text-[9.5px] uppercase font-bold tracking-wider mt-0.5">May</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[13.5px] font-bold text-slate-800 truncate">Probation Discussion</h4>
                <p className="text-[11px] text-slate-400 mt-1 font-semibold">Tomorrow · 2:00 PM</p>
              </div>
              <button className="bg-[#1FB6A6] text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-[#1db0a0] transition-colors self-center">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[300px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-[#78161A] tracking-tight font-grotesk uppercase">
              Recent Activity
            </h3>
          </div>
          <div className="flex-1 flex flex-col justify-center font-inter">
            <div className="divide-y divide-slate-100">
              {/* Activity 1 */}
              <div className="py-3 flex justify-between gap-3 font-semibold first:pt-0">
                <div className="flex items-start gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-650 mt-1 flex-shrink-0" style={{ backgroundColor: '#78161A' }}></span>
                  <span className="text-[12.5px] text-slate-700 font-semibold leading-tight font-inter">Amit Chauhan completed goal setting</span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold font-inter whitespace-nowrap mt-0.5">2h ago</span>
              </div>
              {/* Activity 2 */}
              <div className="py-3 flex justify-between gap-3 font-semibold">
                <div className="flex items-start gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-650 mt-1 flex-shrink-0" style={{ backgroundColor: '#78161A' }}></span>
                  <span className="text-[12.5px] text-slate-700 font-semibold leading-tight font-inter">You provided feedback for Yajnadutta Mishra</span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold font-inter whitespace-nowrap mt-0.5">1d ago</span>
              </div>
              {/* Activity 3 */}
              <div className="py-3 flex justify-between gap-3 font-semibold last:pb-0">
                <div className="flex items-start gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-650 mt-1 flex-shrink-0" style={{ backgroundColor: '#78161A' }}></span>
                  <span className="text-[12.5px] text-slate-700 font-semibold leading-tight font-inter">Probation confirmed for Sneha Reddy</span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold font-inter whitespace-nowrap mt-0.5">2d ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Snapshot Row */}
      <section className="space-y-4 pt-2 font-inter">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-[#78161A] tracking-tight font-grotesk uppercase">
            Team Performance Snapshot
          </h3>
          <button onClick={() => alert('Opening 9-Box Matrix...')} className="text-[12px] font-bold text-[#78161A] hover:underline">
            View 9-Box
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
          {/* Rating Card 1 */}
          <div className="bg-white rounded-2xl border border-[#EAE3E4] p-5 shadow-[0_4px_15px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center min-h-[140px] hover:shadow-md transition-all duration-300">
            <span className="text-[34px] font-bold text-emerald-600 font-grotesk leading-none">4.1 / 5</span>
            <span className="text-[12px] font-bold text-slate-700 mt-2 font-inter">Avg. Performance Rating</span>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">High</span>
          </div>

          {/* Rating Card 2 */}
          <div className="bg-white rounded-2xl border border-[#EAE3E4] p-5 shadow-[0_4px_15px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center min-h-[140px] hover:shadow-md transition-all duration-300">
            <span className="text-[34px] font-bold text-blue-600 font-grotesk leading-none">3.8 / 5</span>
            <span className="text-[12px] font-bold text-slate-700 mt-2 font-inter">Avg. Potential Rating</span>
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-1">High</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagerDashboard;
