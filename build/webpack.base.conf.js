const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../src/'),
    dist: path.join(__dirname, '../public/'),
    assets: 'static/'
};

module.exports = {

    externals: {
        paths: PATHS
    },

    entry: {
        app: PATHS.src
    },

    output: {
        filename: `${PATHS.assets}js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath: "/"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules'
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        },
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {path: './postcss.config.js'}
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        },
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        },
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {path: './postcss.config.js'}
                        },
                    },
                ]
            },

        ]
    },
    devServer: {
        overlay: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[hash].css`
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.html`,
            filename: "./index.html",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
        }),
        new CopyWebpackPlugin([
            {
                from: `${PATHS.src}/assets/img/`,
                to: `${PATHS.assets}img/`,
            },
            {
                from: `${PATHS.src}/assets/fonts/`,
                to: `${PATHS.assets}fonts/`,
            },
            {
                from: `${PATHS.src}/static/`,
                to: '',
            },
        ]),
        new CleanWebpackPlugin()
    ]
}