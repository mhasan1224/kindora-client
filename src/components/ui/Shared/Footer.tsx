"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  CalendarDays,
  CalendarCheck,
  PlusCircle,
  Users,
  MapPin,
  Heart,
  ArrowUpRight,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/upcoming-events" },
  { label: "About Us", href: "/#about" },
];

const activityLinks = [
  {
    label: "Create Event",
    href: "/create-event",
    icon: PlusCircle,
  },
  {
    label: "Manage Events",
    href: "/manage-events",
    icon: CalendarCheck,
  },
  {
    label: "Joined Events",
    href: "/my-joined-events",
    icon: Users,
  },
];

const categories = [
  { label: "Tree Plantation", value: "Tree Plantation" },
  { label: "Community Cleanup", value: "Community Cleanup" },
  { label: "Food Donation", value: "Food Donation" },
  { label: "Education Support", value: "Education Support" },
  { label: "Blood Donation", value: "Blood Donation" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-footer px-6 pt-14 text-footer-foreground sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/kindora-logo.jpg"
              alt="Kindora - Small Acts, Big Impact"
              width={170}
              height={65}
              className="h-14 w-auto object-contain"
            />
          </Link>

          <p className="max-w-xs text-sm leading-7 text-footer-foreground/80">
            Bringing people together through kindness, volunteering, and
            meaningful community activities. Every small act can make a big
            difference.
          </p>

          <div className="inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 text-sm font-medium text-primary">
            <Heart className="h-4 w-4 fill-primary text-primary" />
            Small Acts, Big Impact
          </div>
        </motion.div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-base font-bold text-foreground">
            Quick Links
          </h3>

          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-2 text-sm text-footer-foreground/80 transition-colors hover:text-footer-foreground"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* My Activities */}
        <div>
          <h3 className="mb-5 text-base font-bold text-foreground">
            My Activities
          </h3>

          <ul className="space-y-3">
            {activityLinks.map((link) => {
              const Icon = link.icon;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-3 text-sm text-footer-foreground/80 transition-colors hover:text-footer-foreground"
                  >
                    <Icon className="h-4 w-4 text-primary transition-transform group-hover:scale-110" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Event Categories */}
        <div>
          <h3 className="mb-5 text-base font-bold text-foreground">
            Event Categories
          </h3>

          <ul className="space-y-3">
            {categories.map((category) => (
              <li key={category.value}>
                <Link
                  href={`/upcoming-events?category=${encodeURIComponent(category.value)}`}
                  className="group flex items-center gap-2 text-sm text-footer-foreground/80 transition-colors hover:text-footer-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary transition-transform group-hover:scale-150" />
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contact and Location */}
      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-footer-foreground/80">
          <MapPin className="h-4 w-4 text-primary" />
          Bangladesh
        </div>

        <Link
          href="/upcoming-events"
          className="inline-flex items-center gap-2 text-sm font-medium text-footer-foreground transition-opacity hover:opacity-70"
        >
          Explore Events
          <CalendarDays className="h-4 w-4" />
        </Link>
      </div>

      {/* Copyright */}
      <div className="border-t border-border py-6 text-center">
        <p className="text-sm text-footer-foreground/80">
          © {currentYear}{" "}
          <Link
            href="/"
            className="font-semibold text-footer-foreground transition-opacity hover:opacity-70"
          >
            Kindora
          </Link>
          . All rights reserved.
        </p>

        <p className="mt-2 text-xs text-footer-foreground/60">
          Made with care for our community.
        </p>
      </div>
    </footer>
  );
}
