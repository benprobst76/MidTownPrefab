import json


with open('history.json', 'r') as file:
    data = json.load(file)

def fraction_to_decimal(frac=""):
    if not isinstance(frac, str) or not frac.strip():
        return 0

    # Handle mixed numbers like "1 1/2"
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

dimensions = ["d1A", "d2A", "d1B", "d2B", "dA", "dB", "dC", "dD", "dE", "dH", "dR", "dR_P", "dW"]

for item in data:
    try:
        thickness_value = fraction_to_decimal(item['thickness']) if item['side'] == 'Framed' else 0
        item['sum'] = 0.0

        for dim in dimensions:
            if dim in item and isinstance(item[dim], str) and item[dim].strip():
                decimal_value = fraction_to_decimal(item[dim])
                item['sum'] += decimal_value
                
        # If it's framed, add the thickness value to the sum once
        if item['side'] == 'Framed':
            item['sum'] += thickness_value
            
        item['sum'] = str(item['sum'])
                

    except ValueError:
        pass

# Save the modified data back to the JSON file
with open('history.json', 'w') as file:
    json.dump(data, file, indent=4)

print("JSON file has been updated!")
