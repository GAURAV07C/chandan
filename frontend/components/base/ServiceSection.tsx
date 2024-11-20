
"use client";

import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";

export default function ServiceSection() {
  const services = [
    "Video Editing",
    "Motion Graphics",
    "Color Grading",
    "Sound Design",
    "Visual Effects",
    "3D Animation",
    "Subtitles & Captions",
    "Video Restoration",
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ServiceCard service={service} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
