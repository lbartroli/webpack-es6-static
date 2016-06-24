
import express from 'express';
import path from 'path';
import homeRouter from './modules/home';

let router = express.Router();
let modulesPath = path.join(__dirname, '/modules');

//middleware to log all requests
router.use(function(req, res, next) {
	console.log(req.method, req.url);
	return next();
});

class appRouter {
    config(app) {
        app.use(router);
	    app.use(homeRouter);


        app.use(function(req, res, next) {
            return res.status(404).render('404');
        });

        app.use(function(err, req, res, next) {
            console.log(err);
            return res.status(500).render('500');
        });
    }
}

export default new appRouter;