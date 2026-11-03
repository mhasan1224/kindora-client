
"use client";

import { motion } from "motion/react";
import {
  Trees,
  Recycle,
  HeartHandshake,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    icon: Trees,
    title: "Tree Plantation",
    description:
      "Help create a greener and healthier environment by planting trees and protecting nature.",
  },
  {
    icon: Recycle,
    title: "Community Cleanup",
    description:
      "Work together to keep streets, parks, and public spaces clean and beautiful.",
  },
  {
    icon: HeartHandshake,
    title: "Food Donation",
    description:
      "Share food and support people in need through meaningful community initiatives.",
  },
  {
    icon: BookOpen,
    title: "Education Support",
    description:
      "Help children access learning opportunities and build a brighter future.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function FeaturesSection() {
  return (
    <section className="bg-background px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"
          >
            What We Do
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Small Actions, <span className="text-primary">Big Changes</span>
          </motion.h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            Discover meaningful ways to contribute to your community and
            make a positive impact together.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group rounded-2xl border border-border bg-card p-7 transition-shadow duration-300 hover:shadow-xl hover:shadow-foreground/10 dark:hover:shadow-black/50"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon size={28} strokeWidth={1.8} />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>

                <div className="mt-5 flex items-center text-sm font-semibold text-primary">
                  Make an impact
                  <ArrowUpRight
                    size={17}
                    className="ml-1 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
