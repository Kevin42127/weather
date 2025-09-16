# 🚀 天氣儀表板 - Vercel 部署文件

## 📁 部署文件說明

我已經為您創建了完整的 Vercel 部署文件：

### 📋 主要文件

1. **`VERCEL_DEPLOYMENT.md`** - 完整的部署指南
   - 詳細的部署步驟
   - 環境變數設定
   - 常見問題解決方案
   - 效能優化建議

2. **`deploy.sh`** - Linux/macOS 快速部署腳本
3. **`deploy.bat`** - Windows 快速部署腳本
4. **`vercel.json`** - Vercel 專案配置文件

## 🚀 快速開始

### Windows 用戶

```bash
# 執行 Windows 部署腳本
deploy.bat
```

### Linux/macOS 用戶

```bash
# 給腳本執行權限
chmod +x deploy.sh

# 執行部署腳本
./deploy.sh
```

### 手動部署

1. **安裝 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登入 Vercel**
   ```bash
   vercel login
   ```

3. **部署專案**
   ```bash
   vercel --prod
   ```

## ⚙️ 環境變數設定（可選）

專案預設使用 Open-Meteo API（免費），但您也可以設定其他 API：

```bash
# 透過 Vercel CLI 設定
vercel env add OPENWEATHER_API_KEY
vercel env add WEATHERAPI_KEY
```

## 📊 專案特色

- ✅ **完全免費** - 使用 Open-Meteo API，無需註冊
- ✅ **響應式設計** - 支援手機、平板、桌面
- ✅ **現代化技術** - Next.js 14 + TypeScript + Tailwind CSS
- ✅ **流暢動畫** - Framer Motion 動畫效果
- ✅ **智能搜尋** - 支援中英文城市搜尋
- ✅ **視覺化數據** - 天氣圖表和統計

## 🔗 相關連結

- **專案展示**: https://kevin-tau.vercel.app/
- **Vercel 文件**: https://vercel.com/docs
- **Next.js 部署**: https://nextjs.org/docs/deployment

## 📞 支援

如果遇到部署問題，請參考 `VERCEL_DEPLOYMENT.md` 中的詳細說明或聯繫支援團隊。

---

**準備好部署您的天氣儀表板了嗎？** 🎉
