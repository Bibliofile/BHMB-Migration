## BHMB Starter

This repo provides a prebuilt setup for easily creating extensions for the Blockheads MessageBot. By default it is configured for a TypeScript project, but can be easily modified to work with vanilla JavaScript.

## Usage

### Compiling
Compile with `npm run build` for testing, or `npm run build:production` for release. Additionally, `npm run build:watch` or `npm run build:production:watch` can be used to watch files for changes and automatically recompile.

### Setup

1. Clone this repo using `git clone --depth=1 https://github.com/Bibliofile/BHMB-Starter.git`
1. Remove the `.git` folder and run `git init` to create your own project.
1. Install dependencies with `npm install`
1. Edit the name, author, and description in `package.json`
1. Open `src/index.ts` and edit as desired

### Setup without TypeScript

1. Clone this repo using `git clone --depth=1 https://github.com/Bibliofile/BHMB-Starter.git`
1. Remove typescript dependencies `npm uninstall --save-dev typescript tslint ts-loader`
1. Install remaining dependencies `npm install`
1. Edit the name, author, and description in `package.json`
1. Rename `src/index.ts` to `src/index.js`
1. Delete `tsconfig.json` and `tslint.json` in the root directory and `exports.d.ts` in the src directory.
1. In `webpack.config.js`:
    1. Change the entry extension to `.js`
    1. Remove the module rule referencing `ts-loader`.
    1. Remove the `.ts` and `tsx` entries from the extensions array.

### Disabling Source Maps

When distributing your extension you may want to remove source maps to reduce the bundle size. When building, you can include `-- --env=no_map` to remove source maps. Alternatively, you can add `--env=no_map` to the build scripts in `package.json`.
