import express, { request, response }  from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS policy 
//app.use(cors());

//MIddleware for handling CORS policy specifying one origin
cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
})

app.get('/', (request, response)=>{
    console.log(request)
    return response.status(243).send('Welcome to mern stack tutorial!');
});

app.use('/books', booksRoute); 

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
