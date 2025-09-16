'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Check, Zap, Globe, Shield } from 'lucide-react'

interface ApiSelectorProps {
  onApiChange: (api: string) => void
  currentApi?: string
}

const ApiSelector = ({ onApiChange, currentApi = 'auto' }: ApiSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const apis = [
    {
      id: 'auto',
      name: '自動選擇',
      description: '優先使用免費API',
      icon: Zap,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      free: true,
      limit: '無限制'
    },
    {
      id: 'openmeteo',
      name: 'Open-Meteo',
      description: '完全免費，無需註冊',
      icon: Globe,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      free: true,
      limit: '無限制'
    },
    {
      id: 'openweather',
      name: 'OpenWeatherMap',
      description: '需要API金鑰',
      icon: Shield,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      free: false,
      limit: '1,000次/天'
    }
  ]

  const currentApiInfo = apis.find(api => api.id === currentApi) || apis[0]

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`${currentApiInfo.bgColor} ${currentApiInfo.borderColor} border rounded-lg px-3 py-2 flex items-center gap-2 hover:shadow-md transition-all duration-200`}
      >
        <Settings className="w-4 h-4" />
        <span className="text-sm font-medium">{currentApiInfo.name}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4"
        >
          ▼
        </motion.div>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">選擇天氣API</h3>
            
            <div className="space-y-2">
              {apis.map((api) => (
                <motion.button
                  key={api.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onApiChange(api.id)
                    setIsOpen(false)
                  }}
                  className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                    currentApi === api.id
                      ? `${api.bgColor} ${api.borderColor} border-2`
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <api.icon className={`w-5 h-5 ${api.color}`} />
                      <div>
                        <div className="font-medium text-gray-800">{api.name}</div>
                        <div className="text-sm text-gray-600">{api.description}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {api.free ? '🆓' : '🔑'} {api.limit}
                        </div>
                      </div>
                    </div>
                    {currentApi === api.id && (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-700">
                <strong>💡 建議：</strong>
                <ul className="mt-1 space-y-1">
                  <li>• <strong>自動選擇</strong>：推薦選項，會優先使用免費API</li>
                  <li>• <strong>Open-Meteo</strong>：完全免費，無需註冊</li>
                  <li>• <strong>OpenWeatherMap</strong>：需要註冊獲取API金鑰</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 點擊外部關閉 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default ApiSelector
