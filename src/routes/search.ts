import * as express from 'express';
const mongo = require('mongodb');

class SearchRoute {
    
    public router:express.Router;

    constructor() {
        this.router = express.Router();

        this.SearchUser();
    }

    SearchUser() {

        const url =  "mongodb+srv://pedro_calheiros:1234abcd@cluster0.p0yco.mongodb.net/PortariaIFSP?retryWrites=true&w=majority";
        
        //search all users
        this.router.use('/', function(req, res, next) {
            try {
                mongo.MongoClient.connect(url, (err, client) => {
                    if (err) throw err;
                    const dbo = client.db("ControleMateriais");
                    dbo.collection("Materiais").find({}).toArray((err, result) => {
                        if (err) throw err;
                        res.locals.findall = result;
                        client.close();
                        mongo.MongoClient.disconnect;
                        next();
                    })
                })
            }
            catch (err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({message:"Error in check username middleware"}))
            }
        })

        //search user by name
        this.router.use('/name/:name', function(req, res, next) {
            try {
                if(!req.params.name) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({message:"Please passing the username to search."}))
                }
                else {
                    next();
                }
            }
            catch (err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({message:"Error in check username middleware"}))
            }
        })

        //search user by name
        this.router.use('/name/:name', function(req, res, next) {
            try {
                mongo.MongoClient.connect(url, (err, client) => {
                    if (err) throw err;
                    const dbo = client.db("PortariaIFSP");
                dbo.collection("AccessControl").find({name:{$regex:req.params.name}}).toArray((err, result) => {
                        if (err) throw err;
                        res.locals.findbyname = result;
                        client.close();
                        mongo.MongoClient.disconnect;
                        next();
                    })
                })
            }
            catch (err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({message:"Error in check username middleware"}))
            }
        })

        //search all users
        this.router.get('/', function(req, res, next) {
            try{
                res.header('Content-Type', 'application/json');
                res.send(JSON.stringify({message: "search all route",data: res.locals.findall}));
                res.end();
            }
            catch(err){
                console.error(err);
            }
        });

        //search by name
        this.router.get('/name/:name', function(req, res, next) {
            try {
                res.header('Content-Type', 'application/json');
                res.send(JSON.stringify({message: "search by name route", data: res.locals.findbyname}));
                res.end();
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}

export default SearchRoute;
