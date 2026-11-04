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
  { label: "Contact Us", href: "/#contact" },
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

type BrandIconProps = {
  className?: string;
};

const FacebookIcon = ({ className }: BrandIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XIcon = ({ className }: BrandIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const GitHubIcon = ({ className }: BrandIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const DiscordIcon = ({ className }: BrandIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
  </svg>
);

const WhatsAppIcon = ({ className }: BrandIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.488-8.413Z" />
  </svg>
);

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: FacebookIcon,
  },
  {
    label: "X",
    href: "https://x.com/",
    icon: XIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: GitHubIcon,
  },
  {
    label: "Discord",
    href: "https://discord.com/",
    icon: DiscordIcon,
  },
  {
    label: "WhatsApp",
    href: "https://www.whatsapp.com/",
    icon: WhatsAppIcon,
  },
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
              src="/kindora-logo.png"
              alt="Kindora - Small Acts, Big Impact"
              width={170}
              height={65}
              className="h-14 w-auto rounded-2xl py-1 object-contain"
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

          {/* Social Media */}
          <ul className="flex flex-wrap items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Kindora on ${link.label}`}
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-footer-foreground/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-footer dark:border-border/80 dark:bg-card/60 dark:hover:border-primary dark:hover:bg-primary"
                  >
                    <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  </a>
                </li>
              );
            })}
          </ul>
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
      <div
        id="contact"
        className="mx-auto flex max-w-7xl scroll-mt-24 flex-col gap-4 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between"
      >
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
