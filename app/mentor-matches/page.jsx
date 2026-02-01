"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { matchMentors } from "@/actions/mentor-matching";
import mentors from "@/data/mentors";
import MentorCard from "@/components/ui/mentor-card";
import { Card, CardContent } from "@/components/ui/card";
import { BarLoader } from "react-spinners";

export default function MentorMatchesPage() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const studentData = JSON.parse(searchParams.get("data"));

  useEffect(() => {
    async function fetchMatches() {
      const res = await matchMentors(studentData);
      setResult(res);
      setLoading(false);
    }
    fetchMatches();
  }, []);

  if (loading) return <BarLoader width="100%" />;

  return (
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-10">

      {/* STUDENT SUMMARY */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-2">
            Student Profile Summary
          </h2>
          <p className="text-muted-foreground">
            {result.studentSummary}
          </p>
        </CardContent>
      </Card>

      {/* MATCHED MENTORS */}
      <div>
        <h2 className="text-3xl font-bold mb-6">
          Recommended Mentors
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {result.matches.map((match) => {
            const mentor = mentors.find(
              (m) => m.id === match.mentorId
            );

            return (
              <div key={mentor.id} className="space-y-4">
                <MentorCard mentor={mentor} />

                <Card>
                  <CardContent className="p-4 space-y-2">
                    <p className="text-sm">
                      <strong>Why this mentor?</strong><br />
                      {match.reason}
                    </p>
                    <p className="text-sm font-semibold text-green-600">
  Match Score: {match.matchScore}%
</p>

                    <div>
                      <strong>Career Suggestions:</strong>
                      <ul className="list-disc list-inside text-sm mt-1">
                        {match.careerSuggestions.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
