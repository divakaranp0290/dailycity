import express from 'express';
import cors from 'cors';
import adminRoutes from './routes/admin.routes';
import financeRoutes from './routes/finance.routes';
import todayRoutes from './routes/today.routes';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/admin', adminRoutes);
app.use('/api/today', todayRoutes);
app.use('/api/finance', financeRoutes);


export default app;
