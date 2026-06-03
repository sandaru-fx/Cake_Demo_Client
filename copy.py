import os
import glob
import shutil

source_dir = r"C:\Users\User\.gemini\antigravity-ide\brain\b1020938-eb0d-435d-afad-99280d048445"
dest_dir = r"c:\Users\User\Desktop\demo cake tools\assets\images"

os.makedirs(dest_dir, exist_ok=True)

mappings = {
    "piping_tips_*.png": "piping-tips.png",
    "fondant_tools_*.png": "fondant-tools.png",
    "cake_molds_*.png": "cake-molds.png",
    "decorating_supplies_*.png": "decorating-supplies.png",
    "baking_essentials_*.png": "baking-essentials.png",
    "packaging_display_*.png": "packaging-display.png",
}

for pattern, new_name in mappings.items():
    search_path = os.path.join(source_dir, pattern)
    files = glob.glob(search_path)
    if files:
        # take the most recent
        files.sort(key=os.path.getmtime, reverse=True)
        shutil.copy2(files[0], os.path.join(dest_dir, new_name))
        print(f"Copied {files[0]} to {new_name}")
    else:
        print(f"No files found for {pattern}")
