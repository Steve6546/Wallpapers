#!/bin/bash

# Create a new virtual environment with the correct name
echo "Creating new virtual environment with AZM AI name..."
python -m venv /azm_ai/poetry/azm-ai-venv-py3.12

# Install dependencies in the new environment
echo "Installing dependencies in the new environment..."
/azm_ai/poetry/azm-ai-venv-py3.12/bin/pip install -e /workspace/azm-ai

# Update the shebang in Python scripts
echo "Updating shebang in Python scripts..."
find /workspace/azm-ai -type f -name "*.py" -exec sed -i '1s|^#!.*/openhands/.*|#!/usr/bin/env python3|' {} \;

echo "Python environment update completed."