const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// relative public path, empty string reference on the document root of the server
const publicPath = '';
const outputPath = path.resolve(__dirname, 'dist');
const sourcePath = path.resolve(__dirname, 'src');

module.exports = {
    mode: 'development',
    devServer: {
        static: {
            directory: outputPath
        },
        port: 9000
    },
    entry: path.join(sourcePath, 'index.js'),
    output: {
        path: outputPath,
        filename: 'js/bundle.js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(sourcePath, 'index.html')
        })
    ],
    devtool: 'source-map',
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'vue-style-loader'
                    },
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/images',
                    publicPath: path.join(publicPath, 'assets/images'),
                    useRelativePaths: true
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/fonts',
                    publicPath: path.join(publicPath, 'assets/fonts'),
                    useRelativePaths: true
                }
            }
        ]
    }
};