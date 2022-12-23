import express from 'express';
import mongoose from 'mongoose';
import routes from './Routes/routes.js'

let app = new express();
const PORT_NUM = 4040;

//Mongoose Connection setup
const url = "mongodb+srv://chigozie_M:raphael2002@cluster0.1xu9qqp.mongodb.net/Ish_haircut"
mongoose.Promise = global.Promise;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{console.log('Connected to MongoDB');})
.catch((err)=>{if(err){console.log(err);}})

//bodyparser setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set the routes for the server
routes(app);
app.listen(PORT_NUM, ()=>{
    console.log(`Listening from port ${PORT_NUM}`);
})