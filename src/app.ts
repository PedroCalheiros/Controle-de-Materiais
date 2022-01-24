import * as express from 'express';
import * as bodyParser from 'body-parser';
import IndexRoute from './routes/index'
import SearchRoute from './routes/search';

const cors = require('cors');

const index = new IndexRoute();
const searchuser = new SearchRoute();

class App {
  public app: express.Application;
  public port: number;
 
  constructor(port:number) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
  }
 
  private initializeMiddlewares() {   
    this.app.use(cors()); 
    this.app.use(bodyParser.json());
    this.app.use('/', index.router);
    this.app.use('/search', searchuser.router);
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
 
export default App;
