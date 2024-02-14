import json


with open('history.json', 'r') as file:
    data = json.load(file)


def fraction_to_decimal(frac=""):
    if not isinstance(frac, str) or not frac.strip():
        return 0

    # Handle mixed numbers like "1.1/2"
    if '.' in frac:
        whole, frac = frac.split('.')
        return float(whole) + fraction_to_decimal(frac)

    # Handle pure fractions and decimals
    if '/' in frac:
        num, denom = [int(val) for val in frac.split('/')]
        return num / denom
    else:
        # Handle pure decimals and whole numbers
        return float(frac)


for item in data:
    try:
        mod_length = fraction_to_decimal(item['length'])

        if fraction_to_decimal(item['length']) > 10:
            if fraction_to_decimal(item['length']) <= 120:
                mod_length = 10
            if fraction_to_decimal(item['length']) <= 108:
                mod_length = 9
            if fraction_to_decimal(item['length']) <= 96:
                mod_length = 8         
        item['length2'] = str(int(mod_length))
                
    except ValueError:
        pass

# Save the modified data back to the JSON file
with open('history.json', 'w') as file:
    json.dump(data, file, indent=4)

print("JSON file has been updated!")
