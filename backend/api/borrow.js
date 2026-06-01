import { dataStore } from "./lib/dataStore.js";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === "GET") {
      const { requests } = req.query;

      if (requests) {
        // Get all borrow requests populated with item details
        const populated = dataStore.borrowRequests.map((r) => {
          const item = dataStore.items.find((i) => i.id === r.itemId);
          return {
            ...r,
            itemId: item
              ? { id: item.id, title: item.title, images: item.images }
              : { id: r.itemId, title: "Unknown Item", images: [] },
          };
        });
        res.status(200).json(populated);
      } else {
        res.status(400).json({ error: "Invalid query" });
      }
    } else if (req.method === "POST") {
      // Create borrow request
      const { itemId, borrowerId, message } = req.body;

      if (!itemId || !borrowerId) {
        res.status(400).json({ error: "itemId and borrowerId are required" });
        return;
      }

      const item = dataStore.items.find((i) => i.id === itemId);
      if (!item) {
        res.status(404).json({ error: "Item not found" });
        return;
      }

      const borrowRequest = {
        id: Date.now().toString(),
        itemId,
        borrowerId,
        lenderId: item.owner,
        message,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      dataStore.borrowRequests.push(borrowRequest);
      res.status(201).json(borrowRequest);
    } else if (req.method === "PATCH") {
      // Update borrow request status
      const { id, status } = req.body;

      const request = dataStore.borrowRequests.find((r) => r.id === id);
      if (!request) {
        res.status(404).json({ error: "Request not found" });
        return;
      }

      request.status = status;
      res.status(200).json(request);
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
