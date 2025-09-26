// The base URL for all API calls.
// This MUST point to the address that is accessible from the user's BROWSER.
// Since Docker maps port 8082 on your machine to the backend container,
// 'http://localhost:8082' is the correct and permanent address.
const API_BASE = "http://localhost:8082";

// Generic API call function
async function callApi(method, url, data = null, isFile = false) {
  const options = { method, headers: {} };

  if (data) {
    if (isFile) {
      // File upload with FormData
      options.body = data;
    } else {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(data);
    }
  }

  try {
    const response = await fetch(`${API_BASE}${url}`, options);

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(
        `${response.status} ${response.statusText} - ${errText}`
      );
    }

    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// Auth endpoints
export const signup = (userData) => callApi("POST", "/auth/signup", userData);
export const login = (credentials) =>
  callApi("POST", "/auth/login", credentials);

// File endpoints
// UPDATED: Removed the 'email' parameter to match the new backend controller.
export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return callApi("POST", "/files/upload", formData, true);
};

// UPDATED: Removed the 'email' parameter. This now gets all files.
export const getFiles = () => callApi("GET", "/files");

// UPDATED: Corrected the URL to match the @DeleteMapping("/delete/{id}") endpoint.
export const deleteFile = (fileId) => callApi("DELETE", `/files/delete/${fileId}`);

export const generateShareLink = (fileId) =>
  callApi("POST", `/files/share/${fileId}`);

