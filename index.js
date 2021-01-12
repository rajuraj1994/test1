const path = require('path');
const express=require('express');
const bodyParser = require('body-parser');
const mongoose=require("mongoose");
const url="mongodb://localhost:27017/dursikshya_meeting";
const flash=require('connect-flash');
const session=require('express-session');
const MongoDbStore=require('connect-mongodb-session')(session);

const multer=require('multer');
const fs = require('fs')
// const errorController=require('./controllers/errorcontroller');

const app=express();


 const userRoutes=require('./routes/user');
// const adminRoutes=require('./routes/admin');
// const authRoutes=require('./routes/auth');

const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'./files');
    },
    filename:(req,file,cb)=>{
      cb(null,file.originalname);
    }
    
    });


//ejs template engine
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//to store session
const store= new MongoDbStore({
    url:url,
    collection:'sessions'
});

//to store user
app.use(
    session({
    secret:'mysecret',
    resave:false,
    saveUninitialized:false,
    store:store}));
//to show flash msg
app.use(flash());


// app.use(express.static(path.join(__dirname, 'files')));


app.use(multer({storage:fileStorage}).single('image'));


 app.use(userRoutes);
// app.use('/admin',adminRoutes);
// app.use(authRoutes);


//it is to show error 404 page
// app.use(errorController.get404);


app.listen(5000);
console.log('server started');


const connect=mongoose.connect(url,{
    useNewUrlParser:true,useCreateIndex:true, useUnifiedTopology: true
});

connect.then(db=>{
    console.log("Connected to database");
})
