import { dataStore } from "./lib/dataStore.js";
import { hashPassword, comparePassword, createToken, verifyToken } from "./lib/auth.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const action = req.query.action;

  try {
    if (action === "signup") {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      const existingUser = dataStore.users.find((u) => u.email === email);
      if (existingUser) {
        res.status(400).json({ error: "User already exists" });
        return;
      }

      const hashedPassword = await hashPassword(password);
      const user = {
        id: Date.now().toString(),
        email,
        password: hashedPassword,
        name,
        trustScore: 0,
        createdAt: new Date().toISOString(),
      };

      dataStore.users.push(user);
      const token = createToken(user.id);

      res.status(201).json({
        user: { id: user.id, email, name, trustScore: user.trustScore },
        token,
      });
    } else if (action === "login") {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Missing email or password" });
        return;
      }

      const user = dataStore.users.find((u) => u.email === email);
      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const isValid = await comparePassword(password, user.password);
      if (!isValid) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const token = createToken(user.id);
      res.status(200).json({
        user: { id: user.id, email, name: user.name, trustScore: user.trustScore },
        token,
      });
    } else if (action === "verify") {
      const { token } = req.body;

      if (!token) {
        res.status(400).json({ error: "Token is required" });
        return;
      }

      const decoded = verifyToken(token);
      if (!decoded) {
        res.status(401).json({ error: "Invalid token" });
        return;
      }

      const user = dataStore.users.find((u) => u.id === decoded.userId);
      if (!user) {
        res.status(401).json({ error: "User not found" });
        return;
      }

      res.status(200).json({
        user: { id: user.id, email: user.email, name: user.name, trustScore: user.trustScore },
      });
    } else {
      res.status(400).json({ error: "Unknown action" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
