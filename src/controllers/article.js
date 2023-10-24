import User from '../models/user.js';
import Article from '../models/article.js';

export const createArticleRecommendation = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthenticated.' });
    }
    const articleprompt = req.body.topic;
    try {
        const newData = new Article({ prompt: articleprompt, user: req.user });
        await newData.save();
        await User.findByIdAndUpdate(req.user, { $push: { articlePrompts: newData._id } }, { new: true });
        res.status(200).json(newData);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const addResults = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthenticated.' });
    }
    try {
        const { id } = req.params;
        const { results } = req.body;

        const updatedArticle = await Article.findByIdAndUpdate(
            id,
            { $push: { result: { $each: results } } },
            { new: true }
        );

        res.json(updatedArticle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getPromptsIn7Days = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthenticated.' });
    }
    try {
        // Find the user based on the current request's user ID
        const user = await User.findById(req.user);

        // Calculate the date 7 days ago from the current date
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Find the movie prompts for the user created in the last 7 days
        const articlePrompts = await Article.find({
            user: user._id,
            createdAt: { $gte: sevenDaysAgo },
        });

        // Return the movie prompts
        res.status(200).json(articlePrompts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};