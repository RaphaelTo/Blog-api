import ArticleController from '../../Controllers/ArticleController';
import mongoose from 'mongoose';

jest.mock('mongoose');

describe('test ArticleController class', () => {
    test('implementation ArticleController', () => {
        //Arrange
        const mockMongoose = mongoose.connect.mockReturnValue({});
        //Act
        const article = new ArticleController(mockMongoose);
        //Assert
        expect(mockMongoose).toHaveBeenCalledTimes(1);
        expect(article instanceof ArticleController).toBe(true);
    })
})