'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function CarbonCalculator() {
  const [miles, setMiles] = useState('')
  const [electricity, setElectricity] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const calculateCarbon = () => {
    const milesNum = parseFloat(miles) || 0
    const electricityNum = parseFloat(electricity) || 0

    // Simple carbon footprint calculation
    // Car: ~0.4 kg CO2 per mile
    // Electricity: ~0.5 kg CO2 per kWh
    const carCarbon = milesNum * 0.4 * 52 // Weekly to annual
    const electricityCarbon = electricityNum * 0.5 * 12 // Monthly to annual
    const totalCarbon = carCarbon + electricityCarbon

    setResult(totalCarbon)
    setShowResult(true)
  }

  const resetCalculator = () => {
    setMiles('')
    setElectricity('')
    setResult(null)
    setShowResult(false)
  }

  return (
    <div className="glass p-8 rounded-2xl card-hover">
      <div className="text-5xl mb-4">🧮</div>
      <h3 className="text-2xl font-bold text-white mb-4">Carbon Calculator</h3>
      <p className="text-gray-300 mb-6">
        Calculate your carbon footprint and discover ways to reduce your environmental impact.
      </p>

      {!showResult ? (
        <motion.div
          initial={{ opacity: 1 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm text-gray-400 mb-2">Miles driven per week</label>
            <input
              type="number"
              value={miles}
              onChange={(e) => setMiles(e.target.value)}
              placeholder="Enter miles driven weekly"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">KWh electricity per month</label>
            <input
              type="number"
              value={electricity}
              onChange={(e) => setElectricity(e.target.value)}
              placeholder="Enter monthly electricity usage"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={calculateCarbon}
            className="btn-primary w-full py-3 rounded-lg font-semibold"
          >
            Calculate Carbon Footprint
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-lg p-6 mb-4">
            <h4 className="text-xl font-bold text-white mb-2">Your Annual Carbon Footprint</h4>
            <div className="text-4xl font-bold gradient-text">
              {result?.toFixed(1)} kg CO₂
            </div>
            <p className="text-gray-300 text-sm mt-2">
              {result && result > 5000 ? 'Above average - consider reducing!' :
               result && result > 2000 ? 'Average footprint' :
               'Great! Below average footprint'}
            </p>
          </div>

          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-4">
            <h5 className="font-semibold text-white mb-2">💡 Suggestions to Reduce:</h5>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Use public transportation or bike more</li>
              <li>• Switch to renewable energy sources</li>
              <li>• Improve home energy efficiency</li>
              <li>• Consider an electric vehicle</li>
            </ul>
          </div>

          <button
            onClick={resetCalculator}
            className="glass px-6 py-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
          >
            Calculate Again
          </button>
        </motion.div>
      )}
    </div>
  )
}
