const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const mongoose = require('mongoose')
const router = require('./routes/routes')



const openDbConnection = require('./helper/db')

const PORT = process.env.PORT
const uri = process.env.MONGO_URI

    async function main(){
        try{
            await openDbConnection(uri);
            app.use(express.json());
            app.use(router);

            app.listen(PORT, ()=>{
                console.log('Connected on', PORT)
            });
        }
        catch(error){
            console.log("main", error)
        }
    }

    main()