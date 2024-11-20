
"use client";

import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import { Play, Edit, Zap } from "lucide-react";

export default function FeatureSection() {
  const features = [
    { icon: <Play className="h-12 w-12 mb-4" />, title: "High-Quality Edits", description: "Professional-grade edits that captivate your audience." },
    { icon: <Edit className="h-12 w-12 mb-4" />, title: "Custom Solutions", description: "Tailored services matching your vision." },
    { icon: <Zap className="h-12 w-12 mb-4" />, title: "Fast Turnaround", description: "Quick delivery without quality compromise." },
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose VVE?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
