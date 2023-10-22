import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

export const authenticate = async (req, res) => {
  const user = req.body;
  console.log(req.body);
  const { email } = req.body;
  const { password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await User.create({ ...user, password: hashedPassword });

      const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '9999 years' });

      res.status(200).json({ result, token });
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

      if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '9999 years' });

      res.status(200).json({ result: existingUser, token });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = req.body;
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { ...user, id }, { new: true });

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};