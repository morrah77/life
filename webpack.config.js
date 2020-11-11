const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname,'src/index.js'),
        life: path.resolve(__dirname,'src/components/life/life-index.js'),
        runner: path.resolve(__dirname,'src/components/runner/index.js'),
        checkers: path.resolve(__dirname,'src/components/checkers/index.js')
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name][contenthash].js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src/index.html'),
            filename: 'index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src/life.html'),
            filename: 'life.html',
            chunks: ['life']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src/templates/page.html'),
            title: 'Runner',
            filename: 'runner.html',
            chunks: ['runner']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src/templates/page.html'),
            title: 'Checkers',
            filename: 'checkers.html',
            chunks: ['checkers']
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/favicon.ico',
                to: 'favicon.ico'
            }
        ]),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.less$/,
                loader: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: ['file-loader']
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserWebpackPlugin(),
            new OptimizeCssAssetsWebpackPlugin()
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 4200
    }
};