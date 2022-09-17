import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import path from 'path';

class App{
    constructor(){
        this.server = express();

        try {
            mongoose.connect('mongodb://devhouse:devhouse@ac-a61o3iz-shard-00-00.3yywvyy.mongodb.net:27017,ac-a61o3iz-shard-00-01.3yywvyy.mongodb.net:27017,ac-a61o3iz-shard-00-02.3yywvyy.mongodb.net:27017/?ssl=true&replicaSet=atlas-vamfj9-shard-0&authSource=admin&retryWrites=true&w=majority',{
                useNewUrlParser:true,
                useUnifiedTopology: true
            });    
        } catch (error) {
            throw error;
        }
        
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(express.json());
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..','uploads'))
        );
    }

    routes(){
        this.server.use(routes);
    }
}

export default new App().server;