# Create fonts directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "public/fonts"

# Download Cal Sans font
$url = "https://raw.githubusercontent.com/calcom/font/main/fonts/webfonts/CalSans-SemiBold.woff2"
$output = "public/fonts/CalSans-SemiBold.woff2"
Write-Host "Downloading CalSans-SemiBold.woff2..."
Invoke-WebRequest -Uri $url -OutFile $output

Write-Host "Font file downloaded successfully!" 