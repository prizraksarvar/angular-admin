import express, {Express} from 'express';

const serverStarter = (port:number, host:string) => new Promise<Express>((resolve,reject) => {
    const app = express();
    //TODO: move this in components (CORS available)
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Cookie');
        res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Credentials', 'true');
        if('OPTIONS' === req.method) {
            res.sendStatus(200);
        } else {
            console.log(`${req.ip} ${req.method} ${req.url}`);
            next();
        }
    });
    app.use(express.json());

    app.listen(port,host, function() {
        resolve(app);
    });
});

export default serverStarter;