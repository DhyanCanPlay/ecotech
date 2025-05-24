'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navigation from '@/components/Navigation'
import ParticleBackground from '@/components/ParticleBackground'
import CarbonCalculator from '@/components/CarbonCalculator'
import PlasticCalculator from '@/components/PlasticCalculator'

export default function Calculators() {
  const [calculatorsRef, calculatorsInView] = useInView({ threshold: 0.3 })

  const additionalTools = [
    {
      title: "Water Usage Calculator",
      description: "Track your daily water consumption and find ways to conserve",
      icon: "💧",
      comingSoon: true
    },
    {
      title: "Energy Efficiency Calculator",
      description: "Analyze your home's energy usage and potential savings",
      icon: "⚡",
      comingSoon: true
    },
    {
      title: "Transportation Impact",
      description: "Compare environmental impact of different transport methods",
      icon: "🚗",
      comingSoon: true
    },
    {
      title: "Waste Reduction Tracker",
      description: "Monitor and reduce your household waste generation",
      icon: "♻️",
      comingSoon: true
    }
  ]

  const tips = [
    {
      category: "Reduce Energy",
      tips: [
        "Switch to LED light bulbs",
        "Unplug devices when not in use",
        "Use programmable thermostats",
        "Improve home insulation"
      ],
      icon: "💡"
    },
    {
      category: "Transportation",
      tips: [
        "Use public transportation",
        "Walk or bike for short trips",
        "Carpool or rideshare",
        "Consider electric vehicles"
      ],
      icon: "🚌"
    },
    {
      category: "Waste Reduction",
      tips: [
        "Use reusable bags and containers",
        "Compost organic waste",
        "Recycle properly",
        "Buy products with minimal packaging"
      ],
      icon: "🗂️"
    }
  ]

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative z-30">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
              Environmental Calculators
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Track your environmental impact with our smart calculators.
              Get personalized insights and actionable recommendations to reduce your footprint.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Calculators */}
      <section ref={calculatorsRef} className="py-16 relative z-30">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={calculatorsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Calculate Your Impact
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Use our interactive tools to measure and improve your environmental footprint
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={calculatorsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CarbonCalculator />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={calculatorsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <PlasticCalculator />
            </motion.div>
          </div>
        </div>
      </section>

      
      {/* Environmental Tips */}
      <section className="py-16 relative z-30">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Quick Environmental Tips
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Simple actions you can take today to reduce your environmental impact
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {tips.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass p-6 rounded-2xl card-hover"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{category.category}</h3>
                <ul className="space-y-3">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-gray-300 text-sm flex items-start">
                      <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 relative z-30">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass p-12 rounded-2xl text-center"
          >
            <h2 className="text-3xl font-bold gradient-text mb-6">
              Global Calculator Statistics
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "75K+", label: "Calculations Made", icon: "🧮" },
                { number: "15K", label: "Tons CO₂ Tracked", icon: "🌍" },
                { number: "8K", label: "Tons Plastic Calculated", icon: "♻️" },
                { number: "120+", label: "Countries Using Tools", icon: "🌎" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            <p className="text-gray-300 mt-8 leading-relaxed">
              Join thousands of users worldwide who are taking action to understand
              and reduce their environmental impact.
            </p>
          </motion.div>
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
