#!/usr/bin/env python3
import os
import re

def replace_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace import statements
    modified_content = re.sub(r'from azm_ai\.', 'from azm_ai.', content)
    modified_content = re.sub(r'import azm_ai\.', 'import azm_ai.', modified_content)
    
    # Replace other occurrences of azm_ai
    modified_content = re.sub(r'azm_ai_logger', 'azm_ai_logger', modified_content)
    modified_content = re.sub(r'\'azm_ai\.', '\'azm_ai.', modified_content)
    modified_content = re.sub(r'\"azm_ai\.', '\"azm_ai.', modified_content)
    
    # Write back to the file if changes were made
    if content != modified_content:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(modified_content)
        return True
    return False

def process_directory(directory):
    count = 0
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.py'):
                file_path = os.path.join(root, file)
                if replace_in_file(file_path):
                    count += 1
    return count

if __name__ == '__main__':
    count = process_directory('azm_ai')
    print(f"Updated {count} files")