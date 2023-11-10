import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const tokens = req.headers.authorization.split(" ")[1];
    if (!tokens) return res.json({ message: "not a valid token" });
    const isCustomAuth = tokens.length < 500;
    let decodedData;
    if (tokens && isCustomAuth) {
      decodedData = jwt.verify(tokens, "test");
      req.user = decodedData?.id;
    } else {
      decodedData = jwt.decode(tokens);
      req.user = decodedData?.sub;
    }
  } catch (error) {
    console.log(error);
  }
  next();
};
