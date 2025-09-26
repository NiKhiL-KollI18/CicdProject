const API_BASE = "http://localhost:8082";

// Generic API call
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
            throw new Error(`${response.status} ${response.statusText} - ${errText}`);
        }

        const text = await response.text();
        try { return JSON.parse(text); } catch { return text; }
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}

// Auth
export const signup = (userData) => callApi("POST", "/auth/signup", userData);
export const login = (credentials) => callApi("POST", "/auth/login", credentials);

// File endpoints
export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return callApi("POST", "/files/upload", formData, true);
};

export const getFiles = () => callApi("GET", "/files");
export const deleteFile = (fileId) => callApi("DELETE", `/files/${fileId}`);
export const generateShareLink = (fileId) => callApi("POST", `/files/share/${fileId}`);