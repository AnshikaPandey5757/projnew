const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const useOpenAI = Boolean(OPENAI_API_KEY && OPENAI_API_KEY.length > 0);

async function parseJsonBody(req) {
  if (req.body && Object.keys(req.body).length) {
    return req.body;
  }

  let bodyText = "";
  for await (const chunk of req) {
    bodyText += chunk;
  }

  if (!bodyText) {
    return {};
  }

  try {
    return JSON.parse(bodyText);
  } catch {
    return {};
  }
}

function parseAiJson(text) {
  if (!text) {
    throw new Error("Empty AI response");
  }

  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("Unable to parse AI response as JSON");
    }
    return JSON.parse(match[0]);
  }
}

async function callOpenAI(prompt) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that generates structured JSON reports for a lending verification platform.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.1,
      max_tokens: 400,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI request failed: ${response.status} ${body}`);
  }

  const result = await response.json();
  const text = result?.choices?.[0]?.message?.content;
  return parseAiJson(text);
}

function createFallbackReport({ title, category, description }) {
  return {
    id: Date.now().toString(),
    conditionScore: 88,
    damages: description?.includes("scratch") ? ["Minor scratch detected"] : [],
    recommendations: description
      ? "Item appears ready for lending with a few notes to monitor the condition."
      : "Item condition looks stable.",
    summary: `AI simulated report for ${title || "the item"} in ${category || "general"}.`,
    analysisTime: "1.2s",
    timestamp: new Date().toISOString(),
  };
}

function createFallbackCompare({ beforeCondition, afterCondition }) {
  const similarityScore = beforeCondition === afterCondition ? 98 : 74;
  return {
    id: Date.now().toString(),
    similarityScore,
    differences: beforeCondition === afterCondition ? [] : ["Minor surface wear after return"],
    condition: beforeCondition === afterCondition ? "No significant changes detected" : "Small condition changes detected",
    summary: "AI simulated before/after comparison of item condition.",
    analysisTime: "1.4s",
    timestamp: new Date().toISOString(),
  };
}

function createFallbackDamage({ imageDescription }) {
  const severity = imageDescription?.includes("broken") ? "moderate" : "minor";
  return {
    id: Date.now().toString(),
    damagesDetected: imageDescription?.includes("scratch") ? 1 : 0,
    severity: imageDescription?.includes("broken") ? "moderate" : severity,
    details: imageDescription
      ? `AI simulated check based on description: ${imageDescription}`
      : "No damage details provided.",
    recommendations: "Review the item before lending and capture updated condition images.",
    analysisTime: "0.9s",
    timestamp: new Date().toISOString(),
  };
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { action } = req.query;
  const body = await parseJsonBody(req);

  try {
    if (action === "report") {
      const { title, category, description } = body;
      if (useOpenAI) {
        const prompt = `Create a structured JSON condition report for an item. Return only JSON. Item title: ${title || "Unknown"}. Category: ${category || "General"}. Condition description: ${description || "No details provided."}`;
        const report = await callOpenAI(prompt);
        return res.status(200).json(report);
      }

      return res.status(200).json(createFallbackReport({ title, category, description }));
    }

    if (action === "compare") {
      const { beforeCondition, afterCondition } = body;
      if (useOpenAI) {
        const prompt = `Compare before and after item condition descriptions and return only JSON with keys: similarityScore, differences, condition, summary, analysisTime, timestamp. Before: ${beforeCondition || "N/A"}. After: ${afterCondition || "N/A"}.`;
        const compareReport = await callOpenAI(prompt);
        return res.status(200).json(compareReport);
      }

      return res.status(200).json(createFallbackCompare({ beforeCondition, afterCondition }));
    }

    if (action === "damage") {
      const { imageDescription } = body;
      if (useOpenAI) {
        const prompt = `Analyze the item condition report text and return only JSON with keys: damagesDetected, severity, details, recommendations, analysisTime, timestamp. Description: ${imageDescription || "No description"}`;
        const damageReport = await callOpenAI(prompt);
        return res.status(200).json(damageReport);
      }

      return res.status(200).json(createFallbackDamage({ imageDescription }));
    }

    res.status(400).json({ error: "Unknown action" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Unable to generate AI report" });
  }
}
