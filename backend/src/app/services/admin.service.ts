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
      $1::text,
      $2::date,
      $3::text,
      $4::text,
      $5::text,
      $6::text,
      $7::text,
      $8::text,
      $9::text,
      $10::text,
      $11::text,
      $12::numeric,
      $13::numeric,
      $14::numeric,
      $15::numeric
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
    data.power_cut ?? null,
    data.water_issue ?? null,
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
