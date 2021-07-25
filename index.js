//HTTP SERVER


//using http core modules
const http = require('http');

//importing the file system core module
//helps to read and write on file from local file system
const fs = require('fs');

//importing the path core module
//helps to specify the path of a file in our local file system
const path = require('path');

const hostname = 'localhost';
const port = 3000;

//crearting a server using the createserver method
//which takes two paramteters request and response
const server = http.createServer((req, res) => {
    //logging the incoming request headers
    //console.log(req.headers);

    console.log("Request for" + req.url + 'by method' + req.method);

    //statusCode enables us to setup the status code for the response method
    //res.statusCode = 200;

    //setting up the header
    //res.setHeader('Content-Type','text/html');

    //ending the response
    //res.end('<html><body><h1>Hello World!</h1></body></html>')

    //if the required method is get
    if (req.method == 'GET') {
        var fileUrl;
        //if url not specified than index.html url as default
        if (req.url == '/') fileUrl = '/index.html';
        //else fileurl is the requested url
        else fileUrl = req.url;

        //full path for the file
        var filePath = path.resolve('./public' + fileUrl);
        //for file extension
        const fileEXt = path.extname(filePath);
        //if file extension is html
        if (fileEXt == '.html') {
            //checking if filepath exists
            fs.exists(filePath, (exists) => {
                //if doesnot exists
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1> Error 404:' + fileUrl +
                        ' not found </h1></body></html>');

                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                //returns a readstream object
                fs.createReadStream(filePath).pipe(res);
            })
        }
        //if extension is not html
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1> Error 404:' + fileUrl +
                ' not an HTML file </h1></body></html>');

            return;
        }
    }
    //if request method is not GET
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1> Error 404:' + req.method +
            'not supported </h1></body></html>');

        return;
    }

})

//setting up the listening port where server will be started 
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
});