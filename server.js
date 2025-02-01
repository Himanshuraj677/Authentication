import express from 'express';
import dotenv from 'dotenv';
import AuthRoute from './routes/auth.route.js';
import { sequelize } from './config/db.config.js';
import cookieParser from 'cookie-parser';
import ErrorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.get('/api/test', (req, res) => {
  res.send('Hello World');
});
app.use('/api/auth', AuthRoute);


app.use(ErrorHandler);


sequelize.sync({ force: true })
  .then(() => {
    console.log('Database synchronized successfully!');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
