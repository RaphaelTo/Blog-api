import ArticleController from '../../Controllers/ArticleController';
import mongoose from 'mongoose';
import expect from 'expect';
import ArticleControllerError from "../../Errors/ArticleControllerError";

jest.mock('mongoose');

describe('test ArticleController class', () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('throw error if param isnt mongoose instance', () => {
        //Arrange
        const mockMongoose = mongoose.model.mockReturnValue('Article');
        
        expect(mockMongoose).toHaveBeenCalledTimes(0);
        
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

    test('method createArticle exist', async () => {
        const mockModelMongooseWithQuery = {
            save: jest.fn().mockReturnValue({})
        };
        const article = new ArticleController(mockModelMongooseWithQuery);

        expect.assertions(1);
        const addArticle = article.createArticle();

        await expect(addArticle).not.toBeNull();
    });

    test('method createArticle return an object', async () => {
        const mockModelMongooseWithQuery = {
            save: jest.fn().mockResolvedValue({})
        };
        const article = new ArticleController(mockModelMongooseWithQuery);

        expect.assertions(1);
        const addArticle = article.createArticle();

        await expect(typeof addArticle).toBe('object');
    });

    test('method createArticle throw an error if key object is undefined', async () => {
        const mockModelMongooseWithQuery = {
            save: jest.fn().mockReturnValue({}),
            title: 'a',
            abstract: 'a',
            contnt: 'a',
            Category: 'a'
        };
        const article = new ArticleController(mockModelMongooseWithQuery);

        expect.assertions(1);
        const addArticle = await article.createArticle();

        expect(addArticle.messageError.message).toBe('ArticleControllerError: Error on the "key" object');
    });

    test('method createArticle check return the article created', async () => {
        const mockModelMongooseWithQuery = {
            save: jest.fn().mockResolvedValue({title: 'a', abstract: 'a', content: 'a', Category: 'a'}),
            title: 'a',
            abstract: 'a',
            content: 'a',
            Category: 'a'
        };
        const article = new ArticleController(mockModelMongooseWithQuery);

        expect.assertions(2);
        const addArticle = await article.createArticle();

        expect(addArticle.type).toBe('success');
        expect(addArticle.result).toEqual({title: 'a', abstract: 'a', content: 'a', Category: 'a'})
    });

    test('method deleteArticleById exist', async () => {
        const mockModelMongooseWithQuery = {
            findByIdAndRemove: jest.fn().mockReturnValue({})
        };
        const article = new ArticleController(mockModelMongooseWithQuery);
        const ID = 'a';

        expect.assertions(1);
        const deleteArticle = article.deleteArticleById(ID);

        await expect(deleteArticle).not.toBeNull();
    });

    test('method deleteArticleById return an object', async () => {
        const mockModelMongooseWithQuery = {
            findByIdAndRemove: jest.fn().mockReturnValue({})
        };
        const article = new ArticleController(mockModelMongooseWithQuery);
        const ID = "a";

        expect.assertions(1);
        const deleteArticle = article.deleteArticleById(ID);

        await expect(typeof deleteArticle).toBe('object');
    });

    test('method deleteArticleById throw error if id doesnt exist', async () => {
        const mockModelMongooseWithQuery = {
            findByIdAndRemove: jest.fn().mockRejectedValue(new ArticleControllerError('ArticleControllerError: ID doesnt exist'))
        };
        const article = new ArticleController(mockModelMongooseWithQuery);
        const ID = 'a';

        expect.assertions(1);
        try{
            await article.deleteArticleById(ID);
        }catch (err) {
            expect(err.message).toBe('ArticleControllerError: ID doesnt exist')
        }
    });

    test('method deleteArticleById return id deleted', async () => {
        const mockModelMongooseWithQuery = {
            findByIdAndRemove: jest.fn().mockResolvedValue({_id: 'a'})
        };
        const article = new ArticleController(mockModelMongooseWithQuery);
        const ID = 'a';

        expect.assertions(2);
        const deleteArticle = await article.deleteArticleById(ID);

        expect(deleteArticle.result).toEqual({_id: 'a'});
        expect(mockModelMongooseWithQuery.findByIdAndRemove).toHaveBeenCalledTimes(1);
    })
});