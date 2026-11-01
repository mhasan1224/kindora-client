"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Mail, MapPin, Phone, Sprout, Globe, Users, Heart } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/upcoming-events" },
  { label: "Create Event", href: "/create-event" },
  { label: "About Us", href: "/#about" },
];

const categories = [
  "Tree Plantation",
  "Community Cleanup",
  "Food Donation",
  "Education Support",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 px-6 pt-16 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="mb-5 inline-flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600">
              <Sprout className="h-6 w-6 text-white" />
            </span>
            <span className="text-2xl font-bold text-white">
              Kindora<span className="text-green-500">.</span>
            </span>
          </Link>

          <p className="max-w-xs text-sm leading-7 text-gray-400">
            Bringing people together through kindness, volunteering, and
            meaningful community activities.
          </p>

          <div className="mt-6 flex gap-3">
            <a
              href="#"
              aria-label="Community"
              className="rounded-lg bg-white/10 p-2 transition hover:bg-green-600"
            >
              <Users size={18} />
            </a>

            <a
              href="#"
              aria-label="Website"
              className="rounded-lg bg-white/10 p-2 transition hover:bg-green-600"
            >
              <Globe size={18} />
            </a>

            <a
              href="#"
              aria-label="Support"
              className="rounded-lg bg-white/10 p-2 transition hover:bg-green-600"
            >
              <Heart size={18} />
            </a>
          </div>
        </motion.div>

        <div>
          <h3 className="mb-5 font-semibold text-white">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition hover:text-green-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 font-semibold text-white">Event Categories</h3>
          <ul className="space-y-3 text-sm">
            {categories.map((category) => (
              <li key={category} className="transition hover:text-green-400">
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 font-semibold text-white">Contact Us</h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-green-500" />
              Bangladesh
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-green-500" />
              <a
                href="mailto:hello@kindora.com"
                className="hover:text-green-400"
              >
                hello@kindora.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-green-500" />
              Community Support
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-500">
        © {currentYear} Kindora. All rights reserved. Made with care for our
        community.
      </div>
    </footer>
  );
}
