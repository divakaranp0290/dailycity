import { db } from "../utils/db";

export class AdminService {
  static async upsertCityTodayData(data: any) {
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
        city = EXCLUDED.city,
        date = EXCLUDED.date,
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

    console.log('🟢 ADMIN UPSERT VALUES:', values);

    return await db.query(sql, values);
  }
}
