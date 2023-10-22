import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        references: 'userSchema',
        required: true,
    },
    prompt: [{
        movie: String,
        rating: Number,
    }],
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

export default mongoose.model("Movie", movieSchema);