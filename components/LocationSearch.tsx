'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, X } from 'lucide-react'

interface LocationSearchProps {
  onLocationChange: (location: string) => void
}

const LocationSearch = ({ onLocationChange }: LocationSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const popularCities = [
    '台北', '高雄', '台中', '台南', '桃園',
    '新竹', '基隆', '嘉義', '彰化', '屏東',
    'Tokyo', 'New York City', 'London', 'Paris', 'Sydney'
  ]

  const handleSearch = async (city: string) => {
    if (!city.trim()) return
    
    setIsSearching(true)
    try {
      onLocationChange(city.trim())
      setSearchTerm('')
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(searchTerm)
  }

  const clearSearch = () => {
    setSearchTerm('')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="weather-card"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-bold text-gray-800">搜尋城市</h3>
        </div>
        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          中/英
        </div>
      </div>

      {/* 搜尋表單 */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="請輸入城市名稱 (支援中文/英文)..."
            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            disabled={isSearching}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        
        <motion.button
          type="submit"
          disabled={!searchTerm.trim() || isSearching}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-3 w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isSearching ? '搜尋中...' : '搜尋天氣'}
        </motion.button>
      </form>

      {/* 熱門城市 */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">熱門城市</h4>
        
        {/* 台灣城市 */}
        <div className="mb-3">
          <h5 className="text-xs text-gray-600 mb-2">台灣</h5>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {['台北', '高雄', '台中', '台南', '桃園', '新竹', '基隆', '嘉義', '彰化', '屏東'].map((city, index) => (
              <motion.button
                key={city}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSearch(city)}
                className="p-2 text-sm bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-lg transition-colors duration-200"
              >
                {city}
              </motion.button>
            ))}
          </div>
        </div>

        {/* 國際城市 */}
        <div>
          <h5 className="text-xs text-gray-600 mb-2">國際</h5>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {['Tokyo', 'New York City', 'London', 'Paris', 'Sydney'].map((city, index) => (
              <motion.button
                key={city}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (index + 10) * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSearch(city)}
                className="p-2 text-sm bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 rounded-lg transition-colors duration-200"
              >
                {city}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* 搜尋提示 */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-sm text-blue-700">
            <strong>搜尋提示：</strong>
            <ul className="mt-1 space-y-1">
              <li>• 支援中文和英文城市名稱</li>
              <li>• 中文：台北、高雄、台中</li>
              <li>• 英文：Tokyo、New York City、London</li>
              <li>• 可以搜尋國家名稱（如：日本、美國）</li>
              <li>• 支援經緯度座標搜尋</li>
            </ul>
          </div>
      </div>
    </motion.div>
  )
}

export default LocationSearch
