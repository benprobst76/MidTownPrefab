import requests

url = "https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/OSMO-USD"

headers = {
	"X-RapidAPI-Key": "35501bd9e7msh88bd097b451e982p1c6668jsn5d56bec3b2fb",
	"X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com"
}

response = requests.get(url, headers=headers)

print(response.json())