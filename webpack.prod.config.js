
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import {serverConfig} from './backend/config';

module.exports = {
    devtool: 'source-map',
    entry: {
        'shared': './frontend/src/modules/shared',
        'home': './frontend/src/modules/home'
    },
    output: {
        path: __dirname + '/frontend/dist',
        publicPath: serverConfig.prod.URL_FULL,
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style!css?sourceMap!postcss'
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!less'),
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file'
        }, {
            test: /\.html$/,
            loader: 'raw'
        },
        { 
            test: /bootstrap\/js\//, 
            loader: 'imports?jQuery=jquery' 
        }
        ]
    },
    postcss: [
        autoprefixer({
            browsers: ['last 2 version']
        })
    ],
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('[name].css'),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new CopyWebpackPlugin([
            {
                from: './frontend/assets/',
                to: './'
            },
            {
                from: './frontend/src/views/',
                to: './views'
            }
        ])
    ]
};
