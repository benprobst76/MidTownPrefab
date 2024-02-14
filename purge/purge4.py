import json


def add_fraction_and_format(original):
    def add_and_convert(numerator, denominator=8):
        numerator += 1
        if numerator == 8:
            return 1, "0"
        return 0, f"{numerator}/8"
    if '.' in original:
        whole_part, fraction_part = original.split('.')
        numerator = int(fraction_part[0]) * (8 // int(fraction_part[2]))
    else:
        whole_part = original
        numerator = 0
    increment, new_fraction = add_and_convert(numerator)
    if new_fraction == "2/8":
        new_fraction = "1/4"
    elif new_fraction == "4/8":
        new_fraction = "1/2"
    elif new_fraction == "6/8":
        new_fraction = "3/4"

    updated_whole_part = int(whole_part) + increment
    if new_fraction == "0":
        return str(updated_whole_part)
    else:
        return f"{updated_whole_part}.{new_fraction}"


# Load data from JSON file
with open('mid222.json', 'r') as file:
    data = json.load(file)

# Filter the data
#data = [item for item in data if not (item['worksite'] == "Three Landmark Towers" and item['floor'] == "Floor 2")]

for item in data:
    try:
        if item['worksite'] == "Three Landmark Towers":
            item['dB'] = add_fraction_and_format(item['dB'])
                
    except ValueError:
        pass

# Save the modified data back to the JSON file
with open('mid222.json', 'w') as file:
    json.dump(data, file, indent=4)

print("JSON file has been updated!")
