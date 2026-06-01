import { apiFetch } from "./apiClient.js";

class AuthService {
  async login(credentials) {
    return apiFetch("/auth?action=login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
  }

  async signup(userData) {
    return apiFetch("/auth?action=signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  }

  async verifyIdentity(formData) {
    return apiFetch("/auth?action=verify", {
      method: "POST",
      body: formData,
    });
  }

  async getCurrentUser() {
    const token = localStorage.getItem("trustloop-token");
    if (!token) return null;
    return apiFetch("/auth?action=verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
  }

  async logout() {
    localStorage.removeItem("trustloop-user");
    localStorage.removeItem("trustloop-token");
  }
}

export default new AuthService();