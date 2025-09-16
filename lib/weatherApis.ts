// 多個天氣API配置
export interface WeatherAPIConfig {
  name: string
  baseUrl: string
  apiKey: string
  endpoints: {
    current: string
    forecast: string
  }
  freeLimit: string
  website: string
}

export const weatherAPIs: WeatherAPIConfig[] = [
  {
    name: 'OpenWeatherMap',
    baseUrl: 'https://api.openweathermap.org/data/2.5',
    apiKey: process.env.OPENWEATHER_API_KEY || '',
    endpoints: {
      current: '/weather',
      forecast: '/forecast'
    },
    freeLimit: '1,000次/天',
    website: 'https://openweathermap.org/api'
  },
  {
    name: 'WeatherAPI',
    baseUrl: 'https://api.weatherapi.com/v1',
    apiKey: process.env.WEATHERAPI_KEY || '',
    endpoints: {
      current: '/current.json',
      forecast: '/forecast.json'
    },
    freeLimit: '1,000,000次/月',
    website: 'https://www.weatherapi.com/'
  },
  {
    name: 'Open-Meteo',
    baseUrl: 'https://api.open-meteo.com/v1',
    apiKey: '', // 不需要API金鑰
    endpoints: {
      current: '/forecast',
      forecast: '/forecast'
    },
    freeLimit: '無限制',
    website: 'https://open-meteo.com/'
  }
]

// 獲取可用的API
export const getAvailableAPIs = () => {
  return weatherAPIs.filter(api => {
    if (api.name === 'Open-Meteo') return true // 不需要API金鑰
    return api.apiKey && api.apiKey !== ''
  })
}

// 根據優先級選擇API
export const getPreferredAPI = () => {
  const available = getAvailableAPIs()
  
  // 優先級: Open-Meteo > WeatherAPI > OpenWeatherMap
  const preferred = available.find(api => api.name === 'Open-Meteo') ||
                   available.find(api => api.name === 'WeatherAPI') ||
                   available[0]
  
  return preferred || weatherAPIs[0] // 預設使用第一個
}
