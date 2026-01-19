import { db } from '../utils/db';

export class CityService {

  static async upsertToday(data: any) {
    const sql = `
      INSERT INTO daily_today_content
      (
        city,
        date,
        sunrise,
        sunset,
        tithi,
        rahu_kalam,
        yamagandam,
        today_special,
        petrol,
        gold_22k
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      ON CONFLICT (city, date)
      DO UPDATE SET
        sunrise = EXCLUDED.sunrise,
        sunset = EXCLUDED.sunset,
        tithi = EXCLUDED.tithi,
        rahu_kalam = EXCLUDED.rahu_kalam,
        yamagandam = EXCLUDED.yamagandam,
        today_special = EXCLUDED.today_special,
        petrol = EXCLUDED.petrol,
        gold_22k = EXCLUDED.gold_22k
      RETURNING *;
    `;

    const values = [
      data.city.toLowerCase(),
      data.date,
      data.sunrise ?? null,
      data.sunset ?? null,
      data.tithi ?? null,
      data.rahu_kalam ?? null,
      data.yamagandam ?? null,
      data.today_special ?? null,
      data.petrol ?? null,
      data.gold_22k ?? null
    ];

    const result = await db.query(sql, values);
    return result.rows[0];
  }

  static async getTodayByCity(city: string, date: string) {
    const result = await db.query(
      `
      SELECT
        city,
        date,
        today_special,
        petrol,
        gold_22k,
        sunrise,
        sunset,
        tithi,
        rahu_kalam,
        yamagandam
      FROM daily_today_content
      WHERE city = $1 AND date = $2
      LIMIT 1
      `,
      [city.toLowerCase(), date]
    );

    return result.rows[0] || null;
  }

  static async getAllCities(): Promise<string[]> {
    const result = await db.query(`
    SELECT DISTINCT city
    FROM daily_today_content
    ORDER BY city ASC
  `);

    return result.rows.map(r => r.city);
  }

  static async getYesterdayByCity(city: string) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const date = yesterday.toISOString().split('T')[0];

  const result = await db.query(
    `
    SELECT
      today_special,
      petrol,
      gold_22k,
      sunrise,
      sunset,
      tithi,
      rahu_kalam,
      yamagandam
    FROM daily_today_content
    WHERE city = $1 AND date = $2
    LIMIT 1
    `,
    [city.toLowerCase(), date]
  );

  return result.rows[0] || null;
}

static async autoCopyYesterdayToToday() {
  const today = new Date().toISOString().split('T')[0];

  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = yesterdayDate.toISOString().split('T')[0];

  // Get all cities that had data yesterday
  const citiesResult = await db.query(
    `
    SELECT DISTINCT city
    FROM daily_today_content
    WHERE date = $1
    `,
    [yesterday]
  );

  for (const row of citiesResult.rows) {
    const city = row.city;

    // Check if today already exists
    const todayCheck = await db.query(
      `
      SELECT 1
      FROM daily_today_content
      WHERE city = $1 AND date = $2
      LIMIT 1
      `,
      [city, today]
    );

    if (todayCheck.rows.length > 0) {
      continue; // Admin already updated today
    }

    // Fetch yesterday's data
    const yesterdayData = await db.query(
      `
      SELECT
        sunrise,
        sunset,
        tithi,
        rahu_kalam,
        yamagandam,
        today_special,
        petrol,
        gold_22k
      FROM daily_today_content
      WHERE city = $1 AND date = $2
      LIMIT 1
      `,
      [city, yesterday]
    );

    if (!yesterdayData.rows.length) {
      continue;
    }

    const d = yesterdayData.rows[0];

    // Insert today’s row
    await db.query(
      `
      INSERT INTO daily_today_content
      (
        city,
        date,
        sunrise,
        sunset,
        tithi,
        rahu_kalam,
        yamagandam,
        today_special,
        petrol,
        gold_22k
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      `,
      [
        city,
        today,
        d.sunrise,
        d.sunset,
        d.tithi,
        d.rahu_kalam,
        d.yamagandam,
        d.today_special,
        d.petrol,
        d.gold_22k
      ]
    );
  }
}

}
