import bcrypt from 'bcrypt';
import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv'
dotenv.config();
const connectdb = async () => {
    console.log("connecting..")
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
        var hashedpassword;
        await bcrypt.hash("someuserpassword", 10, function(err, hash) {
            hashedpassword = hash;
            console.log(hash);
        });
        const res =  await client.query("INSERT INTO users (username,role,password) VALUES ($1,$2,$3)", ["someuser", "REGULAR", hashedpassword]);
        //const res = await client.query("select * from users where username = \'admin\'");
        await client.end()
    } catch(error) {
        console.log(error);
    }
}
const printconnect = async () => {
    const a = await connectdb();
    console.log(a);
}
printconnect();