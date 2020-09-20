/* eslint-disable @typescript-eslint/no-floating-promises */
import * as vscode from 'vscode'
import * as util from 'util'
import { ExtensionsLogging } from 'vscode-extensions-logging'
import prettier from 'prettier'

const EXTENSION_ID = 'formact-prettier'
const formatCommandKey = 'formact.prettier.format'

export function activate (context: vscode.ExtensionContext) {
  try {
    const logger = ExtensionsLogging.register(EXTENSION_ID)
    logger.info('initializing extension')
    const formatCommand = vscode.commands.registerCommand(formatCommandKey, async () => {
      const document = vscode.window.activeTextEditor?.document
      if (!document) {
        logger.info('no file to format')
        return
      }
      const fileName = document?.fileName ?? ''
      const code = document?.getText()
      if (!code) {
        logger.info(`empty file: ${fileName}`)
        return
      }
      const fileInfo = await prettier.getFileInfo(fileName)
      if (fileInfo.ignored) {
        logger.info(`ignored file: ${fileName}`)
        return
      }
      const language = prettier
        .getSupportInfo()
        .languages.find(
          lang =>
            lang?.extensions &&
            Array.isArray(lang.vscodeLanguageIds) &&
            lang.vscodeLanguageIds.includes(document.languageId),
        )
      if (!language) {
        logger.info(`language not found for file: ${fileName}`)
        return
      }
      logger.info(`using language: ${document.languageId}`)
      const parser = language.parsers[0]
      if (!parser) {
        logger.info(`parser not found for file: ${fileName}`)
        return
      }
      logger.info(`using parser: ${parser}`)
      const options = await prettier.resolveConfig(fileName)
      logger.info(`using options: ${util.inspect(options, false, 5, false)}`)
      const formattedCode = prettier.format(
        code,
        Object.assign({}, options, {
          filepath: fileName,
          parser,
        }),
      )
      vscode.window.activeTextEditor?.edit(editorBuilder => {
        const firstLine = document.lineAt(0)
        const lastLine = document.lineAt(document?.lineCount - 1)
        const textRange = new vscode.Range(firstLine.range.start, lastLine.range.end)
        editorBuilder.replace(textRange, formattedCode)
        logger.info(`formatted file: ${fileName}`)
      })
    })
    context.subscriptions.push(formatCommand)
    logger.info('extension initialized')
  } catch (err) {
    console.log(err)
  }
}
