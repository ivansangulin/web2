import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
var _loginUrl;
function initCookieAuth(app, loginUrl) {
    _loginUrl = loginUrl;
    app.use(cookieParser(process.env.COOKIE_KEY));
    app.use(setUserInfo);
}
function signInUser(res, username, role) {
    res.cookie('user', username + "/" + role, {
        signed: true,
        httpOnly: true
    });
}
function signOutUser(res) {
    res.clearCookie('user');
}
function setUserInfo(req, res, next) {
    var _a;
    const username = (_a = req.signedCookies) === null || _a === void 0 ? void 0 : _a.user;
    if (username) {
        req.user = {
            username
        };
    }
    next();
}
function requiresAuthentication(req, res, next) {
    if (req.user)
        next();
    else
        res.redirect("/");
}
export { initCookieAuth, signInUser, signOutUser, requiresAuthentication };
//# sourceMappingURL=auth-middleware.js.map