var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();
export default class Dbservice {
    constructor() {
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = new Client({
                    user: process.env.PGUSER,
                    host: process.env.PGHOST,
                    database: process.env.PGDATABASE,
                    password: process.env.PGPASSWORD,
                    port: process.env.PGPORT
                });
                yield client.connect();
                const data = yield (yield client.query("select * from users where username = $1", [username.trim()])).rows[0];
                var hashedpassword;
                if (typeof data === "undefined") {
                    hashedpassword = "";
                }
                else {
                    hashedpassword = data.password;
                }
                yield client.end();
                var logindata = [];
                if (yield bcrypt.compare(password, hashedpassword)) {
                    logindata.push({ auth: true, username: data.username, role: data.role });
                    return logindata;
                }
                else {
                    return logindata;
                }
            }
            catch (error) {
                console.log(error);
                var logindata = [];
                return [];
            }
        });
    }
    searchnameinjection(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = new Client({
                    user: process.env.PGUSER,
                    host: process.env.PGHOST,
                    database: process.env.PGDATABASE,
                    password: process.env.PGPASSWORD,
                    port: process.env.PGPORT
                });
                yield client.connect();
                const data = yield (yield client.query("select username from users where username = \'" + username.trim() + "\'")).rows;
                yield client.end();
                if (data) {
                    return data;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                return false;
            }
        });
    }
    searchname(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = new Client({
                    user: process.env.PGUSER,
                    host: process.env.PGHOST,
                    database: process.env.PGDATABASE,
                    password: process.env.PGPASSWORD,
                    port: process.env.PGPORT,
                    ssl: true
                });
                yield client.connect();
                const data = yield (yield client.query("select username from users where username = $1", [username.trim()])).rows[0].username;
                yield client.end();
                if (data) {
                    return data;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                return false;
            }
        });
    }
}
//# sourceMappingURL=dbservice.js.map