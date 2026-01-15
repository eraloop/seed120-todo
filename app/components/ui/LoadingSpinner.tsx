"use client";

import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="loading-container">
      <motion.div
        className="loading-spinner"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className="loading-text">Loading todos...</p>
    </div>
  );
}
