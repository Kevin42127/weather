// 簡單的API測試腳本
const testOpenMeteoAPI = async () => {
  try {
    console.log('🧪 測試 Open-Meteo API...')
    
    const response = await fetch('http://localhost:3000/api/weather?city=台北&api=openmeteo')
    const data = await response.json()
    
    if (response.ok) {
      console.log('✅ Open-Meteo API 測試成功！')
      console.log('📍 位置:', data.current.location)
      console.log('🌡️ 溫度:', data.current.temperature + '°C')
      console.log('🌤️ 天氣:', data.current.description)
      console.log('📊 預報天數:', data.forecast.length)
      console.log('🔧 使用的API:', data.apiUsed)
    } else {
      console.log('❌ API 測試失敗:', data.message)
    }
  } catch (error) {
    console.log('❌ 測試錯誤:', error.message)
  }
}

// 如果直接執行此檔案
if (typeof window === 'undefined') {
  testOpenMeteoAPI()
}

module.exports = { testOpenMeteoAPI }
