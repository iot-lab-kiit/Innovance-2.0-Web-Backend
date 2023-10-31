import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        references: 'userSchema',
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },
    result: [{
        position: Number,
        title: String,
        link: String,
        displayed_link: String,
        favicon: String,
        snippet: String,
        snippet_highlighted_words: [String],
        about_page_link: String,
        about_page_serpapi_link: String,
        cached_page_link: String,
        source: String
      }],
    accuracy: Boolean,
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
})

export default mongoose.model("Article", articleSchema);