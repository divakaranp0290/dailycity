import { db } from "../utils/db";


interface CityTodayPayload {
  city: string;
  date: string;
  today_special?: string;
  petrol?: number;
  diesel?: number;
  gold_22k?: number;
  silver?: number;
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
      silver
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
      silver
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (city, date)
    DO UPDATE SET
      today_special = EXCLUDED.today_special,
      petrol = EXCLUDED.petrol,
      diesel = EXCLUDED.diesel,
      gold_22k = EXCLUDED.gold_22k,
      silver = EXCLUDED.silver,
      updated_at = NOW()
    `,
      [
        city,
        date,
        today_special ?? null,
        petrol ?? null,
        diesel ?? null,
        gold_22k ?? null,
        silver ?? null
      ]
    );
  }
}
