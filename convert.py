import os
import glob
from PIL import Image

src_dir = r"E:\Origo\Desenvolvimento\Paula Magrin Terapeuta\Depoimentos\Depoimentos escritos"
dst_dir = os.path.join(src_dir, "webp")

if not os.path.exists(dst_dir):
    os.makedirs(dst_dir)

valid_extensions = [".png", ".jpg", ".jpeg"]
files = []
for ext in valid_extensions:
    files.extend(glob.glob(os.path.join(src_dir, "*" + ext)))
    files.extend(glob.glob(os.path.join(src_dir, "*" + ext.upper())))

for file_path in files:
    filename = os.path.basename(file_path)
    name, _ = os.path.splitext(filename)
    dst_path = os.path.join(dst_dir, name + ".webp")
    
    try:
        with Image.open(file_path) as img:
            img.save(dst_path, "WEBP", quality=85)
        print(f"Converted {filename} to {name}.webp")
    except Exception as e:
        print(f"Failed to convert {filename}: {e}")
