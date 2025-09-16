'use client'

import { motion } from 'framer-motion'
import { WeatherData } from '@/types/weather'
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge,
  Sun,
  CloudRain,
  Zap
} from 'lucide-react'

interface WeatherStatsProps {
  data: WeatherData
}

const WeatherStats = ({ data }: WeatherStatsProps) => {
  const stats = [
    {
      icon: Thermometer,
      label: '體感溫度',
      value: `${data.feelsLike}°C`,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      icon: Droplets,
      label: '濕度',
      value: `${data.humidity}%`,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Wind,
      label: '風速',
      value: `${data.windSpeed} km/h`,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: Gauge,
      label: '氣壓',
      value: `${data.pressure} hPa`,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Eye,
      label: '能見度',
      value: `${data.visibility} km`,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
    },
    {
      icon: Sun,
      label: 'UV指數',
      value: data.uvIndex > 0 ? `${data.uvIndex}` : 'N/A',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
  ]

  const getWeatherCondition = () => {
    const temp = data.temperature
    const humidity = data.humidity
    const windSpeed = data.windSpeed

    if (temp > 30 && humidity > 70) {
      return {
        icon: CloudRain,
        condition: '悶熱潮濕',
        description: '高溫高濕，建議多補充水分',
        color: 'text-orange-500',
        bgColor: 'bg-orange-50',
      }
    } else if (temp < 10) {
      return {
        icon: Thermometer,
        condition: '寒冷',
        description: '氣溫較低，注意保暖',
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
      }
    } else if (windSpeed > 20) {
      return {
        icon: Wind,
        condition: '強風',
        description: '風速較強，外出注意安全',
        color: 'text-gray-500',
        bgColor: 'bg-gray-50',
      }
    } else {
      return {
        icon: Sun,
        condition: '舒適',
        description: '天氣條件良好',
        color: 'text-green-500',
        bgColor: 'bg-green-50',
      }
    }
  }

  const weatherCondition = getWeatherCondition()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="weather-card"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">天氣統計</h3>
        
        {/* 天氣狀況評估 */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`${weatherCondition.bgColor} p-4 rounded-lg border border-current/20`}
        >
          <div className="flex items-center gap-3">
            <weatherCondition.icon className={`w-8 h-8 ${weatherCondition.color}`} />
            <div>
              <div className={`font-semibold ${weatherCondition.color}`}>
                {weatherCondition.condition}
              </div>
              <div className="text-sm text-gray-600">
                {weatherCondition.description}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 統計數據網格 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`${stat.bgColor} p-4 rounded-lg border border-current/20`}
          >
            <div className="flex items-center gap-3">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
              <div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                <div className={`font-bold ${stat.color}`}>{stat.value}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 額外資訊 */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-blue-500" />
          <span className="font-semibold text-gray-800">天氣小貼士</span>
        </div>
        <div className="text-sm text-gray-600">
          {data.temperature > 25 && '天氣炎熱，建議穿著輕便衣物並多補充水分。'}
          {data.temperature < 15 && '氣溫較低，建議穿著保暖衣物。'}
          {data.humidity > 80 && '濕度較高，注意防潮。'}
          {data.windSpeed > 15 && '風速較強，外出時注意安全。'}
          {data.visibility < 5 && '能見度較低，駕駛時請小心。'}
        </div>
      </div>
    </motion.div>
  )
}

export default WeatherStats
