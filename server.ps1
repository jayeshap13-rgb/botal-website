$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 4173
$listener = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Parse("127.0.0.1"), $port)
$listener.Start()
Write-Host "Botal site running at http://localhost:$port/"

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".css" = "text/css; charset=utf-8"
  ".js" = "application/javascript; charset=utf-8"
  ".jsx" = "text/babel; charset=utf-8"
  ".jpg" = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".png" = "image/png"
  ".svg" = "image/svg+xml"
}

while ($true) {
  $client = $listener.AcceptTcpClient()
  try {
    $stream = $client.GetStream()
    $reader = [IO.StreamReader]::new($stream)
    $requestLine = $reader.ReadLine()
    while ($reader.ReadLine()) {}

    $target = "index.html"
    if ($requestLine -match "^[A-Z]+\s+([^\s?]+)") {
      $target = [Uri]::UnescapeDataString($matches[1].TrimStart("/"))
      if ([string]::IsNullOrWhiteSpace($target)) {
        $target = "index.html"
      }
    }

    $localPath = Join-Path $root ($target -replace "/", [IO.Path]::DirectorySeparatorChar)
    if (-not (Test-Path -LiteralPath $localPath -PathType Leaf)) {
      $status = "404 Not Found"
      $contentType = "text/plain; charset=utf-8"
      $body = [Text.Encoding]::UTF8.GetBytes("Not found")
    } else {
      $status = "200 OK"
      $extension = [IO.Path]::GetExtension($localPath).ToLowerInvariant()
      $contentType = if ($mime.ContainsKey($extension)) { $mime[$extension] } else { "application/octet-stream" }
      $body = [IO.File]::ReadAllBytes($localPath)
    }

    $headers = "HTTP/1.1 $status`r`nContent-Type: $contentType`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
    $headerBytes = [Text.Encoding]::ASCII.GetBytes($headers)
    $stream.Write($headerBytes, 0, $headerBytes.Length)
    $stream.Write($body, 0, $body.Length)
  } finally {
    $client.Close()
  }
}
