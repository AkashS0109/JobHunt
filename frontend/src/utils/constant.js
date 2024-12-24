const BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : 'https://jobconnect-6l04.onrender.com';

console.log(BASE_URL);

export const END_POINT = `${BASE_URL}/api/v1/user`;
export const JOB_API = `${BASE_URL}/api/v1/job`;
export const JOB_APPLY = `${BASE_URL}/api/v1/application`;
export const COMPANY_API = `${BASE_URL}/api/v1/company`;
