'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import ParticleBackground from '@/components/ParticleBackground'

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  const values = [
    {
      title: "Sustainability First",
      description: "Every decision we make considers environmental impact",
      icon: "🌱"
    },
    {
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge green technology",
      icon: "💡"
    },
    {
      title: "Community",
      description: "Building together for a better tomorrow",
      icon: "🤝"
    },
    {
      title: "Transparency",
      description: "Open about our methods and environmental impact",
      icon: "🔍"
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
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
              About EcoTech
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We believe that technology should serve both people and the planet.
              EcoTech is a platform where sustainable innovation meets impactful action.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 relative z-30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission 🚀</h2>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                  <span className="text-gray-300">Promote green technologies and sustainable innovation ✅</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                  <span className="text-gray-300">Encourage eco-conscious tech projects and startups 💡</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                  <span className="text-gray-300">Provide educational resources for environmental coding 📚</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                  <span className="text-gray-300">Build tools that make environmental monitoring accessible 🔧</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass p-8 rounded-2xl card-hover"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Community Collaboration 🤝</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We value and welcome your thoughts and beliefs. Whether you're a teacher, a student, or a visitor,
                we encourage you to share your ideas and concerns about our environment.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Your voice matters — help us grow, inspire change, and build a more conscious and
                responsible future together.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 relative z-30">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold gradient-text mb-6">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass p-6 rounded-2xl card-hover group text-center"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Quote Section */}
      <section className="py-16 relative z-30">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass p-8 rounded-2xl text-center"
          >
            <p className="text-2xl text-gray-300 italic leading-relaxed mb-4">
              "If you wish to know the divine, feel the wind on your face and the warm sun on your hand."
            </p>
            <p className="text-gray-400">- Buddha</p>
            <p className="text-gray-300 mt-6 leading-relaxed">
              Knights House embodies this spirit — it is more than just a school house; it is a way of life.
              It instills a sense of responsibility, integrity, and purpose that goes beyond institutional boundaries,
              nurturing individuals to serve and lead with humility and strength in every walk of life.
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
