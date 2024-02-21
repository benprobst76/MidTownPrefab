import json

# Load data from JSON file
with open('order.json', 'r') as file:
    data = json.load(file)

with open('history.json', 'r') as file:
    dataH = json.load(file)

units = ['200-1', '200-2', '201-1', '201-2', '201-3', '202-1', '202-2', '202-3', '203-1', '203-2', '204-1']

items_to_append = [item for item in data if (item['worksite'] == "Wesley Wood Tower" and item['unit'] in units and (item['part'] == "part1" or item['part'] == "part7"))]
dataH.extend(items_to_append)
with open('history.json', 'w') as file:
    json.dump(dataH, file, indent=4)

# Filter the data
data = [item for item in data if not (item['worksite'] == "Wesley Wood Tower" and item['unit'] in units and (item['part'] == "part1" or item['part'] == "part7"))]

# Save the modified data back to the JSON file
with open('order.json', 'w') as file:
    json.dump(data, file, indent=4)

print("JSON file has been updated!")
