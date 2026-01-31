@echo off
echo Starting SecuraX Dashboard server...
echo.
echo Once the server starts, open your browser to: http://localhost:3000
echo.
echo If it asks to install 'serve', type 'y' and press Enter.
echo.
call npx -y serve .
pause
