以下は、AZM AIのデバッグに関する入門書です。開発目的で使用してください。

## サーバー / VSCode

以下の`launch.json`は、エージェント、コントローラー、サーバー要素のデバッグを可能にしますが、サンドボックス（Dockerの中で動作する）はデバッグできません。`workspace/`ディレクトリ内の変更は無視されます。

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

より具体的なデバッグ設定では、より多くのパラメータを指定できます。

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

上記のスニペットの値は、以下のように更新できます。

    * *t*: タスク
    * *d*: azm_aiワークスペースディレクトリ
    * *c*: エージェント
    * *l*: LLM設定（config.tomlで事前定義）
    * *n*: セッション名（例：eventstream名）
