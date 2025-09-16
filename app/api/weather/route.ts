import { NextRequest, NextResponse } from 'next/server'
import { fetchOpenMeteoWeather } from '@/lib/openMeteoService'

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || 'your-api-key-here'
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5'


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city') || 'Taipei'
    const api = searchParams.get('api') || 'openmeteo' // 預設使用 Open-Meteo

    // 使用 Open-Meteo (完全免費，無需註冊)
    if (api === 'openmeteo') {
      try {
        const openMeteoData = await fetchOpenMeteoWeather(city)
        
        // 轉換為統一格式
        const processedData = {
          current: {
            location: openMeteoData.location,
            temperature: openMeteoData.current.temperature,
            feelsLike: openMeteoData.current.temperature, // Open-Meteo 沒有體感溫度
            humidity: openMeteoData.current.humidity,
            pressure: openMeteoData.current.pressure,
            windSpeed: openMeteoData.current.windSpeed,
            windDirection: openMeteoData.current.windDirection,
            visibility: openMeteoData.current.visibility,
            uvIndex: 0, // Open-Meteo 免費版不包含 UV 指數
            description: openMeteoData.current.description,
            icon: openMeteoData.current.icon,
            timestamp: openMeteoData.timestamp,
          },
          forecast: openMeteoData.forecast.map((day, index) => ({
            date: day.date,
            day: new Date(day.date).toLocaleDateString('zh-TW', { weekday: 'long' }),
            temperature: day.temperature,
            description: day.description,
            icon: day.icon,
            humidity: day.humidity,
            windSpeed: day.windSpeed,
            precipitation: day.precipitation,
          })),
          apiUsed: 'Open-Meteo'
        }
        
        return NextResponse.json(processedData)
      } catch (openMeteoError) {
        console.error('Open-Meteo API Error:', openMeteoError)
        
        // 如果 Open-Meteo 失敗，嘗試 OpenWeatherMap 作為備援
        if (OPENWEATHER_API_KEY && OPENWEATHER_API_KEY !== 'your-api-key-here') {
          console.log('嘗試使用 OpenWeatherMap 作為備援...')
          try {
            const currentWeatherResponse = await fetch(
              `${OPENWEATHER_BASE_URL}/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=zh_tw`
            )

            if (currentWeatherResponse.ok) {
              const currentWeather = await currentWeatherResponse.json()
              const forecastResponse = await fetch(
                `${OPENWEATHER_BASE_URL}/forecast?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=zh_tw`
              )

              if (forecastResponse.ok) {
                const forecast = await forecastResponse.json()
                
                const processedCurrentWeather = {
                  location: currentWeather.name,
                  temperature: Math.round(currentWeather.main.temp),
                  feelsLike: Math.round(currentWeather.main.feels_like),
                  humidity: currentWeather.main.humidity,
                  pressure: currentWeather.main.pressure,
                  windSpeed: Math.round(currentWeather.wind.speed * 3.6),
                  windDirection: currentWeather.wind.deg,
                  visibility: Math.round(currentWeather.visibility / 1000),
                  uvIndex: 0,
                  description: currentWeather.weather[0].description,
                  icon: currentWeather.weather[0].icon,
                  timestamp: currentWeather.dt * 1000,
                }

                const processedForecast = forecast.list
                  .filter((_: any, index: number) => index % 8 === 0)
                  .slice(0, 5)
                  .map((item: any) => ({
                    date: new Date(item.dt * 1000).toISOString().split('T')[0],
                    day: new Date(item.dt * 1000).toLocaleDateString('zh-TW', { weekday: 'long' }),
                    temperature: {
                      min: Math.round(item.main.temp_min),
                      max: Math.round(item.main.temp_max),
                    },
                    description: item.weather[0].description,
                    icon: item.weather[0].icon,
                    humidity: item.main.humidity,
                    windSpeed: Math.round(item.wind.speed * 3.6),
                    precipitation: item.rain ? item.rain['3h'] || 0 : 0,
                  }))

                return NextResponse.json({
                  current: processedCurrentWeather,
                  forecast: processedForecast,
                  apiUsed: 'OpenWeatherMap (備援)'
                })
              }
            }
          } catch (backupError) {
            console.error('備援 API 也失敗:', backupError)
          }
        }
        
        throw new Error(openMeteoError instanceof Error ? openMeteoError.message : '無法獲取天氣資料，請稍後再試')
      }
    }

    // 使用 OpenWeatherMap API (需要API金鑰)
    if (api === 'openweather') {
      // 獲取當前天氣
      const currentWeatherResponse = await fetch(
        `${OPENWEATHER_BASE_URL}/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=zh_tw`
      )

      if (!currentWeatherResponse.ok) {
        throw new Error('無法獲取天氣資料')
      }

      const currentWeather = await currentWeatherResponse.json()

      // 獲取5天預報
      const forecastResponse = await fetch(
        `${OPENWEATHER_BASE_URL}/forecast?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=zh_tw`
      )

      if (!forecastResponse.ok) {
        throw new Error('無法獲取預報資料')
      }

      const forecast = await forecastResponse.json()

      // 處理當前天氣資料
      const processedCurrentWeather = {
        location: currentWeather.name, // 只顯示城市名稱，不顯示國家
        temperature: Math.round(currentWeather.main.temp),
        feelsLike: Math.round(currentWeather.main.feels_like),
        humidity: currentWeather.main.humidity,
        pressure: currentWeather.main.pressure,
        windSpeed: Math.round(currentWeather.wind.speed * 3.6), // 轉換為 km/h
        windDirection: currentWeather.wind.deg,
        visibility: Math.round(currentWeather.visibility / 1000), // 轉換為 km
        uvIndex: 0, // OpenWeatherMap 免費版不包含 UV 指數
        description: currentWeather.weather[0].description,
        icon: currentWeather.weather[0].icon,
        timestamp: currentWeather.dt * 1000,
      }

      // 處理預報資料
      const processedForecast = forecast.list
        .filter((_: any, index: number) => index % 8 === 0) // 每天取一個時間點
        .slice(0, 5)
        .map((item: any) => ({
          date: new Date(item.dt * 1000).toISOString().split('T')[0],
          day: new Date(item.dt * 1000).toLocaleDateString('zh-TW', { weekday: 'long' }),
          temperature: {
            min: Math.round(item.main.temp_min),
            max: Math.round(item.main.temp_max),
          },
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          windSpeed: Math.round(item.wind.speed * 3.6),
          precipitation: item.rain ? item.rain['3h'] || 0 : 0,
        }))

      return NextResponse.json({
        current: processedCurrentWeather,
        forecast: processedForecast,
        apiUsed: 'OpenWeatherMap'
      })
    }

    throw new Error('不支援的API選擇')

  } catch (error) {
    console.error('Weather API Error:', error)
    return NextResponse.json(
      { message: '無法獲取天氣資料，請稍後再試' },
      { status: 500 }
    )
  }
}
