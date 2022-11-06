import bcrypt from 'bcrypt';
import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv'
import { addAbortSignal } from 'stream';
dotenv.config();

export default class Dbservice {
    constructor() {
        
    }
    async login(username,password) {
        try {
            const port:number = (parseInt(process.env.PGPORT));
            const client = new Client({
                user: process.env.PGUSER,
                host: process.env.PGHOST,
                database: process.env.PGDATABASE,
                password: process.env.PGPASSWORD,
                port: port,
                ssl : true
            })
            await client.connect();
            const data = await (await client.query("select * from users where username = $1", [username.trim()])).rows[0];
            var hashedpassword;
            if(typeof data === "undefined") {
                hashedpassword = "";
            } else {
                hashedpassword = data.password;
            }
            await client.end();
            var logindata:any = [];
            if(await bcrypt.compare(password,hashedpassword)) {
                logindata.push({auth:true,username:data.username,role:data.role});
                return logindata;
            } else {
                return logindata;
            }
        } catch(error) {
            console.log(error);
            var logindata:any = [];
            return [];
        }
    }

    async searchnameinjection(username) {
        try {
            const port:number = (parseInt(process.env.PGPORT));
            const client = new Client({
                user: process.env.PGUSER,
                host: process.env.PGHOST,
                database: process.env.PGDATABASE,
                password: process.env.PGPASSWORD,
                port: port,
                ssl: true
            })
            await client.connect();
            const data = await (await client.query("select username from users where username = \'" + username.trim() + "\'")).rows;
            await client.end();
            if(data) {
                return data;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    async searchname(username) {
        try {
            const port:number = (parseInt(process.env.PGPORT));
            const client = new Client({
                user: process.env.PGUSER,
                host: process.env.PGHOST,
                database: process.env.PGDATABASE,
                password: process.env.PGPASSWORD,
                port: port,
                ssl : true
            })
            await client.connect();
            const data = await (await client.query("select username from users where username = $1",[username.trim()])).rows[0].username;
            await client.end();
            if(data) {
                return data;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }
}
