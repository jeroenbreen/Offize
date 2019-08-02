const path = require('path');

module.exports = {
    entry: './src/vue/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    watch: true,
    watchOptions: {
        aggregateTimeout: 100,
        poll: 100
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@components': path.resolve('src/vue/components'),
            '@classes': path.resolve('src/vue/store/classes'),
            '@store': path.resolve('src/vue/store'),
            '@styles': path.resolve('src/styles'),
            '@root': path.resolve('src'),
            '@tools': path.resolve('src/vue/tools')
        },
        extensions: ['*', '.js', '.vue', '.json']
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, './src/vue')
                ],
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.vue$/,
                include: [
                    path.resolve(__dirname, './src/vue')
                ],
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};

