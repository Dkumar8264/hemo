"use client";

import { motion } from "framer-motion";
import { Droplet } from "lucide-react";

interface BloodCardProps {
  bloodType: string;
  units: number;
  status: "critical" | "low" | "adequate" | "high";
}

const statusColors = {
  critical: { bg: "bg-red-100", text: "text-red-700", bar: "bg-red-500" },
  low: { bg: "bg-orange-100", text: "text-orange-700", bar: "bg-orange-500" },
  adequate: { bg: "bg-yellow-100", text: "text-yellow-700", bar: "bg-yellow-500" },
  high: { bg: "bg-green-100", text: "text-green-700", bar: "bg-green-500" },
};

const statusLabels = {
  critical: "Critical",
  low: "Low",
  adequate: "Adequate",
  high: "High",
};

export default function BloodCard({ bloodType, units, status }: BloodCardProps) {
  const colors = statusColors[status];
  const maxUnits = 100;
  const percentage = Math.min((units / maxUnits) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 blood-gradient rounded-full flex items-center justify-center animate-pulse-glow">
            <Droplet className="w-7 h-7 text-white" fill="white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gradient">{bloodType}</h3>
            <p className="text-gray-500 text-sm">Blood Type</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}>
          {statusLabels[status]}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Available Units</span>
          <span className="font-semibold text-gray-800">{units} units</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${percentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${colors.bar} rounded-full`}
          />
        </div>
      </div>
    </motion.div>
  );
}

