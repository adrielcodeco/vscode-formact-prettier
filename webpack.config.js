/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const tsconfigBuild = require('./tsconfig.build.json')

const root = __dirname
const resolve = uri => path.resolve(root, uri)

module.exports = {
  entry: './src/extension.ts',
  target: 'node',
  devtool: 'source-map',
  mode: 'production',
  node: {
    __dirname: false,
  },
  output: {
    filename: 'extension.js',
    path: resolve(tsconfigBuild.compilerOptions.outDir),
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.build.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.build.json' })],
  },
  externals: {
    vscode: 'commonjs vscode',
  },
  resolveLoader: {
    modules: [resolve('./node_modules')],
  },
  optimization: {
    providedExports: true,
    usedExports: true,
    sideEffects: true,
  },
}
