import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaVideo, FaMapMarkerAlt, FaLink, FaCalendarPlus } from 'react-icons/fa';

const DEFAULT_CFLS = [
  'Manpreet Kaur',
  'Amit Chauhan',
  'Yajnadutta Mishra',
  'Rohit Verma',
  'Sneha Reddy',
  'Shalini',
  'Amulya',
  'Abhishek',
  'John Doe'
];

const HrMeetings = () => {
  const [selectedCfl, setSelectedCfl] = useState('Manpreet Kaur');
  const [meetingType, setMeetingType] = useState('HR Discussion');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingMode, setMeetingMode] = useState('Zoom');
  const [meetingLink, setMeetingLink] = useState('');
  const [agenda, setAgenda] = useState('');
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);

  // May 2026 calendar alignment matching mockup exactly
  const daysOfWeek = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  // Mockup calendar grid alignment:
  // Row 1: empty(SU) 1(MO) 2(TU) 3(WE) 4(TH) 5(FR) 6(SA)
  // Row 2: 7 8 9 10 11 12 13
  // Row 3: 14 15(Today) 16 17 18 19 20
  // Row 4: 21 22 23 24 25 26 27
  // Row 5: 28 29 30 31
  const calendarDays = [
    { day: null }, { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 },
    { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 }, { day: 13 },
    { day: 14 }, { day: 15, isToday: true }, { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20 },
    { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 },
    { day: 28 }, { day: 29 }, { day: 30 }, { day: 31 }
  ];

  const handleSchedule = (e) => {
    e.preventDefault();
    if (!meetingDate || !meetingTime || !agenda.trim()) {
      alert('Please fill in required fields: Date, Time, and Agenda.');
      return;
    }

    const newMeeting = {
      id: Date.now(),
      cflName: selectedCfl,
      type: meetingType || 'HR Discussion',
      date: meetingDate,
      time: meetingTime,
      mode: meetingMode,
      link: meetingLink,
      agenda: agenda
    };

    setUpcomingMeetings(prev => [newMeeting, ...prev]);
    alert(`Meeting scheduled with ${selectedCfl} on ${meetingDate} at ${meetingTime}!`);

    // Reset optional form fields
    setMeetingLink('');
    setAgenda('');
  };

  const handleCancel = () => {
    setMeetingDate('');
    setMeetingTime('');
    setMeetingLink('');
    setAgenda('');
  };

  return (
    <div className="space-y-6 animate-fade-in duration-300 font-inter">
      {/* Top Header */}
      <div className="pb-1">
        <h3 className="font-bold text-[#1B1418] text-2xl tracking-tight font-grotesk">
          Meetings
        </h3>
        <p className="text-[13px] text-slate-500 mt-1 font-medium font-inter">
          Track program-wide meetings across CFLs, mentors and managers.
        </p>
      </div>

      {/* 2-Column Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Calendar & Upcoming Meetings (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] space-y-6">
          {/* Month Title */}
          <h4 className="font-bold text-[#78161A] text-lg font-grotesk">
            May 2026
          </h4>

          {/* Calendar Grid */}
          <div className="w-full">
            {/* Days Header */}
            <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              {daysOfWeek.map((d, i) => (
                <div key={i} className="py-1">{d}</div>
              ))}
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-7 gap-y-4 text-center text-sm font-semibold">
              {calendarDays.map((cell, idx) => {
                if (!cell.day) {
                  return <div key={idx} className="h-9"></div>;
                }

                const hasMeeting = upcomingMeetings.some(m => {
                  const dayNum = parseInt(m.date.split('-')[2] || '0', 10);
                  return dayNum === cell.day;
                });

                return (
                  <div key={idx} className="h-9 flex items-center justify-center">
                    {cell.isToday ? (
                      <span className="bg-[#C9252B] text-white font-bold rounded-xl px-4 py-1.5 text-sm min-w-[50px] inline-flex items-center justify-center shadow-sm">
                        {cell.day}
                      </span>
                    ) : hasMeeting ? (
                      <span className="bg-[#F3E8FF] text-[#7E22CE] border border-[#D8B4FE] font-bold rounded-xl px-4 py-1.5 text-sm min-w-[50px] inline-flex items-center justify-center shadow-xs">
                        {cell.day}
                      </span>
                    ) : (
                      <span className="text-slate-600 font-medium hover:bg-slate-100 rounded-xl px-3 py-1 text-sm inline-flex items-center justify-center transition-colors">
                        {cell.day}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend Row */}
          <div className="flex items-center gap-6 pt-4 mt-6 border-t border-slate-100 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C9252B] inline-block"></span>
              <span>Today</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D8B4FE] inline-block"></span>
              <span>Upcoming Meeting / Session</span>
            </div>
          </div>

          {/* Upcoming Meetings Section */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h5 className="font-bold text-[#78161A] text-sm font-grotesk">
              Upcoming Meetings
            </h5>

            {upcomingMeetings.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs font-medium">
                No upcoming meetings.
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingMeetings.map((item) => (
                  <div key={item.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:border-[#78161A]/30 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <h6 className="font-bold text-slate-900 text-sm">{item.type} with {item.cflName}</h6>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{item.agenda}</p>
                      </div>
                      <span className="bg-[#78161A]/10 text-[#78161A] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {item.mode}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 pt-1">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <FaCalendarAlt className="text-[#78161A] text-xs" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <FaClock className="text-[#78161A] text-xs" />
                        <span>{item.time}</span>
                      </div>
                      {item.link && (
                        <a href={item.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                          <FaLink className="text-xs" />
                          <span>Join Link</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Schedule Meeting Form (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] space-y-4">
          <h4 className="font-bold text-[#78161A] text-lg font-grotesk">
            Schedule Meeting
          </h4>

          <form onSubmit={handleSchedule} className="space-y-4 text-xs">
            {/* CFL Selection Dropdown */}
            <div>
              <label className="font-bold text-slate-700 block mb-1 uppercase tracking-wider text-[10px]">
                CFL <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <select
                  value={selectedCfl}
                  onChange={(e) => setSelectedCfl(e.target.value)}
                  className="w-full bg-white border border-[#EAE3E4] rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#78161A]/10 focus:border-[#78161A] appearance-none cursor-pointer"
                >
                  {DEFAULT_CFLS.map((name, i) => (
                    <option key={i} value={name}>{name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>

            {/* Meeting Type */}
            <div>
              <label className="font-bold text-slate-700 block mb-1 uppercase tracking-wider text-[10px]">
                MEETING TYPE
              </label>
              <input
                type="text"
                value={meetingType}
                onChange={(e) => setMeetingType(e.target.value)}
                placeholder="HR Discussion"
                className="w-full bg-white border border-[#EAE3E4] rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#78161A]/10 focus:border-[#78161A]"
              />
            </div>

            {/* Date and Time 2 Cols */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1 uppercase tracking-wider text-[10px]">
                  DATE <span className="text-rose-600">*</span>
                </label>
                <input
                  type="date"
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  className="w-full bg-white border border-[#EAE3E4] rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#78161A]/10 focus:border-[#78161A]"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1 uppercase tracking-wider text-[10px]">
                  TIME <span className="text-rose-600">*</span>
                </label>
                <input
                  type="time"
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                  className="w-full bg-white border border-[#EAE3E4] rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#78161A]/10 focus:border-[#78161A]"
                  required
                />
              </div>
            </div>

            {/* Meeting Mode Radio Buttons */}
            <div>
              <label className="font-bold text-slate-700 block mb-1.5 uppercase tracking-wider text-[10px]">
                MEETING MODE <span className="text-rose-600">*</span>
              </label>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
                {['Zoom', 'Google Meet', 'Teams Meeting', 'In-Person'].map((mode) => (
                  <label key={mode} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="meetingMode"
                      value={mode}
                      checked={meetingMode === mode}
                      onChange={(e) => setMeetingMode(e.target.value)}
                      className="accent-[#78161A] w-3.5 h-3.5 cursor-pointer"
                    />
                    <span>{mode}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Meeting Link (Optional) */}
            <div>
              <label className="font-bold text-slate-700 block mb-1 uppercase tracking-wider text-[10px]">
                MEETING LINK (OPTIONAL)
              </label>
              <input
                type="text"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="Paste Zoom / Teams / Meet link if you have one"
                className="w-full bg-white border border-[#EAE3E4] rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#78161A]/10 focus:border-[#78161A]"
              />
              <p className="text-[10px] text-slate-400 italic mt-1 leading-relaxed">
                If your organization isn't directly integrated with the meeting tool, paste the link here — it will show to everyone invited.
              </p>
            </div>

            {/* Agenda */}
            <div>
              <label className="font-bold text-slate-700 block mb-1 uppercase tracking-wider text-[10px]">
                AGENDA <span className="text-rose-600">*</span>
              </label>
              <textarea
                rows="3"
                value={agenda}
                onChange={(e) => setAgenda(e.target.value)}
                placeholder="What would you like to discuss?"
                className="w-full bg-white border border-[#EAE3E4] rounded-xl p-3 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#78161A]/10 focus:border-[#78161A]"
                required
              ></textarea>
            </div>

            {/* Form Buttons */}
            <div className="flex justify-end items-center gap-3 pt-2 font-grotesk">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-white border border-[#78161A] text-[#78161A] hover:bg-slate-50 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-2xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#78161A] hover:bg-[#631013] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md"
              >
                Schedule Meeting
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HrMeetings;
