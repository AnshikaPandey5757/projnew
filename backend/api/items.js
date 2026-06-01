import { dataStore } from "./lib/dataStore.js";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === "GET") {
      // Get all items or specific item by id
      const { id } = req.query;
      
      if (id) {
        const item = dataStore.items.find((i) => i.id === id);
        if (!item) {
          res.status(404).json({ error: "Item not found" });
          return;
        }
        res.status(200).json(item);
      } else {
        res.status(200).json(dataStore.items);
      }
    } else if (req.method === "POST") {
      // Create new item
      const { title, description, category, condition, owner } = req.body;

      if (!title || !owner) {
        res.status(400).json({ error: "Title and owner are required" });
        return;
      }

      const item = {
        id: Date.now().toString(),
        title,
        description,
        category,
        condition,
        owner,
        available: true,
        createdAt: new Date().toISOString(),
      };

      dataStore.items.push(item);
      res.status(201).json(item);
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
