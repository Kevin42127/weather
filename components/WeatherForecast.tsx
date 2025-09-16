'use client'

import { motion } from 'framer-motion'
import { ForecastData } from '@/types/weather'
import { Calendar, Thermometer, Droplets, Wind } from 'lucide-react'

interface WeatherForecastProps {
  data: ForecastData[]
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const getWeatherIcon = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="weather-card"
    >
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-bold text-gray-800">5天預報</h3>
      </div>

      <div className="space-y-4">
        {data.map((day, index) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="text-center min-w-[80px]">
                <div className="text-sm font-medium text-gray-600">
                  {day.day}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(day.date).toLocaleDateString('zh-TW', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>
              
              <img
                src={getWeatherIcon(day.icon)}
                alt={day.description}
                className="w-12 h-12"
              />
              
              <div>
                <div className="font-medium text-gray-800 capitalize">
                  {day.description}
                </div>
                <div className="text-sm text-gray-600">
                  {day.precipitation > 0 && (
                    <span className="flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-blue-500" />
                      {day.precipitation}mm
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <Thermometer className="w-4 h-4 text-red-500" />
                <span className="font-semibold text-gray-800">
                  {day.temperature.max}° / {day.temperature.min}°
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-blue-500" />
                  {day.humidity}%
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="w-3 h-3 text-gray-500" />
                  {day.windSpeed} km/h
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default WeatherForecast
