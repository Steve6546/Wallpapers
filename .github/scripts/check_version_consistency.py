#!/usr/bin/env python3
import os
import re
import sys
from typing import Set, Tuple


def find_version_references(directory: str) -> Tuple[Set[str], Set[str]]:
    azm_ai_versions = set()
    runtime_versions = set()

    version_pattern_azm_ai = re.compile(r'azm_ai:(\d{1})\.(\d{2})')
    version_pattern_runtime = re.compile(r'runtime:(\d{1})\.(\d{2})')

    for root, _, files in os.walk(directory):
        # Skip .git directory and docs/build directory
        if '.git' in root or 'docs/build' in root:
            continue

        for file in files:
            if file.endswith(
                ('.md', '.yml', '.yaml', '.txt', '.html', '.py', '.js', '.ts')
            ):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()

                        # Find all azm_ai version references
                        matches = version_pattern_azm_ai.findall(content)
                        if matches:
                            print(f'Found azm_ai version {matches} in {file_path}')
                            azm_ai_versions.update(matches)

                        # Find all runtime version references
                        matches = version_pattern_runtime.findall(content)
                        if matches:
                            print(f'Found runtime version {matches} in {file_path}')
                            runtime_versions.update(matches)
                except Exception as e:
                    print(f'Error reading {file_path}: {e}', file=sys.stderr)

    return azm_ai_versions, runtime_versions


def main():
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
    print(f'Checking version consistency in {repo_root}')
    azm_ai_versions, runtime_versions = find_version_references(repo_root)

    print(f'Found azm_ai versions: {sorted(azm_ai_versions)}')
    print(f'Found runtime versions: {sorted(runtime_versions)}')

    exit_code = 0

    if len(azm_ai_versions) > 1:
        print('Error: Multiple azm_ai versions found:', file=sys.stderr)
        print('Found versions:', sorted(azm_ai_versions), file=sys.stderr)
        exit_code = 1
    elif len(azm_ai_versions) == 0:
        print('Warning: No azm_ai version references found', file=sys.stderr)

    if len(runtime_versions) > 1:
        print('Error: Multiple runtime versions found:', file=sys.stderr)
        print('Found versions:', sorted(runtime_versions), file=sys.stderr)
        exit_code = 1
    elif len(runtime_versions) == 0:
        print('Warning: No runtime version references found', file=sys.stderr)

    sys.exit(exit_code)


if __name__ == '__main__':
    main()
