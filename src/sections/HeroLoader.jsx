"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroLoader({ loading }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black backdrop-blur-2xl"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Replace this with your eye animation */}
            <h1 className="text-white text-4xl md:text-6xl font-bold">👁️</h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
