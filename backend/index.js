import express  from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get('/', (request, response)=>{
   
    console.log(request)
    return response.status(243).send('Welcome to mern stack tutorial!');

});



mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log(`App connected to database!`)
    
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`)
        })
    
    })
    .catch((error)=>{
        console.log(error);
    })
