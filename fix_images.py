import re

with open('js/products-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

images = [
    'assets/images/piping-tips.png',
    'assets/images/fondant-tools.png',
    'assets/images/cake-molds.png',
    'assets/images/decorating-supplies.png',
    'assets/images/baking-essentials.png',
    'assets/images/packaging-display.png',
    'assets/images/about-quality.png',
    'assets/images/about-eco.png'
]

# Replace Unsplash URLs with local tool images
import random
random.seed(42)

def repl(m):
    return "image: '" + random.choice(images) + "'"

new_content = re.sub(r"image:\s*'https://images\.unsplash\.com/photo[^']*'", repl, content)

with open('js/products-data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)
