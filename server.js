// const http = require('http');

// const PORT = 10000

// const server =  http.createServer((req,res)=>{

//     console.log(req,'req');

//     if(req.url === "/"){
//         res.setHeader("Content-Type","application/json");
//         return   res.end("<h1>Hello World</>")
//     }
//     else if (req.url === "/login"){
//         res.setHeader("Content-Type","application/json");
//         return  res.end("Successfull login")
//     }
//     res.end('Invalid Request')
//     console.log("RUNNING SERVER",PORT);

// })

// server.listen(PORT);




const express = require('express');

const app = express();
const PORT = 30000;




let users = [
    { name: 'User 1', id: 1},
    { name: 'User 2', id: 2},
    { name: 'User 3', id: 3},
    { name: 'User 4', id: 4},
]

/////it enables our server to read JSON data 
const urlParser = express.json();
app.use(urlParser);


//----------------Multiple Api Start---------------------

// app.get("/",(req,res)=>{
//     // res.statusCode = 200;
   
//     res.send("Hello World")
// })
// app.get("/homepage",(req,res)=>{
//     // res.statusCode = 200;
   
//     res.send("Hello Users This Is oUr Home Page Want to See")
// })
// app.get("/loginpage",(req,res)=>{
//     // res.statusCode = 200;
   
//     res.send("Hello Users This Is oUr LOgin Page Want to See")
// })
// app.get("/contactus",(req,res)=>{
//     // res.statusCode = 200;
   
//     res.send("Hello Users This Is oUr Contact Us Page Want to See")
// })
// app.get("/account",(req,res)=>{
//     // res.statusCode = 200;
   
//     res.send("Hello Users This Is oUr Account Page Want to See")
// })

app.get('/getallusersdata',(req,res)=>{

    res.statusCode = 200;
    res.json(users)
})
//----------------Multiple Api End---------------------





// // if method === GET && URL === '/users/:id'

app.get('/users/:id', (req, res) => {
    console.log(req,'reqreq')
    res.statusCode = 200;

    const user = users.find((usr) => usr.id === parseInt(req.params.id));
    if(!user) {
        return res.send(`<h1>User ${req.params.id} Not Found</h1>`)
    }
    res.json(user)
})


// // if method === DELETE && URL === '/users/:id'
app.delete('/users/:id', (req, res) => {
    res.statusCode = 200;
    
    const filterUser = users.filter((usr) => usr.id !== parseInt(req.params.id));
    users = filterUser;
    res.send('<h1>User Delete Successfully</h1>')
})






app.put('/update/:id',(req,res)=>{


    const user = users.find((usr) => usr.id === parseInt(req.params.id));
   
        user.name = req.body.name;
        user.id = req.body.id;
        // users.name.splice();
   
      res.send("user update successfully")
})


app.post('/create-user', ( req, res ) => {
    if(req.body.name) {
        res.statusCode = 201;
        const newUser = users.length + 1;
        users.push({ 
            name: req.body.name , 
            id: newUser
        })
    
        res.send('<h1>User Created Successfully</h1>')
    } else {
        res.statusCode = 400;
        res.send('<h1>Name Field is Missing</h1>')
    }

})


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})