module.exports = env => ({
    entry: __dirname + '/src/index.ts',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/build'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.(html|css|txt)$/,
                loader: 'raw-loader',
                exclude: /node_modules/,
            }
        ]
    },
    // What extensions to watch
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    // These are not included in the bundle
    externals: {
        // The exported members MessageBot and SimpleEvent exist on the global already
        'blockheads-messagebot': 'global'
    },
    // Source maps, makes debugging easier, disable with --env=no_map
    devtool: (Array.isArray(env) && env.includes('no_map')) ? false : 'inline-source-map',
});
