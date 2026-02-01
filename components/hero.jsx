"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient">
            From Student to Job-Ready
            <br />
            With the Right Mentor
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Every student needs guidance before stepping into their career.
  We connect learners with expert mentors and AI-driven tools to
  prepare, practice, and succeed in the job market.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Link href="/find-mentor">
            <Button size="lg" className="px-8">
              Find Your Mentor
            </Button>
          </Link>
                        
          
          <Link href="/mentors">
            <Button size="lg" className="px-8">
              Mentors Profile
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner4.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;