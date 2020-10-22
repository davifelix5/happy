import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjAzMzc4Mjk5LCJleHAiOjE2MDM0NjQ2OTl9.78el-QXm3XNgBPyIjW40s_BGCvFwn-TyI4ypm0ECHBU'
  }
});

export default api;
