
"use client";

import Image from "next/image";
import { motion } from "motion/react";

const galleryImages = [
  {
    src: "/images/hero/tree-plantation.jpg",
    title: "Tree Plantation",
  },
  {
    src: "/images/hero/community-cleanup.jpg",
    title: "Community Cleanup",
  },
  {
    src: "/images/hero/food-donation.jpg",
    title: "Food Donation",
  },
  {
    src: "/images/hero/community-volunteering.jpg",
    title: "Community Volunteering",
  },
];

export default function GallerySection() {
  return (
    <section className="bg-green-50 px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 font-semibold uppercase tracking-widest text-green-700">
            Our Activities
          </p>

          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Moments That Make a Difference
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Explore the beautiful moments of people coming together to make
            positive changes in their communities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative h-72 overflow-hidden rounded-2xl shadow-md"
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

              <h3 className="absolute bottom-5 left-5 text-xl font-semibold text-white">
                {image.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
