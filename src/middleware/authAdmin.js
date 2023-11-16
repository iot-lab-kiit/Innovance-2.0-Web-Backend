import dotenv from "dotenv";
dotenv.config();

export const authAdmin = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const password = req.headers.password;
    if (
      authorization !== process.env.AUTHORIZATION ||
      password !== process.env.PASSWORD
    )
      return res.status(401).json({ message: "Unauthorised Access." });
  } catch (error) {
    console.log(error);
  }
  next();
};
