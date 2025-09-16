# 天氣儀表板 | Weather Dashboard

一個現代化的天氣儀表板，提供即時天氣資訊和5天預報。使用 Next.js、TypeScript、Tailwind CSS 和 Framer Motion 建構。

## ✨ 功能特色

- 🌤️ **即時天氣資訊** - 顯示當前溫度、濕度、風速、氣壓等詳細資訊
- 📊 **5天預報** - 提供未來5天的天氣預報
- 📈 **數據可視化** - 使用 Recharts 繪製溫度趨勢、濕度、風速圖表
- 🔍 **城市搜尋** - 支援全球城市天氣查詢
- 📱 **響應式設計** - 完美適配桌面和行動裝置
- 🎨 **現代化UI** - 使用 Tailwind CSS 和 Framer Motion 打造流暢動畫
- 🌍 **多語言支援** - 支援繁體中文介面

## 🚀 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 設定環境變數 (可選)

**🎉 好消息！** 現在預設使用 **Open-Meteo API**，完全免費且無需註冊！

如果您想使用其他API，可以建立 `.env.local` 檔案：

```bash
# 可選：OpenWeatherMap API (需要註冊)
OPENWEATHER_API_KEY=your_api_key_here
```

### 3. API 選擇

- **Open-Meteo** (預設) - 完全免費，無需註冊
- **OpenWeatherMap** (可選) - 需要註冊獲取API金鑰

### 4. 啟動開發伺服器

```bash
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 查看結果。

**🎉 現在就可以直接使用，無需任何API金鑰！**

## 🛠️ 技術棧

- **前端框架**: Next.js 14 (App Router)
- **程式語言**: TypeScript
- **樣式**: Tailwind CSS
- **動畫**: Framer Motion
- **圖表**: Recharts
- **圖示**: Lucide React
- **API**: Open-Meteo API (開源免費)

## 🌟 Open-Meteo API 特色

### 完全免費且開源
- ✅ **無限制使用** - 完全免費，無需註冊
- ✅ **開源專案** - [GitHub](https://github.com/open-meteo/open-meteo) 3.6k+ stars
- ✅ **AGPL-3.0 授權** - 透明且可信
- ✅ **無需API金鑰** - 直接使用

### 高品質資料
- 📊 **ECMWF 模型** - 歐洲中期天氣預報中心
- 🌍 **全球覆蓋** - 支援全球所有城市
- ⚡ **即時更新** - 每小時更新資料
- 🎯 **高準確性** - 業界領先的預測準確性

### 技術優勢
- 🔧 **完整原始碼** - 可自行部署
- 📚 **豐富文檔** - 詳細的API文檔
- 🌐 **多語言支援** - 包含繁體中文
- 🚀 **高效能** - 全球CDN加速

## 📁 專案結構

```
weather-dashboard/
├── app/
│   ├── api/weather/          # API 路由
│   ├── globals.css           # 全域樣式
│   ├── layout.tsx            # 根布局
│   └── page.tsx              # 主頁面
├── components/
│   ├── WeatherCard.tsx       # 主要天氣卡片
│   ├── WeatherForecast.tsx   # 5天預報
│   ├── WeatherChart.tsx      # 數據圖表
│   ├── WeatherStats.tsx      # 天氣統計
│   └── LocationSearch.tsx    # 城市搜尋
├── types/
│   └── weather.ts            # TypeScript 類型定義
└── README.md
```

## 🎨 設計特色

- **玻璃擬態效果** - 使用 backdrop-blur 創造現代感
- **漸層背景** - 動態漸層背景提升視覺效果
- **流暢動畫** - Framer Motion 提供流暢的頁面轉場
- **響應式網格** - 自適應不同螢幕尺寸
- **直觀圖示** - Lucide React 提供一致的圖示系統

## 🔧 自訂設定

### 修改主題色彩

在 `tailwind.config.js` 中自訂色彩：

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // 自訂主色調
      },
      weather: {
        sunny: '#fbbf24',
        cloudy: '#9ca3af',
        rainy: '#3b82f6',
        snowy: '#e5e7eb',
      }
    }
  }
}
```

### 添加新功能

1. 在 `types/weather.ts` 中定義新的資料類型
2. 在 `components/` 中建立新組件
3. 在 `app/page.tsx` 中整合新組件

## 📱 部署

### Vercel 部署

1. 將專案推送到 GitHub
2. 在 Vercel 中匯入專案
3. 設定環境變數 `OPENWEATHER_API_KEY`
4. 部署完成

### 其他平台

專案支援任何支援 Next.js 的部署平台：
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License

## 🙏 致謝

- [Open-Meteo](https://open-meteo.com/) - 提供免費開源天氣資料 API
- [Open-Meteo GitHub](https://github.com/open-meteo/open-meteo) - 開源天氣API專案 (3.6k+ stars)
- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Framer Motion](https://www.framer.com/motion/) - 動畫庫
- [Recharts](https://recharts.org/) - 圖表庫
- [Lucide](https://lucide.dev/) - 圖示庫

## 🌟 Open-Meteo 社群

Open-Meteo 是一個活躍的開源社群專案，被廣泛使用於：

- **Home Assistant** - 開源智慧家居平台
- **Weather.io** - 漸進式網頁應用
- **WeatherGraph** - Apple Watch 應用
- **多個Android天氣應用**
- **各種開源專案**

感謝 Open-Meteo 團隊提供如此優秀的免費服務！
