"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Clock, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import DonationForm from "@/components/DonationForm";

const benefits = [
  {
    icon: Heart,
    title: "Save Lives",
    description: "One donation can save up to 3 lives",
  },
  {
    icon: Shield,
    title: "Health Check",
    description: "Free mini health screening with each donation",
  },
  {
    icon: Clock,
    title: "Quick Process",
    description: "The entire process takes only 30-45 minutes",
  },
  {
    icon: Award,
    title: "Feel Good",
    description: "Experience the joy of helping others",
  },
];

export default function DonatePage() {
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
              Donate <span className="text-gradient">Blood</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your donation can make a life-changing difference. Schedule your appointment today.
            </p>
          </motion.div>

          {/* Benefits */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 blood-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <DonationForm type="donate" />
        </div>
      </section>
    </main>
  );
}

