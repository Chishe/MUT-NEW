@echo off
cd /d C:\Users\USER\Documents\MUT-NEW

REM Start PM2 with ecosystem file
pm2 start ecosystem.config.js

REM Optional: Save process list
pm2 save

pause