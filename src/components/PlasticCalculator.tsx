'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const tips = [
  "Carry a reusable water bottle and coffee cup.",
  "Always use reusable shopping bags.",
  "Choose products with minimal or no plastic packaging, especially fresh produce.",
  "Say no to plastic straws, cutlery, and takeout containers; bring your own reusable set.",
  "Support businesses that prioritize plastic reduction and sustainable packaging.",
  "Participate in local beach or park clean-up drives.",
  "Recycle plastic properly in your area, understanding local guidelines.",
  "Avoid single-use plastics wherever possible, including disposable razors and pens.",
  "Buy in bulk to reduce packaging waste.",
  "Consider making your own cleaning products to avoid plastic bottles.",
  "Repair items instead of replacing them, especially electronics and toys.",
  "Educate others on the importance of reducing plastic waste."
]

export default function PlasticCalculator() {
  const [bottles, setBottles] = useState('')
  const [bags, setBags] = useState('')
  const [packaging, setPackaging] = useState('')
  const [straws, setStraws] = useState('')
  const [cutlery, setCutlery] = useState('')
  const [containers, setContainers] = useState('')
  const [toys, setToys] = useState('')
  const [result, setResult] = useState<null | {
    total: number
    oceanImpact: number
    bagsSaved: number
    microplastics: string
    recyclingRate: string
    breakdown: Record<string, number>
    tip: string
  }>(null)
  const [showResult, setShowResult] = useState(false)
  const [copied, setCopied] = useState(false)

  const calculatePlastic = () => {
    const bottlesNum = parseFloat(bottles) || 0
    const bagsNum = parseFloat(bags) || 0
    const packagingNum = parseFloat(packaging) || 0
    const strawsNum = parseFloat(straws) || 0
    const cutleryNum = parseFloat(cutlery) || 0
    const containersNum = parseFloat(containers) || 0
    const toysNum = parseFloat(toys) || 0

    if (
      bottlesNum < 0 || bagsNum < 0 || packagingNum < 0 ||
      strawsNum < 0 || cutleryNum < 0 || containersNum < 0 || toysNum < 0
    ) {
      alert('Please enter non-negative values for plastic consumption.')
      return
    }

    // Calculation logic from HTML
    const bottlesPerYear = bottlesNum * 52 * 0.02
    const bagsPerYear = bagsNum * 52 * 0.005
    const packagingPerYear = packagingNum * 12 / 1000
    const strawsPerYear = strawsNum * 365 * 0.002
    const cutleryPerYear = cutleryNum * 52 * 0.005
    const containersPerYear = containersNum * 52 * 0.03
    const toysPerYear = toysNum * 12 / 1000

    const totalPlasticWasteKg =
      bottlesPerYear +
      bagsPerYear +
      packagingPerYear +
      strawsPerYear +
      cutleryPerYear +
      containersPerYear +
      toysPerYear

    const KG_PER_STANDARD_BOTTLE = 0.02
    const oceanImpactBottles = Math.ceil(totalPlasticWasteKg / KG_PER_STANDARD_BOTTLE)

    const averageBagsPerYear = 300
    const currentBagsPerYear = bagsNum * 52
    const bagsSaved = Math.max(0, averageBagsPerYear - currentBagsPerYear)

    const MICROPLASTIC_CONVERSION_FACTOR = 0.005
    const microplasticsGeneratedGrams = (totalPlasticWasteKg * 1000 * MICROPLASTIC_CONVERSION_FACTOR).toFixed(2)

    const simulatedRecyclingRate = (Math.random() * 20 + 20).toFixed(0)

    const tip = tips[Math.floor(Math.random() * tips.length)]

    setResult({
      total: totalPlasticWasteKg,
      oceanImpact: oceanImpactBottles,
      bagsSaved,
      microplastics: microplasticsGeneratedGrams,
      recyclingRate: `${simulatedRecyclingRate}%`,
      breakdown: {
        bottles: bottlesPerYear,
        bags: bagsPerYear,
        packaging: packagingPerYear,
        straws: strawsPerYear,
        cutlery: cutleryPerYear,
        containers: containersPerYear,
        toys: toysPerYear
      },
      tip
    })
    setShowResult(true)
    setCopied(false)
  }

  const resetCalculator = () => {
    setBottles('')
    setBags('')
    setPackaging('')
    setStraws('')
    setCutlery('')
    setContainers('')
    setToys('')
    setResult(null)
    setShowResult(false)
    setCopied(false)
  }

  const shareResults = () => {
    if (!result) return
    const message = `My estimated annual plastic waste is ${result.total.toFixed(2)} kg, which is equivalent to ${result.oceanImpact} plastic bottles in the ocean! Let's reduce our plastic footprint together. #EcoTech #PlasticWaste`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(message).then(() => setCopied(true))
    }
  }

  return (
    <div className="glass p-8 rounded-2xl card-hover max-w-xl mx-auto">
      <div className="text-5xl mb-4">🗑️</div>
      <h3 className="text-2xl font-bold text-white mb-4">Plastic Calculator</h3>
      <p className="text-gray-300 mb-6">
        Estimate your plastic consumption and find eco-friendly alternatives.
      </p>

      {!showResult ? (
        <motion.div initial={{ opacity: 1 }} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Plastic bottles per week</label>
            <input
              type="number"
              value={bottles}
              onChange={e => setBottles(e.target.value)}
              placeholder="Enter bottles used weekly"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Plastic bags per week</label>
            <input
              type="number"
              value={bags}
              onChange={e => setBags(e.target.value)}
              placeholder="Enter bags used weekly"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Plastic packaging per month (grams)</label>
            <input
              type="number"
              value={packaging}
              onChange={e => setPackaging(e.target.value)}
              placeholder="e.g., 200"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Plastic straws per day</label>
            <input
              type="number"
              value={straws}
              onChange={e => setStraws(e.target.value)}
              placeholder="e.g., 1"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Plastic cutlery per week</label>
            <input
              type="number"
              value={cutlery}
              onChange={e => setCutlery(e.target.value)}
              placeholder="e.g., 3"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Plastic takeout containers per week</label>
            <input
              type="number"
              value={containers}
              onChange={e => setContainers(e.target.value)}
              placeholder="e.g., 2"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Other plastic items per month (grams)</label>
            <input
              type="number"
              value={toys}
              onChange={e => setToys(e.target.value)}
              placeholder="e.g., 100"
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
              {result?.total.toFixed(2)} kg
            </div>
            <p className="text-gray-300 text-sm mt-2">
              {result && result.total > 20 ? 'High usage - time to reduce!' :
                result && result.total > 10 ? 'Moderate usage' :
                  'Low usage - well done!'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
              <h5 className="font-semibold text-white mb-1">🐠 Ocean Impact</h5>
              <div className="text-lg font-bold">{result?.oceanImpact}</div>
              <div className="text-xs text-gray-300">plastic bottles in the ocean</div>
            </div>
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
              <h5 className="font-semibold text-white mb-1">♻️ Bags Saved</h5>
              <div className="text-lg font-bold">{result?.bagsSaved}</div>
              <div className="text-xs text-gray-300">per year</div>
            </div>
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
              <h5 className="font-semibold text-white mb-1">🔬 Microplastics</h5>
              <div className="text-lg font-bold">{result?.microplastics} g</div>
              <div className="text-xs text-gray-300">grams/year</div>
            </div>
            <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
              <h5 className="font-semibold text-white mb-1">🔄 Recycling Rate</h5>
              <div className="text-lg font-bold">{result?.recyclingRate}</div>
              <div className="text-xs text-gray-300">simulated</div>
            </div>
          </div>

          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-4">
            <h5 className="font-semibold text-white mb-2">🌱 Eco-Friendly Tip:</h5>
            <div className="text-sm text-gray-300">{result?.tip} 🌊</div>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-lg p-4 mb-4">
            <h5 className="font-semibold text-white mb-2">📊 Breakdown (kg/year):</h5>
            <ul className="text-sm text-gray-300 space-y-1 text-left">
              <li>• Bottles: {result?.breakdown.bottles.toFixed(2)}</li>
              <li>• Bags: {result?.breakdown.bags.toFixed(2)}</li>
              <li>• Packaging: {result?.breakdown.packaging.toFixed(2)}</li>
              <li>• Straws: {result?.breakdown.straws.toFixed(2)}</li>
              <li>• Cutlery: {result?.breakdown.cutlery.toFixed(2)}</li>
              <li>• Containers: {result?.breakdown.containers.toFixed(2)}</li>
              <li>• Other Items: {result?.breakdown.toys.toFixed(2)}</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={resetCalculator}
              className="glass px-6 py-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
            >
              Calculate Again
            </button>
            <button
              onClick={shareResults}
              className="glass px-6 py-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
            >
              {copied ? "Copied to clipboard!" : "Share Your Results"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
