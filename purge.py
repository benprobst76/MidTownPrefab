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

        add = 0
        add2 = 0
        mul = 0

        # Determine add based on edge1
        if item['edge1'] == "Plain":
            add = 0
        elif item['edge1'] == "Tapered":
            add = 1.75
        elif item['edge1'] == "D200":
            add = 1.5
        elif item['edge1'] == "Fabric":
            add = 0

        # Determine add2 based on edge2
        if item['edge2'] == "Plain":
            add2 = 0
        elif item['edge2'] == "Tapered":
            add2 = 1.75
        elif item['edge2'] == "D200":
            add2 = 1.5

        # Determine multiplier based on thickness
        if item['part'] == "part1":
            if item['thickness'] == "1/2":
                mul = 6.66
            elif item['thickness'] == "5/8":
                mul = 7.35
        elif item['part'] == "part2":
            if item['thickness'] == "1/2":
                mul = 13.63
            elif item['thickness'] == "5/8":
                mul = 14.32
        elif item['part'] == "part3":
            if item['thickness'] == "1/2":
                mul = 10.64
            elif item['thickness'] == "5/8":
                mul = 11.33
        elif item['part'] == "part4":
            if item['thickness'] == "1/2":
                mul = 8.1
            elif item['thickness'] == "5/8":
                mul = 8.79
        elif item['part'] == "part15":
            if item['thickness'] == "1/2":
                mul = 8.1
            elif item['thickness'] == "5/8":
                mul = 8.79
        elif item['part'] == "part5":
            if item['thickness'] == "1/2":
                mul = 9.72
            elif item['thickness'] == "5/8":
                mul = 10.41
        elif item['part'] == "part6":
            if item['thickness'] == "1/2":
                mul = 6.88
            elif item['thickness'] == "5/8":
                mul = 7.57
        elif item['part'] == "part7":
            if item['thickness'] == "1/2":
                mul = 9.49
            elif item['thickness'] == "5/8":
                mul = 10.18
        elif item['part'] == "part8":
            if item['thickness'] == "1/2":
                mul = 14.89
            elif item['thickness'] == "5/8":
                mul = 15.58
        elif item['part'] == "part9":
            if item['thickness'] == "1/2":
                mul = 64.28
            elif item['thickness'] == "5/8":
                mul = 75.78
        elif item['part'] == "part10":
            if item['thickness'] == "1/2":
                mul = 32.14
            elif item['thickness'] == "5/8":
                mul = 37.89
        elif item['part'] == "part11":
            if item['thickness'] == "1/2":
                mul = 14.89
            elif item['thickness'] == "5/8":
                mul = 15.58
        elif item['part'] == "part12":
            if item['thickness'] == "1/2":
                mul = 12.94
            elif item['thickness'] == "5/8":
                mul = 13.63
        elif item['part'] == "part13":
            if item['thickness'] == "1/2":
                mul = 28.75
            elif item['thickness'] == "5/8":
                mul = 29.9
        elif item['part'] == "part14":
            if item['thickness'] == "1/2":
                mul = 28.75
            elif item['thickness'] == "5/8":
                mul = 29.9

        item['price'] = f"${(mul * mod_length + add + add2):.2f}"

    except ValueError:
        pass

# Save the modified data back to the JSON file
with open('history.json', 'w') as file:
    json.dump(data, file, indent=4)

print("JSON file has been updated!")
