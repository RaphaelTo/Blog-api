import Connection from '../../Provider/Connection';
import mongoose from 'mongoose';

jest.mock('mongoose');

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

    test('throw error if the argument havent good key object', () => {
        const paramForConnection = {
            username: 'raphael',
            password: 'password',
            host: '127.0.0.1',
            databasee : 27017,
            port : 'blog'
        };

        try{
            new Connection(paramForConnection);
        }catch(err) {
            console.log(err.message)
            expect(err.message).toBe("Error in key object");
            expect(err.name).toBe("ConnectionError");
        }
    })

    test('connection at mongodb', async () => {
        //Arrange
        const paramForConnection = {
            username: 'raphael',
            password: 'password',
            host: '127.0.0.1',
            database : 'blog',
            port : 27017
        };
        
        const mongo = new Connection(paramForConnection);
        const mockMongoose = mongoose.connect.mockReturnValue({});

        //Act
        expect.assertions(2);
        const connectionMethodConnect = mongo.connect();
        //Assert
        expect(mockMongoose).toHaveBeenCalledTimes(1);
        await expect(typeof connectionMethodConnect).toBe('object')
    })
}); 