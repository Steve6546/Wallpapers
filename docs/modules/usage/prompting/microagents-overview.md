# Microagents Overview

Microagents are specialized prompts that enhance AZM AI with domain-specific knowledge, repository-specific context
and task-specific workflows. They help by providing expert guidance, automating common tasks, and ensuring
consistent practices across projects.

## Microagent Categories

Currently AZM AI supports two categories of microagents:

- [Repository-specific Microagents](./microagents-repo): Repository-specific context and guidelines for AZM AI.
- [Public Microagents](./microagents-public): General guidelines triggered by keywords for all AZM AI users.

A microagent is classified as repository-specific or public depending on its location:

- Repository-specific microagents are located in a repository's `.azm_ai/microagents/` directory
- Public microagents are located in the official AZM AI repository inside the `/microagents` folder

When AZM AI works with a repository, it:

1. Loads **repository-specific** microagents from `.azm_ai/microagents/` if present in the repository.
2. Loads **public knowledge** microagents triggered by keywords in conversations
3. Loads **public tasks** microagents when explicitly requested by the user

You can check out the existing public microagents at the [official AZM AI repository](https://github.com/All-Hands-AI/AZM AI/tree/main/microagents/).

## Microagent Format

All microagents use markdown files with YAML frontmatter that have special instructions to help AZM AI activate them.

Check out the [syntax documentation](./microagents-syntax) for a comprehensive guide on how to configure your microagents.
