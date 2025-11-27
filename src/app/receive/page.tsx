"use client";

import { motion } from "framer-motion";
import { Zap, Phone, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import DonationForm from "@/components/DonationForm";

const features = [
  {
    icon: Zap,
    title: "Quick Response",
    description: "We respond to urgent requests within hours",
  },
  {
    icon: Phone,
    title: "24/7 Support",
    description: "Our team is available round the clock",
  },
  {
    icon: MapPin,
    title: "Wide Network",
    description: "Connected to blood banks across the region",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Priority delivery for emergency cases",
  },
];

export default function ReceivePage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Request <span className="text-gradient">Blood</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Need blood urgently? Submit your request and we&apos;ll connect you with available donors.
            </p>
          </motion.div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 blood-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Emergency Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="blood-gradient rounded-2xl p-6 text-white text-center mb-12"
          >
            <h3 className="text-xl font-semibold mb-2">🚨 Emergency?</h3>
            <p className="opacity-90">
              For life-threatening emergencies, please call our hotline:{" "}
              <a href="tel:1800-BLOOD" className="font-bold underline">
                1800-BLOOD
              </a>{" "}
              | For more details:{" "}
              <a href="tel:62042337" className="font-bold underline">
                62042337
              </a>
            </p>
          </motion.div>

          {/* Form */}
          <DonationForm type="receive" />
        </div>
      </section>
    </main>
  );
}

