# 天氣儀表板 - Vercel 部署指南

## 📋 專案概述

這是一個使用 Next.js 14 + TypeScript + Tailwind CSS 建構的現代化天氣儀表板，支援即時天氣資訊、5天預報、圖表視覺化和響應式設計。

## 🚀 快速部署到 Vercel

### 方法一：透過 Vercel CLI（推薦）

1. **安裝 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登入 Vercel**
   ```bash
   vercel login
   ```

3. **部署專案**
   ```bash
   vercel
   ```

4. **生產環境部署**
   ```bash
   vercel --prod
   ```

### 方法二：透過 Vercel Dashboard

1. **準備 GitHub 倉庫**
   - 將專案推送到 GitHub
   - 確保所有檔案都已提交

2. **連接 Vercel**
   - 前往 [vercel.com](https://vercel.com)
   - 點擊 "New Project"
   - 選擇你的 GitHub 倉庫

3. **配置專案**
   - Framework Preset: `Next.js`
   - Root Directory: `./` (預設)
   - Build Command: `npm run build` (預設)
   - Output Directory: `.next` (預設)

4. **部署**
   - 點擊 "Deploy"

## ⚙️ 環境變數設定

### 可選的 API 金鑰

專案預設使用 **Open-Meteo API**（完全免費，無需註冊），但您也可以設定其他天氣 API：

#### 在 Vercel Dashboard 設定環境變數：

1. 進入專案設定
2. 點擊 "Environment Variables"
3. 新增以下變數（可選）：

```bash
# OpenWeatherMap API (可選)
OPENWEATHER_API_KEY=your_openweather_api_key

# WeatherAPI (可選)  
WEATHERAPI_KEY=your_weatherapi_key
```

#### 透過 Vercel CLI 設定：

```bash
vercel env add OPENWEATHER_API_KEY
vercel env add WEATHERAPI_KEY
```

## 📁 專案結構

```
天氣儀表板/
├── app/                    # Next.js 13+ App Router
│   ├── api/weather/       # API 路由
│   ├── globals.css        # 全域樣式
│   ├── layout.tsx         # 根佈局
│   └── page.tsx           # 首頁
├── components/            # React 組件
│   ├── WeatherCard.tsx    # 天氣卡片
│   ├── WeatherForecast.tsx # 天氣預報
│   ├── WeatherChart.tsx   # 天氣圖表
│   ├── LocationSearch.tsx # 城市搜尋
│   └── ...
├── lib/                   # 工具函數
│   ├── openMeteoService.ts # Open-Meteo API 服務
│   ├── weatherApis.ts     # API 配置
│   └── convertChinese.ts  # 中文轉換
├── types/                 # TypeScript 類型定義
└── public/               # 靜態資源
```

## 🔧 建置配置

### package.json 腳本

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build", 
    "start": "next start",
    "lint": "next lint"
  }
}
```

### Next.js 配置 (next.config.js)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['openweathermap.org'],
  },
}

module.exports = nextConfig
```

## 🌐 部署後設定

### 1. 自訂網域（可選）

1. 在 Vercel Dashboard 進入專案設定
2. 點擊 "Domains"
3. 新增您的自訂網域
4. 按照指示設定 DNS 記錄

### 2. 環境變數更新

如果需要更新環境變數：

```bash
# 更新環境變數
vercel env add VARIABLE_NAME

# 重新部署
vercel --prod
```

### 3. 自動部署設定

- **GitHub 整合**：每次推送到 main 分支會自動觸發部署
- **預覽部署**：每次 Pull Request 會建立預覽環境
- **分支保護**：建議設定 main 分支保護規則

## 🚨 常見問題與解決方案

### 1. 建置失敗

**問題**：`npm run build` 失敗

**解決方案**：
```bash
# 清除快取
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### 2. API 路由錯誤

**問題**：天氣 API 無法正常運作

**解決方案**：
- 檢查環境變數是否正確設定
- 確認 API 金鑰有效
- 檢查網路連線

### 3. 圖片載入問題

**問題**：天氣圖示無法顯示

**解決方案**：
- 確認 `next.config.js` 中的 `domains` 設定
- 檢查圖片 URL 是否正確

### 4. 環境變數未生效

**問題**：環境變數在生產環境中未生效

**解決方案**：
```bash
# 重新部署
vercel --prod

# 或透過 Dashboard 重新部署
```

## 📊 效能優化建議

### 1. 圖片優化

```javascript
// next.config.js
const nextConfig = {
  images: {
    domains: ['openweathermap.org'],
    formats: ['image/webp', 'image/avif'],
  },
}
```

### 2. 快取設定

```javascript
// API 路由中設定快取
export async function GET(request) {
  // ... API 邏輯
  
  return new Response(JSON.stringify(data), {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
```

### 3. 程式碼分割

```javascript
// 動態匯入組件
const WeatherChart = dynamic(() => import('@/components/WeatherChart'), {
  loading: () => <p>載入中...</p>,
})
```

## 🔍 監控與分析

### 1. Vercel Analytics

啟用 Vercel Analytics 來監控效能：

1. 在 Vercel Dashboard 中啟用 Analytics
2. 安裝 `@vercel/analytics`：

```bash
npm install @vercel/analytics
```

3. 在 `app/layout.tsx` 中新增：

```javascript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 2. 錯誤監控

考慮整合 Sentry 或其他錯誤監控服務：

```bash
npm install @sentry/nextjs
```

## 📝 部署檢查清單

- [ ] 專案已推送到 GitHub
- [ ] 所有依賴已安裝 (`npm install`)
- [ ] 本地建置成功 (`npm run build`)
- [ ] 環境變數已設定（如需要）
- [ ] 自訂網域已設定（如需要）
- [ ] Analytics 已啟用（如需要）
- [ ] 錯誤監控已設定（如需要）

## 🎯 部署成功後

部署完成後，您將獲得：

- ✅ 生產環境 URL
- ✅ 自動 HTTPS 憑證
- ✅ 全球 CDN 分發
- ✅ 自動擴展
- ✅ 零停機部署
- ✅ 預覽環境

## 📞 支援

如果遇到部署問題，可以：

1. 查看 [Vercel 文件](https://vercel.com/docs)
2. 檢查 [Next.js 部署指南](https://nextjs.org/docs/deployment)
3. 查看 Vercel Dashboard 中的建置日誌
4. 聯繫 Vercel 支援團隊

---

**恭喜！** 🎉 您的天氣儀表板已成功部署到 Vercel！

專案展示：https://kevin-tau.vercel.app/
