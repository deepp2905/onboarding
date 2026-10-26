@echo off
rem One-click launcher: installs dependencies on first run, then starts the dev server and opens the browser.
cd /d "%~dp0"
where npm >nul 2>nul || (echo Node.js is not installed. Get it from https://nodejs.org and run this again. & pause & exit /b 1)
if not exist node_modules (
  echo Installing dependencies...
  call npm install || (echo npm install failed. & pause & exit /b 1)
)
call npm run dev -- --open
pause
