// import { NextResponse } from 'next/server';

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const city = searchParams.get('city');

//   if (!city) {
//     return NextResponse.json({ error: 'City is required' }, { status: 400 });
//   }

//   try {
//     // Step 1: Get lat/lon for the city
//     const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
//     const geoData: any = await geoRes.json();

//     if (!geoData.results || geoData.results.length === 0) {
//       return NextResponse.json({ error: 'City not found' }, { status: 404 });
//     }

//     const { latitude, longitude, name } = geoData.results[0];

//     // Step 2: Get current weather
//     const weatherRes = await fetch(
//       `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
//     );
//     const weatherData: any = await weatherRes.json();

//     const weather = weatherData.current_weather;

//     return NextResponse.json({
//       city: name,
//       temperature: weather.temperature,
//       windspeed: weather.windspeed,
//       coords: { lat: latitude, lon: longitude },
//     });
//   } catch (err) {
//     console.error('Weather API error:', err);
//     return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 500 });
//   }
// }

// app/api/weather/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');
  if (!city) return NextResponse.json({ error: 'City is required' }, { status: 400 });

  // --- Geocoding API
  const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
  const geoData = await geoRes.json() as any; 

  const location = geoData?.results?.[0];
  if (!location) return NextResponse.json({ error: 'City not found' }, { status: 404 });

  const { latitude, longitude, name } = location;

  // --- Weather API
  const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
  const weatherData = await weatherRes.json() as any; 

  const { temperature, windspeed } = weatherData.current_weather;

  return NextResponse.json({
    city: name,
    temperature,
    windspeed,
    lat: latitude,
    lon: longitude,
  });
}
