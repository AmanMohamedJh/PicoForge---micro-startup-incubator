const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:4000/api"
).replace(/\/$/, "");

const getToken = () => localStorage.getItem("token");

export async function apiRequest(
  path,
  { method = "GET", body, auth = false } = {}
) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    const message = data?.message || `Request failed (${res.status})`;
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const authApi = {
  async register(payload) {
    return apiRequest("/auth/register", { method: "POST", body: payload });
  },
  async login(payload) {
    return apiRequest("/auth/login", { method: "POST", body: payload });
  },
  async me() {
    return apiRequest("/auth/me", { auth: true });
  },
};

export const ideaApi = {
  async createIdea(payload) {
    return apiRequest("/ideas", { method: "POST", body: payload, auth: true });
  },
  async listIdeas() {
    return apiRequest("/ideas");
  },
  async getIdea(id) {
    return apiRequest(`/ideas/${id}`);
  },
};
