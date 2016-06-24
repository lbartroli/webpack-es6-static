
import path from 'path';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackDevConfig from './webpack.dev.config';
import webpackProdConfig from './webpack.prod.config';
import express from 'express';
import {serverConfig, dbConfig, expressConfig} from './backend/config';
import {db} from './backend/db';
import routerConfig from './backend/router';

const env = process.argv[2];

let app = express();

// MONGO DB CONNECTION
db.connect(dbConfig.prod);

// SET EXPRESS CONFIGURATION
expressConfig.config(express, app, __dirname, env);

switch (env) {
    case 'development':
        console.log('\n----------------');
        console.log('---DEV-SERVER---');
        console.log('----------------\n');
        // let webpackDevConfig = require('./webpack.dev.config');
        let compiler = webpack(webpackDevConfig);
        let devMiddleware = webpackDevMiddleware(compiler, {
            publicPath: webpackDevConfig.output.publicPath,
            stats: {
                colors: true
            }
        });
        let hotMiddleware = webpackHotMiddleware(compiler, {
            log: console.log,
            path: '/__webpack_hmr',
            heartbeat: 10 * 1000,
        });

        app.use(devMiddleware);
        app.use(hotMiddleware);

        routerConfig.config(app);
        app.listen(serverConfig.dev.PORT, function() {
            console.log('Server listening on ' + serverConfig.dev.URL_FULL);
        });
        break;
    case 'production':
        console.log('\n-----------------');
        console.log('---PROD-SERVER---');
        console.log('-----------------\n');

        // let webpackProdConfig = require('./webpack.prod.config');
        let bundler = webpack(webpackProdConfig);
        bundler.run((err) => {
            if(err) console.log('ERROR: ', err);

            routerConfig.config(app);
            app.listen(serverConfig.prod.PORT, function() {
                console.log('Server listening on ' + serverConfig.prod.URL_FULL);
            });
        });
        break;
}