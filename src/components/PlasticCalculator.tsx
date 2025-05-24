'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function PlasticCalculator() {
  const [bottles, setBottles] = useState('')
  const [bags, setBags] = useState('')
  const [result, setResult] = useState<{ total: number; suggestions: string[] } | null>(null)
  const [showResult, setShowResult] = useState(false)

  const calculatePlastic = () => {
    const bottlesNum = parseFloat(bottles) || 0
    const bagsNum = parseFloat(bags) || 0

    // Plastic weight estimates (grams)
    const bottleWeight = 25 // average plastic bottle
    const bagWeight = 5 // average plastic bag

    const totalWeekly = (bottlesNum * bottleWeight) + (bagsNum * bagWeight)
    const totalAnnual = totalWeekly * 52 / 1000 // Convert to kg

    const suggestions = []
    if (bottlesNum > 5) {
      suggestions.push('Use a reusable water bottle')
    }
    if (bagsNum > 10) {
      suggestions.push('Bring reusable shopping bags')
    }
    if (totalAnnual > 10) {
      suggestions.push('Look for plastic-free alternatives')
      suggestions.push('Choose products with minimal packaging')
    }
    if (suggestions.length === 0) {
      suggestions.push('Great job! Keep up the low plastic usage')
    }

    setResult({ total: totalAnnual, suggestions })
    setShowResult(true)
  }

  const resetCalculator = () => {
    setBottles('')
    setBags('')
    setResult(null)
    setShowResult(false)
  }

  return (
    <div className="glass p-8 rounded-2xl card-hover">
      <div className="text-5xl mb-4">🗑️</div>
      <h3 className="text-2xl font-bold text-white mb-4">Plastic Calculator</h3>
      <p className="text-gray-300 mb-6">
        Estimate your plastic consumption and find eco-friendly alternatives.
      </p>

      {!showResult ? (
        <motion.div
          initial={{ opacity: 1 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm text-gray-400 mb-2">Plastic bottles per week</label>
            <input
              type="number"
              value={bottles}
              onChange={(e) => setBottles(e.target.value)}
              placeholder="Enter bottles used weekly"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Plastic bags per week</label>
            <input
              type="number"
              value={bags}
              onChange={(e) => setBags(e.target.value)}
              placeholder="Enter bags used weekly"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            onClick={calculatePlastic}
            className="btn-primary w-full py-3 rounded-lg font-semibold"
          >
            Calculate Plastic Usage
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-6 mb-4">
            <h4 className="text-xl font-bold text-white mb-2">Your Annual Plastic Usage</h4>
            <div className="text-4xl font-bold gradient-text">
              {result?.total.toFixed(1)} kg
            </div>
            <p className="text-gray-300 text-sm mt-2">
              {result && result.total > 20 ? 'High usage - time to reduce!' :
               result && result.total > 10 ? 'Moderate usage' :
               'Low usage - well done!'}
            </p>
          </div>

          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-4">
            <h5 className="font-semibold text-white mb-2">🌱 Eco-Friendly Tips:</h5>
            <ul className="text-sm text-gray-300 space-y-1">
              {result?.suggestions.map((suggestion, index) => (
                <li key={index}>• {suggestion}</li>
              ))}
              <li>• Choose glass or metal containers</li>
              <li>• Support plastic-free brands</li>
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
