import json

# Load data from JSON file
with open('mid222.json', 'r') as file:
    data = json.load(file)

# Filter the data
data = [item for item in data if not (item['worksite'] == "Three Landmark Towers" and item['floor'] == "Floor 2")]

# Save the modified data back to the JSON file
with open('mid222.json', 'w') as file:
    json.dump(data, file, indent=4)

print("JSON file has been updated!")
