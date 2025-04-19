#!/usr/bin/env python3
"""
Script to update references from 'azm_ai' to 'azm_ai' in the codebase.
"""

import os
import re
from pathlib import Path

# Define the replacements
replacements = [
    ('azm-ai-lm', 'azm-ai-lm'),
    ('azm_ai_aci', 'azm_ai_aci'),
    ('azm-ai-aci', 'azm-ai-aci'),
    ('azm-ai-sandbox', 'azm-ai-sandbox'),
    ('azm-ai-runtime', 'azm-ai-runtime'),
    ('azm-ai-workspace', 'azm-ai-workspace'),
    ('azm-ai-state', 'azm-ai-state'),
    ('azm-ai-app', 'azm-ai-app'),
    ('azm-ai-resolver', 'azm-ai-resolver'),
    ('azm-ai-memory-monitor', 'azm-ai-memory-monitor'),
    ('azm-ai-hello-world', 'azm-ai-hello-world'),
    ('azm-ai-default', 'azm-ai-default'),
    ('azm-ai-fix-issue', 'azm-ai-fix-issue'),
    ('azm_ai_instructions', 'azm_ai_instructions'),
    ('azm_ai_workspace', 'azm_ai_workspace'),
    ('azm_ai_file_store', 'azm_ai_file_store'),
    ('azm_ai_logger', 'azm_ai_logger'),
    ('azm_ai_resolver', 'azm_ai_resolver'),
    ('azm_ai_version', 'azm_ai_version'),
    ('azm-ai-invariant-server', 'azm-ai-invariant-server'),
    ('/azm_ai/', '/azm_ai/'),
    ('azm-ai@steve6546.com', 'azm-ai@steve6546.com'),
    ('azm-ai@runtime', 'azm-ai@runtime'),
    ('@azm-ai-agent', '@azm-ai-agent'),
    ('AZM AI', 'AZM AI'),
    ('azm_ai', 'azm_ai'),
    ('AZM AI', 'AZM AI'),
    ('AZM_AI', 'AZM_AI'),
]

# File extensions to process
extensions = [
    '.py', '.md', '.toml', '.yml', '.yaml', '.json', '.js', '.ts', '.tsx', 
    '.html', '.css', '.sh', '.txt'
]

# Directories to exclude
exclude_dirs = [
    '.git', 'node_modules', '__pycache__', '.venv', 'venv', 'env',
    'dist', 'build', '.pytest_cache', '.mypy_cache', '.ruff_cache'
]

def should_process_file(file_path):
    """Check if the file should be processed."""
    # Check if the file has one of the extensions we want to process
    if not any(str(file_path).endswith(ext) for ext in extensions):
        return False
    
    # Check if the file is in an excluded directory
    parts = file_path.parts
    for part in parts:
        if part in exclude_dirs:
            return False
    
    return True

def update_file_content(file_path):
    """Update the content of a file with the replacements."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
    except UnicodeDecodeError:
        print(f"Skipping binary file: {file_path}")
        return False
    
    original_content = content
    
    # Apply all replacements
    for old, new in replacements:
        content = content.replace(old, new)
    
    # Only write back if changes were made
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated: {file_path}")
        return True
    
    return False

def main():
    """Main function to update references in the codebase."""
    # Get the root directory of the project
    root_dir = Path('/workspace/azm-ai')
    
    # Count of files processed and updated
    files_processed = 0
    files_updated = 0
    
    # Walk through all files in the project
    for file_path in root_dir.glob('**/*'):
        if file_path.is_file() and should_process_file(file_path):
            files_processed += 1
            if update_file_content(file_path):
                files_updated += 1
    
    print(f"Processed {files_processed} files, updated {files_updated} files.")

if __name__ == "__main__":
    main()