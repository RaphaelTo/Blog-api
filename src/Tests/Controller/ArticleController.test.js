import ArticleController from '../../Controllers/ArticleController';
import mongoose from 'mongoose';
import expect from 'expect';

jest.mock('mongoose');

describe('test ArticleController class', () => {

    beforeEach(() => {
        jest.resetAllMocks();
    })

    test('throw error if param isnt mongoose instance', () => {
        //Arrange
        const mockMongoose = mongoose.model.mockReturnValue('Article');
        
        expect(mockMongoose).toHaveBeenCalledTimes(1);
        
        try {
          new ArticleController(mockMongoose);
        }catch (err) {
            expect(err.message).toBe('ArticleControllerError: this isnt an mongoose model instance');
        }
    });

    test('method getAllArticle return an object', async () => {
        //Arrange
        const mockModelMongoose = mongoose.model.mockReturnValue({});
        const article = new ArticleController(mockModelMongoose);
        //Act
        const getAllArticle = article.getAllArticle();
        //Assert
        await expect(typeof getAllArticle).toBe('object');
        await expect(getAllArticle).not.toBe(null);
    });

    test('method getAllArticle return same structure', async () => {
        //Arrange
        const structure = {
            type : "success",
            result: "api"
        };
        const mockModelMongoose = {
            find: jest.fn().mockResolvedValue([
                {
                    "_id":"a",
                    "Category":[],
                    "title":"A",
                    "abstract":"a",
                    "content":"aaa",
                    "date":{"$date":"2020-07-30T16:02:00.791Z"}},
            ]),
        };
        const article = new ArticleController(mockModelMongoose);
        //Act
        expect.assertions(1);
        const getAllArticle = Object.keys(await article.getAllArticle());
        //Assert
        expect(getAllArticle).toEqual(Object.keys(structure));
    });

    test('method getAllArticle return same value that mock', async () => {
        //Arrange
        const mockReturnAllArticle = [
            {
                "_id":"a",
                "Category":[],
                "title":"A",
                "abstract":"a",
                "content":"aaa",
                "date":{"$date":"2020-07-30T16:02:00.791Z"}
            },
            {
                "_id":"a",
                "Category":[],
                "title":"A",
                "abstract":"a",
                "content":"aaa",
                "date":{"$date":"2020-07-30T16:02:00.791Z"}
            },
        ];

        const mockModelMongooseWithQuery = {
             find: jest.fn().mockResolvedValue([
                 {
                     "_id":"a",
                     "Category":[],
                     "title":"A",
                     "abstract":"a",
                     "content":"aaa",
                     "date":{"$date":"2020-07-30T16:02:00.791Z"}
                 },
                 {
                     "_id":"a",
                     "Category":[],
                     "title":"A",
                     "abstract":"a",
                     "content":"aaa",
                     "date":{"$date":"2020-07-30T16:02:00.791Z"}
                 },
             ])
         };

        const article = new ArticleController(mockModelMongooseWithQuery);
        const structure = (resultMock) => {
             return {
                 type : "success",
                 result: resultMock
             }
         };

        //Act
        expect.assertions(2);
        const getAllArticle = article.getAllArticle();

        //Assert
        await expect(getAllArticle).resolves.toEqual(structure(mockReturnAllArticle));
        expect(mockModelMongooseWithQuery.find).toHaveBeenCalled();
    })
})