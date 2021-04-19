import express from 'express';
import session from 'express-session';
import passport from 'passport';

import scopes from '../utils/scopes';


const router = express.Router();

router.get('/error', (req, res) => {
    res.send("error :p");
});


router.get('/spotify/callback', passport.authenticate('spotify', {
    failureRedirect: '/auth/error',
}), (req, res) => {
    res.redirect('http://localhost:4000');
});

router.get('/spotify', passport.authenticate('spotify', {
    scope: scopes,
    prompt: "POOP",
    
}));


export default router;