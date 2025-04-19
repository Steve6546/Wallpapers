const vscode = require('vscode');

function activate(context) {
    let disposable = vscode.commands.registerCommand('azm-ai-hello-world.helloWorld', function () {
        vscode.window.showInformationMessage('Hello from AZM AI!');
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
