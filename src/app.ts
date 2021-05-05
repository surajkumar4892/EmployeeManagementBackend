import express,{Application,Request,Response,NextFunction} from 'express';
import * as http from 'http';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import {CommonRoutesConfig} from './common/common.routes.config';
import {UserRoutes} from './routes/users.routes.config';
import debug from 'debug';

const app:Application = express();
const server:http.Server = http.createServer(app);
const port = 5000;
const routes :Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());

app.use(cors());

const loggerOption:expressWinston.LoggerOptions={
    transports:[new winston.transports.Console()],
    format:winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({all:true})
    ),
};

if(process.env.DEBUG){
    process.on('unhandledRejection',function(reason){
        debugLog('Unhandled Rejection:',reason);
        process.exit(1);
    });
}
else{
    loggerOption.meta = false;
}

app.use(expressWinston.logger(loggerOption));

routes.push(new UserRoutes(app));

app.get('/',(req:Request,res:Response)=>{
    res.status(200).send(`Server is running!`);
})

server.listen(port,()=>{
    debugLog(`sever running at http://localhost:${port}`);
    routes.forEach((route:CommonRoutesConfig)=>{
        debugLog(`Routes configured for ${route.getName()}`)
    })
})
