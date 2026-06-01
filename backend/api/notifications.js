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
      // Get notifications for user
      res.status(200).json(dataStore.notifications);
    } else if (req.method === "POST") {
      // Create notification
      const { userId, title, message, type } = req.body;

      if (!userId || !title) {
        res.status(400).json({ error: "userId and title are required" });
        return;
      }

      const notification = {
        id: Date.now().toString(),
        userId,
        title,
        message,
        type: type || "info",
        read: false,
        createdAt: new Date().toISOString(),
      };

      dataStore.notifications.push(notification);
      res.status(201).json(notification);
    } else if (req.method === "PATCH") {
      // Update notification (mark as read)
      const { id } = req.query;
      const { read } = req.body;

      const notification = dataStore.notifications.find((n) => n.id === id);
      if (!notification) {
        res.status(404).json({ error: "Notification not found" });
        return;
      }

      notification.read = read;
      res.status(200).json(notification);
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
