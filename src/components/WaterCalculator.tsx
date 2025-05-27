'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const waterTips = [
    "Take shorter showers.",
    "Turn off the tap while brushing teeth or washing dishes.",
    "Fix leaky faucets and running toilets promptly.",
    "Only run washing machines and dishwashers with full loads.",
    "Install low-flow showerheads and aerators on faucets.",
    "Collect rainwater for garden use.",
    "Water your garden in the early morning or late evening to reduce evaporation.",
    "Consider a dual-flush toilet.",
    "Don't use the toilet as a wastebasket.",
    "Thaw frozen food in the refrigerator instead of under running water."
]

export default function WaterCalculator() {
  // Water Calculator State
  const [monthlyWaterBill, setMonthlyWaterBill] = useState('')
  const [waterCostPerLiter, setWaterCostPerLiter] = useState('')
  const [peopleInHousehold, setPeopleInHousehold] = useState('')
  const [dailyShowers, setDailyShowers] = useState('')
  const [showerDuration, setShowerDuration] = useState('')
  const [washingMachineLoads, setWashingMachineLoads] = useState('')
  const [dishwasherLoads, setDishwasherLoads] = useState('')
  const [gardenWateringHours, setGardenWateringHours] = useState('')
  const [waterResult, setWaterResult] = useState<null | {
      annualConsumption: number
      dailyConsumption: number
      totalCost: number
      carbonFootprint: number
      potentialSavings: number
      tip: string
  }>(null)
  const [showWaterResult, setShowWaterResult] = useState(false)
  const [copiedWater, setCopiedWater] = useState(false)

  // Water Calculator Constants
  const DEFAULT_WATER_COST_PER_LITER = 0.05
  const DEFAULT_PEOPLE_IN_HOUSEHOLD = 1
  const DEFAULT_SHOWER_FLOW_RATE = 9.5
  const DEFAULT_WASHING_MACHINE_LOAD_VOLUME = 60
  const DEFAULT_DISHWASHER_LOAD_VOLUME = 12
  const DEFAULT_GARDEN_WATERING_FLOW_RATE = 750
  const ENERGY_TO_HEAT_WATER_PER_LITER_KWH = 0.035
  const CARBON_INTENSITY_OF_ELECTRICITY_KG_CO2_PER_KWH = 0.8
  const CARBON_FROM_WATER_TREATMENT_PER_LITER_KG_CO2 = 0.00003
  const PERCENT_WATER_HEATED = 0.5

  const calculateWaterConsumption = () => {
      const bill = parseFloat(monthlyWaterBill) || 0
      const costPerLiter = parseFloat(waterCostPerLiter) || DEFAULT_WATER_COST_PER_LITER
      const people = parseInt(peopleInHousehold) || DEFAULT_PEOPLE_IN_HOUSEHOLD
      const showers = parseFloat(dailyShowers) || 0
      const showerMins = parseFloat(showerDuration) || 0
      const washingLoads = parseFloat(washingMachineLoads) || 0
      const dishLoads = parseFloat(dishwasherLoads) || 0
      const gardenHours = parseFloat(gardenWateringHours) || 0

      if (
          bill < 0 ||
          costPerLiter <= 0 ||
          people <= 0 ||
          showers < 0 ||
          showerMins < 0 ||
          washingLoads < 0 ||
          dishLoads < 0 ||
          gardenHours < 0
      ) {
          alert("Please enter valid non-negative values. Water cost per liter, and number of people must be greater than zero.")
          return
      }

      const showersDailyLiters = showers * showerMins * DEFAULT_SHOWER_FLOW_RATE * people
      const washingMachineDailyLiters = (washingLoads * DEFAULT_WASHING_MACHINE_LOAD_VOLUME) / 7
      const dishwasherDailyLiters = (dishLoads * DEFAULT_DISHWASHER_LOAD_VOLUME) / 7
      const gardenWateringDailyLiters = (gardenHours * DEFAULT_GARDEN_WATERING_FLOW_RATE) / 7

      const calculatedDailyConsumptionLiters =
          showersDailyLiters +
          washingMachineDailyLiters +
          dishwasherDailyLiters +
          gardenWateringDailyLiters

      const calculatedAnnualConsumptionLiters = calculatedDailyConsumptionLiters * 365

      let annualConsumptionLiters
      if (bill > 0 && costPerLiter > 0) {
          annualConsumptionLiters = (bill / costPerLiter) * 12
      } else {
          annualConsumptionLiters = calculatedAnnualConsumptionLiters
      }

      const dailyConsumptionLiters = annualConsumptionLiters / 365
      const estimatedAnnualCost = annualConsumptionLiters * costPerLiter

      const heatedWaterUsageLiters =
          (showersDailyLiters + washingMachineDailyLiters + dishwasherDailyLiters) * PERCENT_WATER_HEATED
      const annualHeatedWaterUsageLiters = heatedWaterUsageLiters * 365

      const energyForHeatingKWH = annualHeatedWaterUsageLiters * ENERGY_TO_HEAT_WATER_PER_LITER_KWH
      const carbonFromHeating = energyForHeatingKWH * CARBON_INTENSITY_OF_ELECTRICITY_KG_CO2_PER_KWH
      const carbonFromTreatment = annualConsumptionLiters * CARBON_FROM_WATER_TREATMENT_PER_LITER_KG_CO2
      const totalCarbonFootprint = carbonFromHeating + carbonFromTreatment

      const potentialAnnualSavings = estimatedAnnualCost * 0.10

      const tip = waterTips[Math.floor(Math.random() * waterTips.length)]

      setWaterResult({
          annualConsumption: annualConsumptionLiters,
          dailyConsumption: dailyConsumptionLiters,
          totalCost: estimatedAnnualCost,
          carbonFootprint: totalCarbonFootprint,
          potentialSavings: potentialAnnualSavings,
          tip
      })
      setShowWaterResult(true)
      setCopiedWater(false)
  }

  const resetWaterCalculator = () => {
      setMonthlyWaterBill('')
      setWaterCostPerLiter('')
      setPeopleInHousehold('')
      setDailyShowers('')
      setShowerDuration('')
      setWashingMachineLoads('')
      setDishwasherLoads('')
      setGardenWateringHours('')
      setWaterResult(null)
      setShowWaterResult(false)
      setCopiedWater(false)
  }

  const shareWaterResults = () => {
      if (!waterResult) return
      const message = `My estimated annual water consumption is ${waterResult.annualConsumption.toFixed(2)} Liters, costing approximately ₹${waterResult.totalCost.toFixed(2)}. This results in a carbon footprint of ${waterResult.carbonFootprint.toFixed(2)} kg CO2e. I could save ₹${waterResult.potentialSavings.toFixed(2)} annually! 💧 #EcoTech #WaterConservation`
      if (navigator.clipboard) {
          navigator.clipboard.writeText(message).then(() => setCopiedWater(true))
      }
  }

  return (
    <div className="glass p-8 rounded-2xl card-hover max-w-xl mx-auto">
      <div className="text-5xl mb-4">💧</div>
      <h3 className="text-2xl font-bold text-white mb-4">Water Calculator</h3>
      <p className="text-gray-300 mb-6">
        Estimate your water consumption and find eco-friendly tips.
      </p>

      {!showWaterResult ? (
        <motion.div initial={{ opacity: 1 }} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Monthly Water Bill (₹)</label>
            <input
              type="number"
              value={monthlyWaterBill}
              onChange={e => setMonthlyWaterBill(e.target.value)}
              placeholder="e.g., 500"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Water Cost per Liter (₹)</label>
            <input
              type="number"
              value={waterCostPerLiter}
              onChange={e => setWaterCostPerLiter(e.target.value)}
              placeholder="e.g., 0.05"
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
            <label className="block text-sm text-gray-400 mb-2">Showers per Day</label>
            <input
              type="number"
              value={dailyShowers}
              onChange={e => setDailyShowers(e.target.value)}
              placeholder="e.g., 2"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Shower Duration (minutes)</label>
            <input
              type="number"
              value={showerDuration}
              onChange={e => setShowerDuration(e.target.value)}
              placeholder="e.g., 5"
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
            <label className="block text-sm text-gray-400 mb-2">Dishwasher Loads per Week</label>
            <input
              type="number"
              value={dishwasherLoads}
              onChange={e => setDishwasherLoads(e.target.value)}
              placeholder="e.g., 4"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Garden Watering (hours per week)</label>
            <input
              type="number"
              value={gardenWateringHours}
              onChange={e => setGardenWateringHours(e.target.value)}
              placeholder="e.g., 1"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={calculateWaterConsumption}
            className="btn-primary w-full py-3 rounded-lg font-semibold"
          >
            Calculate Water Usage
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
            <h4 className="text-xl font-bold text-white mb-2">Your Annual Water Usage</h4>
            <div className="text-4xl font-bold gradient-text">
              {waterResult?.annualConsumption.toFixed(2)} Liters
            </div>
            <p className="text-gray-300 text-sm mt-2">
              {waterResult && waterResult.annualConsumption > 100000 ? 'High usage - time to conserve!' :
                waterResult && waterResult.annualConsumption > 50000 ? 'Moderate usage' :
                  'Low usage - well done!'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
              <h5 className="font-semibold text-white mb-1">💸 Annual Cost</h5>
              <div className="text-lg font-bold">₹{waterResult?.totalCost.toFixed(2)}</div>
              <div className="text-xs text-gray-300">per year</div>
            </div>
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
              <h5 className="font-semibold text-white mb-1">🌍 Carbon Footprint</h5>
              <div className="text-lg font-bold">{waterResult?.carbonFootprint.toFixed(2)} kg CO₂e</div>
              <div className="text-xs text-gray-300">per year</div>
            </div>
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
              <h5 className="font-semibold text-white mb-1">💡 Potential Savings</h5>
              <div className="text-lg font-bold">₹{waterResult?.potentialSavings.toFixed(2)}</div>
              <div className="text-xs text-gray-300">if you reduce by 10%</div>
            </div>
            <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
              <h5 className="font-semibold text-white mb-1">🚿 Daily Usage</h5>
              <div className="text-lg font-bold">{waterResult?.dailyConsumption.toFixed(2)} L</div>
              <div className="text-xs text-gray-300">per day</div>
            </div>
          </div>

          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-4">
            <h5 className="font-semibold text-white mb-2">🌱 Eco-Friendly Tip:</h5>
            <div className="text-sm text-gray-300">{waterResult?.tip} 💧</div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={resetWaterCalculator}
              className="glass px-6 py-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
            >
              Calculate Again
            </button>
            <button
              onClick={shareWaterResults}
              className="glass px-6 py-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
            >
              {copiedWater ? "Copied to clipboard!" : "Share Your Results"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
