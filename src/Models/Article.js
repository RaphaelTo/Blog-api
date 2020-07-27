import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    _id: String,
    title: String,
    abstract: String,
    content: String,
    date: { type: Date, default: Date.now},
    Category : [{ type: Schema.Types.ObjectId, ref: 'Category'}]
});

const Article = mongoose.model('Article', ArticleSchema);

export default Article;