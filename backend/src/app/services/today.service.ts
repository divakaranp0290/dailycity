import db from "../utils/db";



export class TodayService {

  static async upsertToday(data: any) {
    const sql = `
      INSERT INTO daily_today_content
      (city, date, sunrise, sunset, tithi, rahu_kalam, yamagandam, today_special)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      ON CONFLICT (city, date)
      DO UPDATE SET
        sunrise = EXCLUDED.sunrise,
        sunset = EXCLUDED.sunset,
        tithi = EXCLUDED.tithi,
        rahu_kalam = EXCLUDED.rahu_kalam,
        yamagandam = EXCLUDED.yamagandam,
        today_special = EXCLUDED.today_special
      RETURNING *;
    `;

    const values = [
      data.city.toLowerCase(),
      data.date,
      data.sunrise,
      data.sunset,
      data.tithi,
      data.rahu_kalam,
      data.yamagandam,
      data.today_special
    ];

    const result = await db.query(sql, values);
    return result.rows[0];
  }

  static async getTodayByCity(city: string, date: string) {
    const result = await db.query(
      `SELECT * FROM daily_today_content WHERE city=$1 AND date=$2`,
      [city.toLowerCase(), date]
    );
    return result.rows[0] || null;
  }
}
