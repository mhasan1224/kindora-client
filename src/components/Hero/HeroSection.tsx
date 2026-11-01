
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const heroImages = [
  "/images/hero/tree-plantation.png",
  "/images/hero/community-cleanup.jpg",
  "/images/hero/food-donation.jpg",
  "/images/hero/community-volunteering.jpg",
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((previous) => (previous + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-[650px] items-center overflow-hidden bg-green-950">
      <AnimatePresence mode="sync">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <Image
            src={heroImages[currentImage]}
            alt="Kindora community volunteering"
            fill
            priority={currentImage === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-white"
        >
          <p className="mb-5 font-semibold uppercase tracking-[0.25em] text-green-300">
            Welcome to Kindora
          </p>

          <h1 className="text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            Small Acts,
            <span className="block text-green-300">Big Impact.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
            Discover meaningful volunteer opportunities, join community
            events, and make a positive difference in the world around you.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-green-600 text-white hover:bg-green-700">
              <Link href="/upcoming-events">Explore Events</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white bg-white/10 text-white hover:bg-white hover:text-green-900"
            >
              <Link href="/create-event">Create an Event</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            aria-label={`Show slide ${index + 1}`}
            aria-current={currentImage === index}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentImage === index
                ? "w-8 bg-green-400"
                : "w-2.5 bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
