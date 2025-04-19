#!/usr/bin/env python3

import os
import re
from pathlib import Path

def update_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace "openhands" with "azm_ai" (case-sensitive)
    updated_content = re.sub(r'openhands', 'azm_ai', content)
    
    # Replace "OpenHands" with "AZM AI" (case-sensitive)
    updated_content = re.sub(r'OpenHands', 'AZM AI', updated_content)
    
    # Replace ".openhands" with ".azm_ai" (case-sensitive)
    updated_content = re.sub(r'\.openhands', '.azm_ai', updated_content)
    
    # Replace "OH_" with "AZM_" (case-sensitive)
    updated_content = re.sub(r'OH_', 'AZM_', updated_content)
    
    # Replace "oh_" with "azm_" (case-sensitive)
    updated_content = re.sub(r'oh_', 'azm_', updated_content)
    
    # Replace "oh-" with "azm-" (case-sensitive)
    updated_content = re.sub(r'oh-', 'azm-', updated_content)
    
    if content != updated_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        print(f"Updated: {file_path}")
    else:
        print(f"No changes needed: {file_path}")

def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.mdx') or file.endswith('.md') or file.endswith('.puml') or file.endswith('.svg'):
                file_path = os.path.join(root, file)
                update_file(file_path)

if __name__ == "__main__":
    docs_dir = Path("/workspace/azm-ai/docs")
    process_directory(docs_dir)
    print("Documentation update completed.")