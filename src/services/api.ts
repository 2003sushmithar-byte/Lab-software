import type { User } from "../components/auth/authTypes";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const TOKEN_KEY = "lab_access_token";
const USER_KEY = "lab_user";

// Token & User Storage Helpers
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getStoredUser = (): User | null => {
  const stored = localStorage.getItem(USER_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const setStoredUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuth = (): void => {
  removeToken();
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem("lab_signup_data"); // clean up legacy mock signup data
};

// API Types
export interface SignupPayload {
  labName: string;
  adminName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

export interface SignupResponse {
  message: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  user: User;
}

// API Functions
export const signupApi = async (data: SignupPayload): Promise<SignupResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resJson = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg =
      resJson.detail ||
      resJson.message ||
      (Array.isArray(resJson) && resJson[0]?.msg) ||
      "Failed to create laboratory account.";
    throw new Error(errorMsg);
  }

  return resJson as SignupResponse;
};

export const loginApi = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resJson = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg =
      resJson.detail ||
      resJson.message ||
      "Invalid email or password.";
    throw new Error(errorMsg);
  }

  return resJson as LoginResponse;
};

export const getMeApi = async (token: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Session expired or invalid.");
  }

  return response.json();
};

/**
 * Reusable authorized fetch utility that automatically attaches
 * the authenticated Bearer token from centralized storage.
 */
export const authFetch = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getToken();
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  return fetch(url, { ...options, headers });
};

// RBAC Verification Helpers
export const checkRbacAdminTest = async (): Promise<unknown> => {
  const res = await authFetch("/rbac/admin-test");
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Forbidden");
  }
  return res.json();
};

export const checkRbacReceptionistTest = async (): Promise<unknown> => {
  const res = await authFetch("/rbac/receptionist-test");
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Forbidden");
  }
  return res.json();
};

export const checkRbacLabTechnicianTest = async (): Promise<unknown> => {
  const res = await authFetch("/rbac/lab-technician-test");
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Forbidden");
  }
  return res.json();
};
