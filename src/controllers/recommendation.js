import User from '../models/user.js';
import Movie from '../models/movie.js';

export const createMovieRecommendation = async (req, res) => {
  const movieprompt = req.body;
  try {
    const newData = new Movie({ ...movieprompt, user: req.user });
    await newData.save();
    await User.findByIdAndUpdate(req.user, { $push: { moviePrompts: newData._id } }, { new: true });
    res.status(200).json(newData);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getAllMoviePrompts = async (req, res) => {
  try {
    const prompts = await Movie.find();
    res.status(200).json(prompts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addResults = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthenticated.' });
  }
  try {
    const { id } = req.params;
    const { results } = req.body; 

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { $push: { result: { $each: results } } },
      { new: true }
    );

    res.json(updatedMovie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPromptsInLast7Days = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const prompts = await Movie.find({
      createdAt: { $gte: sevenDaysAgo },
    });

    res.json(prompts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};