import User from "../models/user.js";
import Music from "../models/music.js";

export const addPrompt = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthenticated." });
  const musicprompt = req.body;
  try {
    const newData = new Music({ ...musicprompt, user: req.user });
    await newData.save();
    await User.findByIdAndUpdate(
      req.user,
      { $push: { musicPrompts: newData._id } },
      { new: true }
    );
    res.status(200).json(newData);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const addResults = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthenticated." });
  try {
    const { id } = req.params;
    const { result } = req.body;
    const updatedMusic = await Music.findByIdAndUpdate(
      id,
      { $push: { result: result } },
      { new: true }
    );

    res.json(updatedMusic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllMusicPrompts = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthenticated." });
  try {
    const { id } = req.params;
    const allMusicForUser = await Music.find({ user: id });
    res.json(allMusicForUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const getPromptsIn7Days = async (req, res) => {
//   if (!req.user) {
//     return res.status(401).json({ message: "Unauthenticated." });
//   }
//   try {
//     // Find the user based on the current request's user ID
//     const user = await User.findById(req.user);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Calculate the date 7 days ago from the current date
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

//     // Find the movie prompts for the user created in the last 7 days
//     const musicPrompts = await Music.find({
//       user: user._id,
//       createdAt: { $gte: sevenDaysAgo },
//     });

//     // Return the movie prompts
//     res.status(200).json(musicPrompts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
