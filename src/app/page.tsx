"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Droplet, Users, Clock, ArrowRight, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";
import BloodCard from "@/components/BloodCard";

const bloodData = [
  { bloodType: "A+", units: 45, status: "adequate" as const },
  { bloodType: "A-", units: 12, status: "low" as const },
  { bloodType: "B+", units: 67, status: "high" as const },
  { bloodType: "B-", units: 8, status: "critical" as const },
  { bloodType: "AB+", units: 34, status: "adequate" as const },
  { bloodType: "AB-", units: 5, status: "critical" as const },
  { bloodType: "O+", units: 78, status: "high" as const },
  { bloodType: "O-", units: 15, status: "low" as const },
];

const stats = [
  { icon: Droplet, value: "10,000+", label: "Units Donated" },
  { icon: Users, value: "5,000+", label: "Active Donors" },
  { icon: Heart, value: "8,500+", label: "Lives Saved" },
  { icon: Clock, value: "24/7", label: "Support" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-red-100 text-[#c41e3a] rounded-full text-sm font-medium mb-6">
                🩸 Every Drop Counts
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Give the Gift of{" "}
                <span className="text-gradient">Life</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join thousands of heroes who save lives every day. Your blood donation
                can give someone a second chance at life.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/donate">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="blood-gradient text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 animate-pulse-glow"
                  >
                    Donate Now <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link href="/receive">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-[#c41e3a] border-2 border-[#c41e3a] px-8 py-4 rounded-full font-semibold text-lg hover:bg-red-50 transition-colors"
                  >
                    Request Blood
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 blood-gradient rounded-full opacity-20 blur-3xl animate-pulse" />
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-64 h-64 sm:w-80 sm:h-80 blood-gradient rounded-full flex items-center justify-center animate-float">
                    <Heart className="w-32 h-32 sm:w-40 sm:h-40 text-white animate-heartbeat" fill="white" />
                  </div>
                </div>
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-10 left-10 glass-card p-4 rounded-2xl"
                >
                  <Droplet className="w-8 h-8 text-[#c41e3a]" fill="#c41e3a" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute bottom-20 right-10 glass-card p-4 rounded-2xl"
                >
                  <Activity className="w-8 h-8 text-[#c41e3a]" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <stat.icon className="w-10 h-10 text-[#c41e3a] mx-auto mb-4" />
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blood Availability Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Blood <span className="text-gradient">Availability</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Check real-time blood availability and help where it&apos;s needed most
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bloodData.map((blood) => (
              <BloodCard key={blood.bloodType} {...blood} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/availability">
              <button className="text-[#c41e3a] font-semibold flex items-center gap-2 mx-auto hover:gap-4 transition-all">
                View Full Availability <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="blood-gradient rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl" />
            </div>
            <div className="relative z-10">
              <Heart className="w-16 h-16 mx-auto mb-6 animate-heartbeat" fill="white" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Save Lives?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto">
                One donation can save up to three lives. Be a hero today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/donate">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-[#c41e3a] px-8 py-4 rounded-full font-semibold text-lg"
                  >
                    Start Donating
                  </motion.button>
                </Link>
                <Link href="/receive">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
                  >
                    Request Blood
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-[#c41e3a]" fill="#c41e3a" />
              <span className="text-2xl font-bold text-gradient">Hemo</span>
            </div>
            <div className="flex gap-8 text-gray-600">
              <Link href="/availability" className="hover:text-[#c41e3a] transition-colors">
                Availability
              </Link>
              <Link href="/donate" className="hover:text-[#c41e3a] transition-colors">
                Donate
              </Link>
              <Link href="/receive" className="hover:text-[#c41e3a] transition-colors">
                Receive
              </Link>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 Hemo. Saving lives together. | Contact: 62042337
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
