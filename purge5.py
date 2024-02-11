import json

# Load data from JSON file
with open('order.json', 'r') as file:
    data = json.load(file)

with open('history.json', 'r') as file:
    dataH = json.load(file)

items_to_append = [item for item in data if (item['worksite'] == "Three Landmark Towers" and item['check'] == "1")]
dataH.extend(items_to_append)
with open('history.json', 'w') as file:
    json.dump(dataH, file, indent=4)

# Filter the data
data = [item for item in data if not (item['worksite'] == "Three Landmark Towers" and item['check'] == "1")]

# Save the modified data back to the JSON file
with open('order.json', 'w') as file:
    json.dump(data, file, indent=4)

print("JSON file has been updated!")
