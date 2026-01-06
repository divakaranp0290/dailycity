import express from 'express';
import cors from 'cors';
import cityRoutes from './routes/city.routes';
import adminRoutes from './routes/admin.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/city', cityRoutes);
app.use('/api/admin', adminRoutes);

export default app;
