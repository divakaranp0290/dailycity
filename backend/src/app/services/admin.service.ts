import { db } from '../utils/db';

export async function upsertCityToday(data: any) {
  const {
    city,
    date,
    power_cut,
    water_issue,
    traffic,
    petrol,
    diesel,
    gold_22k,
    silver
  } = data;

  await db.query(
    `
    INSERT INTO city_daily_status
    (city, date, power_cut, water_issue, traffic,
     petrol, diesel, gold_22k, silver)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    ON CONFLICT (city, date)
    DO UPDATE SET
      power_cut=$3,
      water_issue=$4,
      traffic=$5,
      petrol=$6,
      diesel=$7,
      gold_22k=$8,
      silver=$9,
      updated_at=NOW()
    `,
    [
      city.toLowerCase().trim(),
      date,
      power_cut,
      water_issue,
      traffic,
      petrol,
      diesel,
      gold_22k,
      silver
    ]
  );
}
