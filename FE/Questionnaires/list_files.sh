#!/bin/bash

# (Linux) Run this script only when adding a new pdf or output file is missing
# Output file
output_file="../../Program/questionnaire_list.txt"

# List only .pdf files in the current directory and save to file
ls -p | grep -E "\.pdf$" >"$output_file"

# Print success message
echo "PDF file list saved to $output_file"
