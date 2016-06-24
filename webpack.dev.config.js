
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import {serverConfig} from './backend/config';

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        'shared': [
            'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
            './frontend/src/modules/shared'
        ],
        'home': [
            'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
            './frontend/src/modules/home'
        ]
    },
    output: {
        path: __dirname + '/frontend/public',
        publicPath: serverConfig.dev.URL_FULL, //'http://localhost:3000/'
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
            loader: 'style!css?sourceMap!postcss!less',
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
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([{
            from: __dirname + '/frontend/assets'
        }])
    ],
    devServer: {
        contentBase: './frontend/public',
        stats: 'minimal'
    }
};
