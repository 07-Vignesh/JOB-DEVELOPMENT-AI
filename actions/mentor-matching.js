"use server";

import mentors from "@/data/mentors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// ✅ Retry helper
async function generateWithRetry(prompt, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await model.generateContent(prompt);

    } catch (error) {
      console.error(`Attempt ${i + 1} failed`);

      // Retry only for temporary server overload
      if (
        error.message.includes("503") &&
        i < retries - 1
      ) {
        await new Promise((resolve) =>
          setTimeout(resolve, 2000 * (i + 1))
        );

        continue;
      }

      throw error;
    }
  }
}

export async function matchMentors(studentProfile) {

  const prompt = `
You are an expert AI career mentor matcher.

STUDENT PROFILE:
${JSON.stringify(studentProfile, null, 2)}

AVAILABLE MENTORS:
${JSON.stringify(mentors, null, 2)}

TASK:
1. Write a short professional summary of the student.
2. Select the TOP 2–3 most suitable mentors.
3. For EACH selected mentor:
   - Assign a realistic matchScore (0–100)
   - Explain clearly why this mentor is relevant
   - Give 2–3 actionable career growth suggestions

Rules:
- Match scores must be realistic
- Do not select more than 3 mentors
- Return ONLY valid JSON
- Do NOT include markdown formatting

Expected JSON format:
{
  "studentSummary": "string",
  "matches": [
    {
      "mentorId": "string",
      "matchScore": number,
      "reason": "string",
      "careerSuggestions": ["string"]
    }
  ]
}
`;

  const result = await generateWithRetry(prompt);

  const text = result.response.text();

  // ✅ Safe cleanup
  let cleaned = text.trim();

  if (cleaned.startsWith("```")) {
    cleaned = cleaned
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
  }

  try {
    return JSON.parse(cleaned);

  } catch (error) {
    console.error("Failed to parse Gemini response:", cleaned);
    throw new Error("Invalid AI response format");
  }
}