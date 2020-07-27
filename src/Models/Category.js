import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    _id: String,
    name: String
});

export default CategorySchema;
