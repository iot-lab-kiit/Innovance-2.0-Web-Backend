import User from '../models/user.js';
import Article from '../models/article.js';
import axios from 'axios';
import readline from 'readline';

async function searchArticles(query) {
    const params = {
        engine: 'google',
        q: 'Articles on ' + query,
        api_key: 'c3648cf164f14a2278308e6816b7daea1fd6dac01fe264d9be8edc01b9197c2d'
    };

    const response = await axios.get('https://serpapi.com/search', { params });
    const organicResults = response.data.organic_results;

    return organicResults;
}

// const readLine = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// readLine.question('Enter the topic: ', async (searchQuery) => {
//     console.log('\nDisplaying top article links\n');
//     const searchResults = await searchArticles(searchQuery);

//     searchResults.forEach((result, i) => {
//         console.log(`${i + 1}. ${result.title}\n${result.link}\n${result.snippet}\n`);
//     });

//     readline.close();
// });

export const createArticleRecommendation = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthenticated.' });
    }
    const articleprompt = req.body.topic;
    try {
        const searchResults = await searchArticles(articleprompt);
        const newData = new Article({ prompt: articleprompt, result: searchResults, user: req.user });
        await newData.save();
        await User.findByIdAndUpdate(req.user, { $push: { articlePrompts: newData._id } }, { new: true });
        res.status(200).json(newData);
    } catch (error) {
        res.json({ message: error.message });
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