
import path from 'path';
import consolidate from 'consolidate';
import swig from 'swig';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

class expressConfig {
    config(express, app, root, env) {
        app.engine('html', consolidate.swig);
        app.set('view engine', 'html');
        app.use(favicon(root + '/frontend/assets/img/favicon.ico'));
        app.use(cookieParser());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        
        switch (env) {
            case 'development':
                app.set('views', path.join(root, '/frontend/src/views'));
                app.use(express.static(path.join(root, '/frontend/public')));
                break;
            case 'production':
                app.set('views', path.join(root, '/frontend/dist/views'));
                app.use(express.static(path.join(root, '/frontend/dist')));
                break;
        }
    }
}

export let express = new expressConfig;