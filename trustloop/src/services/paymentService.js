import { apiFetch } from "./apiClient.js";

class PaymentService {
  async createDepositPayment(payload) {
    return apiFetch("/payments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }

  async verifyPayment(data) {
    return apiFetch("/payments/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  async refundDeposit(transactionId) {
    return apiFetch("/payments/refund", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transactionId }),
    });
  }
}

export default new PaymentService();