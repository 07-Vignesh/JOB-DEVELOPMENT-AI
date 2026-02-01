"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FindMentorPage = () => {
    const router = useRouter();
  const [formData, setFormData] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();

  router.push(
    `/mentor-matches?data=${encodeURIComponent(
      JSON.stringify(formData)
    )}`
  );
};

  return (
    <section className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">
        Find Your Mentor
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* ===== NAME ===== */}
        <div>
          <label className="font-medium">Full Name</label>
          <Input
            placeholder="Enter your full name"
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        {/* ===== EDUCATION ===== */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Education Details</h2>

          <Select onValueChange={(v) => handleChange("educationLevel", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Current Education Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high-school">High School</SelectItem>
              <SelectItem value="undergraduate">Undergraduate</SelectItem>
              <SelectItem value="postgraduate">Postgraduate</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Field of Study / Major"
            onChange={(e) => handleChange("fieldOfStudy", e.target.value)}
          />

          <Input
            placeholder="Year of Study (e.g., 2nd year B.Tech)"
            onChange={(e) => handleChange("yearOfStudy", e.target.value)}
          />

          <Input
            placeholder="Academic Performance (optional)"
            onChange={(e) => handleChange("academicPerformance", e.target.value)}
          />
        </div>

        {/* ===== SKILLS ===== */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Skills</h2>

          <Input
            placeholder="Technical Skills (comma separated)"
            onChange={(e) => handleChange("technicalSkills", e.target.value)}
          />

          <Input
            placeholder="Soft Skills (comma separated)"
            onChange={(e) => handleChange("softSkills", e.target.value)}
          />

          <Select onValueChange={(v) => handleChange("skillLevel", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Skill Proficiency Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ===== INTERESTS ===== */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Interests</h2>

          <Input
            placeholder="Academic Interests (e.g., AI, Robotics)"
            onChange={(e) => handleChange("academicInterests", e.target.value)}
          />

          <Input
            placeholder="Career Interests (e.g., Research, Corporate Jobs)"
            onChange={(e) => handleChange("careerInterests", e.target.value)}
          />
        </div>

        {/* ===== GOALS ===== */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Future Goals</h2>

          <Textarea
            placeholder="Short-term goals"
            onChange={(e) => handleChange("shortTermGoals", e.target.value)}
          />

          <Textarea
            placeholder="Long-term goals"
            onChange={(e) => handleChange("longTermGoals", e.target.value)}
          />
        </div>

        {/* ===== MENTOR STYLE ===== */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Preferred Mentor Style</h2>

          <Select onValueChange={(v) => handleChange("mentorStyle", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select mentor style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hands-on">Hands-on</SelectItem>
              <SelectItem value="advisory">Advisory</SelectItem>
              <SelectItem value="motivational">Motivational</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ===== SUBMIT ===== */}
        <Button type="submit" className="w-full">
          Find Matching Mentors
        </Button>
      </form>
    </section>
  );
};

export default FindMentorPage;
