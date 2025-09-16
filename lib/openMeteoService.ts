// Open-Meteo API 服務 (完全免費，無需註冊)
export interface OpenMeteoCurrentWeather {
  temperature: number
  humidity: number
  pressure: number
  windSpeed: number
  windDirection: number
  visibility: number
  description: string
  icon: string
}

export interface OpenMeteoForecast {
  date: string
  temperature: {
    min: number
    max: number
  }
  humidity: number
  windSpeed: number
  precipitation: number
  description: string
  icon: string
}

export const fetchOpenMeteoWeather = async (city: string) => {
  try {
    // 首先獲取座標
    const geocodingResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=en&format=json`
    )
    
    if (!geocodingResponse.ok) {
      throw new Error('無法連接到地理編碼服務')
    }
    
    const geocodingData = await geocodingResponse.json()
    
    if (!geocodingData.results || geocodingData.results.length === 0) {
      throw new Error(`找不到城市「${city}」，請嘗試其他城市名稱`)
    }
    
    // 按人口數量排序結果，優先選擇人口較多的城市
    const sortedResults = geocodingData.results.sort((a, b) => {
      const populationA = a.population || 0
      const populationB = b.population || 0
      return populationB - populationA
    })
    
    // 嘗試多個結果，找到有天氣資料的位置
    let weatherData = null
    let selectedLocation = null
    
    for (const location of sortedResults) {
      try {
        const { latitude, longitude, name, country } = location
        
        // 獲取天氣資料
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,surface_pressure,wind_speed_10m,wind_direction_10m,visibility,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=auto&forecast_days=5`
        )
        
        if (weatherResponse.ok) {
          weatherData = await weatherResponse.json()
          selectedLocation = { latitude, longitude, name, country }
          break
        }
      } catch (error) {
        console.log(`位置 ${location.name} 無法獲取天氣資料，嘗試下一個...`)
        continue
      }
    }
    
    if (!weatherData || !selectedLocation) {
      throw new Error(`無法獲取「${city}」的天氣資料，請嘗試其他城市`)
    }
    
    const { latitude, longitude, name, country } = selectedLocation
    
    // 處理當前天氣資料
    const current = weatherData.current
    const currentWeather: OpenMeteoCurrentWeather = {
      temperature: Math.round(current.temperature_2m),
      humidity: current.relative_humidity_2m,
      pressure: current.surface_pressure,
      windSpeed: Math.round(current.wind_speed_10m * 3.6), // 轉換為 km/h
      windDirection: current.wind_direction_10m,
      visibility: Math.round(current.visibility / 1000), // 轉換為 km
      description: getWeatherDescription(current.weather_code),
      icon: getWeatherIcon(current.weather_code)
    }
    
    // 處理預報資料
    const forecast: OpenMeteoForecast[] = []
    for (let i = 0; i < 5; i++) {
      const date = weatherData.daily.time[i]
      forecast.push({
        date,
        temperature: {
          min: Math.round(weatherData.daily.temperature_2m_min[i]),
          max: Math.round(weatherData.daily.temperature_2m_max[i])
        },
        humidity: Math.round(weatherData.hourly.relative_humidity_2m[i * 24]), // 取每天第一個小時的濕度
        windSpeed: Math.round(weatherData.hourly.wind_speed_10m[i * 24] * 3.6),
        precipitation: weatherData.daily.precipitation_sum[i] || 0,
        description: getWeatherDescription(weatherData.daily.weather_code[i]),
        icon: getWeatherIcon(weatherData.daily.weather_code[i])
      })
    }
    
    return {
      location: name, // 只顯示城市名稱，不顯示國家
      current: currentWeather,
      forecast,
      timestamp: Date.now()
    }
    
  } catch (error) {
    console.error('Open-Meteo API Error:', error)
    throw error
  }
}

// 天氣代碼轉換
const getWeatherDescription = (code: number): string => {
  const weatherCodes: { [key: number]: string } = {
    0: '晴朗',
    1: '大部分晴朗',
    2: '部分多雲',
    3: '多雲',
    45: '霧',
    48: '霜霧',
    51: '小雨',
    53: '中雨',
    55: '大雨',
    61: '小雨',
    63: '中雨',
    65: '大雨',
    71: '小雪',
    73: '中雪',
    75: '大雪',
    77: '雪粒',
    80: '小雨',
    81: '中雨',
    82: '大雨',
    85: '小雪',
    86: '大雪',
    95: '雷雨',
    96: '雷雨伴冰雹',
    99: '強雷雨伴冰雹'
  }
  
  return weatherCodes[code] || '未知'
}

const getWeatherIcon = (code: number): string => {
  const iconMap: { [key: number]: string } = {
    0: '01d', // 晴朗
    1: '02d', // 大部分晴朗
    2: '03d', // 部分多雲
    3: '04d', // 多雲
    45: '50d', // 霧
    48: '50d', // 霜霧
    51: '10d', // 小雨
    53: '10d', // 中雨
    55: '10d', // 大雨
    61: '09d', // 小雨
    63: '09d', // 中雨
    65: '09d', // 大雨
    71: '13d', // 小雪
    73: '13d', // 中雪
    75: '13d', // 大雪
    77: '13d', // 雪粒
    80: '09d', // 小雨
    81: '09d', // 中雨
    82: '09d', // 大雨
    85: '13d', // 小雪
    86: '13d', // 大雪
    95: '11d', // 雷雨
    96: '11d', // 雷雨伴冰雹
    99: '11d'  // 強雷雨伴冰雹
  }
  
  return iconMap[code] || '01d'
}
