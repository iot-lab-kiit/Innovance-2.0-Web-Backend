import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './src/routes/user.js';
import movieRoutes from './src/routes/movie.js';
import articleRoutes from './src/routes/article.js';
dotenv.config();

const app = express();


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use('/user', userRoutes);
app.use('/movie', movieRoutes);
app.use('/article', articleRoutes);

const PORT = process.env.PORT || 3300;
mongoose.connect(process.env.MONGO_URL)
    .then(()=>app.listen(PORT, ()=> {
        console.log(`Server is running on port ${PORT}`);
    }))
    .catch((err)=>console.log(err))
