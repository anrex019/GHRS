import { connect, model } from 'mongoose';
import { Article, ArticleSchema } from '../src/schemas/article.schema';
import { Blog, BlogSchema } from '../src/schemas/blog.schema';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set in environment variables');
  process.exit(1);
}

async function checkDatabase() {
  try {
    // Connect to MongoDB
    await connect(MONGODB_URI);

    // Initialize models
    const ArticleModel = model('Article', ArticleSchema);
    const BlogModel = model('Blog', BlogSchema);

    // Check articles
    const articles = await ArticleModel.find();
    for (const article of articles) {
    }

    // Check blogs
    const blogs = await BlogModel.find();
    for (const blog of blogs) {
      if (blog.articles?.length > 0) {
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkDatabase(); 