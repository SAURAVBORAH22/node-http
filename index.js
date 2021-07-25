//HTTP SERVER


//using http core modules
const http = require('http');

const hostname = 'localhost';
const port = 3000;

//crearting a server using the createserver method
//which takes two paramteters request and response
const server = http.createServer((req,res) => {
    //logging the incoming request headers
    console.log(req.headers);
    
    //statusCode enables us to setup the status code for the response method
    res.statusCode = 200;

    //setting up the header
    res.setHeader('Content-Type','text/html');

    //ending the response
    res.end('<html><body><h1>Hello World!</h1></body></html>')
})

//setting up the listening port where server will be started 
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
});