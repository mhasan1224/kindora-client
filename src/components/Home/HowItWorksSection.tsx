
"use client";

import { motion } from "motion/react";
import { Search, Users, Sprout, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover Events",
    description:
      "Explore upcoming social development events and find opportunities that match your interests.",
  },
  {
    number: "02",
    icon: Users,
    title: "Join a Community",
    description:
      "Connect with like-minded people and join events to work together for a better community.",
  },
  {
    number: "03",
    icon: Sprout,
    title: "Make an Impact",
    description:
      "Take action, help others, and create meaningful positive changes in the world around you.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-secondary px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"
          >
            Simple Process
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            How <span className="text-primary">Kindora</span> Works
          </motion.h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            Making a difference starts with a small step. Follow these
            three simple steps and become part of something meaningful.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                }}
                whileHover={{ y: -6 }}
                className="relative rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <Icon size={30} strokeWidth={1.8} />
                  </div>

                  <span className="text-4xl font-bold text-muted/70">
                    {step.number}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {step.title}
                </h3>

                <p className="text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary">
                </div>

                {index !== steps.length - 1 && (
                  <div className="absolute -right-7 top-1/2 hidden -translate-y-1/2 text-primary/50 md:block">
                    <ArrowRight size={24} aria-hidden="true" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}