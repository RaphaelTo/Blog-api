import UserController from "../../Controllers/UserController";
import UserControllerError from "../../Errors/UserControllerError";
import expect from 'expect';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

jest.mock('bcrypt');
jest.mock('mongoose');


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

        const passToCrypt = "aa";
        const crypt = await user.cryptPassword(passToCrypt);

        expect(crypt).not.toBeNull();
    })

    test('method "cryptPassword" return a string', async () => {
        const mockMongoose = 'User';
        const user = new UserController(mockMongoose);

        const passToCrypt = "aa";
        const crypt = await user.cryptPassword(passToCrypt);

        expect(typeof crypt).toBe('string');
    })

    test('method "cryptPassword" return an password crypted', async () => {
        const mockMongoose = 'User';
        bcrypt.hash.mockResolvedValue('aze');
        const user = new UserController(mockMongoose);

        const passToCrypt = "a";
        const crypt = await user.cryptPassword(passToCrypt);

        expect(crypt).toBe('aze');
    })

    test('method "cryptPassword" throw error if the param isnt a string', async () => {
        const mockMongoose = 'User';
        const user = new UserController(mockMongoose);

        const passToCrypt = 1;
        const crypt = user.cryptPassword(passToCrypt);

        await expect(crypt).rejects.toThrow(/UserControllerError: the params isnt a string/);
    })
});