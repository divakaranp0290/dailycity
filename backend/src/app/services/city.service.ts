import { db } from '../utils/db';

export class CityService {

  /* =========================================================
     ADMIN UPSERT (used by admin panel)
     ========================================================= */
  static async upsertToday(data: any) {
    const sql = `
      INSERT INTO daily_today_content (
        city,
        date,
        today_special,
        traffic,
        power_cut,
        water_issue,
        sunrise,
        sunset,
        tithi,
        rahu_kalam,
        yamagandam,
        petrol,
        diesel,
        gold_22k,
        silver
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15
      )
      ON CONFLICT (city, date)
      DO UPDATE SET
        today_special = EXCLUDED.today_special,
        traffic = EXCLUDED.traffic,
        power_cut = EXCLUDED.power_cut,
        water_issue = EXCLUDED.water_issue,
        sunrise = EXCLUDED.sunrise,
        sunset = EXCLUDED.sunset,
        tithi = EXCLUDED.tithi,
        rahu_kalam = EXCLUDED.rahu_kalam,
        yamagandam = EXCLUDED.yamagandam,
        petrol = EXCLUDED.petrol,
        diesel = EXCLUDED.diesel,
        gold_22k = EXCLUDED.gold_22k,
        silver = EXCLUDED.silver,
        updated_at = NOW()
      RETURNING *;
    `;

    const values = [
      data.city.toLowerCase(),
      data.date,
      data.today_special ?? null,
      data.traffic ?? null,
      data.power_cut === null ? null : data.power_cut,
      data.water_issue === null ? null : data.water_issue,
      data.sunrise ?? null,
      data.sunset ?? null,
      data.tithi ?? null,
      data.rahu_kalam ?? null,
      data.yamagandam ?? null,
      data.petrol ?? null,
      data.diesel ?? null,
      data.gold_22k ?? null,
      data.silver ?? null
    ];

    const result = await db.query(sql, values);
    return result.rows[0];
  }

  /* =========================================================
     PUBLIC API – Get today data (SEO-safe)
     ========================================================= */
  static async getTodayByCity(city: string, date: string) {
    const result = await db.query(
      `
      SELECT *
      FROM daily_today_content
      WHERE city = $1 AND date = $2
      LIMIT 1
      `,
      [city.toLowerCase(), date]
    );

    return result.rows[0] || null;
  }

  /* =========================================================
     GET ALL CITIES
     ========================================================= */
  static async getAllCities(): Promise<string[]> {
    const result = await db.query(`
      SELECT DISTINCT city
      FROM daily_today_content
      ORDER BY city ASC
    `);

    return result.rows.map(r => r.city);
  }

  /* =========================================================
     GET YESTERDAY DATA (for admin copy button)
     ========================================================= */
  static async getYesterdayByCity(city: string) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const date = yesterday.toISOString().split('T')[0];

    const result = await db.query(
      `
      SELECT *
      FROM daily_today_content
      WHERE city = $1 AND date = $2
      LIMIT 1
      `,
      [city.toLowerCase(), date]
    );

    return result.rows[0] || null;
  }

  /* =========================================================
     AUTO COPY YESTERDAY → TODAY (CRON / MANUAL CALL)
     ========================================================= */
  static async autoCopyYesterdayToToday() {
    const today = new Date().toISOString().split('T')[0];

    const y = new Date();
    y.setDate(y.getDate() - 1);
    const yesterday = y.toISOString().split('T')[0];

    // Cities that had data yesterday
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

      // Skip if today already exists
      const exists = await db.query(
        `
        SELECT 1
        FROM daily_today_content
        WHERE city = $1 AND date = $2
        LIMIT 1
        `,
        [city, today]
      );

      if (exists.rows.length > 0) continue;

      // Fetch yesterday’s data
      const yesterdayData = await db.query(
        `
        SELECT *
        FROM daily_today_content
        WHERE city = $1 AND date = $2
        LIMIT 1
        `,
        [city, yesterday]
      );

      if (!yesterdayData.rows.length) continue;

      const d = yesterdayData.rows[0];

      // Insert today (NO CONFLICT, clean insert)
      await db.query(
        `
        INSERT INTO daily_today_content (
          city,
          date,
          today_special,
          traffic,
          power_cut,
          water_issue,
          sunrise,
          sunset,
          tithi,
          rahu_kalam,
          yamagandam,
          petrol,
          diesel,
          gold_22k,
          silver
        )
        VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15
        )
        `,
        [
          city,
          today,
          d.today_special ?? null,
          d.traffic ?? null,
          d.power_cut === null ? null : d.power_cut,
          d.water_issue === null ? null : d.water_issue,
          d.sunrise ?? null,
          d.sunset ?? null,
          d.tithi ?? null,
          d.rahu_kalam ?? null,
          d.yamagandam ?? null,
          d.petrol ?? null,
          d.diesel ?? null,
          d.gold_22k ?? null,
          d.silver ?? null
        ]
      );
    }
  }
}
