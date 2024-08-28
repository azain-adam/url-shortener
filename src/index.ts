import express from 'express';
import {router as urlRoutes} from './routes/urlRouter';
import {connectToMongoDB} from './connect';

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/url-shortener').then(() =>
  console.log('MongoDB is connected and running.'),
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/url', urlRoutes);

app.listen(PORT, () => console.log(`Server started and running at: ${PORT}`));
