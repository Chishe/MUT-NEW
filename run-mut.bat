@echo off
title MUT SYSTEM STARTUP

echo ===============================
echo Starting MUT System...
echo ===============================

cd /d C:\Users\USER\Documents\MUT-NEW

echo.
echo ==== INSTALL ====
call npm install

echo.
echo ==== BUILD ====
call npm run build

echo.
echo ==== START / RESTART ALL ====
pm2 startOrRestart ecosystem.config.js

echo.
echo ==== SAVE ====
pm2 save

echo.
echo ==== STATUS ====
pm2 list

echo.
echo ===============================
echo SYSTEM STARTED
echo ===============================
pause