
"use client";

import { motion } from "motion/react";
import { ArrowRight, Mail, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewsletterSection() {
  return (
    <section className="bg-background px-6 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#047857] to-[#059669] px-6 py-12 text-center shadow-xl sm:px-12 sm:py-16 dark:from-card dark:to-card"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/15 dark:bg-primary/15">
          <Leaf className="h-8 w-8 text-primary-foreground dark:text-primary" />
        </div>

        <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl dark:text-foreground">
          Stay Connected with Kindora
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#ecfdf5] sm:text-base dark:text-muted-foreground">
          Get inspired by community stories, upcoming events, and opportunities
          to make a positive difference in the world.
        </p>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <div className="flex flex-1 items-center gap-3 rounded-xl bg-card px-4 focus-within:ring-2 focus-within:ring-white/70 dark:bg-secondary dark:focus-within:ring-ring/60">
            <Mail className="h-5 w-5 shrink-0 text-primary" />

            <input
              type="email"
              placeholder="Enter your email address"
              aria-label="Email address"
              className="h-14 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-[#64748b] dark:placeholder:text-muted-foreground"
            />
          </div>

          <Button
            type="submit"
            className="h-14 rounded-xl bg-[#064e3b] px-7 text-white hover:bg-[#053f2f] focus-visible:ring-white/70 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-card"
          >
            Subscribe
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <p className="mt-5 text-xs text-primary-foreground/80 dark:text-muted-foreground">
          Be part of something meaningful. Together, we can make a difference.
        </p>
      </motion.div>
    </section>
  );
}
