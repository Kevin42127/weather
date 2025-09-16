'use client'

import { motion } from 'framer-motion'
import { WeatherData } from '@/types/weather'
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge,
  MapPin,
  Clock
} from 'lucide-react'

interface WeatherCardProps {
  data: WeatherData
}

const WeatherCard = ({ data }: WeatherCardProps) => {
  const getWeatherIcon = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@4x.png`
  }

  const getWindDirection = (degrees: number) => {
    const directions = ['北', '東北', '東', '東南', '南', '西南', '西', '西北']
    const index = Math.round(degrees / 45) % 8
    return directions[index]
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="weather-card"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-blue-500" />
            {data.location}
          </h2>
          <p className="text-gray-600 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            更新時間: {formatTime(data.timestamp)}
          </p>
        </div>
        <div className="text-right">
          <img
            src={getWeatherIcon(data.icon)}
            alt={data.description}
            className="w-20 h-20"
          />
          <p className="text-lg font-medium text-gray-700 capitalize">
            {data.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 主要溫度 */}
        <div className="text-center">
          <div className="text-6xl font-bold text-gradient mb-2">
            {data.temperature}°
          </div>
          <div className="text-lg text-gray-600">
            體感溫度 {data.feelsLike}°
          </div>
        </div>

        {/* 詳細資訊 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-red-500" />
              <span className="text-gray-600">濕度</span>
            </div>
            <span className="font-semibold">{data.humidity}%</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-blue-500" />
              <span className="text-gray-600">風速</span>
            </div>
            <span className="font-semibold">
              {data.windSpeed} km/h {getWindDirection(data.windDirection)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-purple-500" />
              <span className="text-gray-600">氣壓</span>
            </div>
            <span className="font-semibold">{data.pressure} hPa</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-500" />
              <span className="text-gray-600">能見度</span>
            </div>
            <span className="font-semibold">{data.visibility} km</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default WeatherCard
