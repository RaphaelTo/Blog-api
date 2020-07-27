import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    _id: String,
    name: String
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;
