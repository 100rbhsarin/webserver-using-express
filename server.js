const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const {logger} = require('./middleware/logEvent')
const errorHandler = require('./middleware/errorHandler');
const { verify } = require('crypto');


////middleware is mainly three type (1)built in middlewere(2)custom middleware(3)middlewere from third party

const PORT = process.env.PORT || 3500;
////custom middleware logger

app.use(logger)


// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)

//cross origin resourse sharing
app.use(cors(corsOptions))
  


///cross origin resourse sharing
app.use(cors())


////built in middlewere to handle urlencoded data form data
app.use(express.urlencoded({extended:false}))

////built-in middleware for json
app.use(express.json())

////serve statics files
app.use('/',express.static(path.join(__dirname,'/public')))


app.use('/',require('./routes/root'));
app.use('/ register',require('./routes/register'));
app.use('/auth',require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));


 app.all('*',(req, res)=>{
res.status(404)
if(req.accepts('html')){
    res.sendFile(path.join(__dirname,'views','404.html'))
}
else if(req.accepts('json')){
    res.json({error:"404 not found"})
}
else{
    res.type('txt').send("404 Not Found")
}

    /////* this star is use to select all file and this code is for if any request whis are make are not avelable so it redirect to to the 404 page 
 })


app.use(errorHandler)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));