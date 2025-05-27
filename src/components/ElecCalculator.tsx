'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const electricityTips = [
  "Switch to LED lighting throughout your home.",
  "Unplug electronics when not in use (phantom load).",
  "Use energy-efficient appliances (Energy Star rated).",
  "Optimize your thermostat settings for heating and cooling.",
  "Seal drafts around windows and doors.",
  "Insulate your home properly to reduce energy loss.",
  "Utilize natural light during the day.",
  "Wash clothes in cold water.",
  "Air dry clothes when possible.",
  "Regularly clean or replace HVAC filters.",
  "Explore smart home devices for energy management.",
  "Get a home energy audit to identify inefficiencies."
]

export default function ElecCalculator() {
  // Electricity Calculator State
  const [monthlyElecBill, setMonthlyElecBill] = useState('')
  const [elecCostPerKwh, setElecCostPerKwh] = useState('')
  const [peopleInHousehold, setPeopleInHousehold] = useState('')
  const [acHours, setAcHours] = useState('')
  const [fridgeCount, setFridgeCount] = useState('')
  const [washingMachineLoads, setWashingMachineLoads] = useState('')
  const [tvHours, setTvHours] = useState('')
  const [elecResult, setElecResult] = useState<null | {
    annualConsumption: number
    dailyConsumption: number
    totalCost: number
    carbonFootprint: number
    potentialSavings: number
    tip: string
  }>(null)
  const [showElecResult, setShowElecResult] = useState(false)
  const [copiedElec, setCopiedElec] = useState(false)

  // Constants
  const DEFAULT_ELEC_COST_PER_KWH = 8.0
  const DEFAULT_PEOPLE_IN_HOUSEHOLD = 1
  const AC_POWER_KW = 1.5 // Typical split AC
  const FRIDGE_POWER_KWH_PER_DAY = 1.2
  const WASHING_MACHINE_KWH_PER_LOAD = 0.5
  const TV_POWER_KW = 0.1
  const CARBON_INTENSITY_OF_ELECTRICITY_KG_CO2_PER_KWH = 0.8

  const calculateElecConsumption = () => {
    const bill = parseFloat(monthlyElecBill) || 0
    const costPerKwh = parseFloat(elecCostPerKwh) || DEFAULT_ELEC_COST_PER_KWH
    const people = parseInt(peopleInHousehold) || DEFAULT_PEOPLE_IN_HOUSEHOLD
    const acDailyHours = parseFloat(acHours) || 0
    const fridge = parseInt(fridgeCount) || 0
    const washingLoads = parseFloat(washingMachineLoads) || 0
    const tvDailyHours = parseFloat(tvHours) || 0

    if (
      bill < 0 ||
      costPerKwh <= 0 ||
      people <= 0 ||
      acDailyHours < 0 ||
      fridge < 0 ||
      washingLoads < 0 ||
      tvDailyHours < 0
    ) {
      alert("Please enter valid non-negative values. Electricity cost per kWh, and number of people must be greater than zero.")
      return
    }

    // Estimate daily consumption
    const acDailyKwh = acDailyHours * AC_POWER_KW
    const fridgeDailyKwh = fridge * FRIDGE_POWER_KWH_PER_DAY
    const washingMachineDailyKwh = (washingLoads * WASHING_MACHINE_KWH_PER_LOAD) / 7
    const tvDailyKwh = tvDailyHours * TV_POWER_KW * people

    const calculatedDailyConsumptionKwh =
      acDailyKwh +
      fridgeDailyKwh +
      washingMachineDailyKwh +
      tvDailyKwh

    const calculatedAnnualConsumptionKwh = calculatedDailyConsumptionKwh * 365

    let annualConsumptionKwh
    if (bill > 0 && costPerKwh > 0) {
      annualConsumptionKwh = (bill / costPerKwh) * 12
    } else {
      annualConsumptionKwh = calculatedAnnualConsumptionKwh
    }

    const dailyConsumptionKwh = annualConsumptionKwh / 365
    const estimatedAnnualCost = annualConsumptionKwh * costPerKwh
    const totalCarbonFootprint = annualConsumptionKwh * CARBON_INTENSITY_OF_ELECTRICITY_KG_CO2_PER_KWH
    const potentialAnnualSavings = estimatedAnnualCost * 0.10
    const tip = electricityTips[Math.floor(Math.random() * electricityTips.length)]

    setElecResult({
      annualConsumption: annualConsumptionKwh,
      dailyConsumption: dailyConsumptionKwh,
      totalCost: estimatedAnnualCost,
      carbonFootprint: totalCarbonFootprint,
      potentialSavings: potentialAnnualSavings,
      tip
    })
    setShowElecResult(true)
    setCopiedElec(false)
  }

  const resetElecCalculator = () => {
    setMonthlyElecBill('')
    setElecCostPerKwh('')
    setPeopleInHousehold('')
    setAcHours('')
    setFridgeCount('')
    setWashingMachineLoads('')
    setTvHours('')
    setElecResult(null)
    setShowElecResult(false)
    setCopiedElec(false)
  }

  const shareElecResults = () => {
    if (!elecResult) return
    const message = `My estimated annual electricity consumption is ${elecResult.annualConsumption.toFixed(2)} kWh, costing approximately ₹${elecResult.totalCost.toFixed(2)}. This results in a carbon footprint of ${elecResult.carbonFootprint.toFixed(2)} kg CO2e. I could save ₹${elecResult.potentialSavings.toFixed(2)} annually! ⚡ #EcoTech #EnergyConservation`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(message).then(() => setCopiedElec(true))
    }
  }

  return (
    <div className="glass p-8 rounded-2xl card-hover max-w-xl mx-auto">
      <div className="text-5xl mb-4">⚡</div>
      <h3 className="text-2xl font-bold text-white mb-4">Electricity Calculator</h3>
      <p className="text-gray-300 mb-6">
        Estimate your electricity consumption and find energy-saving tips.
      </p>

      {!showElecResult ? (
        <motion.div initial={{ opacity: 1 }} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Monthly Electricity Bill (₹)</label>
            <input
              type="number"
              value={monthlyElecBill}
              onChange={e => setMonthlyElecBill(e.target.value)}
              placeholder="e.g., 1500"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Electricity Cost per kWh (₹)</label>
            <input
              type="number"
              value={elecCostPerKwh}
              onChange={e => setElecCostPerKwh(e.target.value)}
              placeholder="e.g., 8.00"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">People in Household</label>
            <input
              type="number"
              value={peopleInHousehold}
              onChange={e => setPeopleInHousehold(e.target.value)}
              placeholder="e.g., 4"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">AC Usage (hours per day)</label>
            <input
              type="number"
              value={acHours}
              onChange={e => setAcHours(e.target.value)}
              placeholder="e.g., 4"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Number of Refrigerators</label>
            <input
              type="number"
              value={fridgeCount}
              onChange={e => setFridgeCount(e.target.value)}
              placeholder="e.g., 1"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Washing Machine Loads per Week</label>
            <input
              type="number"
              value={washingMachineLoads}
              onChange={e => setWashingMachineLoads(e.target.value)}
              placeholder="e.g., 3"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">TV Usage (hours per day)</label>
            <input
              type="number"
              value={tvHours}
              onChange={e => setTvHours(e.target.value)}
              placeholder="e.g., 2"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={calculateElecConsumption}
            className="btn-primary w-full py-3 rounded-lg font-semibold"
          >
            Calculate Electricity Usage
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-500/20 to-green-500/20 border border-blue-500/30 rounded-lg p-6 mb-4">
            <h4 className="text-xl font-bold text-white mb-2">Your Annual Electricity Usage</h4>
            <div className="text-4xl font-bold gradient-text">
              {elecResult?.annualConsumption.toFixed(2)} kWh
            </div>
            <p className="text-gray-300 text-sm mt-2">
              {elecResult && elecResult.annualConsumption > 10000 ? 'High usage - time to conserve!' :
                elecResult && elecResult.annualConsumption > 5000 ? 'Moderate usage' :
                  'Low usage - well done!'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
              <h5 className="font-semibold text-white mb-1">💸 Annual Cost</h5>
              <div className="text-lg font-bold">₹{elecResult?.totalCost.toFixed(2)}</div>
              <div className="text-xs text-gray-300">per year</div>
            </div>
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
              <h5 className="font-semibold text-white mb-1">🌍 Carbon Footprint</h5>
              <div className="text-lg font-bold">{elecResult?.carbonFootprint.toFixed(2)} kg CO₂e</div>
              <div className="text-xs text-gray-300">per year</div>
            </div>
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
              <h5 className="font-semibold text-white mb-1">💡 Potential Savings</h5>
              <div className="text-lg font-bold">₹{elecResult?.potentialSavings.toFixed(2)}</div>
              <div className="text-xs text-gray-300">if you reduce by 10%</div>
            </div>
            <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
              <h5 className="font-semibold text-white mb-1">⚡ Daily Usage</h5>
              <div className="text-lg font-bold">{elecResult?.dailyConsumption.toFixed(2)} kWh</div>
              <div className="text-xs text-gray-300">per day</div>
            </div>
          </div>

          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-4">
            <h5 className="font-semibold text-white mb-2">🌱 Energy Saving Tip:</h5>
            <div className="text-sm text-gray-300">{elecResult?.tip} ⚡</div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={resetElecCalculator}
              className="glass px-6 py-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
            >
              Calculate Again
            </button>
            <button
              onClick={shareElecResults}
              className="glass px-6 py-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
            >
              {copiedElec ? "Copied to clipboard!" : "Share Your Results"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
