import urllib.request
import re

url = "https://unsplash.com/s/photos/baking-tools"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    # Find image URLs like https://images.unsplash.com/photo-xxx?xxx
    matches = re.findall(r'https://images.unsplash.com/photo-[a-zA-Z0-9\-]+', html)
    unique_matches = list(set(matches))
    print(f"Found {len(unique_matches)} unique images")
    for m in unique_matches[:10]:
        print(m)
except Exception as e:
    print(e)
