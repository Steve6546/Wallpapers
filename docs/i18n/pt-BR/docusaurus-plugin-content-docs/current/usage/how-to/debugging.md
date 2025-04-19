# Debugging

The following is intended as a primer on debugging AZM AI for Development purposes.

## Server / VSCode

The following `launch.json` will allow debugging the agent, controller and server elements, but not the sandbox (Which runs inside docker). It will ignore any changes inside the `workspace/` directory:

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "AZM AI CLI",
            "type": "debugpy",
            "request": "launch",
            "module": "azm_ai.core.cli",
            "justMyCode": false
        },
        {
            "name": "AZM AI WebApp",
            "type": "debugpy",
            "request": "launch",
            "module": "uvicorn",
            "args": [
                "azm_ai.server.listen:app",
                "--reload",
                "--reload-exclude",
                "${workspaceFolder}/workspace",
                "--port",
                "3000"
            ],
            "justMyCode": false
        }
    ]
}
```

More specific debugging configurations which include more parameters may be specified:

```
    ...
    {
      "name": "Debug CodeAct",
      "type": "debugpy",
      "request": "launch",
      "module": "azm_ai.core.main",
      "args": [
        "-t",
        "Ask me what your task is.",
        "-d",
        "${workspaceFolder}/workspace",
        "-c",
        "CodeActAgent",
        "-l",
        "llm.o1",
        "-n",
        "prompts"
      ],
      "justMyCode": false
    }
    ...
```

Values in the snippet above can be updated such that:

    * *t*: the task
    * *d*: the azm_ai workspace directory
    * *c*: the agent
    * *l*: the LLM config (pre-defined in config.toml)
    * *n*: session name (e.g. eventstream name)
