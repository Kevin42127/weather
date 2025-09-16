'use client'

import { motion } from 'framer-motion'
import { ForecastData } from '@/types/weather'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { TrendingUp, Droplets, Wind } from 'lucide-react'

interface WeatherChartProps {
  data: ForecastData[]
}

const WeatherChart = ({ data }: WeatherChartProps) => {
  const chartData = data.map((day) => ({
    day: day.day.slice(0, 3), // 只顯示前三個字
    temperature: day.temperature.max,
    humidity: day.humidity,
    windSpeed: day.windSpeed,
    precipitation: day.precipitation,
  }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.dataKey === 'temperature' ? '°C' : 
               entry.dataKey === 'humidity' ? '%' : 
               entry.dataKey === 'windSpeed' ? ' km/h' : ' mm'}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="weather-card"
    >
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-6 h-6 text-green-500" />
        <h3 className="text-xl font-bold text-gray-800">天氣趨勢圖</h3>
      </div>

      <div className="space-y-6">
        {/* 溫度趨勢 */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-500" />
            溫度趨勢
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="day" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                label={{ value: '°C', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 濕度與風速 */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            濕度與風速
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="day" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                label={{ value: '% / km/h', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="humidity" 
                fill="#3b82f6" 
                name="濕度"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="windSpeed" 
                fill="#10b981" 
                name="風速"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 降雨量 */}
        {chartData.some(item => item.precipitation > 0) && (
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Wind className="w-5 h-5 text-purple-500" />
              降雨量預測
            </h4>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="day" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  label={{ value: 'mm', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="precipitation" 
                  fill="#8b5cf6" 
                  name="降雨量"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default WeatherChart
