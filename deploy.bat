@echo off
REM 天氣儀表板 - Vercel 快速部署腳本 (Windows)
REM 使用方法: deploy.bat

echo 🚀 開始部署天氣儀表板到 Vercel...

REM 檢查是否已安裝 Vercel CLI
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI 未安裝，正在安裝...
    npm install -g vercel
)

REM 檢查是否已登入
vercel whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo 🔐 請先登入 Vercel...
    vercel login
)

REM 建置專案
echo 📦 正在建置專案...
npm run build

if %errorlevel% equ 0 (
    echo ✅ 建置成功！
) else (
    echo ❌ 建置失敗，請檢查錯誤訊息
    pause
    exit /b 1
)

REM 部署到 Vercel
echo 🌐 正在部署到 Vercel...
vercel --prod

echo 🎉 部署完成！
echo 📱 您可以在 Vercel Dashboard 中查看部署狀態
echo 🔗 專案展示: https://kevin-tau.vercel.app/
pause
