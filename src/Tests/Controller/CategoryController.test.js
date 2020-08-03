import CategoryController from '../../Controllers/CategoryController';
import mongoose from 'mongoose';
import expect from 'expect';

jest.mock('mongoose');

describe('test CategoryController class', () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('throw error if param isnt mongoose instance', () => {
        //Arrange
        const mockMongoose = mongoose.model.mockReturnValue('Category');
        
        expect(mockMongoose).toHaveBeenCalledTimes(0);
        
        try {
          new CategoryController(mockMongoose);
        }catch (err) {
            expect(err.message).toBe('ArticleControllerError: this isnt an mongoose model instance');
        }
    });

    test('method getAllCategory return an object', async () => {
        //Arrange
        const mockModelMongoose = mongoose.model.mockReturnValue({});
        const category = new CategoryController(mockModelMongoose);
        //Act
        const getAllCategory = category.getAllCategory();
        //Assert
        await expect(typeof getAllCategory).toBe('object');
        await expect(getAllCategory).not.toBe(null);
    });

    test('method getAllCategory return same structure', async () => {
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
        const category = new CategoryController(mockModelMongoose);
        //Act
        expect.assertions(1);
        const getAllArticle = Object.keys(await category.getAllCategory());
        //Assert
        expect(getAllArticle).toEqual(Object.keys(structure));
    });

    test('method getAllCategory return same value that mock', async () => {
        //Arrange
        const mockReturnAllArticle = [
            {
                "_id":"a",
                "name":"front-end",
            },
            {
                "_id":"b",
                "name":"back-end",
            },
        ];

        const mockModelMongooseWithQuery = {
             find: jest.fn().mockResolvedValue([
                {
                    "_id":"a",
                    "name":"front-end",
                },
                {
                    "_id":"b",
                    "name":"back-end",
                },
             ])
         };

        const category = new CategoryController(mockModelMongooseWithQuery);
        const structure = (resultMock) => {
             return {
                 type : "success",
                 result: resultMock
             }
         };

        //Act
        expect.assertions(2);
        const getAllCategory = category.getAllCategory();

        //Assert
        await expect(getAllCategory).resolves.toEqual(structure(mockReturnAllArticle));
        expect(mockModelMongooseWithQuery.find).toHaveBeenCalled();
    });

    test('method getAllArticle return 0 article found', async () => {
        //Arrange
        const mockModelMongooseWithQuery = {
            find: jest.fn().mockResolvedValue([])
        };
        const article = new ArticleController(mockModelMongooseWithQuery);

        //Act
        expect.assertions(1);
        const getAllArticle = await article.getAllArticle();
        //Assert
        expect(getAllArticle.result).toBe('0 article found');
    });

    test('method getArticleById return an object', async () => {
        //Arrange
        const mockModelMongooseWithQuery = {
            findById: jest.fn().mockResolvedValue({})
        };
        const ID = 'a';
        const article = new ArticleController(mockModelMongooseWithQuery);

        //Act
        expect.assertions(1);
        const getArticleById = await article.getArticleById(ID);

        //Assert
        expect(typeof getArticleById).toBe('object');
    });

    test('method getArticleByID return article', async () => {
        //Arrange
        const mockModelMongooseWithQuery = {
            findById: jest.fn().mockResolvedValue({
                "_id":"a",
                "Category":[],
                "title":"A",
                "abstract":"a",
                "content":"aaa",
                "date":{"$date":"2020-07-30T16:02:00.791Z"}
            })
        };
        const ID = 'a';
        const article = new ArticleController(mockModelMongooseWithQuery);
        const returnValue = {
            type : "success",
            result: {
                "_id":"a",
                "Category":[],
                "title":"A",
                "abstract":"a",
                "content":"aaa",
                "date":{"$date":"2020-07-30T16:02:00.791Z"}
            }
        };

        //Act
        expect.assertions(1);
        const getArticleById = await article.getArticleById(ID);
        //Assert
        expect(getArticleById).toEqual(returnValue);
    });

    test('method getArticleByID return errorID if article not found', async () => {
       //Arrange
       const mockModelMongooseWithQuery = {
           findById: jest.fn().mockRejectedValue(null)
       };
       const ID = 'b';
       const article = new ArticleController(mockModelMongooseWithQuery);

       expect.assertions(0);
       try{
        await article.getArticleById(ID);
       }catch (e) {
           expect(e).reject.toThrow(/ERROR/)
       }
    });
});