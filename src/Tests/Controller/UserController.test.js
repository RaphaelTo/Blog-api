import UserController from "../../Controllers/UserController";
import expect from 'expect';
import mongoose from 'mongoose';

jest.mock('mongoose');

describe('test file UserController', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    })
});