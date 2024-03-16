import csv
import secrets
import string

def generate_unique_id():
    """Generate a unique 16-character alphanumeric ID."""
    alphabet = string.ascii_letters + string.digits  # Include both letters and numbers
    return ''.join(secrets.choice(alphabet) for _ in range(16))

def check_and_add_unique_id(unique_ids, row):
    """Generate a unique ID and ensure it's not already used."""
    unique_id = generate_unique_id()
    while unique_id in unique_ids:
        unique_id = generate_unique_id()
    unique_ids.add(unique_id)
    row['id'] = unique_id

def modify_csv(input_file, output_file):
    unique_ids = set()  # Keep track of all unique IDs generated to ensure no duplicates
    with open(input_file, mode='r', encoding='utf-8') as infile, open(output_file, mode='w', encoding='utf-8', newline='') as outfile:
        reader = csv.DictReader(infile)
        fieldnames = ['id'] + [field for field in reader.fieldnames if field != 'url']
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        
        writer.writeheader()
        
        for row in reader:
            check_and_add_unique_id(unique_ids, row)
            del row['url']  # Remove the 'url' field entirely
            writer.writerow(row)

# Specify your input and output file names
input_filename = 'products_asos.csv'
output_filename = 'products.csv'

# Run the script to modify the CSV
modify_csv(input_filename, output_filename)