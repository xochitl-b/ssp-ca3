const   http = require('http'), //HTTP server
        path = require('path'),
        express = require('express'), //Handling HTTP requests & routing
        fs = require('fs'), //File system functionalities
        xmlParse = require('xslt-processor').xmlParse, //XML handling
        xsltProcess = require('xslt-processor').xsltProcess, //XSLT handling
        router = express(), //Init our router
        xml2js = require('xml2js'),
        server = http.createServer(router); //Init our server
        router.use(express.static(path.resolve(_dirname,'views')));//to have the changes as url so to inject to the page
        router.use(express.urlencoded({extended:true}));
        router.use(express.json());

        router.use(express.static(path.resolve(__dirname,'views'))); 

        //call function, call name of file, men(menu xml)
function XMLtoJson(filename, cb){//cb is callback //pass on the name of the file and the right back to it on function
    let filepath = path.normalize(path.join(_dirname, filename));
    fs.readFile(filepath, ' utf8', function(err, xmlStr){
        if (err) throw (err);
        xml2js.parseString(smlStr,{},cb);//building the object
    });
}
function JSONtoXML(filename, obj,cb){
    let filepath = path.normalize(path.join(__dirname, filename));
    let builder = new xml2js.Builder();
    let xml = builder.buildObject(obj);
    fs.unlinkSync(filepath);
    fs.writeFile(filepath,xml,cb);
}

router.get('/get/html', function(req, res) {

    res.writeHead(200, {'Content-Type' : 'text/html'});

    let xml = fs.readFileSync('menu.xml', 'utf8'),
        xsl = fs.readFileSync('menu.xsl', 'utf8');

    xml = xmlParse(xml);
    xsl = xmlParse(xsl);

    let html = xsltProcess(xml, xsl);

    res.end(html.toString());
});

router.post('/post/json', function(req, res){//post is to pass something
    function appendJSON(obj){
        console.log(obj);
        XMLtoJSON('menu.xml', funtion(err, result) {
            if (err) throw (err);
            result.menu.category[obj.sec_n].item,push({'listing': obj.listing, 'price':obj.price})//is gonna substitute obj with whatever category we are adding or taking from menu
            console.log(JSON.stringify(result, null, " "));

        });
    });
}; 


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    const addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port)
});