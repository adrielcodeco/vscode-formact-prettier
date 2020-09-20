<p align="center">
  <img src="icon.png" />
  <h1 align="center">Formact + Prettier</h1>
  <br />
</p>

VSCode extension to enable run the Prettier action when formatting

## Installation

You can install this extension by one of the following options

- Search for `formact` on vscode marketplace
- Launch vscode quick open (Ctrl+p) and paste the following command

  `ext install codeco.formact`

## How to use it _?_

~~After installed, this extension will ask you for how you would like to configure its use.(TODO)~~

Edit the vscode settings to set `codeco.formact` as defaultFormatter and configure what actions will be called when code formatting.

```jsonc
{
  //# for all languages
  "editor.defaultFormatter": "codeco.formact",
  "formact.actions": ["source.fixAll.prettier", "source.fixAll.eslint"],

  //# for specific language
  "[typescript]": {
    "editor.defaultFormatter": "codeco.formact",
    "formact.actions": ["source.fixAll.prettier", "source.fixAll.eslint"]
  }
}
```

In the example above, when formatting the code, the Prettier action and the Eslint action will be called in sequence.

OBS.: The Eslint action is added by the `dbaeumer.vscode-eslint` extension and Prettier action is added by the `codeco.formact-prettier` extension.

Also is possible configure the languages used by formact.

```json
{
  "formact.languages": ["javascript", "typescript", "json"]
}
```

OBS.: `"javascript", "typescript", "json"` are the default languages used by formact

## TODO

Help the users to configure the extension.
