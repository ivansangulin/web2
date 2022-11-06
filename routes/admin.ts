import express from 'express';
import bodyParser from 'body-parser';
import Dbservice from '../service/dbservice.js';
import * as auth from '../auth-middleware.js';
import { isFunctionDeclaration } from 'typescript';
export const router = express();
router.use(bodyParser.urlencoded({extended: false}));
auth.initCookieAuth(router, 'login');


router.get("/admin", auth.requiresAuthentication ,function(req,res) {
    const role = req.signedCookies.user.split("/")[1];
    if(role == "ADMIN") {
        res.render("admin.ejs");
    } else {
        res.redirect("/");
    }
})
