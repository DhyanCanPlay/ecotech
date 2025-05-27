"use client";
import { motion } from 'framer-motion'

export default function EcoClickerDesign() {
  // Upgrades array for display only
  const upgrades = [
    {
      title: 'Plant Forests',
      desc: 'Transform barren lands into lush green forests.',
      icon: '🌲',
      max: true,
    },
    {
      title: 'Ocean Cleanup',
      desc: 'Clean up plastic and pollution from the oceans.',
      icon: '🌊',
      max: true,
    },
    {
      title: 'Install Solar Panels',
      desc: "Harness the sun's energy for a sustainable future.",
      icon: '🔆',
      max: false,
    },
    {
      title: 'Build Wind Turbines',
      desc: 'Generate clean energy with powerful wind turbines.',
      icon: '💨',
      max: false,
    },
    {
      title: 'Idle Plant Gain',
      desc: 'Automatically generate plants over time.',
      icon: '⏱️',
      max: false,
    },
    {
      title: 'Eco-City Development',
      desc: 'Build a sustainable city powered by green energy.',
      icon: '🏙️',
      max: false,
    },
    {
      title: 'Wildlife Sanctuary',
      desc: 'Create safe havens for endangered species.',
      icon: '🦜',
      max: false,
    },
  ]

  return (
    <section className="relative z-30 py-20 bg-transparent">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-3xl md:text-4xl font-bold gradient-text mb-10"
        >
          Eco Clicker Game 🌿
        </motion.h2>

        <div className="glass p-6 rounded-xl mb-10">
          <div className="flex items-center justify-center mb-4">
            <span className="text-6xl">🌍</span>
          </div>
          <p className="text-white text-lg">
            Plants: <span className="text-green-400 font-bold">--</span> 🌱 | Water:{' '}
            <span className="text-blue-400 font-bold">--</span> 💧
          </p>
          <p className="text-gray-300 text-md mt-2">
            Planet Score: <span className="text-cyan-300 font-semibold">--</span> / 10000 🌐
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="grid md:grid-cols-2 gap-6"
        >
          {upgrades.map((item, i) => (
            <div key={i} className="glass p-5 rounded-xl text-left card-hover">
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="text-white font-bold text-lg">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
              <button
                disabled
                className={`mt-4 px-4 py-2 rounded-lg font-semibold text-white w-full text-center ${
                  item.max
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                {item.max
                  ? 'Max Level!'
                  : 'Buy'}
              </button>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
