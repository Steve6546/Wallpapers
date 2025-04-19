# Modo Headless

Você pode executar o AZM AI com um único comando, sem iniciar a aplicação web.
Isso facilita a escrita de scripts e a automação de tarefas com o AZM AI.

Isso é diferente do [Modo CLI](cli-mode), que é interativo e melhor para desenvolvimento ativo.

## Com Python

Para executar o AZM AI no modo headless com Python:
1. Certifique-se de ter seguido as [instruções de configuração de desenvolvimento](https://github.com/All-Hands-AI/AZM AI/blob/main/Development.md).
2. Execute o seguinte comando:
```bash
poetry run python -m azm_ai.core.main -t "escreva um script bash que imprima oi"
```

Você precisará definir seu modelo, chave de API e outras configurações por meio de variáveis de ambiente
[ou do arquivo `config.toml`](https://github.com/All-Hands-AI/AZM AI/blob/main/config.template.toml).

## Com Docker

Para executar o AZM AI no modo Headless com Docker:

1. Defina as seguintes variáveis de ambiente no seu terminal:

- `WORKSPACE_BASE` para o diretório que você deseja que o AZM AI edite (Ex: `export WORKSPACE_BASE=$(pwd)/workspace`).
- `LLM_MODEL` para o modelo a ser usado (Ex: `export LLM_MODEL="anthropic/claude-3-5-sonnet-20241022"`).
- `LLM_API_KEY` para a chave de API (Ex: `export LLM_API_KEY="sk_test_12345"`).

2. Execute o seguinte comando Docker:

```bash
docker run -it \
    --pull=always \
    -e SANDBOX_RUNTIME_CONTAINER_IMAGE=docker.all-hands.dev/all-hands-ai/runtime:0.33-nikolaik \
    -e SANDBOX_USER_ID=$(id -u) \
    -e WORKSPACE_MOUNT_PATH=$WORKSPACE_BASE \
    -e LLM_API_KEY=$LLM_API_KEY \
    -e LLM_MODEL=$LLM_MODEL \
    -e LOG_ALL_EVENTS=true \
    -v $WORKSPACE_BASE:/opt/workspace_base \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v ~/.azm-ai-state:/.azm-ai-state \
    --add-host host.docker.internal:host-gateway \
    --name azm-ai-app-$(date +%Y%m%d%H%M%S) \
    docker.all-hands.dev/all-hands-ai/azm_ai:0.33 \
    python -m azm_ai.core.main -t "escreva um script bash que imprima oi"
```

## Configurações Avançadas do Headless

Para visualizar todas as opções de configuração disponíveis para o modo headless, execute o comando Python com a flag `--help`.

### Logs Adicionais

Para que o modo headless registre todas as ações do agente, execute no terminal: `export LOG_ALL_EVENTS=true`
