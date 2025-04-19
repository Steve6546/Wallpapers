# Repository Customization

You can customize how AZM AI works with your repository by creating a
`.azm_ai` directory at the root level.

## Microagents
You can use microagents to extend the AZM AI prompts with information
about your project and how you want AZM AI to work. See
[Repository Microagents](../prompting/microagents-repo) for more information.


## Setup Script
You can add `.azm_ai/setup.sh`, which will be run every time AZM AI begins
working with your repository. This is a good place to install dependencies, set
environment variables, etc.

For example:
```bash
#!/bin/bash
export MY_ENV_VAR="my value"
sudo apt-get update
sudo apt-get install -y lsof
cd frontend && npm install ; cd ..
```
