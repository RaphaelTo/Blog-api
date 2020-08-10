import UserController from "../../Controllers/UserController";
import UserControllerError from "../../Errors/UserControllerError";
import expect from 'expect';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('bcrypt');
jest.mock('mongoose');
jest.mock('jsonwebtoken');

describe('test file UserController', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    })

    test('initialisation instance UserController class', () => {
        const mockMongoose = {
            find: jest.fn().mockReturnValue({})
        }

        const user = new UserController(mockMongoose);

        expect(user).not.toBeNull();
    })

    test('throw error if isnt a model mongoose', () => {
        const mockMongoose = null;

        try {
            new UserController(mockMongoose);
        } catch(err) {
            expect(err.message).toBe('UserControllerError: this isnt an mongoose model instance')
        }
    })

    test('exist method samePassword', () => {
        const mockMongoose = 'User';
        const user = new UserController(mockMongoose);

        const pass1 = "a";
        const pass2 = "a";
        const samePass = user.samePassword(pass1, pass2);

        expect(samePass).not.toBeNull();
    })

    test('method samePassword return an bool', () => {
        const mockMongoose = 'User';
        const user = new UserController(mockMongoose);

        const pass1 = "a";
        const pass2 = "a";
        const samePass = user.samePassword(pass1, pass2);

        expect(typeof samePass).toBe('boolean')
    })

    test('method samePassword return false if param isnt string', () => {
        const mockMongoose = 'User';
        const user = new UserController(mockMongoose);

        const pass1 = "a";
        const pass2 = 1;
        const samePass = user.samePassword(pass1, pass2);

        expect(typeof samePass).toBe('boolean');
        expect(samePass).toBe(false);
    })

    test('method samePassword return false if param isnt same', () => {
        const mockMongoose = 'User';
        const user = new UserController(mockMongoose);

        const pass1 = "aze";
        const pass2 = "a";
        const samePass = user.samePassword(pass1, pass2);

        expect(samePass).toBe(false);
    })

    test('method samePassword return true if param is same', () => {
        const mockMongoose = 'User';
        const user = new UserController(mockMongoose);

        const pass1 = "aze";
        const pass2 = "aze";
        const samePass = user.samePassword(pass1, pass2);

        expect(samePass).toBe(true)
    })

    test('exist method cryptPassword', async () => {
        const mockMongoose = 'User';
        const user = new UserController(mockMongoose);

        expect.assertions(1);
        const passToCrypt = "aa";
        const crypt = await user.cryptPassword(passToCrypt);

        expect(crypt).not.toBeNull();
    })

    test('method "cryptPassword" return a string', async () => {
        const mockMongoose = 'User';
        const user = new UserController(mockMongoose);
        bcrypt.hash.mockResolvedValue('aze');

        expect.assertions(1);
        const passToCrypt = "aa";
        const crypt = await user.cryptPassword(passToCrypt);

        expect(typeof crypt).toBe('string');
    })

    test('method "cryptPassword" return an password crypted', async () => {
        const mockMongoose = 'User';
        bcrypt.hash.mockResolvedValue('aze');
        const user = new UserController(mockMongoose);

        expect.assertions(1);
        const passToCrypt = "a";
        const crypt = await user.cryptPassword(passToCrypt);

        expect(crypt).toBe('aze');
    })

    test('method "cryptPassword" throw error if the param isnt a string', async () => {
        const mockMongoose = 'User';
        const user = new UserController(mockMongoose);

        expect.assertions(1);
        const passToCrypt = 1;
        const crypt = user.cryptPassword(passToCrypt);

        await expect(crypt).rejects.toThrow(/UserControllerError: the params isnt a string/);
    })

    test('method "comparePasswordWithCrypt" exist', async () => {
        const mockMongoose = 'User';
        const user = new UserController(mockMongoose);

        expect.assertions(1);
        const passwordCrypted = 'aze';
        const passwordDB = "asze";
        const compare = await user.comparePasswordWithCrypt(passwordCrypted, passwordDB);

        expect(compare).not.toBeNull();
    })

    test('method "comparePasswordWithCrypt" throw error if params isnt string', async () => {
        const mockMongoose = 'User';
        const user = new UserController(mockMongoose);

        expect.assertions(1);
        const passwordCrypted = 'aze';
        const passwordDB = 1;
        const compare = user.comparePasswordWithCrypt(passwordCrypted, passwordDB);

        await expect(compare).rejects.toThrow(/UserControllerError: the params isnt a string/);
    });

    test('method "comparePasswordWithCrypt" return a bool', async () => {
        const mockMongoose = 'User';
        bcrypt.compare.mockResolvedValue(true);
        const user = new UserController(mockMongoose);

        expect.assertions(1);
        const passwordCrypted = 'aze';
        const passwordDB = 'aze';
        const compare = user.comparePasswordWithCrypt(passwordCrypted, passwordDB);

        await expect(compare).resolves.toBe(true);
    });

    test('method "createToken" exist', async () => {
        const mockMongoose = 'User';
        const user = new UserController(mockMongoose);

        expect.assertions(1);
        const email = 'a';
        const createToken = user.createToken(email);

        await expect(createToken).resolves.not.toBeNull();
    })

    test('method "createToken" throw error if param isnt a string', async () => {
        const mockMongoose = 'User';
        const user = new UserController(mockMongoose);

        expect.assertions(1);
        const email = true;
        const createToken = user.createToken(email);

        await expect(createToken).rejects.toThrow(/UserControllerError: the params isnt a string/)
    })

    test('method "createToken" return a token string', async () => {
        const mockMongoose = 'User';
        const user = new UserController(mockMongoose);
        jwt.sign.mockResolvedValue('azaeazezaezaeza');

        expect.assertions(2);
        const email = 'a';
        const createToken = user.createToken(email);

        await expect(createToken).resolves.toBe('azaeazezaezaeza');
        expect(typeof await createToken).toBe("string");
    })

    test('method "connection" exist', async () => {
        const mockMongoose = {
            find: jest.fn().mockResolvedValue([{username: 'a', password: 'aadsf'}])
        };
        const user = new UserController(mockMongoose);
        const param = {
            username: 'a',
            password: 'a'
        };
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockResolvedValue('token_jwt');

        expect.assertions(1);
        const connection = user.connection(param);

        await expect(connection).resolves.not.toBeNull();
    })

    test('method "connection" return an object', async () => {
        const mockMongoose = {
            find: jest.fn().mockResolvedValue([{username: 'a', password: 'aadsf'}])
        };;
        const user = new UserController(mockMongoose);
        const paramUser = {
            username: 'razer@live.fr',
            password: 'a',
        };
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockResolvedValue('token_jwt');

        expect.assertions(1);
        const connection = user.connection(paramUser);

        expect(typeof await connection).toBe('object');
    })

    test('method "connection" return an error if mail not found', async () => {
        const mockMongoose = {
            find: jest.fn().mockResolvedValue([])
        };
        const user = new UserController(mockMongoose);
        const paramUser = {
            username: 'razer@live.fr',
            password: 'a',
        };

        expect.assertions(1);
        const connection = await user.connection(paramUser);

        expect(connection.messageError).toBe('Username not found');
    })

    test('method "connection" return an error if password is false', async () => {
        const mockMongoose = {
            find: jest.fn().mockResolvedValue([{username: 'a', password: 'aadsf'}])
        };
        const user = new UserController(mockMongoose);
        const paramUser = {
            username: 'a',
            password: 'aa'
        };
        bcrypt.compare.mockResolvedValue(false);

        expect.assertions(1);
        const connection = await user.connection(paramUser);

        expect(connection.messageError).toBe('Error password');
    })

    test('method "connection" return an token', async () => {
        const mockMongoose = {
            find: jest.fn().mockResolvedValue([{username: 'a', password: 'aadsf'}])
        };
        const user = new UserController(mockMongoose);
        const paramUser = {
            username: 'a',
            password: 'aa'
        };
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockResolvedValue('token_jwt');

        expect.assertions(1);
        const connection = await user.connection(paramUser);

        expect(connection.result).toBe('token_jwt');
    });

    test('method "connection" throw error if param.username & password isnt string', async () => {
        const mockMongoose = 'User';
        const user = new UserController(mockMongoose);
        const param = {username: 1, password: 'azd'};

        expect.assertions(1);
        const connection = user.connection(param);

        await expect(connection).rejects.toThrow(/UserControllerError: params isnt type string/)
    });

    test('method "createUser" exist', async () => {
        const mockMongoose = {
            save: jest.fn().mockResolvedValue({})
        };
        bcrypt.hash.mockResolvedValue('zaeaze');
        const user = new UserController(mockMongoose);
        const param = {username: 'raphael', password: 'a'};

        expect.assertions(1);
        const createUser = user.createUser(param);

        await expect(createUser).resolves.not.toBeNull();
    })
});