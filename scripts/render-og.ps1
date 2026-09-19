Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$outputPath = Join-Path $projectRoot 'public/og-image-v2.png'
$logoPath = Join-Path $projectRoot 'src/assets/harborne-logo-light.png'

$canvas = New-Object System.Drawing.Bitmap(1200, 630)
$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$graphics.Clear([System.Drawing.Color]::FromArgb(19, 31, 36))

$gridPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(29, 43, 49), 1)
for ($x = 0; $x -le 1200; $x += 80) { $graphics.DrawLine($gridPen, $x, 0, $x, 630) }
for ($y = 0; $y -le 630; $y += 80) { $graphics.DrawLine($gridPen, 0, $y, 1200, $y) }

$copper = [System.Drawing.Color]::FromArgb(216, 169, 133)
$warmWhite = [System.Drawing.Color]::FromArgb(247, 244, 237)
$muted = [System.Drawing.Color]::FromArgb(182, 192, 190)
$copperBrush = New-Object System.Drawing.SolidBrush($copper)
$whiteBrush = New-Object System.Drawing.SolidBrush($warmWhite)
$mutedBrush = New-Object System.Drawing.SolidBrush($muted)
$copperPen = New-Object System.Drawing.Pen($copper, 2)

$logo = [System.Drawing.Image]::FromFile($logoPath)
$graphics.DrawImage($logo, 82, 64, 270, 71)
$graphics.DrawLine($copperPen, 84, 175, 162, 175)

$labelFont = New-Object System.Drawing.Font('Segoe UI', 16, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$titleFont = New-Object System.Drawing.Font('Segoe UI', 76, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$detailFont = New-Object System.Drawing.Font('Segoe UI', 28, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$footerFont = New-Object System.Drawing.Font('Segoe UI', 18, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)

$graphics.DrawString('B2B LEAD GENERATION', $labelFont, $copperBrush, 82, 195)
$graphics.DrawString('AI-led cold outbound.', $titleFont, $whiteBrush, 76, 236)
$graphics.DrawString('Qualified sales conversations through', $detailFont, $mutedBrush, 82, 363)
$graphics.DrawString('email and LinkedIn.', $detailFont, $mutedBrush, 82, 401)

$graphics.DrawLine($copperPen, 82, 505, 1118, 505)
$graphics.DrawString('ONE FEE. FULLY MANAGED OUTBOUND.', $footerFont, $copperBrush, 82, 530)
$graphics.DrawString('harborne-data.com', $footerFont, $mutedBrush, 889, 530)

$canvas.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$logo.Dispose()
$labelFont.Dispose()
$titleFont.Dispose()
$detailFont.Dispose()
$footerFont.Dispose()
$gridPen.Dispose()
$copperPen.Dispose()
$copperBrush.Dispose()
$whiteBrush.Dispose()
$mutedBrush.Dispose()
$graphics.Dispose()
$canvas.Dispose()
