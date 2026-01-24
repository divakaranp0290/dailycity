export class SeoService {
  static buildCityTodaySEO(city: string, d: any) {
    const c = city.charAt(0).toUpperCase() + city.slice(1);

    return {
      slug: `${city}-today`,
      title: `${c} Today – Traffic, Power Cut, Petrol Price, Gold Rate`,
      description: `Get ${c} today updates including traffic status, power cut details, petrol price, diesel rate, gold rate and important city alerts.`,
      h1: `${c} Today – Complete City Updates`,
      intro: `Here are the latest ${c} today updates including traffic, power cut status, fuel prices and city news.`,
      faq: [
        {
          q: `Is there power cut in ${c} today?`,
          a: d.power_cut ? 'Partial power demonstration reported.' : 'No scheduled power cuts today.'
        },
        {
          q: `What is petrol price in ${c} today?`,
          a: `Petrol price in ${c} today is ₹${d.petrol} per litre.`
        }
      ]
    };
  }
}
