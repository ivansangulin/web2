import express from 'express';
import bodyParser from "body-parser";
const app = express();
const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 3000;
import * as loginroute from './routes/login.js';
import * as searchnameroute from './routes/searchname.js';
import * as adminroute from './routes/admin.js';
import * as brokenaccessroute from './routes/brokenaccess.js';
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use("/login", loginroute.router);
app.use("/", searchnameroute.router);
app.use("/", adminroute.router);
app.use("/", brokenaccessroute.router);
app.get("/", (req, res) => {
    if (req.user) {
        var role = req.signedCookies.user.split("/")[1];
        res.render("home.ejs", { loggedin: true, role: role });
    }
    else {
        res.render("home.ejs", { loggedin: false });
    }
});
app.listen(port, () => console.log("Server running on " + port));
//# sourceMappingURL=app.js.map