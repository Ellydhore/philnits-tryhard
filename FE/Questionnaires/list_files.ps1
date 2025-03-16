# (Windows) Run this script only when adding a new pdf or output file is missing

# Define output file path
$outputFile = "../../Program/questionnaire_list.txt"

# Get all .pdf files in the current directory and save to the file
Get-ChildItem -Path . -Filter "*.pdf" -File | Select-Object -ExpandProperty Name | Out-File -Encoding UTF8 $outputFile

# Print success message
Write-Output "PDF file list saved to $outputFile"
