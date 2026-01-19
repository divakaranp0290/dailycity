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
  sunrise?: string;
  sunset?: string;
  tithi?: string;
  rahu_kalam?: string;
  yamagandam?: string;
}


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
      updated_at = NOW();
  `;

  const values = [
    data.city.toLowerCase(),
    data.date,
    data.today_special ?? null,
    data.traffic ?? null,
    Boolean(data.power_cut),
    Boolean(data.water_issue),
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

  await db.query(sql, values);
}


}
