"use client";

import { useState } from "react";
import mentors from "../../../data/mentors";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const MentorProfilePage = ({ params }) => {
  const mentor = mentors.find((m) => m.id === params.id);

  const [showForm, setShowForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    education: "",
    contact: "",
  });

  if (!mentor) {
    return <p className="pt-32 text-center">Mentor not found</p>;
  }

  const handleChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    toast.success("Mentor booked successfully 🎉");
    setShowForm(false);
    setBookingData({ name: "", education: "", contact: "" });
  };

  return (
    <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto space-y-10">

      {/* ================= HEADER ================= */}
      <div className="text-center space-y-3">
        <Image
          src={mentor.profile_picture_url}
          alt={mentor.name}
          width={200}
          height={200}
          className="rounded-full mx-auto"
        />

        <h1 className="text-3xl font-bold">{mentor.name}</h1>

        <p className="text-muted-foreground">
          {mentor.professional_background.current_position} <br />
          {mentor.professional_background.organization}
        </p>

        <p className="text-sm text-muted-foreground">
          {mentor.location} • {mentor.gender}
        </p>

        {mentor.metadata?.public_figure && (
          <span className="inline-block text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full">
            Verified Public Figure
          </span>
        )}

        <Button className="mt-4" onClick={() => setShowForm(true)}>
          Book This Mentor
        </Button>
      </div>

      {/* ================= PROFESSIONAL BACKGROUND ================= */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Professional Background</h2>
        <p>
          {mentor.professional_background.years_of_experience}+ years of
          experience across{" "}
          {mentor.professional_background.industries.join(", ")}.
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          {mentor.professional_background.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-secondary rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* ================= MENTORSHIP DETAILS ================= */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Mentorship Details</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Expertise:</strong>{" "}
            {mentor.mentorship_details.areas_of_expertise.join(", ")}
          </li>
          <li>
            <strong>Mentorship Mode:</strong>{" "}
            {mentor.mentorship_details.preferred_mentorship_mode}
          </li>
          <li>
            <strong>Languages:</strong>{" "}
            {mentor.mentorship_details.languages.join(", ")}
          </li>
          <li>
            <strong>Mentorship Style:</strong>{" "}
            {mentor.mentorship_details.mentorship_style}
          </li>
          <li>
            <strong>Availability:</strong>{" "}
            {mentor.mentorship_details.availability.join(" | ")}
          </li>
        </ul>
      </div>

      {/* ================= EDUCATION ================= */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Education</h2>
        <ul className="space-y-2">
          {mentor.education.map((edu, index) => (
            <li key={index}>
              🎓 <strong>{edu.degree}</strong> — {edu.institution} ({edu.year})
            </li>
          ))}
        </ul>
      </div>

      {/* ================= SOCIAL PROOF ================= */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Testimonials & Rating</h2>
        <p className="mb-2">⭐ {mentor.social_proof.rating} / 5</p>
        <ul className="list-disc list-inside space-y-1">
          {mentor.social_proof.testimonials.map((testimonial, index) => (
            <li key={index}>{testimonial}</li>
          ))}
        </ul>
      </div>

      {/* ================= CONTACT ================= */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Contact & Links</h2>
        <ul className="space-y-1">
          <li>Email: {mentor.contact.email}</li>
          <li>Phone: {mentor.contact.phone}</li>

          <li>
            LinkedIn:{" "}
            <a
              href={mentor.contact.linkedin_url}
              target="_blank"
              className="text-blue-600 underline"
            >
              View LinkedIn Profile
            </a>
          </li>

          {mentor.contact.website && (
            <li>
              Website:{" "}
              <a
                href={mentor.contact.website}
                target="_blank"
                className="text-blue-600 underline"
              >
                Visit Website
              </a>
            </li>
          )}
        </ul>
      </div>

      {/* ================= BOOKING MODAL ================= */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold text-center">
              Book Mentor Session
            </h2>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <Input
                placeholder="Your Full Name"
                value={bookingData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />

              <Input
                placeholder="Your Education"
                value={bookingData.education}
                onChange={(e) => handleChange("education", e.target.value)}
                required
              />

              <Input
                placeholder="Contact Number"
                value={bookingData.contact}
                onChange={(e) => handleChange("contact", e.target.value)}
                required
              />

              <div className="flex gap-3">
                <Button type="submit" className="w-full">
                  Confirm Booking
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};

export default MentorProfilePage;
