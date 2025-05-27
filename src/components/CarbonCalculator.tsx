'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Chart from 'chart.js/auto'; // Import Chart.js

interface CarbonFootprintData {
  electricity: number;
  gas: number;
  car: number;
  flights: number;
  total: number;
}

export default function CarbonCalculator() {
  const [electricity, setElectricity] = useState<string>('')
  const [gas, setGas] = useState<string>('')
  const [car, setCar] = useState<string>('')
  const [flights, setFlights] = useState<string>('')
  const [resultData, setResultData] = useState<CarbonFootprintData | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [currentChartTypeIndex, setCurrentChartTypeIndex] = useState(0);

  const chartRef = useRef<HTMLCanvasElement>(null);
  const footprintChartInstance = useRef<Chart | null>(null);

  const chartTypes = ['doughnut', 'bar', 'line'];

  // Constants for calculation
  const CO2_PER_TREE_PER_YEAR_KG = 20;
  const GLOBAL_AVERAGE_CARBON_FOOTPRINT_KG = 4500; // Example average

  // Helper function to get CSS variables
  const getCssVariable = (variable: string) => {
    if (typeof window !== 'undefined') {
      const rootStyles = getComputedStyle(document.documentElement);
      return rootStyles.getPropertyValue(variable).trim();
    }
    return '';
  };

  const updateChart = useCallback((data: CarbonFootprintData, type: string) => {
    if (footprintChartInstance.current) {
      footprintChartInstance.current.destroy();
    }

    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    const textColor = getCssVariable('--text') || '#ffffff';
    const glassBgColor = getCssVariable('--glass-bg') || 'rgba(30,41,59,0.7)';
    const neonYellow = getCssVariable('--neon-blue') || '#38bdf8';      // Tailwind sky-400
    const neonGreen = getCssVariable('--neon-green') || '#4ade80';    // Tailwind green-400                      If you cant solve a bug make it a feature 
    const neonPurple = getCssVariable('--neon-purple') || '#a78bfa';  // Tailwind purple-400
    const neonBlue = getCssVariable('--neon-yellow') || '#fde68a';  // Tailwind yellow-300

    const chartData = {
      labels: ['Electricity', 'Natural Gas', 'Car Travel', 'Flights'],
      datasets: [{
        label: 'Carbon Emissions (kg CO2)',
        data: [data.electricity, data.gas, data.car, data.flights],
        backgroundColor: [
          neonBlue,
          neonGreen,
          neonPurple,
          neonYellow
        ],
        borderColor: [
          // Remove .replace, use full rgba values directly from CSS variables
          neonBlue,
          neonGreen,
          neonPurple,
          neonYellow
        ],
        borderWidth: 2,
        fill: type === 'line' ? true : false,
        tension: type === 'line' ? 0.4 : 0
      }]
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Carbon Emissions (kg CO2)',
            color: textColor
          },
          ticks: {
            color: textColor
          },
          grid: {
            color: document.body.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' // Dynamic grid color
          }
        },
        x: {
          ticks: {
            color: textColor
          },
          grid: {
            color: document.body.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' // Dynamic grid color
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom' as const,
          labels: {
            color: textColor
          }
        },
        title: {
          display: false,
        },
        tooltip: {
          backgroundColor: glassBgColor,
          titleColor: textColor,
          bodyColor: textColor,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true
        }
      }
    };

    footprintChartInstance.current = new Chart(ctx, {
      type: type as 'doughnut' | 'bar' | 'line',
      data: chartData,
      options: chartOptions,
    });
  }, []);

  const calculateCarbon = () => {
    const electricityNum = parseFloat(electricity) || 0;
    const gasNum = parseFloat(gas) || 0;
    const carNum = parseFloat(car) || 0;
    const flightsNum = parseFloat(flights) || 0;

    // Emission factors (example values, adapted from your HTML)
    // Electricity: 0.418 kg CO2 per kWh (monthly)
    // Natural Gas: 5.3 kg CO2 per therm (monthly)
    // Car: 0.404 kg CO2 per mile (monthly, assuming total monthly miles)
    // Flights: 500 kg CO2 per flight (per flight)
    
    // Convert monthly to annual for consistency in the result breakdown
    const electricityEmissions = electricityNum * 0.418 * 12; 
    const gasEmissions = gasNum * 5.3 * 12;
    const carEmissions = carNum * 0.404 * 12;
    const flightEmissions = flightsNum * 500; // This is already annual per flight

    const totalEmissions = electricityEmissions + gasEmissions + carEmissions + flightEmissions;

    const data: CarbonFootprintData = {
      electricity: electricityEmissions,
      gas: gasEmissions,
      car: carEmissions,
      flights: flightEmissions,
      total: totalEmissions
    };

    setResultData(data);
    setShowResult(true);
    setShowShareOptions(false); // Hide share options when recalculating
    
    // Update chart immediately after calculation
    updateChart(data, chartTypes[currentChartTypeIndex]);
  };

  const resetCalculator = () => {
    setElectricity('');
    setGas('');
    setCar('');
    setFlights('');
    setResultData(null);
    setShowResult(false);
    setShowShareOptions(false);
    if (footprintChartInstance.current) {
      footprintChartInstance.current.destroy();
      footprintChartInstance.current = null;
    }
  };

  const toggleChartType = () => {
    setCurrentChartTypeIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % chartTypes.length;
      if (resultData) {
        updateChart(resultData, chartTypes[nextIndex]);
      }
      return nextIndex;
    });
  };

  const showMessageBox = (title: string, message: string) => {
    const messageBox = document.createElement('div');
    messageBox.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${getCssVariable('--glass-bg')};
      backdrop-filter: blur(10px);
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      text-align: center;
      color: ${getCssVariable('--text')};
      font-family: 'Inter', sans-serif;
      border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    messageBox.innerHTML = `
      <h3 style="margin-top: 0; color: ${getCssVariable('--primary-dark')};">${title}</h3>
      <p>${message}</p>
      <button onclick="this.parentNode.remove()" style="margin-top: 15px; padding: 10px 20px; background: ${getCssVariable('--primary')}; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">OK</button>
    `;
    document.body.appendChild(messageBox);
  };

  const copyToClipboard = (type: 'carbon') => {
    if (!resultData) return;

    const totalEmissions = resultData.total.toFixed(2);
    const treesNeeded = Math.ceil(resultData.total / CO2_PER_TREE_PER_YEAR_KG);
    const comparedToAverage = ((resultData.total / GLOBAL_AVERAGE_CARBON_FOOTPRINT_KG) * 100).toFixed(0);

    let message = '';
    if (type === 'carbon') {
      message = `My annual carbon footprint is ${totalEmissions} kg CO2! I'd need ${treesNeeded} trees to offset it, and it's ${comparedToAverage}% of the global average. Let's make a change! 🌍🌱 #EcoTech #CarbonFootprint`;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(message)
        .then(() => {
          showMessageBox("Results Copied!", "Your carbon footprint summary has been copied to your clipboard. Now go share it!");
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
          showMessageBox("Copy Failed", "Could not copy to clipboard. Please copy the text manually:\n\n" + message);
        });
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = message;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showMessageBox("Results Copied!", "Your carbon footprint summary has been copied to your clipboard. Now go share it!");
      } catch (err) {
        console.error('Fallback: Failed to copy text: ', err);
        showMessageBox("Copy Failed", "Could not copy to clipboard. Please copy the text manually:\n\n" + message);
      }
      document.body.removeChild(textarea);
    }
  };

  const tips = [
    "Consider switching to renewable energy sources.",
    "Reduce your driving by walking, cycling, or using public transport.",
    "Insulate your home to reduce natural gas usage.",
    "Take fewer short-haul flights or choose train travel.",
    "Reduce your meat consumption.",
    "Support local and sustainable businesses.",
    "Plant trees and participate in local green initiatives.",
    "Recycle and compost more effectively.",
    "Unplug electronics when not in use to save phantom energy.",
    "Adjust your thermostat by a few degrees to save energy."
  ];
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  // Effect to handle chart re-render on theme change
  useEffect(() => {
    if (showResult && resultData) {
      updateChart(resultData, chartTypes[currentChartTypeIndex]);
    }
  }, [showResult, resultData, currentChartTypeIndex, updateChart]);

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
            <label htmlFor="electricity" className="block text-sm text-gray-400 mb-2">⚡ Monthly Electricity Usage (kWh)</label>
            <input
              type="number"
              id="electricity"
              value={electricity}
              onChange={(e) => setElectricity(e.target.value)}
              placeholder="e.g., 500"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="gas" className="block text-sm text-gray-400 mb-2">🔥 Monthly Natural Gas Usage (therms)</label>
            <input
              type="number"
              id="gas"
              value={gas}
              onChange={(e) => setGas(e.target.value)}
              placeholder="e.g., 50"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="car" className="block text-sm text-gray-400 mb-2">🚗 Monthly Car Mileage</label>
            <input
              type="number"
              id="car"
              value={car}
              onChange={(e) => setCar(e.target.value)}
              placeholder="e.g., 1000"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="flights" className="block text-sm text-gray-400 mb-2">✈️ Number of Flights per Year</label>
            <input
              type="number"
              id="flights"
              value={flights}
              onChange={(e) => setFlights(e.target.value)}
              placeholder="e.g., 2"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={calculateCarbon}
            className="btn-primary w-full py-3 rounded-lg font-semibold"
          >
            Calculate Carbon Footprint
          </button>
          <button
            onClick={resetCalculator}
            className="glass px-6 py-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300 w-full"
          >
            Clear Inputs
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
              {resultData?.total.toFixed(2)} kg CO₂
            </div>
            <p className="text-gray-300 text-sm mt-2">
              {resultData && resultData.total > 5000 ? 'Above average - consider reducing!' :
                resultData && resultData.total > 2000 ? 'Average footprint' :
                'Great! Below average footprint'}
            </p>
          </div>

          <div className="chart-title-container flex items-center justify-center gap-2 mb-4">
            <button id="toggleChartTypeBtn" onClick={toggleChartType} title="Switch Graphs" className="p-2 rounded-full bg-white/10 text-white text-xl hover:bg-white/20 transition-colors">📊</button>
            <h3 className="text-xl font-bold text-white">📈 Your Carbon Footprint Breakdown</h3>
          </div>
          <div className="bg-glass-bg backdrop-filter blur-10 rounded-lg shadow-inner border border-white border-opacity-10 p-4 mb-4" style={{ height: '300px' }}> {/* Added fixed height for chart */}
            <canvas id="footprintChart" ref={chartRef}></canvas>
          </div>

          <div id="combinedInfoAndTips" className="info-and-tips-container space-y-2 mb-4 text-left">
            <p className="text-gray-300">Your estimated annual carbon consumption is: <span className="font-semibold text-white">{resultData?.total.toFixed(2)} kg CO2 💨</span></p>
            <p className="text-gray-300">You can do this to save the earth: <span className="font-semibold text-white">{randomTip} 🌎</span></p>
          </div>

          <button
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="share-button mt-6 w-full py-3 bg-accent text-white font-bold rounded-lg shadow-lg hover:bg-primary-dark transition-all duration-300"
          >
            Share Your Footprint 📤
          </button>

          <AnimatePresence>
            {showShareOptions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="share-options mt-4 p-4 bg-glass-bg backdrop-filter blur-10 rounded-lg shadow-inner border border-white border-opacity-10 text-center overflow-hidden"
              >
                <p className="text-gray-300 mb-2">Choose how you want to share:</p>
                <button
                  onClick={() => copyToClipboard('carbon')}
                  className="inline-block px-4 py-2 bg-primary text-white rounded-md mr-2 hover:bg-primary-dark transition-colors duration-200"
                >
                  Copy Text 📋
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="impact-stats-container grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="stat-box bg-white/10 p-4 rounded-lg border border-white/20 flex flex-col items-center justify-center">
              <h3 className="text-white text-lg font-semibold">🌳 Trees Needed</h3>
              <div className="value text-4xl font-bold gradient-text py-2">
                {resultData ? Math.ceil(resultData.total / CO2_PER_TREE_PER_YEAR_KG) : 0}
              </div>
              <div className="description text-gray-400 text-sm">to offset your carbon footprint annually 🌱</div>
            </div>
            <div className="stat-box bg-white/10 p-4 rounded-lg border border-white/20 flex flex-col items-center justify-center">
              <h3 className="text-white text-lg font-semibold">⚖️ Compared to Average</h3>
              <div className="value text-4xl font-bold gradient-text py-2">
                {resultData ? ((resultData.total / GLOBAL_AVERAGE_CARBON_FOOTPRINT_KG) * 100).toFixed(0) : 0}%
              </div>
              <div className="description text-gray-400 text-sm">of global average 🌐</div>
            </div>
          </div>

          <button
            onClick={resetCalculator}
            className="glass mt-6 px-6 py-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
          >
            Calculate Again
          </button>
        </motion.div>
      )}
    </div>
  )
}