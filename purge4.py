import json

# Load data from JSON file
with open('order.json', 'r') as file:
    data = json.load(file)

# Filter the data
#data = [item for item in data if not (item['worksite'] == "220 cressview " and item['checktime'] != "")]

for item in data:
    try:
        item['img'] = ''
                
    except ValueError:
        pass

# Save the modified data back to the JSON file
with open('order.json', 'w') as file:
    json.dump(data, file, indent=4)

print("JSON file has been updated!")
