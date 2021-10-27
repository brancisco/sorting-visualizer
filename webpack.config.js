const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: 'eval-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'docs'),
        },
        port: 8080
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'docs'),
    },
    resolve: {
        extensions: ['.js', '.mjs', '.vue'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.vue$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'vue-loader'
                }
            },
            { 
                test: /\.s?css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}