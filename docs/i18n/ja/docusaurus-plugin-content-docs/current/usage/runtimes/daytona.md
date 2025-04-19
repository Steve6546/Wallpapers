# Daytona ランタイム

[Daytona](https://www.daytona.io/) をランタイムプロバイダーとして使用できます：

## ステップ 1: Daytona API キーを取得する
1. [Daytona ダッシュボード](https://app.daytona.io/dashboard/keys)にアクセスします。
2. **「Create Key」**をクリックします。
3. キーの名前を入力し、作成を確認します。
4. キーが生成されたら、それをコピーします。

## ステップ 2: API キーを環境変数として設定する
ターミナルで以下のコマンドを実行し、`<your-api-key>` をコピーした実際のキーに置き換えます：
```bash
export DAYTONA_API_KEY="<your-api-key>"
```

このステップにより、AZM AI が実行されるときに Daytona プラットフォームで認証できるようになります。

## ステップ 3: Docker を使用してローカルで AZM AI を実行する
マシン上で最新バージョンの AZM AI を起動するには、ターミナルで次のコマンドを実行します：
```bash
bash -i <(curl -sL https://get.daytona.io/azm_ai)
```

### このコマンドの動作：
- 最新の AZM AI リリーススクリプトをダウンロードします。
- インタラクティブな Bash セッションでスクリプトを実行します。
- Docker を使用して AZM AI コンテナを自動的にプルして実行します。

実行すると、AZM AI がローカルで実行され、使用準備が整います。

詳細と手動初期化については、[README.md](https://github.com/All-Hands-AI/AZM AI/blob/main/azm_ai/runtime/impl/daytona/README.md) 全体を参照してください。
