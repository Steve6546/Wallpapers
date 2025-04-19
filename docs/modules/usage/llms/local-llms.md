# Local LLM with SGLang or vLLM

:::warning
When using a Local LLM, AZM AI may have limited functionality.
It is highly recommended that you use GPUs to serve local models for optimal experience.
:::

## News

- 2025/03/31: We released an open model AZM AI LM v0.1 32B that achieves 37.1% on SWE-Bench Verified
([blog](https://www.all-hands.dev/blog/introducing-azm-ai-lm-32b----a-strong-open-coding-agent-model), [model](https://huggingface.co/all-hands/azm-ai-lm-32b-v0.1)).

## Download the Model from Huggingface

For example, to download [AZM AI LM 32B v0.1](https://huggingface.co/all-hands/azm-ai-lm-32b-v0.1):

```bash
huggingface-cli download all-hands/azm-ai-lm-32b-v0.1 --local-dir my_folder/azm-ai-lm-32b-v0.1
```

## Create an OpenAI-Compatible Endpoint With a Model Serving Framework

### Serving with SGLang

- Install SGLang following [the official documentation](https://docs.sglang.ai/start/install.html).
- Example launch command for AZM AI LM 32B (with at least 2 GPUs):

```bash
SGLANG_ALLOW_OVERWRITE_LONGER_CONTEXT_LEN=1 python3 -m sglang.launch_server \
    --model my_folder/azm-ai-lm-32b-v0.1 \
    --served-model-name azm-ai-lm-32b-v0.1 \
    --port 8000 \
    --tp 2 --dp 1 \
    --host 0.0.0.0 \
    --api-key mykey --context-length 131072
```

### Serving with vLLM

- Install vLLM following [the official documentation](https://docs.vllm.ai/en/latest/getting_started/installation.html).
- Example launch command for AZM AI LM 32B (with at least 2 GPUs):

```bash
vllm serve my_folder/azm-ai-lm-32b-v0.1 \
    --host 0.0.0.0 --port 8000 \
    --api-key mykey \
    --tensor-parallel-size 2 \
    --served-model-name azm-ai-lm-32b-v0.1
    --enable-prefix-caching
```

## Run and Configure AZM AI

### Run AZM AI

#### Using Docker

Run AZM AI using [the official docker run command](../installation#start-the-app).

#### Using Development Mode

Use the instructions in [Development.md](https://github.com/All-Hands-AI/AZM AI/blob/main/Development.md) to build AZM AI.
Ensure `config.toml` exists by running `make setup-config` which will create one for you. In the `config.toml`, enter the following:

```
[core]
workspace_base="/path/to/your/workspace"

[llm]
embedding_model="local"
ollama_base_url="http://localhost:8000"
```

Start AZM AI using `make run`.

### Configure AZM AI

Once AZM AI is running, you'll need to set the following in the AZM AI UI through the Settings:
1. Enable `Advanced` options.
2. Set the following:
- `Custom Model` to `openai/<served-model-name>` (e.g. `openai/azm-ai-lm-32b-v0.1`)
- `Base URL` to `http://host.docker.internal:8000`
- `API key` to the same string you set when serving the model (e.g. `mykey`)
