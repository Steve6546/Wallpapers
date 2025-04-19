# Usando a Ação do GitHub AZM AI

Este guia explica como usar a Ação do GitHub AZM AI, tanto dentro do repositório AZM AI quanto em seus próprios projetos.

## Usando a Ação no Repositório AZM AI

Para usar a Ação do GitHub AZM AI em um repositório, você pode:

1. Criar uma issue no repositório.
2. Adicionar a etiqueta `fix-me` à issue ou deixar um comentário na issue começando com `@azm-ai-agent`.

A ação será acionada automaticamente e tentará resolver a issue.

## Instalando a Ação em um Novo Repositório

Para instalar a Ação do GitHub AZM AI em seu próprio repositório, siga o [README para o AZM AI Resolver](https://github.com/All-Hands-AI/AZM AI/blob/main/azm_ai/resolver/README.md).

## Dicas de Uso

### Resolução Iterativa

1. Crie uma issue no repositório.
2. Adicione a etiqueta `fix-me` à issue ou deixe um comentário começando com `@azm-ai-agent`.
3. Revise a tentativa de resolver a issue verificando o pull request.
4. Faça um acompanhamento com feedback por meio de comentários gerais, comentários de revisão ou comentários de thread inline.
5. Adicione a etiqueta `fix-me` ao pull request ou aborde um comentário específico começando com `@azm-ai-agent`.

### Etiqueta versus Macro

- Etiqueta (`fix-me`): Solicita ao AZM AI que aborde a issue ou pull request **inteiro**.
- Macro (`@azm-ai-agent`): Solicita ao AZM AI que considere apenas a descrição da issue/pull request e **o comentário específico**.

## Configurações Avançadas

### Adicionar configurações personalizadas do repositório

Você pode fornecer instruções personalizadas para o AZM AI seguindo o [README para o resolver](https://github.com/All-Hands-AI/AZM AI/blob/main/azm_ai/resolver/README.md#providing-custom-instructions).

### Configurações personalizadas

O GitHub resolver verificará automaticamente se há [segredos do repositório](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions?tool=webui#creating-secrets-for-a-repository) ou [variáveis do repositório](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables#creating-configuration-variables-for-a-repository) válidos para personalizar seu comportamento.
As opções de personalização que você pode definir são:

| **Nome do atributo**             | **Tipo** | **Finalidade**                                                                                       | **Exemplo**                                        |
| -------------------------------- | -------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `LLM_MODEL`                      | Variável | Definir o LLM a ser usado com o AZM AI                                                           | `LLM_MODEL="anthropic/claude-3-5-sonnet-20241022"` |
| `AZM_AI_MAX_ITER`             | Variável | Definir o limite máximo de iterações do agente                                                      | `AZM_AI_MAX_ITER=10`                            |
| `AZM_AI_MACRO`                | Variável | Personalizar a macro padrão para invocar o resolver                                                 | `AZM_AI_MACRO=@resolveit`                       |
| `AZM_AI_BASE_CONTAINER_IMAGE` | Variável | Sandbox personalizado ([saiba mais](https://docs.all-hands.dev/modules/usage/how-to/custom-sandbox-guide)) | `AZM_AI_BASE_CONTAINER_IMAGE="custom_image"`    |
| `TARGET_BRANCH`                  | Variável | Mesclar em um branch diferente de `main`                                                            | `TARGET_BRANCH="dev"`                              |
