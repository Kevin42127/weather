# 天氣儀表板設定指南

## 🔑 API 金鑰設定

### 1. 獲取 OpenWeatherMap API 金鑰

1. 前往 [OpenWeatherMap API](https://openweathermap.org/api)
2. 點擊 "Sign Up" 註冊免費帳號
3. 登入後前往 [API Keys](https://home.openweathermap.org/api_keys) 頁面
4. 複製您的 API 金鑰

### 2. 設定環境變數

在專案根目錄建立 `.env.local` 檔案：

```bash
# 建立環境變數檔案
touch .env.local
```

在 `.env.local` 中新增：

```env
OPENWEATHER_API_KEY=your_actual_api_key_here
```

**重要**: 請將 `your_actual_api_key_here` 替換為您實際的 API 金鑰。

### 3. 驗證設定

啟動開發伺服器：

```bash
npm run dev
```

如果設定正確，您應該能看到天氣資料正常載入。

## 🚀 部署到 Vercel

### 1. 準備部署

確保您的程式碼已推送到 GitHub 儲存庫。

### 2. Vercel 設定

1. 前往 [Vercel](https://vercel.com/)
2. 使用 GitHub 帳號登入
3. 點擊 "New Project"
4. 選擇您的天氣儀表板儲存庫
5. 在 "Environment Variables" 中新增：
   - `OPENWEATHER_API_KEY`: 您的 API 金鑰
6. 點擊 "Deploy"

### 3. 部署完成

部署完成後，您會獲得一個 Vercel 網址，例如：
`https://your-project-name.vercel.app`

## 🔧 故障排除

### 常見問題

**Q: 天氣資料無法載入**
A: 檢查 `.env.local` 檔案中的 API 金鑰是否正確設定

**Q: API 請求失敗**
A: 確認 OpenWeatherMap API 金鑰有效且未超過免費額度

**Q: 城市搜尋無結果**
A: 嘗試使用英文城市名稱，如 "Taipei" 而非 "台北"

**Q: 圖表無法顯示**
A: 檢查瀏覽器控制台是否有 JavaScript 錯誤

### 開發模式除錯

```bash
# 檢查環境變數
echo $OPENWEATHER_API_KEY

# 檢查依賴安裝
npm list

# 清理快取重新安裝
rm -rf node_modules package-lock.json
npm install
```

## 📞 支援

如果遇到問題，請檢查：
1. Node.js 版本是否為 18+ 
2. 所有依賴是否正確安裝
3. API 金鑰是否有效
4. 網路連線是否正常
