"use server";

import mentors from "@/data/mentors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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
   - Assign a matchScore (0–100) based on skills, interests, and goals alignment
   - Explain clearly why this mentor is relevant
   - Give 2–3 actionable career growth suggestions

Rules:
- Match scores must be realistic and justified
- Do not select more than 3 mentors

Return ONLY valid JSON:
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

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}
