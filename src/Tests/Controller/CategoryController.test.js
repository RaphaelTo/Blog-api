import CategoryController from '../../Controllers/CategoryController';
import mongoose from 'mongoose';
import expect from 'expect';
import CategoryControllerError from '../../Errors/CategoryControllerError';

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

    test('method getAllCategory return 0 article found', async () => {
        //Arrange
        const mockModelMongooseWithQuery = {
            find: jest.fn().mockResolvedValue([])
        };
        const category = new CategoryController(mockModelMongooseWithQuery);

        //Act
        expect.assertions(1);
        const getAllCategory = await category.getAllCategory();
        //Assert
        expect(getAllCategory.result).toBe('0 category found');
    });

    test('method getCategoryById return an object', async () => {
        //Arrange
        const mockModelMongooseWithQuery = {
            findById: jest.fn().mockResolvedValue({})
        };
        const ID = 'a';
        const category = new CategoryController(mockModelMongooseWithQuery);

        //Act
        expect.assertions(1);
        const getCategoryById = await category.getCategoryById(ID);

        //Assert
        expect(typeof getCategoryById).toBe('object');
    });

    test('method getCategoryByID return category', async () => {
        //Arrange
        const mockModelMongooseWithQuery = {
            findById: jest.fn().mockResolvedValue({
                "_id":"a",
                "name": "front-end"
            })
        };
        const ID = 'a';
        const category = new CategoryController(mockModelMongooseWithQuery);
        const returnValue = {
            type : "success",
            result: {
                "_id":"a",
                "name": "front-end"
            }
        };

        //Act
        expect.assertions(1);
        const getCategoryById = await category.getCategoryById(ID);
        //Assert
        expect(getCategoryById).toEqual(returnValue);
    });

    test('method getCategoryByID return errorID if category not found', async () => {
       //Arrange
       const mockModelMongooseWithQuery = {
           findById: jest.fn().mockRejectedValue(null)
       };
       const ID = 'b';
       const category = new CategoryController(mockModelMongooseWithQuery);

       expect.assertions(0);
       try{
        await category.getCategoryById(ID);
       }catch (e) {
           expect(e).reject.toThrow(/ERROR/)
       }
    });

    test('method addCategory return an object', async () => {
        //Arrange
        const mockModelMongooseWithQuery = {
            save: jest.fn().mockResolvedValue({name: 'front-end'}),
            name: jest.fn().mockReturnValue({name:'front-end'})
        };
        const category = new CategoryController(mockModelMongooseWithQuery);
        
        //Act
        expect.assertions(1);
        const createCategory = category.createCategory();
        //Assert
        await expect(typeof createCategory).toBe('object');
    });

    test('method "addCategory" add a cat', async () => {
        const mockModelMongooseWithQuery = {
            save: jest.fn().mockResolvedValue({name: 'front-end'}),
            name: jest.fn().mockReturnValue({name: 'front-end'})
        };
        const category = new CategoryController(mockModelMongooseWithQuery);

        expect.assertions(2);
        const createCat = await category.createCategory();

        expect(mockModelMongooseWithQuery.save).toHaveBeenCalledTimes(1);
        expect(createCat.result).toEqual({name: 'front-end'});
    });

    test('method addCategory throw an error if the object dont got "name" key', async () => {
        //Arrange
        const mockModelMongooseWithQuery = {
            save: jest.fn().mockRejectedValue(new CategoryControllerError('CategoryControllerError: Error in the key object')),
            nome: jest.fn().mockReturnValue({nome: 'front-end'})
        };
        const category = new CategoryController(mockModelMongooseWithQuery);
        //Act     
        
        expect.assertions(1);
        const addCat = await category.createCategory();
        
        expect(addCat.messageError.message).toBe('CategoryControllerError: Error in the key object');
    });

    test('method deleteCategory return an object', async () => {
        const mockModelMongooseWithQuery = {
            findByIdAndRemove: jest.fn().mockResolvedValue({})
        };
        const category = new CategoryController(mockModelMongooseWithQuery);
        const ID = 'a';

        expect.assertions(1);
        const deleteCat = await category.deleteCategoryById('a');

        expect(typeof deleteCat).toBe('object');
    });

    test('method return an error if ID doesnt exist', async () => {
        const mockModelMongooseWithQuery = {
            findByIdAndRemove: jest.fn().mockRejectedValue(new CategoryControllerError('CategoryControllerError: ID doesnt exist'))
        };
        const category = new CategoryController(mockModelMongooseWithQuery);
        const ID = '&';

        expect.assertions(1);
        try {
            await category.deleteCategoryById(ID);
        }catch (e) {
            expect(e.message).toBe('CategoryControllerError: ID doesnt exist');
        }
    });

    test('method deleteCat return an object with id deleted', async () => {
        const mockModelMongooseWithQuery = {
            findByIdAndRemove: jest.fn().mockResolvedValue({_id: 'a'})
        };
        const category = new CategoryController(mockModelMongooseWithQuery);
        const ID = 'a';

        expect.assertions(2);
        const deleteCat = await category.deleteCategoryById(ID);

        expect(deleteCat.result._id).not.toBeNull();
        expect(deleteCat.result._id).toBe(ID);
    });

    test('method updateCat exist', async () => {
        const mockModelMongooseWithQuery = {
            findByIdAndUpdate: jest.fn().mockResolvedValue({})
        };
        const category = new CategoryController(mockModelMongooseWithQuery);
        const ID = 'a';
        const newCat = {name: 'nouveau'};

        expect.assertions(2);
        const updateCat = await category.updateCategoryById(ID, newCat);

        expect(typeof updateCat).toBe('object');
        expect(updateCat).not.toBeNull();
    });

    test('method updateCat throw error if id doesnt exist', async () => {
        const mockModelMongooseWithQuery = {
            findByIdAndUpdate: jest.fn().mockRejectedValue(new CategoryControllerError('CategoryControllerError: ID doesnt exist'))
        };
        const category = new CategoryController(mockModelMongooseWithQuery);
        const ID = 'throwError';
        const newCat = {name: 'hello'};

        expect.assertions(1);
        try {
            await category.updateCategoryById(ID, newCat);
        }catch (e) {
            expect(e.message).toBe('CategoryControllerError: ID doesnt exist')
        }
    });

    test('method updateCat throw error if key object has false', async () => {
        const mockModelMongooseWithQuery = {
            findByIdAndUpdate: jest.fn().mockReturnValue([])
        };
        const category = new CategoryController(mockModelMongooseWithQuery);
        const ID = "goodID";
        const newCat = {nome: 'throwError'};

        expect.assertions(1);
        const updateCat = await category.updateCategoryById(ID, newCat);

        expect(updateCat.messageError.message).toBe('CategoryControllerError: key has incorrect');
    });

    test('method updateCat return id updated', async () => {
        const mockModelMongooseWithQuery = {
            findByIdAndUpdate: jest.fn().mockResolvedValue({_id: 'a', name:'last name'})
        };
        const category = new CategoryController(mockModelMongooseWithQuery);
        const ID = "a";
        const newCat = {name: 'new name'};

        expect.assertions(1);
        const updateCat = await category.updateCategoryById(ID, newCat);

        expect(updateCat.result).toEqual({_id: 'a', name:'last name'});
    });

});