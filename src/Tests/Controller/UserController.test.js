import UserController from "../../Controllers/UserController";
import expect from 'expect';
import mongoose from 'mongoose';

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
});