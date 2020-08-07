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
            User : jest.fn().mockReturnValue({
                find :{},
                findOne: {}
            })
        };

        const user = new UserController(mockMongoose);

        expect(user).not.toBeNull();
    })
});