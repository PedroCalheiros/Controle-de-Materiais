import * as express from 'express';

class IndexRoute {
    public router:express.Router;

    constructor() {
        this.router = express.Router();

        this.ReturnInfo();
    }

    public ReturnInfo() {
        this.router.get('/', function(req:express.Request, res: express.Response, next:express.NextFunction) {
            try{
                res.header('Content-Type', 'application/json');
                res.send(JSON.stringify({message: "Check README File to More Information"}));
                res.end();
            }
            catch(err){
                console.error(err);
            }
        });
    }
}

export default IndexRoute;
