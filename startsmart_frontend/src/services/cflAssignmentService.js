import axios from 'axios';

const BASE_URL = 'http://localhost:9085/api/cfl-assignments';

/**
 * Service API Module for CFL Assignments and Onboarding
 * Location: src/services/cflAssignmentService.js
 * 
 * Available Endpoints List:
 * 1. GET  /api/cfl-assignments                     - Get paginated & filtered CFL assignments list
 * 2. POST /api/cfl-assignments/onboard             - Onboard a new CFL into database (all 24 fields)
 * 3. GET  /api/cfl-assignments/managers            - Fetch list of all registered managers
 * 4. GET  /api/cfl-assignments/mentors             - Fetch list of all registered mentors
 * 5. GET  /api/cfl-assignments/manager/{empCode}   - Fetch CFLs assigned to a specific manager
 * 6. GET  /api/cfl-assignments/cfl/{cflEmpCode}    - Fetch detailed CFL assignment profile
 * 7. PUT  /api/cfl-assignments/cfl/{code}/profile  - Update existing CFL profile details & skills
 */
export const cflAssignmentService = {
  // 1. Get filtered & paginated CFL list
  getAll: async (params) => {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  },

  // 2. Onboard new CFL to PostgreSQL database
  onboard: async (payload) => {
    const response = await axios.post(`${BASE_URL}/onboard`, payload);
    return response.data;
  },

  // 3. Get all registered managers
  getManagers: async () => {
    const response = await axios.get(`${BASE_URL}/managers`);
    return response.data;
  },

  // 4. Get all registered mentors
  getMentors: async () => {
    const response = await axios.get(`${BASE_URL}/mentors`);
    return response.data;
  },

  // 5. Get CFLs assigned to manager
  getByManager: async (managerEmpCode, params) => {
    const response = await axios.get(`${BASE_URL}/manager/${managerEmpCode}`, { params });
    return response.data;
  },

  // 6. Get CFL details by employee code
  getByCfl: async (cflEmpCode) => {
    const response = await axios.get(`${BASE_URL}/cfl/${cflEmpCode}`);
    return response.data;
  },

  // 7. Update CFL profile and skills
  updateProfile: async (cflEmpCode, payload) => {
    const response = await axios.put(`${BASE_URL}/cfl/${cflEmpCode}/profile`, payload);
    return response.data;
  }
};

