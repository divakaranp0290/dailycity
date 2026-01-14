import cron from 'node-cron';
import { TodayService } from '../services/today.service';

const cities = ['chennai', 'bangalore', 'mumbai'];

cron.schedule('5 0 * * *', async () => {
  const today = new Date().toISOString().split('T')[0];
  console.log('CRON running for', today);

  for (const city of cities) {
    await TodayService.upsertToday({
      city,
      date: today,
      sunrise: null,
      sunset: null,
      tithi: null,
      rahu_kalam: null,
      yamagandam: null,
      today_special: null
    });
  }
}, {
  timezone: 'Asia/Kolkata'
});
