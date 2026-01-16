import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import adminRoutes from './routes/admin.routes';
import cityRoutes from './routes/city.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', adminRoutes);
app.use('/api', cityRoutes);


app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;