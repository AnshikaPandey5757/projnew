import { dataStore } from "./lib/dataStore.js";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === "GET") {
      // Get all payments
      res.status(200).json(dataStore.payments);
    } else if (req.method === "POST") {
      // Create payment (mock)
      const { amount, borrowId, status } = req.body;

      if (!amount || !borrowId) {
        res.status(400).json({ error: "amount and borrowId are required" });
        return;
      }

      const payment = {
        id: Date.now().toString(),
        amount,
        borrowId,
        status: status || "pending",
        createdAt: new Date().toISOString(),
        verifiedAt: null,
      };

      dataStore.payments.push(payment);
      res.status(201).json(payment);
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
