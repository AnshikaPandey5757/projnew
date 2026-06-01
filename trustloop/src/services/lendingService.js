import { apiFetch } from "./apiClient.js";

class LendingService {
  async getListings() {
    return apiFetch("/items");
  }

  async getItem(id) {
    return apiFetch(`/items?id=${id}`);
  }

  async createListing(data) {
    const userStr = localStorage.getItem("trustloop-user");
    const user = userStr ? JSON.parse(userStr) : null;
    
    return apiFetch("/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        owner: data.owner || user?.email || "anonymous@example.com"
      }),
    });
  }

  async requestBorrow(itemId, message = "Hi, I'd like to borrow this item.") {
    const userStr = localStorage.getItem("trustloop-user");
    const user = userStr ? JSON.parse(userStr) : null;
    const borrowerId = user?.email || user?.id || "anonymous@example.com";

    return apiFetch("/borrow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId,
        borrowerId,
        message,
      }),
    });
  }

  async getBorrowRequests() {
    return apiFetch("/borrow?requests=true");
  }
}

export default new LendingService();