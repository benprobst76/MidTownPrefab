import json
from datetime import datetime

def read_json_file(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

def write_json_file(data, file_path):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)

def parse_time(time_str):
    # Adjust the format if needed to match your time format in JSON
    return datetime.strptime(time_str, "%H:%M / %Y-%m-%d")

def sort_orders_by_time(orders):
    return sorted(orders, key=lambda x: parse_time(x['time']))

def main():
    file_path = 'order.json'
    orders = read_json_file(file_path)
    sorted_orders = sort_orders_by_time(orders)
    write_json_file(sorted_orders, file_path)

if __name__ == "__main__":
    main()
