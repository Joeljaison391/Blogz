
import React from 'react'
import { motion } from 'framer-motion'
import { FaEdit, FaShareAlt, FaChartLine, FaRobot, FaSearch, FaUsers } from 'react-icons/fa'

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    className="bg-white p-8 rounded-lg shadow-lg text-center relative overflow-hidden"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <motion.div
      className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-bl-full"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: delay + 0.2 }}
    />
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Icon className="text-blue-500 text-5xl mx-auto relative z-10" />
    </motion.div>
    <h3 className="mt-4 text-xl font-bold text-gray-800">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </motion.div>
)

const EnhancedFeatures = () => {
  const features = [
    {
      icon: FaEdit,
      title: "AI-Powered Content Creation",
      description: "Leverage advanced AI to generate high-quality content and overcome writer's block."
    },
    {
      icon: FaShareAlt,
      title: "Multi-Platform Publishing",
      description: "Publish your content across various platforms with just one click."
    },
    {
      icon: FaChartLine,
      title: "Advanced Analytics",
      description: "Gain deep insights into your audience engagement and content performance."
    },
    {
      icon: FaRobot,
      title: "Automated Content Optimization",
      description: "Let AI optimize your content for maximum reach and engagement."
    },
    {
      icon: FaSearch,
      title: "SEO Wizard",
      description: "Boost your search engine rankings with our intelligent SEO recommendations."
    },
    {
      icon: FaUsers,
      title: "Collaborative Workspace",
      description: "Work seamlessly with your team in real-time, from anywhere in the world."
    }
  ]

  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold text-gray-800 text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Powerful Features
        </motion.h2>
        <motion.p
          className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Unlock your content's full potential with our cutting-edge tools and AI-powered features.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={0.1 * index} />
          ))}
        </div>
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition duration-300"
            >
              Explore All Features
            </a>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </motion.div>
    </section>
  )
}

export default EnhancedFeatures