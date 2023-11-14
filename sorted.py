import csv
import re

# Specify the input and output filenames
input_file = "DataDraft2.csv"
output_file = "sorted_output.csv"

# Specify the column to sort by (0-based index)
sort_column = 6  # 7th column

# Function to convert a string with commas to a numeric value or return 0 for non-numeric values
def parse_numeric_with_commas(s):
    numeric_part = re.sub(r'[^\d]', '', s)
    return int(numeric_part) if numeric_part else 0

# Read the CSV file with a custom delimiter (',' in this case)
with open(input_file, 'r') as csv_file:
    reader = csv.reader(csv_file, delimiter=',')
    data = list(reader)

# Sort the data based on the specified column in descending order
data.sort(key=lambda x: parse_numeric_with_commas(x[sort_column]), reverse=True)

# Write the sorted data to the output CSV file
with open(output_file, 'w', newline='') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerows(data)

print(f"CSV file '{input_file}' sorted by column {sort_column} in descending order and saved as '{output_file}'.")
