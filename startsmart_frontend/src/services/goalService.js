import axios from 'axios';

const BASE_URL = 'http://localhost:9085/api';

export const goalService = {
  getStages: async () => {
    const response = await axios.get(`${BASE_URL}/goals/stages`);
    return response.data;
  },

  initiate: async (payload) => {
    const response = await axios.post(`${BASE_URL}/goals/initiate`, payload);
    return response.data;
  },

  getWorkflows: async () => {
    const response = await axios.get(`${BASE_URL}/goals/workflows`);
    return response.data;
  },

  completeMeeting: async (id) => {
    const response = await axios.post(`${BASE_URL}/goals/workflows/${id}/complete-meeting`);
    return response.data;
  },

  getWorkflowByCfl: async (cflEmpId) => {
    const response = await axios.get(`${BASE_URL}/goals/workflow/cfl/${cflEmpId}`);
    return response.data;
  },

  getProbationEvaluations: async () => {
    const response = await axios.get(`${BASE_URL}/probation/evaluations`);
    return response.data;
  }
};
