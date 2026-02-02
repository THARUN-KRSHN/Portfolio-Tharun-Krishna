
Add-Type -AssemblyName System.Drawing

$files = Get-Content "c:\Users\THARUN KRISHNA CU\OneDrive\Desktop\port\files_list.txt"
$results = @()

foreach ($file in $files) {
    if (Test-Path $file) {
        try {
            $img = [System.Drawing.Image]::FromFile($file)
            $results += [PSCustomObject]@{
                Path = $file
                Name = [System.IO.Path]::GetFileName($file)
                Width = $img.Width
                Height = $img.Height
                Aspect = $img.Width / $img.Height
            }
            $img.Dispose()
        } catch {
            Write-Host "Error reading $file"
        }
    }
}

$results | ConvertTo-Json -Depth 2 | Out-File "c:\Users\THARUN KRISHNA CU\OneDrive\Desktop\port\image_analysis.json" -Encoding utf8
