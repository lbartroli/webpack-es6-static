
import express from 'express';

let router = express.Router();


router.get('/', function(req, res, next) {
    res.render('home', { 
        title: 'GESI - HOME'
    });
});

export default router;