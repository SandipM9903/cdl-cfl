import axios from 'axios';

const BASE_URL = 'http://localhost:9085/api/documents';

export const documentService = {
  // Upload multipart file
  upload: async (file, cflEmpId, documentType) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('cflEmpId', cflEmpId);
    formData.append('documentType', documentType);

    const response = await axios.post(`${BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Retrieve files list for CFL
  getByCfl: async (cflEmpId) => {
    const response = await axios.get(`${BASE_URL}/cfl/${cflEmpId}`);
    return response.data;
  },

  // Download document
  download: async (id, fileName) => {
    const response = await axios.get(`${BASE_URL}/download/${id}`, {
      responseType: 'blob'
    });
    
    // Create local URL for download trigger
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const url = window.URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    window.document.body.appendChild(link);
    link.click();
    link.removeAttribute('download');
    window.document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },

  // Get direct view URL
  viewUrl: (id) => {
    return `${BASE_URL}/view/${id}`;
  }
};
