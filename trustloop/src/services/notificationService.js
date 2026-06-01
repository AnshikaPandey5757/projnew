import { apiFetch } from "./apiClient.js";

class NotificationService {
  async getNotifications() {
    return apiFetch("/notifications");
  }

  async markAsRead(id) {
    return apiFetch(`/notifications?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ read: true }),
    });
  }

  async sendReminder(data) {
    return apiFetch("/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        type: "reminder",
      }),
    });
  }

  async createNotification(data) {
    return apiFetch("/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
}

export default new NotificationService();