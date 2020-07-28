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

        //Asset
        expect(typeof mongo).toBe('object');
    })
}); 