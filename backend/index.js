import express  from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";


const app = express();

app.use(express.json());

app.get('/', (request, response)=>{
    console.log(request)
    return response.status(243).send('Welcome to mern stack tutorial!');
});

//Route to save a new book
app.post('/books',async (request, response)=>{
try{
if (!response.body.title || !response.body.author || !response.body.publishYear){
return response.status(400).send({message: 'Send all required fields: title, author, publishYear!'});
}
 
const newBook = {
    title: response.body.title,
    author: response.body.author,
    publishYear: response.body.publishYear,
};

const book = await Book.create(newBook);

return response(201).send(book);
}catch(error){
console.log(error.message);
response.status(500).send({message: error.message});
}
})


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
