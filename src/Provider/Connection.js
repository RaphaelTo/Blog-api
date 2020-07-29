import mongoose from 'mongoose';
import ConnectionError from '../Errors/ConnectionError';

class Connection {

    username;
    password;
    host;
    port;
    database;

    constructor(logDB) {
        if(typeof logDB !== 'object'){
            throw new ConnectionError("Params isnt an object.");
        }
        
        if(!this.checkKeyForInit(logDB)){
            throw new ConnectionError("Error in key object")
        }

        const { username, password, host, port, database } = logDB;
        this.username = username;
        this.password = password;
        this.host = host;
        this.port = port;
        this.database = database;
    }

    checkKeyForInit(logDB) {
        const goodValue = ['username', 'password', 'host', 'port', 'database'];
        const checkValue = Object.keys(logDB);
        let boolCheck = true;

        goodValue.map((resultValueArray) => {
            let findElement = checkValue.find(element => element === resultValueArray);
            if(findElement === undefined) boolCheck = false;
        })

        return boolCheck;
    }

    async connect() {
        return await mongoose.connect(`mongodb://${this.username}:${this.password}@${this.host}:${this.port}`,{ useNewUrlParser: true });
    }

}

export default Connection;