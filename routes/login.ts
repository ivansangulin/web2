import express from 'express';
import bodyParser from 'body-parser';
import Dbservice from '../service/dbservice.js';
import * as auth from '../auth-middleware.js';
export const router = express();
router.use(bodyParser.urlencoded({extended: false}));
auth.initCookieAuth(router, 'login');

router.post("/", function(req,res) {
    const dbservice = new Dbservice();
    const username = req.body.username;
    const password = req.body.password;
    dbservice.login(username,password)
    .then(response => {
        if((response[0].auth)) {
            auth.signInUser(res, username, response[0].role);
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    })
    .catch(error => {
        res.redirect("/");
    })
})

router.get('/logout', auth.requiresAuthentication,  function (req, res) {
    auth.signOutUser(res);
    res.redirect("/");
});

