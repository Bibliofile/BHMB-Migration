import string from 'rollup-plugin-string'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: './src/index.ts',
  output: {
    file: 'build/bundle.js',
    // Output in a format that will work for both browsers and cli apps
    format: 'umd',
    // For making debugging easier, fine to disable
    sourcemap: true,
    // Where to get the bot from if in a browser
    globals: { '@bhmb/bot': '@bhmb/bot' }
  },
  plugins: [
    typescript(),
    string({ include: ['**/*.html', '**/*.css', '**/*.txt']})
  ],

  // Don't bundle the bot code
  external: ['@bhmb/bot'],
}
