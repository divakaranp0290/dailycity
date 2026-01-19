import { db } from "../utils/db";


interface CityTodayPayload {
  city: string;
  date: string;
  today_special?: string;
  petrol?: number;
  diesel?: number;
  gold_22k?: number;
  silver?: number;
  power_cut?: string;
  water_issue?: string;
  traffic?: string;
}


export class AdminService {
  static async upsertCityTodayData(payload: CityTodayPayload) {
    const {
      city,
      date,
      today_special,
      petrol,
      diesel,
      gold_22k,
      silver,
      power_cut,
      water_issue,
      traffic
    } = payload;

    await db.query(
      `
    INSERT INTO daily_today_content (
      city,
      date,
      today_special,
      petrol,
      diesel,
      gold_22k,
      silver,
      power_cut,
        water_issue,
        traffic
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    ON CONFLICT (city, date)
    DO UPDATE SET
      today_special = EXCLUDED.today_special,
      petrol = EXCLUDED.petrol,
      diesel = EXCLUDED.diesel,
      gold_22k = EXCLUDED.gold_22k,
      silver = EXCLUDED.silver,
      power_cut = EXCLUDED.power_cut,
        water_issue = EXCLUDED.water_issue,
        traffic = EXCLUDED.traffic,
      updated_at = NOW()
    `,
      [
        city,
        date,
        today_special ?? null,
        petrol ?? null,
        diesel ?? null,
        gold_22k ?? null,
        silver ?? null,
        power_cut ?? null,
        water_issue ?? null,
        traffic ?? null
      ]
    );
  }
}
