'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  className?: string
}

export default function LoadingSpinner({ className = '' }: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Outer ring */}
        <motion.div
          className="w-16 h-16 border-4 border-purple-500/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner ring */}
        <motion.div
          className="absolute top-1 left-1 w-14 h-14 border-4 border-blue-500/50 rounded-full border-t-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Center dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>

      <motion.p
        className="ml-4 text-gray-300 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Loading 3D Globe...
      </motion.p>
    </div>
  )
}
