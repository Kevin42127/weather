export interface WeatherData {
  location: string
  temperature: number
  feelsLike: number
  humidity: number
  pressure: number
  windSpeed: number
  windDirection: number
  visibility: number
  uvIndex: number
  description: string
  icon: string
  timestamp: number
}

export interface ForecastData {
  date: string
  day: string
  temperature: {
    min: number
    max: number
  }
  description: string
  icon: string
  humidity: number
  windSpeed: number
  precipitation: number
}

export interface WeatherAPIResponse {
  current: WeatherData
  forecast: ForecastData[]
}

export interface LocationData {
  name: string
  country: string
  lat: number
  lon: number
}
