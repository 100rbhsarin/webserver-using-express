
/////in the bellow http link 2nd id for react page and last for backend localhost and we remove after work  
const whitelist =
['https://www.yoursite.com',
'http://127.0.0.1:5500',
'htttp://localhost:3500']

const corsOptions ={
    origin:(origin, callback)=>{
        if(whitelist.indexOf(origin) !==-1 || !origin){
            callback(null,true)
        }
        else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus:200
}

  module.exports = corsOptions
