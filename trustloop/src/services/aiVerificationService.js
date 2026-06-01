import { apiFetch } from "./apiClient.js";

class AIVerificationService {
  async generateConditionReport(details) {
    return apiFetch("/ai?action=report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
  }

  async compareConditions(details) {
    return apiFetch("/ai?action=compare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
  }

  async detectDamage(details) {
    return apiFetch("/ai?action=damage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
  }
}

export default new AIVerificationService();