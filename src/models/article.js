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
    result: [String],
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