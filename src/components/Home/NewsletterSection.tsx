
"use client";

import { motion } from "motion/react";
import { ArrowRight, Mail, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewsletterSection() {
  return (
    <section className="bg-white px-6 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-green-700 px-6 py-12 text-center shadow-xl sm:px-12 sm:py-16"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/15">
          <Leaf className="h-8 w-8 text-white" />
        </div>

        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Stay Connected with Kindora
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-green-100 sm:text-base">
          Get inspired by community stories, upcoming events, and opportunities
          to make a positive difference in the world.
        </p>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <div className="flex flex-1 items-center gap-3 rounded-xl bg-white px-4">
            <Mail className="h-5 w-5 shrink-0 text-green-700" />

            <input
              type="email"
              placeholder="Enter your email address"
              aria-label="Email address"
              className="h-14 w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
          </div>

          <Button
            type="submit"
            className="h-14 rounded-xl bg-gray-900 px-7 text-white hover:bg-gray-800"
          >
            Subscribe
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <p className="mt-5 text-xs text-green-100">
          Be part of something meaningful. Together, we can make a difference.
        </p>
      </motion.div>
    </section>
  );
}
