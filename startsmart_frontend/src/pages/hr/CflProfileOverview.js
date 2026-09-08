import React, { useState, useEffect } from 'react';
import { 
  FaArrowLeft, 
  FaUser, 
  FaChartBar, 
  FaBook, 
  FaFolder, 
  FaExchangeAlt, 
  FaClock, 
  FaChevronRight,
  FaEdit,
  FaSave,
  FaTimes,
  FaPlus
} from 'react-icons/fa';
import { cflAssignmentService } from '../../services/cflAssignmentService';

const CflProfileOverview = ({ cfl, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [cflData, setCflData] = useState(cfl);
  const [isEditing, setIsEditing] = useState(false);
  const [managers, setManagers] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [newTechSkill, setNewTechSkill] = useState('');
  const [newNonTechSkill, setNewNonTechSkill] = useState('');

  const fetchCflDetails = async () => {
    try {
      setLoading(true);
      const data = await cflAssignmentService.getByCfl(cfl.employeeCode);
      setCflData(data);
    } catch (err) {
      console.error('Failed to load CFL details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCflDetails();

    const loadDropdowns = async () => {
      try {
        const [mList, tList] = await Promise.all([
          cflAssignmentService.getManagers(),
          cflAssignmentService.getMentors()
        ]);
        setManagers(mList || []);
        setMentors(tList || []);
      } catch (err) {
        console.error('Failed to load managers/mentors lists:', err);
      }
    };
    loadDropdowns();
  }, [cfl.employeeCode]);

  const getInitials = (name) => {
    if (!name) return 'CF';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return d.toLocaleDateString('en-GB', options);
    } catch {
      return dateStr;
    }
  };

  const handleStartEdit = () => {
    setEditForm({
      cflName: cflData.cflName || cflData.name || '',
      cflEmail: cflData.cflEmail || cflData.email || '',
      role: cflData.role || '',
      department: cflData.department || '',
      businessUnit: cflData.businessUnit || 'SSD',
      subDepartment: cflData.subDepartment || '',
      location: cflData.location || '',
      gender: cflData.gender || 'Female',
      contactNumber: cflData.contactNumber || '',
      managerEmpCode: cflData.managerEmpCode || '',
      mentorEmpCode: cflData.mentorEmpCode || '',
      status: cflData.status || '',
      technicalSkills: [...(cflData.technicalSkills || [])],
      nonTechnicalSkills: [...(cflData.nonTechnicalSkills || [])]
    });
    setIsEditing(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const removeTechSkill = (idx) => {
    setEditForm(prev => ({
      ...prev,
      technicalSkills: prev.technicalSkills.filter((_, i) => i !== idx)
    }));
  };

  const addTechSkill = () => {
    if (newTechSkill.trim() && !editForm.technicalSkills.includes(newTechSkill.trim())) {
      setEditForm(prev => ({
        ...prev,
        technicalSkills: [...prev.technicalSkills, newTechSkill.trim()]
      }));
      setNewTechSkill('');
    }
  };

  const removeNonTechSkill = (idx) => {
    setEditForm(prev => ({
      ...prev,
      nonTechnicalSkills: prev.nonTechnicalSkills.filter((_, i) => i !== idx)
    }));
  };

  const addNonTechSkill = () => {
    if (newNonTechSkill.trim() && !editForm.nonTechnicalSkills.includes(newNonTechSkill.trim())) {
      setEditForm(prev => ({
        ...prev,
        nonTechnicalSkills: [...prev.nonTechnicalSkills, newNonTechSkill.trim()]
      }));
      setNewNonTechSkill('');
    }
  };

  const handleSave = async () => {
    try {
      const selectedManager = managers.find(m => String(m.empCode) === String(editForm.managerEmpCode));
      const selectedMentor = mentors.find(m => String(m.empCode) === String(editForm.mentorEmpCode));

      const payload = {
        ...editForm,
        cflEmpCode: cflData.cflEmpCode || cflData.employeeCode || cfl.employeeCode,
        managerName: selectedManager ? selectedManager.name : '',
        mentorName: selectedMentor ? selectedMentor.name : ''
      };

      const updated = await cflAssignmentService.updateProfile(cfl.employeeCode, payload);
      setCflData(updated);
      setIsEditing(false);
      alert('CFL Profile updated successfully!');
    } catch (err) {
      console.error('Failed to save CFL Profile:', err);
      alert('Error updating profile details.');
    }
  };

  const currentName = cflData.cflName || cflData.name || '';
  const names = currentName.split(' ');
  const firstName = names[0] || '—';
  const middleName = names.length > 2 ? names.slice(1, -1).join(' ') : '—';
  const lastName = names.length > 1 ? names[names.length - 1] : '—';

  // Sub-tabs list
  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaClock },
    { id: 'profile-details', label: 'Profile Details', icon: FaUser },
    { id: 'performance-cycles', label: 'Performance Cycles', icon: FaChartBar },
    { id: 'probation-confirmation', label: 'Probation Confirmation', icon: FaBook },
    { id: 'cfl-files', label: 'CFL Files', icon: FaFolder },
    { id: 'role-movement', label: 'Role Movement', icon: FaExchangeAlt }
  ];

  // Dynamic status styling
  const isConfirmed = cflData.status === 'Confirm' || cflData.status === 'Completed' || (cflData.goalProgress && cflData.goalProgress >= 90);
  const employmentStatus = isConfirmed ? 'CONFIRMED' : 'PROBATION';
  const probationConfirmationStatus = isConfirmed ? 'Confirmed' : 'Not Eligible';

  return (
    <div className="space-y-6 animate-fade-in duration-300 font-inter select-none">
      
      {/* Back button & Title */}
      <div className="space-y-2 text-left">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-[#78161A] hover:text-[#631013] transition-colors outline-none border-none bg-transparent p-0 cursor-pointer"
        >
          <FaArrowLeft className="w-3 h-3" />
          <span>Back to My CFLs</span>
        </button>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight font-grotesk">
          CFL Profile — Overview
        </h2>
      </div>

      {/* Main Profile Info Card */}
      <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] flex items-center justify-between">
        <div className="flex items-center gap-4 text-left">
          <div className="w-[68px] h-[68px] rounded-full bg-[#78161A] text-white font-bold flex items-center justify-center text-2xl shadow-sm">
            {getInitials(currentName)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[#1B1418] font-grotesk leading-none">
                {currentName}
              </h3>
              <span className="bg-[#FEF9C3] text-[#713F12] text-[9.5px] font-extrabold tracking-wider px-2 py-0.5 rounded-[4px]">
                CFL
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500 mt-2 leading-none">
              {cflData.role || 'CFL Employee'} <span className="mx-1 text-slate-300">•</span> Reporting Manager: {cflData.managerName || cflData.manager || 'Unassigned'}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="block text-[9.5px] font-black text-slate-400 tracking-wider uppercase font-semibold">
            EMPLOYMENT STATUS
          </span>
          <span className={`inline-flex mt-1.5 justify-center items-center text-[10.5px] font-bold px-3 py-1 rounded-[5px] uppercase ${
            employmentStatus === 'CONFIRMED' 
              ? 'bg-[#E6F4EA] text-[#137333]' 
              : 'bg-[#FEF7E0] text-[#B06000]'
          }`}>
            {employmentStatus}
          </span>
        </div>
      </div>

      {/* Tab Selectors Row */}
      <div className="flex flex-wrap gap-2 border-b border-[#EAE3E4] pb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 text-xs font-bold transition-all outline-none cursor-pointer ${
                isActive 
                  ? 'border-[#78161A] text-[#78161A] bg-slate-50/50' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="pt-2">
        {/* OVERVIEW SUB-TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Metric Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1: Employment Status */}
              <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.01)] text-center flex flex-col justify-center min-h-[140px]">
                <h4 className="text-[12.5px] font-bold text-slate-500 font-inter tracking-wide">
                  Employment Status
                </h4>
                <div className="mt-3">
                  <span className={`inline-flex justify-center items-center text-[10.5px] font-extrabold px-4 py-1.5 rounded-[5px] uppercase ${
                    employmentStatus === 'CONFIRMED' 
                      ? 'bg-[#E6F4EA] text-[#137333]' 
                      : 'bg-[#FEF7E0] text-[#B06000]'
                  }`}>
                    {employmentStatus === 'CONFIRMED' ? 'Confirmed' : 'Probation'}
                  </span>
                </div>
              </div>

              {/* Card 2: Review Cycles Completed */}
              <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.01)] text-center flex flex-col justify-center min-h-[140px]">
                <h4 className="text-[12.5px] font-bold text-slate-500 font-inter tracking-wide">
                  Review Cycles Completed
                </h4>
                <p className="text-3xl font-bold text-slate-800 mt-2 font-grotesk tracking-tight">
                  {isConfirmed ? '3 / 3' : '0 / 3'}
                </p>
                <p className="text-[10px] text-slate-400 font-semibold mt-1">
                  {isConfirmed ? 'All reviews confirmed' : 'Final Review pending'}
                </p>
              </div>

              {/* Card 3: Probation Confirmation */}
              <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.01)] text-center flex flex-col justify-center min-h-[140px]">
                <h4 className="text-[12.5px] font-bold text-slate-500 font-inter tracking-wide">
                  Probation Confirmation
                </h4>
                <div className="mt-3">
                  <span className={`inline-flex justify-center items-center text-[10.5px] font-extrabold px-4 py-1.5 rounded-[5px] ${
                    probationConfirmationStatus === 'Confirmed'
                      ? 'bg-[#E6F4EA] text-[#137333]'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {probationConfirmationStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] text-left">
              <h3 className="text-sm font-bold text-slate-800 font-grotesk tracking-wide mb-4">
                Quick Links
              </h3>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => setActiveTab('profile-details')}
                  className="flex items-center gap-2 border border-[#78161A] text-[#78161A] bg-transparent hover:bg-rose-50/50 font-bold px-4 py-2 rounded-lg text-xs transition-all cursor-pointer"
                >
                  <FaUser className="w-3 h-3" />
                  <span>View Profile Details</span>
                </button>
                <button 
                  onClick={() => setActiveTab('performance-cycles')}
                  className="flex items-center gap-2 border border-[#78161A] text-[#78161A] bg-transparent hover:bg-rose-50/50 font-bold px-4 py-2 rounded-lg text-xs transition-all cursor-pointer"
                >
                  <FaChartBar className="w-3 h-3" />
                  <span>View Performance Cycles</span>
                </button>
                <button 
                  onClick={() => setActiveTab('probation-confirmation')}
                  className="flex items-center gap-2 border border-[#78161A] text-[#78161A] bg-transparent hover:bg-rose-50/50 font-bold px-4 py-2 rounded-lg text-xs transition-all cursor-pointer"
                >
                  <FaBook className="w-3 h-3" />
                  <span>View Probation Confirmation</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PROFILE DETAILS SUB-TAB */}
        {activeTab === 'profile-details' && (
          <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] space-y-6 text-left">
            <div className="flex justify-between items-center pb-2 border-b border-[#EAE3E4]">
              <h3 className="text-[16px] font-bold text-[#78161A] font-grotesk">
                Personal & Organizational Details
              </h3>
              {!isEditing ? (
                <button 
                  onClick={handleStartEdit}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#78161A] hover:bg-[#631013] text-white transition-all rounded-lg text-xs font-bold cursor-pointer"
                >
                  <FaEdit className="w-3 h-3" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white transition-all rounded-lg text-xs font-bold cursor-pointer"
                  >
                    <FaSave className="w-3 h-3" />
                    <span>Save</span>
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 transition-all rounded-lg text-xs font-bold cursor-pointer"
                  >
                    <FaTimes className="w-3 h-3" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>
            
            {isEditing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      name="cflName" 
                      value={editForm.cflName} 
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#78161A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      E-Mail
                    </label>
                    <input 
                      type="email" 
                      name="cflEmail" 
                      value={editForm.cflEmail} 
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#78161A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Department
                    </label>
                    <input 
                      type="text" 
                      name="department" 
                      value={editForm.department} 
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#78161A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Designation
                    </label>
                    <input 
                      type="text" 
                      name="role" 
                      value={editForm.role} 
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#78161A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Business Unit
                    </label>
                    <select 
                      name="businessUnit" 
                      value={editForm.businessUnit} 
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#78161A]"
                    >
                      <option value="SSD">SSD</option>
                      <option value="Digital">Digital</option>
                      <option value="Cloud">Cloud</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Sub Department
                    </label>
                    <input 
                      type="text" 
                      name="subDepartment" 
                      value={editForm.subDepartment} 
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#78161A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Location
                    </label>
                    <input 
                      type="text" 
                      name="location" 
                      value={editForm.location} 
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#78161A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Gender
                    </label>
                    <select 
                      name="gender" 
                      value={editForm.gender} 
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Contact Number
                    </label>
                    <input 
                      type="text" 
                      name="contactNumber" 
                      value={editForm.contactNumber} 
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#78161A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Reporting Manager
                    </label>
                    <select 
                      name="managerEmpCode" 
                      value={editForm.managerEmpCode} 
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none"
                    >
                      <option value="">Select Manager</option>
                      {managers.map(m => (
                        <option key={m.empCode} value={String(m.empCode)}>{m.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Mentor
                    </label>
                    <select 
                      name="mentorEmpCode" 
                      value={editForm.mentorEmpCode} 
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none"
                    >
                      <option value="">Select Mentor</option>
                      {mentors.map(m => (
                        <option key={m.empCode} value={String(m.empCode)}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Technical Skills */}
                <div className="border-t border-[#EAE3E4] pt-5 space-y-3">
                  <h4 className="text-xs font-bold text-[#78161A] uppercase tracking-wider block">
                    Technical Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {editForm.technicalSkills?.map((s, idx) => (
                      <span key={idx} className="bg-rose-50 text-[#78161A] text-[11px] font-bold px-3 py-1 rounded-[5px] border border-rose-100 flex items-center gap-1.5">
                        {s}
                        <button type="button" onClick={() => removeTechSkill(idx)} className="text-rose-450 hover:text-[#78161A] font-bold border-none bg-transparent p-0 cursor-pointer">×</button>
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 max-w-sm">
                    <input 
                      type="text" 
                      placeholder="Add tech skill (e.g. Docker)" 
                      value={newTechSkill} 
                      onChange={(e) => setNewTechSkill(e.target.value)}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none"
                    />
                    <button type="button" onClick={addTechSkill} className="bg-[#78161A] text-white p-2 rounded-lg hover:bg-[#631013] transition-all cursor-pointer"><FaPlus className="w-3 h-3" /></button>
                  </div>
                </div>

                {/* Non-Technical Skills */}
                <div className="border-t border-[#EAE3E4] pt-5 space-y-3">
                  <h4 className="text-xs font-bold text-[#78161A] uppercase tracking-wider block">
                    Non-Technical Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {editForm.nonTechnicalSkills?.map((s, idx) => (
                      <span key={idx} className="bg-slate-50 text-slate-700 text-[11px] font-bold px-3 py-1 rounded-[5px] border border-slate-205 flex items-center gap-1.5">
                        {s}
                        <button type="button" onClick={() => removeNonTechSkill(idx)} className="text-slate-450 hover:text-slate-750 font-bold border-none bg-transparent p-0 cursor-pointer">×</button>
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 max-w-sm">
                    <input 
                      type="text" 
                      placeholder="Add soft skill (e.g. Agile)" 
                      value={newNonTechSkill} 
                      onChange={(e) => setNewNonTechSkill(e.target.value)}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none"
                    />
                    <button type="button" onClick={addNonTechSkill} className="bg-[#78161A] text-white p-2 rounded-lg hover:bg-[#631013] transition-all cursor-pointer"><FaPlus className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6">
                  {[
                    { label: 'First Name', value: firstName },
                    { label: 'Middle Name', value: middleName },
                    { label: 'Last Name', value: lastName },
                    { label: 'E-Mail', value: cflData.cflEmail || cflData.email || '—' },
                    { label: 'Employee ID', value: String(cflData.cflEmpId || cflData.employeeCode || '—') },
                    { label: 'Department', value: cflData.department || '—' },
                    { label: 'Designation', value: cflData.role || '—' },
                    { label: 'Reporting Manager', value: cflData.managerName || cflData.manager || '—' },
                    { label: 'Sub Department', value: cflData.subDepartment || '—' },
                    { label: 'Date of Joining', value: formatDate(cflData.effectiveFrom || new Date().toISOString()) },
                    { label: 'Reporting Manager E-Mail', value: cflData.managerEmail || (cflData.managerName ? `${cflData.managerName.toLowerCase().replace(' ', '_')}@cms.co.in` : '—') },
                    { label: 'HR E-Mail', value: 'hr.admin@cms.co.in' },
                    { label: 'Location', value: cflData.location || '—' },
                    { label: 'Gender', value: cflData.gender || '—' },
                    { label: 'Contact Number', value: cflData.contactNumber || '—' }
                  ].map((field) => (
                    <div key={field.label} className="space-y-1">
                      <span className="text-[9.5px] font-bold text-slate-400 tracking-wider uppercase block leading-none">
                        {field.label}
                      </span>
                      <span className="text-[13px] font-bold text-slate-800 block mt-1.5">
                        {field.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Sub-section details */}
                <div className="border-t border-[#EAE3E4] pt-6 space-y-4">
                  <h4 className="text-xs font-bold text-[#78161A] uppercase tracking-wider block">
                    Technical Skills
                  </h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {(cflData.technicalSkills || ['Java', 'Spring Boot', 'React.js', 'PostgreSQL', 'SQL']).map((skill) => (
                      <span 
                        key={skill}
                        className="bg-rose-50 text-[#78161A] text-[11px] font-bold px-3 py-1 rounded-[5px] border border-rose-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#EAE3E4] pt-6 space-y-4">
                  <h4 className="text-xs font-bold text-[#78161A] uppercase tracking-wider block">
                    Non-Technical Skills
                  </h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {(cflData.nonTechnicalSkills || ['Communication', 'Teamwork', 'Problem Solving']).map((skill) => (
                      <span 
                        key={skill}
                        className="bg-slate-50 text-slate-650 text-[11px] font-bold px-3 py-1 rounded-[5px] border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* PERFORMANCE CYCLES SUB-TAB */}
        {activeTab === 'performance-cycles' && (
          <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] space-y-4 text-left">
            <h3 className="text-[16px] font-bold text-[#78161A] font-grotesk pb-2 border-b border-[#EAE3E4]">
              Performance Cycles Tracking
            </h3>
            
            <div className="space-y-3">
              {[
                { title: '30 Days Review', desc: 'Initial touchpoint evaluation and goal alignment', status: isConfirmed ? 'Completed' : 'Draft', date: 'End of Week 4' },
                { title: '60 Days Review', desc: 'Mid-term milestone assessment and feedback', status: isConfirmed ? 'Completed' : 'Not Started', date: 'End of Week 8' },
                { title: '90 Days Review', desc: 'Final review cycle before probation confirmation evaluation', status: isConfirmed ? 'Completed' : 'Not Started', date: 'End of Week 12' }
              ].map((cycle, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 border border-[#EAE3E4] rounded-xl hover:bg-slate-50/50 transition-colors">
                  <div className="space-y-1">
                    <h4 className="text-[13.5px] font-bold text-slate-800">{cycle.title}</h4>
                    <p className="text-xs text-slate-500 font-semibold">{cycle.desc}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-400 font-bold">{cycle.date}</span>
                    <span className={`text-[10.5px] font-bold px-2.5 py-1 rounded-[5px] uppercase ${
                      cycle.status === 'Completed' 
                        ? 'bg-[#E6F4EA] text-[#137333]' 
                        : cycle.status === 'Draft' 
                        ? 'bg-[#FEF7E0] text-[#B06000]'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {cycle.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROBATION CONFIRMATION SUB-TAB */}
        {activeTab === 'probation-confirmation' && (
          <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] space-y-6 text-left">
            <h3 className="text-[16px] font-bold text-[#78161A] font-grotesk pb-2 border-b border-[#EAE3E4]">
              Probation Confirmation Eligibility
            </h3>

            {/* Checklist */}
            <div className="space-y-3">
              {[
                { task: 'All 3 review cycles completed (30, 60, 90 days)', met: isConfirmed },
                { task: 'Overall performance rating on track', met: cflData.status === 'On Track' || isConfirmed },
                { task: 'Manager recommendation response submitted', met: isConfirmed },
                { task: 'Mentor feedback submitted', met: isConfirmed }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={item.met} 
                    readOnly 
                    className="w-4 h-4 accent-[#78161A]"
                  />
                  <span className="text-[13px] font-bold text-slate-650">
                    {item.task}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#EAE3E4] pt-5 flex items-center justify-between">
              <div>
                <span className="block text-[9.5px] font-black text-slate-400 tracking-wider uppercase font-semibold">
                  STATUS
                </span>
                <span className={`inline-flex mt-1.5 justify-center items-center text-[10.5px] font-bold px-3 py-1 rounded-[5px] uppercase ${
                  probationConfirmationStatus === 'Confirmed' 
                    ? 'bg-[#E6F4EA] text-[#137333]' 
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {probationConfirmationStatus}
                </span>
              </div>

              <button 
                disabled={!isConfirmed}
                onClick={() => alert('Initiating probation confirmation workflow')}
                className={`text-[12px] font-bold px-4 py-2 rounded-lg transition-all ${
                  isConfirmed 
                    ? 'bg-[#78161A] text-white hover:bg-[#631013] cursor-pointer' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                }`}
              >
                Issue Confirmation
              </button>
            </div>
          </div>
        )}

        {/* CFL FILES SUB-TAB */}
        {activeTab === 'cfl-files' && (
          <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] space-y-4 text-left">
            <h3 className="text-[16px] font-bold text-[#78161A] font-grotesk pb-2 border-b border-[#EAE3E4]">
              CFL Documents Library
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Resume_CV.pdf', size: '1.2 MB', type: 'PDF' },
                { name: 'Onboarding_Form_Signed.pdf', size: '480 KB', type: 'PDF' },
                { name: 'Degree_Certificate.pdf', size: '3.4 MB', type: 'PDF' },
                { name: 'Offer_Letter.pdf', size: '850 KB', type: 'PDF' }
              ].map((file, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 border border-[#EAE3E4] rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-100 text-[#78161A] flex items-center justify-center font-bold text-xs uppercase">
                      {file.type}
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-slate-800 truncate max-w-[180px]">{file.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold">{file.size}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Downloading file: ${file.name}`)}
                    className="text-[11px] font-bold text-[#78161A] bg-transparent hover:underline outline-none cursor-pointer"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ROLE MOVEMENT SUB-TAB */}
        {activeTab === 'role-movement' && (
          <div className="bg-white rounded-2xl border border-[#EAE3E4] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] space-y-6 text-left">
            <h3 className="text-[16px] font-bold text-[#78161A] font-grotesk pb-2 border-b border-[#EAE3E4]">
              Role Transition Timeline
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
              <div className="relative">
                <div className="absolute -left-[22px] top-1 w-3.5 h-3.5 rounded-full border-2 border-[#78161A] bg-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#78161A]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-[13.5px] font-extrabold text-slate-800">
                    Active Designation: {cflData.role || 'CFL Employee'}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold">Business Unit: {cflData.businessUnit || '—'} | Dept: {cflData.department || '—'}</p>
                  <p className="text-xs text-slate-500 font-semibold">Currently working under manager {cflData.managerName || cflData.manager || 'Unassigned'}.</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[22px] top-1 w-3.5 h-3.5 rounded-full border-2 border-slate-300 bg-white" />
                <div className="space-y-1">
                  <h4 className="text-[13.5px] font-extrabold text-slate-500">
                    Onboarded in StartSmart
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold">{formatDate(cflData.effectiveFrom || new Date().toISOString())}</p>
                  <p className="text-xs text-slate-400 font-semibold">Registered by HR Administrator (Code: {cflData.hrEmpCode || '1001'}).</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default CflProfileOverview;
