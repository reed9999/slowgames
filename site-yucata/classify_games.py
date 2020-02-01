import requests
r = requests.get('https://yucata.de/en/Game/8000010')
r10 = requests.get('https://yucata.de/en/Game/Oregon/8000010')
r11 = requests.get('https://yucata.de/en/Game/Oregon/8000011')
r12 = requests.get('https://yucata.de/en/Game/Oregon/8000012')

print(r.text)
print(r10.text)
print(r11.text)
print(r12.text)