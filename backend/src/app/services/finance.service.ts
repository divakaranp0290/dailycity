import { db } from "../utils/db";



export class FinanceService {

  static async fetchPetrolPrice(city: string, date: string): Promise<number | null> {
    try {
      const result = await db.query(
        `
      SELECT petrol
      FROM daily_today_content
      WHERE city = $1 AND date = $2
      LIMIT 1
      `,
        [city, date]
      );

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0].petrol;
    } catch (err) {
      console.error('Finance Service Error:', err);
      return null;
    }
  }

  static async  fetchGoldRate22K(
  city: string,
  date: string
): Promise<number | null> {
  try {
    const result = await db.query(
      `
      SELECT gold_22k
      FROM daily_today_content
      WHERE city = $1 AND date = $2
      LIMIT 1
      `,
      [city, date]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0].gold_22k;
  } catch (err) {
    console.error('Gold Service Error:', err);
    return null;
  }
}
}
