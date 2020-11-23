const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 分离css
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = () => {
    return {
        mode: 'production',
        entry: path.resolve('./', 'src'),
        output: {
            path: path.resolve('./', 'docs'),
            filename: 'assets/js/index.min.js',
        },
        module: {
            rules: [
                {
                    test: /(.js)$/,
                    use: [{
                        loader: 'babel-loader',
                    }]
                }, {
                    enforce: 'pre',
                    test: /\.vue$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules/
                }, {
                    test: /\.css$/,
                    use: [ MiniCssExtractPlugin.loader, 'css-loader'],
                }, {
                    test: /\.less$/,
                    use: [ MiniCssExtractPlugin.loader, 'css-loader',  'less-loader'],
                }, {
                    test: /\.(woff|ttf)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 50000,
                    },
                }, {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            js: 'babel-loader',
                        },
                    },
                }, {
                    test: /\.html$/,
                    loader: 'html-loader',
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin({
                filename: 'assets/css/[name].min.css',
            }),
            new HtmlWebpackPlugin({
                template: './docs/index.tpl.html',
                filename: 'index.html',
            }),
            new OptimizeCssAssetsPlugin()
        ]
    };
};
