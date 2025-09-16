'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import WeatherCard from '@/components/WeatherCard'
import WeatherForecast from '@/components/WeatherForecast'
import WeatherChart from '@/components/WeatherChart'
import LocationSearch from '@/components/LocationSearch'
import WeatherStats from '@/components/WeatherStats'
import Footer from '@/components/Footer'
import { WeatherData, ForecastData } from '@/types/weather'

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [forecastData, setForecastData] = useState<ForecastData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState('Taipei')

  const fetchWeatherData = async (city: string, api: string = 'openmeteo', retryCount: number = 0) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}&api=${api}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || '無法獲取天氣資料')
      }
      
      setWeatherData(data.current)
      setForecastData(data.forecast)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '發生未知錯誤'
      
      // 如果是網路錯誤且重試次數少於2次，則重試
      if (retryCount < 2 && (errorMessage.includes('無法連接到') || errorMessage.includes('網路'))) {
        console.log(`重試第 ${retryCount + 1} 次...`)
        setTimeout(() => {
          fetchWeatherData(city, api, retryCount + 1)
        }, 1000 * (retryCount + 1)) // 遞增延遲
        return
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeatherData(location)
  }, [location])

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
          
          
          <div className="space-y-3">
            <button
              onClick={() => fetchWeatherData(location)}
              className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              重新載入
            </button>
            
            <button
              onClick={() => {
                setError(null)
                setLocation('Taipei')
              }}
              className="w-full px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              回到首頁
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-gradient mb-4"
          >
            天氣儀表板
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-gray-600"
          >
            即時天氣資訊與預報
          </motion.p>
        </div>

        {/* Location Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <LocationSearch onLocationChange={handleLocationChange} />
        </motion.div>

        {/* Main Weather Card */}
        {weatherData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-8"
          >
            <WeatherCard data={weatherData} />
          </motion.div>
        )}

        {/* Weather Stats */}
        {weatherData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-8"
          >
            <WeatherStats data={weatherData} />
          </motion.div>
        )}

        {/* Forecast and Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <WeatherForecast data={forecastData} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <WeatherChart data={forecastData} />
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
