#!/bin/bash

# 天氣儀表板 - Vercel 快速部署腳本
# 使用方法: ./deploy.sh

echo "🚀 開始部署天氣儀表板到 Vercel..."

# 檢查是否已安裝 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI 未安裝，正在安裝..."
    npm install -g vercel
fi

# 檢查是否已登入
if ! vercel whoami &> /dev/null; then
    echo "🔐 請先登入 Vercel..."
    vercel login
fi

# 建置專案
echo "📦 正在建置專案..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 建置成功！"
else
    echo "❌ 建置失敗，請檢查錯誤訊息"
    exit 1
fi

# 部署到 Vercel
echo "🌐 正在部署到 Vercel..."
vercel --prod

echo "🎉 部署完成！"
echo "📱 您可以在 Vercel Dashboard 中查看部署狀態"
echo "🔗 專案展示: https://kevin-tau.vercel.app/"
