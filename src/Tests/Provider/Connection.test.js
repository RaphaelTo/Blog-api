import Connection from '../../Provider/Connection';

describe('test class Connection', () => {
    test('instanciation Connection', () => {
        //Arrange
        const paramForConnection = {
            username: 'raphael',
            password: 'password',
            host: '127.0.0.1',
            port : 27017,
            database: 'blog'
        };
        //Act
        const mongo = new Connection(paramForConnection);

        //Assert
        expect(typeof mongo).toBe('object');
        expect(mongo instanceof Connection).toBe(true);
    })

    test('throw error if the argument isnt object',  () => {
        //Arrange
        const paramForConnection = "throwError";
        
        try{
        //Act
            new Connection(paramForConnection);
        }catch (err){
        //Assert
            expect(err.message).toBe("Params isnt an object.");
            expect(err.name).toBe("ConnectionError");
        }
    })
}); 