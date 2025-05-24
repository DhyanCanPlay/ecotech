'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Globe3D from '@/components/Globe3D'
import ParticleBackground from '@/components/ParticleBackground'

export default function Home() {
  const [heroRef, heroInView] = useInView({ threshold: 0.3 })

  const features = [
    {
      title: "Green Technology",
      description: "Sustainable tech solutions for tomorrow",
      icon: "🌱",
      href: "/services"
    },
    {
      title: "Environmental Tools",
      description: "Calculate your carbon and plastic footprint",
      icon: "🧮",
      href: "/calculators"
    },
    {
      title: "Community Impact",
      description: "Join our mission for a sustainable future",
      icon: "🤝",
      href: "/about"
    }
  ]

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-10">
          
        </div>

        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.08 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-6 text-glow">
              EcoTech
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Technology for Good — Eco-Friendly Innovation 🌍
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Harnessing the power of code, circuits, and creativity to protect nature and empower communities
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.32, ease: "easeOut", delay: 0.18 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/about">
              <button className="btn-primary px-8 py-3 rounded-full text-lg font-semibold">
                Explore Our Mission
              </button>
            </Link>
            <Link href="/calculators">
              <button className="glass px-8 py-3 rounded-full text-lg font-semibold text-white hover:bg-white/20 transition-all duration-300">
                Try Our Tools
              </button>
            </Link>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.36, ease: "easeOut", delay: 0.22 }}
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.28, ease: "easeOut", delay: 0.32 + index * 0.06 }}
              >
                <Link href={feature.href}>
                  <div className="glass p-6 rounded-2xl card-hover group cursor-pointer">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="relative z-30 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
              Making a Real Impact
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "5K+", label: "CO₂ Calculated", icon: "🌍" },
              { number: "50+", label: "Users Helped", icon: "👥" },
              { number: "10+", label: "Green Projects", icon: "🌱" },
              { number: "20+", label: "Trees Saved", icon: "🌳" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, ease: "easeOut", delay: index * 0.05 }}
                className="glass p-6 rounded-2xl text-center card-hover"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-30 py-8 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="glass p-4 rounded-lg inline-block">
            <p className="text-gray-400">© Knights - EcoTech Platform</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
