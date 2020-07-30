import ArticleController from '../../Controllers/ArticleController';
import mongoose from 'mongoose';
import expect from 'expect';

jest.mock('mongoose');

describe('test ArticleController class', () => {

    test('throw error if param isnt mongoose instance', () => {
        //Arrange
        const mockMongoose = mongoose.model.mockReturnValue('Article');
        
        expect(mockMongoose).toHaveBeenCalledTimes(1);
        
        try {
          new ArticleController(mockMongoose);
        }catch (err) {
            expect(err.message).toBe('ArticleControllerError: this isnt an mongoose model instance');
        }
    })
})