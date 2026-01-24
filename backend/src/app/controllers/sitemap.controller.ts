import { Request, Response } from 'express';
import { CityService } from "../services/city.service";

export async function sitemap(req: Request, res: Response) {
  const cities = await CityService.getAllCities();
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  cities.forEach(city => {
    xml += `
      <url>
        <loc>https://dailycity.in/${city}-today</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>
    `;
  });

  xml += `</urlset>`;
  res.type('application/xml').send(xml);
}
