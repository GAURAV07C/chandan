
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { redirect } from "next/navigation";

export default function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Create Your Future
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Connect with top video editors and unleash your creativity
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >

        <Button onClick={() => {
          redirect("/login")
        }} size="lg" className="bg-yellow-400 text-purple-900 hover:bg-yellow-300">
          Get Started <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </section>
  );
}
