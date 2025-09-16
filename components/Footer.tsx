'use client'

import { motion } from 'framer-motion'
import { Info, ExternalLink, Github, Heart } from 'lucide-react'

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="mt-16 bg-white/80 backdrop-blur-sm border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 關於專案 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">關於專案</h3>
            <p className="text-sm text-gray-600 mb-4">
              使用 Next.js、TypeScript、Tailwind CSS 和 Framer Motion 建構的現代化天氣儀表板。
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Heart className="w-4 h-4 text-red-500" />
              <span>使用 Open-Meteo API 提供免費天氣服務</span>
            </div>
          </div>

          {/* 技術資訊 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">技術資訊</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>資料來源：Open-Meteo (ECMWF)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>更新頻率：每小時</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>預測範圍：5天</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                <span>開源專案：AGPL-3.0 授權</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>GitHub Stars：3.6k+</span>
              </div>
            </div>
          </div>

          {/* 免責聲明 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">重要提醒</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700 mb-1">天氣預測準確性</p>
                  <p>本網站的天氣預測僅供參考，實際天氣狀況可能與預測不同。請以官方氣象局資訊為準。</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700 mb-1">使用建議</p>
                  <p>建議用於一般天氣查詢，不適用於農業、航空等專業用途。</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 分隔線 */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* 版權資訊 */}
            <div className="text-sm text-gray-500">
              © 2025 天氣儀表板. 使用 
              <a 
                href="https://open-meteo.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 mx-1"
              >
                Open-Meteo API
              </a>
              提供天氣資料。
              <a 
                href="https://github.com/open-meteo/open-meteo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800 ml-1"
              >
                開源專案
              </a>
            </div>

            {/* 連結 */}
            <div className="flex items-center gap-4">
              <a
                href="https://open-meteo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-500 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                資料來源
              </a>
              <a
                href="https://github.com/open-meteo/open-meteo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Github className="w-4 h-4" />
                Open-Meteo GitHub
              </a>
            </div>
          </div>
        </div>

        {/* 免責聲明橫幅 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
        >
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">⚠️ 免責聲明</h4>
              <p className="text-sm text-yellow-700 leading-relaxed">
                本網站提供的天氣資訊僅供參考，不保證預測的準確性。實際天氣狀況可能因各種因素而與預測不同。
                對於因使用本網站資訊而造成的任何損失或損害，本網站概不負責。
                建議重要決策請參考官方氣象局的最新資訊。
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer
