import sys
import os

file_path = "c:/Users/Home/.gemini/antigravity/playground/deep-pathfinder/index.html"

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Define the section to move: #process
    # Based on analysis: Line 140 (Index 139) to Line 263 (Index 262) is the section.
    # Line 264 (Index 263) is an empty line following it.
    
    start_idx = 139
    end_idx = 262
    delete_until_idx = 263 # Include the trailing empty line in deletion range

    # Validation
    if '<section id="process"' not in lines[start_idx]:
        print(f"FAILED: Expected <section id=\"process\"... at line {start_idx+1}")
        sys.exit(1)

    if '</section>' not in lines[end_idx]:
        print(f"FAILED: Expected </section> at line {end_idx+1}")
        sys.exit(1)

    # Capture block (excluding dragging empty line to avoid double spacing issues)
    block = lines[start_idx : end_idx + 1]

    # Delete block + trailing empty line
    del lines[start_idx : delete_until_idx + 1]

    # Calculate insertion point: After Certifications.
    # Certifications ended at Original Line 578 (Index 577).
    # We deleted (263 - 139 + 1) = 125 lines.
    # New index of Certs end = 577 - 125 = 452.
    ref_idx = 452

    if '</section>' not in lines[ref_idx]:
         print(f"FAILED: Expected </section> (Certs end) at line {ref_idx+1}")
         sys.exit(1)

    # Insert after ref_idx
    insert_pos = ref_idx + 1

    # Detect newline style
    newline = u'\r\n' if lines[0].endswith(u'\r\n') else u'\n'

    # Add padding newline
    payload = [newline] + block

    lines[insert_pos:insert_pos] = payload

    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)

    print("SUCCESS")

except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
