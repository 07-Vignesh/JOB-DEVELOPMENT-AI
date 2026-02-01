import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MentorCard = ({ mentor }) => {
  const { professional_background } = mentor;

  return (
    <div className="rounded-xl border p-5 shadow-sm hover:shadow-lg transition">
      <Image
        src={mentor.profile_picture_url}
        alt={mentor.name}
        width={300}
        height={300}
        className="rounded-lg object-cover mx-auto"
      />

      <div className="mt-4 text-center space-y-2">
        <h3 className="text-lg font-semibold">{mentor.name}</h3>

        <p className="text-sm text-muted-foreground">
          {professional_background.current_position} @{" "}
          {professional_background.organization}
        </p>

        <p className="text-sm">
          {professional_background.years_of_experience}+ years experience
        </p>

        {/* Show only first 3 skills */}
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {professional_background.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-secondary rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Visit Profile Button */}
        <Link href={`/mentors/${mentor.id}`}>
          <Button className="mt-4 w-full">Visit Profile</Button>
        </Link>
      </div>
    </div>
  );
};

export default MentorCard;
