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
const connectdb = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("connecting..");
    try {
        const port = (parseInt(process.env.PGPORT));
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: port,
            ssl: true
        });
        yield client.connect();
        var hashedpassword;
        yield bcrypt.hash("someuserpassword", 10, function (err, hash) {
            hashedpassword = hash;
            console.log(hash);
        });
        const res = yield client.query("INSERT INTO users (username,role,password) VALUES ($1,$2,$3)", ["someuser", "REGULAR", hashedpassword]);
        //const res = await client.query("select * from users where username = \'admin\'");
        yield client.end();
    }
    catch (error) {
        console.log(error);
    }
});
const printconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    const a = yield connectdb();
    console.log(a);
});
printconnect();
//# sourceMappingURL=insertData.js.map