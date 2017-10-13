## BHMB Starter

This repo provides a prebuilt setup for easily creating extensions for the Blockheads MessageBot. By default it is configured for a TypeScript project, but can be easily modified to work with vanilla JavaScript.

## Usage

### Compiling
Compile with `npm run build`. Additionally, `npm run build:watch` or `npm run build:watch` can be used to watch files for changes and automatically recompile.

### Setup

1. Clone this repo using `git clone --depth=1 https://github.com/Bibliofile/BHMB-Starter.git`
1. Remove the `.git` folder and run `git init` to create your own project.
1. Alter the license to the license you want to use.
1. Install dependencies with `npm install`
1. Edit the name, author, and description in `package.json`
1. Open `src/index.ts` and edit as desired
1. If you don't use vscode, remove the .vscode directory

### Setup without TypeScript

1. Clone this repo using `git clone --depth=1 https://github.com/Bibliofile/BHMB-Starter.git`
1. Remove typescript dependencies `npm uninstall --save-dev typescript tslint rollup-plugin-typescript2`
1. Install remaining dependencies `npm install`
1. Edit the name, author, and description in `package.json`
1. Rename `src/index.ts` to `src/index.js`
1. Delete `tsconfig.json` and `tslint.json` in the root directory and `exports.d.ts` in the src directory.
1. In `rollup.config.js` remove all references to `rollup-plugin-typescript2` and its imports
1. If you don't use vscode, remove the .vscode directory
