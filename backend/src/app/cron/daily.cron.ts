import cron from 'node-cron';
import { CityService } from '../services/city.service';

export function startDailyCron() {

  // Runs every day at 12:05 AM
  cron.schedule('5 0 * * *', async () => {
    try {
      console.log('🕛 Running daily auto-copy cron...');
      await CityService.autoCopyYesterdayToToday();
      console.log('✅ Daily auto-copy completed');
    } catch (error) {
      console.error('❌ Daily cron failed:', error);
    }
  });

}
