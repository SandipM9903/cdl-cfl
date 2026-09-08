import React, { useState } from 'react';
import {
  FaCalendarAlt,
  FaClock,
  FaHistory,
  FaInfoCircle,
  FaGraduationCap,
  FaThumbsUp,
  FaCheckCircle
} from 'react-icons/fa';
import DynamicCalendar from '../../components/common/DynamicCalendar';

const Meetings = () => {
  // Main Tab State: 'my-meetings' vs 'history'
  const [activeTab, setActiveTab] = useState('my-meetings');

  // Form State for Schedule Meeting
  const [meetingWith, setMeetingWith] = useState('Mentor'); // 'Mentor' | 'Manager' | 'HR'
  const [selectedPerson, setSelectedPerson] = useState('Rohit Verma');
  const [meetingType, setMeetingType] = useState('Mentoring Session');
  const [meetingDate, setMeetingDate] = useState('2026-05-15');
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingMode, setMeetingMode] = useState('Zoom');
  const [meetingLink, setMeetingLink] = useState('');
  const [agenda, setAgenda] = useState('');

  // Dynamic Meetings List
  const [upcomingMeetings, setUpcomingMeetings] = useState([
    {
      id: 1,
      date: '2026-05-22',
      day: 22,
      month: 'MAY',
      year: 2026,
      title: 'Mentoring Session — Rohit Verma',
      time: '03:00 PM',
      mode: 'Zoom',
      createdByType: 'Mentor', // 'Mentor' | 'You'
      link: 'https://zoom.us/j/123456789'
    },
    {
      id: 2,
      date: '2026-05-29',
      day: 29,
      month: 'MAY',
      year: 2026,
      title: 'Mentoring Session — Rohit Verma',
      time: '11:30 AM',
      mode: 'Google Meet',
      createdByType: 'You',
      link: 'https://meet.google.com/abc-defg-hij'
    }
  ]);

  const [historyMeetings] = useState([
    {
      id: 101,
      day: 15,
      month: 'APR',
      title: '1-on-1 Onboarding Check-in',
      withPerson: 'Ananya Gupta (HR)',
      time: '10:00 AM',
      mode: 'Teams Meeting',
      status: 'Completed'
    },
    {
      id: 102,
      day: 28,
      month: 'APR',
      title: 'Initial Goal Setup & Probation Review',
      withPerson: 'Rajesh Verma (Manager)',
      time: '02:30 PM',
      mode: 'In-Person',
      status: 'Completed'
    }
  ]);

  // Handle Person & Meeting Type options when switching "MEETING WITH"
  const handleMeetingWithChange = (role) => {
    setMeetingWith(role);
    if (role === 'Mentor') {
      setSelectedPerson('Rohit Verma');
      setMeetingType('Mentoring Session');
    } else if (role === 'Manager') {
      setSelectedPerson('Rajesh Verma');
      setMeetingType('Manager Sync / 1:1');
    } else if (role === 'HR') {
      setSelectedPerson('Ananya Gupta');
      setMeetingType('HR Sync');
    }
  };

  // Form Submit Handler
  const handleSendRequest = (e) => {
    e.preventDefault();
    if (!selectedPerson || !meetingDate || !meetingTime || !agenda) {
      alert('Please complete all required fields (Date, Time, and Agenda).');
      return;
    }

    // Format Date & Time for display
    const dateParts = meetingDate.split('-');
    let dateObj;
    if (dateParts.length === 3) {
      dateObj = new Date(parseInt(dateParts[0], 10), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[2], 10));
    } else {
      dateObj = new Date(meetingDate);
    }

    const day = dateObj.getDate() || 15;
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const monthStr = monthNames[dateObj.getMonth()] || 'MAY';
    const yearNum = dateObj.getFullYear();

    let formattedTime = meetingTime;
    const timeParts = meetingTime.split(':');
    if (timeParts.length >= 2) {
      const hrs = parseInt(timeParts[0], 10);
      const mins = timeParts[1];
      const ampm = hrs >= 12 ? 'PM' : 'AM';
      const adjustedHrs = hrs % 12 || 12;
      formattedTime = `${adjustedHrs < 10 ? '0' + adjustedHrs : adjustedHrs}:${mins} ${ampm}`;
    }

    const newMeeting = {
      id: Date.now(),
      date: meetingDate,
      day: day,
      month: monthStr,
      year: yearNum,
      title: `${meetingType} — ${selectedPerson}`,
      time: `${formattedTime}`,
      mode: meetingMode,
      createdByType: 'You',
      link: meetingLink || 'https://zoom.us/j/demo-meeting'
    };

    setUpcomingMeetings([newMeeting, ...upcomingMeetings]);
    alert('Meeting request submitted successfully!');

    // Reset Form
    setAgenda('');
    setMeetingLink('');
  };

  return (
    <div className="space-y-5 animate-fade-in duration-300 font-inter text-slate-800 select-none">
      {/* Top Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-grotesk tracking-tight">
          Meetings
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-inter">
          Schedule and track your meetings with your mentor, manager, or HR.
        </p>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('my-meetings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm ${
            activeTab === 'my-meetings'
              ? 'bg-[#78161A] text-white shadow-rose-900/20'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <FaCalendarAlt className={activeTab === 'my-meetings' ? 'text-white' : 'text-slate-400'} />
          My Meetings
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === 'history'
              ? 'bg-[#78161A] text-white shadow-rose-900/20'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <FaClock className={activeTab === 'history' ? 'text-white' : 'text-slate-400'} />
          Meeting History
        </button>
      </div>

      {activeTab === 'my-meetings' ? (
        /* Main 2-Column Grid Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Dynamic Calendar + Upcoming Meetings List */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Dynamic Calendar Card */}
            <div className="bg-white border border-slate-100/80 rounded-2xl p-6 shadow-sm">
              <DynamicCalendar
                selectedDate={meetingDate}
                onSelectDate={(dateStr) => setMeetingDate(dateStr)}
                meetings={upcomingMeetings}
              />

              {/* Upcoming Meetings Sub-Section */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#78161A] font-grotesk">
                    Upcoming Meetings
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {upcomingMeetings.length} Total
                  </span>
                </div>

                <div className="space-y-4">
                  {upcomingMeetings.map((mtg) => (
                    <div
                      key={mtg.id}
                      className="flex items-center justify-between gap-4 py-2 border-b border-slate-100 last:border-none"
                    >
                      {/* Left Date Badge + Info */}
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100/60 flex flex-col items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-[#78161A] leading-none">
                            {mtg.day}
                          </span>
                          <span className="text-[9px] font-bold text-[#78161A]/80 uppercase mt-0.5">
                            {mtg.month}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-slate-800 font-grotesk">
                            {mtg.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                            {mtg.time} · {mtg.mode}
                          </p>

                          <div className="mt-1.5">
                            {mtg.createdByType === 'Mentor' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10.5px] font-semibold">
                                <FaGraduationCap className="w-3 h-3 text-emerald-600" />
                                Created by Mentor
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10.5px] font-semibold">
                                <FaThumbsUp className="w-3 h-3 text-amber-600" />
                                Created by You
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Join Button */}
                      <a
                        href={mtg.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-1.5 rounded-full bg-[#14B8A6] hover:bg-[#0D9488] text-white text-xs font-bold shadow-sm transition-all shrink-0"
                      >
                        Join
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Schedule Meeting Form */}
          <div className="lg:col-span-6 bg-white border border-slate-100/80 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-[#78161A] font-grotesk mb-5">
              Schedule Meeting
            </h2>

            <form onSubmit={handleSendRequest} className="space-y-4">
              
              {/* MEETING WITH */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  MEETING WITH *
                </label>
                <div className="flex items-center gap-5 text-xs font-semibold text-slate-700">
                  {['Mentor', 'Manager', 'HR'].map((role) => (
                    <label key={role} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="meetingWithRole"
                        checked={meetingWith === role}
                        onChange={() => handleMeetingWithChange(role)}
                        className="accent-[#78161A] w-3.5 h-3.5 cursor-pointer"
                      />
                      <span>{role}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* SELECT PERSON */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  SELECT PERSON
                </label>
                <input
                  type="text"
                  value={selectedPerson}
                  onChange={(e) => setSelectedPerson(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#78161A]/20 focus:border-[#78161A]"
                />
              </div>

              {/* MEETING TYPE */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  MEETING TYPE *
                </label>
                <input
                  type="text"
                  value={meetingType}
                  onChange={(e) => setMeetingType(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#78161A]/20 focus:border-[#78161A]"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Automatically set based on who you're meeting with.
                </p>
              </div>

              {/* MEETING DATE & TIME */}
              <div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      MEETING DATE *
                    </label>
                    <input
                      type="date"
                      value={meetingDate}
                      onChange={(e) => setMeetingDate(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#78161A]/20 focus:border-[#78161A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      TIME *
                    </label>
                    <input
                      type="time"
                      value={meetingTime}
                      onChange={(e) => setMeetingTime(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#78161A]/20 focus:border-[#78161A]"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                  Click any date on the calendar to pick it, or select using the date picker above.
                </p>
              </div>

              {/* MEETING MODE */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  MEETING MODE *
                </label>
                <div className="flex flex-wrap items-center gap-3.5 text-xs font-semibold text-slate-700">
                  {['Zoom', 'Google Meet', 'Teams Meeting', 'In-Person'].map((mode) => (
                    <label key={mode} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="meetingMode"
                        checked={meetingMode === mode}
                        onChange={() => setMeetingMode(mode)}
                        className="accent-[#78161A] w-3.5 h-3.5 cursor-pointer"
                      />
                      <span>{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* MEETING LINK (OPTIONAL) */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  MEETING LINK (OPTIONAL)
                </label>
                <input
                  type="url"
                  placeholder="Paste Zoom / Teams / Meet link if you have one"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#78161A]/20 focus:border-[#78161A]"
                />
                <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                  If your organization isn't directly integrated with the meeting tool, paste the link here — it will show to everyone invited.
                </p>
              </div>

              {/* AGENDA / TOPICS */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  AGENDA / TOPICS *
                </label>
                <textarea
                  rows={2}
                  placeholder="What would you like to discuss?"
                  value={agenda}
                  onChange={(e) => setAgenda(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#78161A]/20 focus:border-[#78161A] resize-none"
                />
              </div>

              {/* Info Callout Box */}
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 flex items-start gap-2 text-xs text-blue-700">
                <FaInfoCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  Choosing <span className="font-bold">Mentoring Session</span> as the meeting type will automatically add this to your Mentoring Sessions too.
                </p>
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setAgenda('');
                    setMeetingLink('');
                  }}
                  className="px-5 py-2 border border-[#78161A] text-[#78161A] hover:bg-rose-50 text-xs font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-[#78161A] hover:bg-[#5c1013] text-white text-xs font-bold rounded-xl shadow-md transition-all"
                >
                  Send Request
                </button>
              </div>

            </form>
          </div>

        </div>
      ) : (
        /* Meeting History View */
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-[#78161A] font-grotesk">
            Past Meetings History
          </h2>

          <div className="space-y-3">
            {historyMeetings.map((mtg) => (
              <div
                key={mtg.id}
                className="flex items-center justify-between gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex flex-col items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-slate-700 leading-none">
                      {mtg.day}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">
                      {mtg.month}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-800 font-grotesk">
                      {mtg.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      With {mtg.withPerson} · {mtg.time} ({mtg.mode})
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                  <FaCheckCircle className="w-3 h-3 text-emerald-600" />
                  {mtg.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Meetings;
