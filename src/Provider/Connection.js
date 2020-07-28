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

        const { username, password, host, port, database } = logDB;
        this.username = username;
        this.password = password;
        this.host = host;
        this.port = port;
        this.database = database;
    }

}

export default Connection;