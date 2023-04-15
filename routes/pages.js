const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/main', (req, res) => {
    res.render('main');
});

router.get('/map_index', (req, res) => {
    res.render('map_index');
});


router.get('/profile', authController.isLoggedIn, (req, res) => {
    if( req.user ) {
        res.render('profile', {
            user: req.user
        });
        } else {
        res.redirect('/login');
    }
});

module.exports = router;
