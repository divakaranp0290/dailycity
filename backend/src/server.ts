import dotenv from 'dotenv';

dotenv.config();

console.log('🔥 DATABASE_URL LOADED IN SERVER:', process.env.DATABASE_URL);

import app from './app/app';
import { startDailyCron } from './app/cron/daily.cron';


const PORT = process.env.PORT || 3000;

// Start cron
startDailyCron();

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
