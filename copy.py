import os
import glob
import shutil

source_dir = r"C:\Users\User\.gemini\antigravity-ide\brain\b1020938-eb0d-435d-afad-99280d048445"
dest_dir = r"c:\Users\User\Desktop\demo cake tools\assets\images"

os.makedirs(dest_dir, exist_ok=True)

mappings = {
    "about_value_quality_*.png": "about-quality.png",
    "about_value_community_*.png": "about-community.png",
    "about_value_eco_*.png": "about-eco.png",
    "home_why_premium_*.png": "home-premium.png",
}

for pattern, new_name in mappings.items():
    search_path = os.path.join(source_dir, pattern)
    files = glob.glob(search_path)
    if files:
        files.sort(key=os.path.getmtime, reverse=True)
        shutil.copy2(files[0], os.path.join(dest_dir, new_name))
        print(f"Copied {files[0]} to {new_name}")
    else:
        print(f"No files found for {pattern}")
