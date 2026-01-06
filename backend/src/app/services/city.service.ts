import { db } from '../utils/db';

export async function fetchCityToday(city: string) {
  const today = new Date().toISOString().split('T')[0];

  const result = await db.query(
    `
    SELECT city, date, power_cut, water_issue, traffic,
           petrol, diesel, gold_22k, silver, TO_CHAR(updated_at, 'YYYY-MM-DD HH12:MI AM') AS updated_at
    FROM city_daily_status
    WHERE city = $1 AND date = $2
    `,
    [city.toLowerCase().trim(), today]
  );

  return result.rows[0];
}

