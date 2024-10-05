
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

const CreativeHero: React.FC = () => {
  return (
    <header className="relative bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden py-12 sm:py-20 px-4 sm:px-6 lg:px-8 mt-20">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M0,0 C30,50 70,50 100,0 L100,100 L0,100 Z"
            fill="rgba(59, 130, 246, 0.1)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Effortless Publishing
            <span className="block text-blue-600">Powered by AI</span>
          </motion.h1>
          <motion.p
            className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Revolutionize your blogging experience with AI-assisted content creation, 
            smart SEO optimization, and seamless team collaboration.
          </motion.p>
          <motion.div
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto">
              Start Writing for Free
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto">
              Schedule a Demo
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 sm:mt-20 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="relative w-full max-w-4xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-3 sm:rounded-3xl"></div>
            <div className="relative bg-white shadow-lg sm:rounded-3xl p-4 sm:p-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="h-40 sm:h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm sm:text-base">
                [Your App Screenshot or Demo GIF]
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 sm:mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-gray-600 mb-4 text-sm sm:text-base">Trusted by innovative teams worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
            {['Google', 'Microsoft', 'Amazon', 'Facebook', 'Apple'].map((company) => (
              <div key={company} className="text-gray-400 font-semibold text-sm sm:text-base">
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  )
}

export default CreativeHero