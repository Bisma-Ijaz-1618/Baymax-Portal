//localhosts used to accept our rest API
const allowedOrigins = [
  "http://localhost:3050",
  "https://www.baymax.com",
  "https://baymax.com",
  "http://localhost:3050/upload",
  "http://localhost:3050/users/allUsers",
  "http://localhost:3050/auth/refresh",
  "http://localhost:3000",
  "http://localhost:3001",
];
module.exports = allowedOrigins;
