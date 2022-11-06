import express from 'express';
import bodyParser from 'body-parser';
import Dbservice from '../service/dbservice.js';
import * as auth from '../auth-middleware.js';
export const router = express();
router.use(bodyParser.urlencoded({extended: false}));
auth.initCookieAuth(router, 'login');

router.get("/searchname", auth.requiresAuthentication, function(req, res) {
    const role = req.signedCookies.user.split("/")[1];
    res.render("searchname.ejs", {role:role,founduser:false,searched:false,error:false});
})

router.post("/searchname", auth.requiresAuthentication,function(req,res) {
    const checked = req.body.injection;
    const username = req.body.username;
    const dbservice = new Dbservice();
    const role = req.signedCookies.user.split("/")[1];
    if(checked) {
        dbservice.searchnameinjection(username)
        .then(response => {
            if(response) {
                res.render("searchname.ejs", {data:response,role:role,founduser:true,searched:true,error:false});
            } else {
                res.render("searchname.ejs", {role:role,founduser:false,searched:true,error:false});
            }
        })
        .catch(error => {
            res.render("searchname.ejs", {error:true,role:role,founduser:false,searched:true});
        })
    } else {
        const nospecialchar = username.replace(/[^a-zA-Z]/g, '');
        if(nospecialchar.length != username.length) {
            res.render("searchname.ejs", {error:true,role:role,founduser:false,searched:true,injection:true});
        } else {
            dbservice.searchname(username)
            .then(response => {
                if(response) {
                    res.render("searchname.ejs", {username:response,role:role,founduser:true,searched:true,injection:false,error:false});
                } else {
                    res.render("searchname.ejs", {role:role,founduser:false,searched:true,injection:false,error:false});
                }
            })
            .catch(error => {
                res.render("searchname.ejs", {error:true,role:role,founduser:false,searched:true,injection:false});
            })
        }
    }
})