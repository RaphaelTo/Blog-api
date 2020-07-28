class Connection {

    username;
    password;
    host;
    port;
    database;

    constructor(logDB) {
        const { username, password, host, port, database } = logDB;
        this.username = username;
        this.password = password;
        this.host = host;
        this.port = port;
        this.database = database;
    }

}

export default Connection;