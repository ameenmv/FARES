#!/usr/bin/env python3
"""
Crop portfolio PDF page images to extract only the design visuals.

Handles 3 layout types:
1. Cover pages (first page of each project): Text on left, image on right -> crop right half
2. Two-image pages: Two images side by side with white gap -> split into 2 images
3. Full-bleed pages: Single image with optional white border -> trim border
"""

import os
import sys
from PIL import Image

# Source and output directories
SRC_DIR = "public/projects/full-pages"
OUT_DIR = "public/projects/cropped"

# Cover pages (first page of each project) - these have text on the left, image on the right
COVER_PAGES = [5, 9, 14, 18, 23, 28, 32, 36, 41, 46, 50, 54, 58, 64, 68, 73, 77, 80, 85, 90, 95]

# Page 101 is the last page in the PDF (possibly a blank/credits page)
SKIP_PAGES = [1, 2, 3, 4, 101]  # intro/credits pages not tied to projects

# White threshold for detecting borders and gaps
WHITE_THRESHOLD = 235


def is_white_pixel(pixel, threshold=WHITE_THRESHOLD):
    """Check if a pixel is white-ish."""
    return all(c > threshold for c in pixel[:3])


def find_content_bounds(img):
    """Find the bounding box of non-white content in the image."""
    w, h = img.size
    
    # Find top bound
    top = 0
    for y in range(h):
        row_pixels = [img.getpixel((x, y))[:3] for x in range(0, w, max(1, w // 50))]
        if not all(all(c > WHITE_THRESHOLD for c in p) for p in row_pixels):
            top = y
            break
    
    # Find bottom bound
    bottom = h - 1
    for y in range(h - 1, -1, -1):
        row_pixels = [img.getpixel((x, y))[:3] for x in range(0, w, max(1, w // 50))]
        if not all(all(c > WHITE_THRESHOLD for c in p) for p in row_pixels):
            bottom = y
            break
    
    # Find left bound
    left = 0
    for x in range(w):
        col_pixels = [img.getpixel((x, y))[:3] for y in range(0, h, max(1, h // 50))]
        if not all(all(c > WHITE_THRESHOLD for c in p) for p in col_pixels):
            left = x
            break
    
    # Find right bound
    right = w - 1
    for x in range(w - 1, -1, -1):
        col_pixels = [img.getpixel((x, y))[:3] for y in range(0, h, max(1, h // 50))]
        if not all(all(c > WHITE_THRESHOLD for c in p) for p in col_pixels):
            right = x
            break
    
    return left, top, right + 1, bottom + 1


def find_vertical_gap(img, search_start, search_end):
    """Find a vertical white gap in the image between search_start and search_end x-coordinates."""
    w, h = img.size
    
    # Sample multiple rows to detect the gap
    sample_rows = [h * i // 10 for i in range(1, 10)]
    
    gap_start = None
    gap_end = None
    
    for x in range(search_start, search_end):
        is_gap_col = True
        for y in sample_rows:
            pixel = img.getpixel((x, y))[:3]
            if not all(c > WHITE_THRESHOLD for c in pixel):
                is_gap_col = False
                break
        
        if is_gap_col and gap_start is None:
            gap_start = x
        elif not is_gap_col and gap_start is not None:
            gap_end = x
            # Only consider gaps wider than 10px as real gaps
            if gap_end - gap_start > 10:
                return gap_start, gap_end
            else:
                gap_start = None
                gap_end = None
    
    # If gap extends to end
    if gap_start is not None and gap_end is None:
        return gap_start, search_end
    
    return None, None


def crop_cover_page(img, page_num):
    """Crop cover page: extract the right-side image."""
    w, h = img.size
    
    # The image is on the right side
    # Find where the white text area ends and image begins
    # Search from center going right to find the image start
    mid = w // 2
    
    # Find the image region on the right
    # First, find the right content bounds
    right_start = mid
    for x in range(mid, w):
        # Check if this column has non-white content in a significant portion
        col_pixels = [img.getpixel((x, y))[:3] for y in range(0, h, h // 20)]
        non_white_count = sum(1 for p in col_pixels if not all(c > WHITE_THRESHOLD for c in p))
        if non_white_count > len(col_pixels) * 0.3:  # More than 30% non-white
            right_start = x
            break
    
    # Find bounds of the right image
    # Crop to the right portion and find its content bounds
    right_portion = img.crop((right_start, 0, w, h))
    left_b, top_b, right_b, bottom_b = find_content_bounds(right_portion)
    
    # Final crop coordinates in original image
    final_left = right_start + left_b
    final_top = top_b
    final_right = right_start + right_b
    final_bottom = bottom_b
    
    # Add a small margin
    margin = 2
    final_left = max(0, final_left - margin)
    final_top = max(0, final_top - margin)
    final_right = min(w, final_right + margin)
    final_bottom = min(h, final_bottom + margin)
    
    cropped = img.crop((final_left, final_top, final_right, final_bottom))
    return [cropped]


def is_mostly_white(img, threshold=0.70):
    """Check if an image is mostly white (text page, not a design image)."""
    w, h = img.size
    total = 0
    white = 0
    for y in range(0, h, max(1, h // 15)):
        for x in range(0, w, max(1, w // 15)):
            r, g, b = img.getpixel((x, y))[:3]
            total += 1
            if r > WHITE_THRESHOLD and g > WHITE_THRESHOLD and b > WHITE_THRESHOLD:
                white += 1
    return (white / total) >= threshold


def crop_detail_page(img, page_num):
    """Crop detail page: detect if it has 2 images or 1, and extract accordingly."""
    w, h = img.size
    
    # First, find content bounds (trim white border)
    left_b, top_b, right_b, bottom_b = find_content_bounds(img)
    
    # Trim the image to content
    content = img.crop((left_b, top_b, right_b, bottom_b))
    cw, ch = content.size
    
    # Check for vertical gap in the middle area
    search_start = int(cw * 0.25)
    search_end = int(cw * 0.75)
    gap_start, gap_end = find_vertical_gap(content, search_start, search_end)
    
    if gap_start is not None and gap_end is not None:
        # Found a gap - split into left and right
        left_img = content.crop((0, 0, gap_start, ch))
        right_img = content.crop((gap_end, 0, cw, ch))
        
        left_is_text = is_mostly_white(left_img)
        right_is_text = is_mostly_white(right_img)
        
        if left_is_text and not right_is_text:
            # Text on left, image on right -> only keep right
            # Use aggressive left trim: find where substantial image content begins
            rw, rh = right_img.size
            trim_left = 0
            for x in range(rw):
                col_pixels = [right_img.getpixel((x, y))[:3] for y in range(0, rh, max(1, rh // 20))]
                non_white = sum(1 for p in col_pixels if not all(c > WHITE_THRESHOLD for c in p))
                if non_white > len(col_pixels) * 0.3:  # >30% non-white = real image content
                    trim_left = x
                    break
            # Also trim top/bottom/right whitespace
            sl, st, sr, sb = find_content_bounds(right_img)
            final_left = max(sl, trim_left)
            trimmed = right_img.crop((final_left, st, sr, sb))
            print(f"    [TEXT+IMAGE] Keeping right side only")
            return [trimmed]
        elif right_is_text and not left_is_text:
            # Image on left, text on right -> only keep left
            sl, st, sr, sb = find_content_bounds(left_img)
            trimmed = left_img.crop((sl, st, sr, sb))
            print(f"    [TEXT+IMAGE] Keeping left side only")
            return [trimmed]
        elif left_is_text and right_is_text:
            # Both are text - skip this page entirely
            print(f"    [SKIP] Both sides are text")
            return []
        else:
            # Both are actual images - keep both
            results = []
            for sub_img in [left_img, right_img]:
                sl, st, sr, sb = find_content_bounds(sub_img)
                trimmed = sub_img.crop((sl, st, sr, sb))
                if trimmed.size[0] > 100 and trimmed.size[1] > 100:
                    results.append(trimmed)
            return results if results else [content]
    else:
        # Single image - just return the trimmed content
        return [content]


def process_page(page_num):
    """Process a single page and return the cropped images."""
    filename = f"page-{str(page_num).zfill(3)}.jpg"
    filepath = os.path.join(SRC_DIR, filename)
    
    if not os.path.exists(filepath):
        print(f"  SKIP: {filename} not found")
        return []
    
    img = Image.open(filepath)
    
    if page_num in COVER_PAGES:
        return crop_cover_page(img, page_num)
    else:
        return crop_detail_page(img, page_num)


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    
    # Track output for each project
    project_pages = {}
    
    # Project definitions: slug -> (start_page, end_page)
    projects = {
        'oku': (5, 8),
        'garnish': (9, 13),
        'palmo': (14, 17),
        'vlt': (18, 22),
        'qatfah-almadinah': (23, 27),
        'wekad': (28, 31),
        'after': (32, 35),
        'irth-alnakheel': (36, 40),
        'flp-burger': (41, 45),
        'palm-rise': (46, 49),
        'toucan': (50, 53),
        'safeeha': (54, 57),
        'yalla-khobar': (58, 63),
        'eventi': (64, 67),
        'durma': (68, 72),
        'al-sharqiyah-race': (73, 76),
        'race-of-emotions': (77, 79),
        'loca-opinion': (80, 84),
        'olabs-anniversary': (85, 89),
        'befine-ramadan': (90, 94),
        'opinion-eid': (95, 100),
    }
    
    total_output = 0
    
    for slug, (start, end) in projects.items():
        project_dir = os.path.join(OUT_DIR, slug)
        os.makedirs(project_dir, exist_ok=True)
        
        img_index = 1
        print(f"\n=== {slug} (pages {start}-{end}) ===")
        
        for page_num in range(start, end + 1):
            print(f"  Processing page-{str(page_num).zfill(3)}...")
            cropped_images = process_page(page_num)
            
            for cropped in cropped_images:
                output_name = f"{img_index:02d}.jpg"
                output_path = os.path.join(project_dir, output_name)
                cropped.save(output_path, "JPEG", quality=92)
                print(f"    -> {output_path} ({cropped.size[0]}x{cropped.size[1]})")
                img_index += 1
                total_output += 1
        
        project_pages[slug] = img_index - 1
    
    print(f"\n{'='*50}")
    print(f"Total images generated: {total_output}")
    print(f"\nPer-project image counts:")
    for slug, count in project_pages.items():
        print(f"  {slug}: {count} images")


if __name__ == "__main__":
    main()
