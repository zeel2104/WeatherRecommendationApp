import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: 'Winter Parka',
      category: 'Clothing',
      temperature_range: { min: -30, max: 5 },
      image_url: 'https://example.com/winter-parka.jpg'
    },
    {
      name: 'Hiking Shorts',
      category: 'Clothing',
      temperature_range: { min: 15, max: 35 },
      image_url: 'https://example.com/hiking-shorts.jpg'
    },
    {
      name: 'Laptop Cooling Pad',
      category: 'Electronics',
      temperature_range: { min: 0, max: 35 },
      image_url: 'https://example.com/cooling-pad.jpg'
    },
    {
      name: 'Gaming Console',
      category: 'Electronics',
      temperature_range: { min: 5, max: 35 },
      image_url: 'https://example.com/console.jpg'
    },
    {
      name: '4-Season Tent',
      category: 'Outdoor Gear',
      temperature_range: { min: -30, max: 35 },
      image_url: 'https://example.com/tent.jpg'
    },
    {
      name: 'Summer Sleeping Bag',
      category: 'Outdoor Gear',
      temperature_range: { min: 10, max: 30 },
      image_url: 'https://example.com/summer-bag.jpg'
    },
    {
      name: 'Winter Sleeping Bag',
      category: 'Outdoor Gear',
      temperature_range: { min: -40, max: 5 },
      image_url: 'https://example.com/winter-bag.jpg'
    },
    {
      name: 'Thermal Flask',
      category: 'Outdoor Gear',
      temperature_range: { min: -10, max: 100 },
      image_url: 'https://example.com/flask.jpg'
    },
    {
      name: 'Rain Jacket',
      category: 'Clothing',
      temperature_range: { min: 5, max: 25 },
      image_url: 'https://example.com/rain-jacket.jpg'
    },
    {
      name: 'Portable Fan',
      category: 'Electronics',
      temperature_range: { min: 20, max: 45 },
      image_url: 'https://example.com/fan.jpg'
    },
    {
      name: 'Ski Gloves',
      category: 'Clothing',
      temperature_range: { min: -40, max: 0 },
      image_url: 'https://example.com/ski-gloves.jpg'
    },
    {
      name: 'Beach Umbrella',
      category: 'Outdoor Gear',
      temperature_range: { min: 20, max: 45 },
      image_url: 'https://example.com/beach-umbrella.jpg'
    },
    {
      name: 'Thermal Underwear',
      category: 'Clothing',
      temperature_range: { min: -30, max: 10 },
      image_url: 'https://example.com/thermal-underwear.jpg'
    },
    {
      name: 'Mini Refrigerator',
      category: 'Electronics',
      temperature_range: { min: 15, max: 40 },
      image_url: 'https://example.com/mini-fridge.jpg'
    },
    {
      name: 'Space Heater',
      category: 'Electronics',
      temperature_range: { min: -10, max: 25 },
      image_url: 'https://example.com/space-heater.jpg'
    },
    {
      name: 'Ice Fishing Shelter',
      category: 'Outdoor Gear',
      temperature_range: { min: -40, max: -5 },
      image_url: 'https://example.com/ice-shelter.jpg'
    },
    {
      name: 'Sun Hat',
      category: 'Clothing',
      temperature_range: { min: 20, max: 45 },
      image_url: 'https://example.com/sun-hat.jpg'
    },
    {
      name: 'Camping Stove',
      category: 'Outdoor Gear',
      temperature_range: { min: -20, max: 40 },
      image_url: 'https://example.com/camping-stove.jpg'
    },
    {
      name: 'Smart Thermostat',
      category: 'Electronics',
      temperature_range: { min: -5, max: 35 },
      image_url: 'https://example.com/smart-thermostat.jpg'
    },
    {
      name: 'Insulated Water Bottle',
      category: 'Outdoor Gear',
      temperature_range: { min: -5, max: 90 },
      image_url: 'https://example.com/insulated-bottle.jpg'
    },
    {
      name: 'Snow Boots',
      category: 'Clothing',
      temperature_range: { min: -40, max: 5 },
      image_url: 'https://example.com/snow-boots.jpg'
    },
    {
      name: 'UV Protection Sunglasses',
      category: 'Clothing',
      temperature_range: { min: 15, max: 45 },
      image_url: 'https://example.com/sunglasses.jpg'
    },
    {
      name: 'Portable Air Conditioner',
      category: 'Electronics',
      temperature_range: { min: 25, max: 45 },
      image_url: 'https://example.com/portable-ac.jpg'
    },
    {
      name: 'Battery Heated Socks',
      category: 'Clothing',
      temperature_range: { min: -40, max: 0 },
      image_url: 'https://example.com/heated-socks.jpg'
    },
    {
      name: 'Camping Hammock',
      category: 'Outdoor Gear',
      temperature_range: { min: 10, max: 40 },
      image_url: 'https://example.com/hammock.jpg'
    },
    {
      name: 'Temperature Control Mug',
      category: 'Electronics',
      temperature_range: { min: 0, max: 65 },
      image_url: 'https://example.com/smart-mug.jpg'
    },
    {
      name: 'Windbreaker Jacket',
      category: 'Clothing',
      temperature_range: { min: 10, max: 25 },
      image_url: 'https://example.com/windbreaker.jpg'
    },
    {
      name: 'Solar Power Bank',
      category: 'Electronics',
      temperature_range: { min: -10, max: 45 },
      image_url: 'https://example.com/power-bank.jpg'
    },
    {
      name: 'Ice Maker',
      category: 'Electronics',
      temperature_range: { min: 15, max: 35 },
      image_url: 'https://example.com/ice-maker.jpg'
    },
    {
      name: 'Thermal Camping Chair',
      category: 'Outdoor Gear',
      temperature_range: { min: -20, max: 35 },
      image_url: 'https://example.com/camping-chair.jpg'
    },
    {
      name: 'Moisture-Wicking T-Shirt',
      category: 'Clothing',
      temperature_range: { min: 15, max: 40 },
      image_url: 'https://example.com/sport-shirt.jpg'
    },
    {
      name: 'Car Refrigerator',
      category: 'Electronics',
      temperature_range: { min: 0, max: 30 },
      image_url: 'https://example.com/car-fridge.jpg'
    },
    {
      name: 'Emergency Thermal Blanket',
      category: 'Outdoor Gear',
      temperature_range: { min: -40, max: 35 },
      image_url: 'https://example.com/thermal-blanket.jpg'
    },
    {
      name: 'Cooling Vest',
      category: 'Clothing',
      temperature_range: { min: 25, max: 45 },
      image_url: 'https://example.com/cooling-vest.jpg'
    },
    {
      name: 'Weather Station',
      category: 'Electronics',
      temperature_range: { min: -40, max: 60 },
      image_url: 'https://example.com/weather-station.jpg'
    },
    {
      name: 'Avalanche Beacon',
      category: 'Outdoor Gear',
      temperature_range: { min: -40, max: 10 },
      image_url: 'https://example.com/avalanche-beacon.jpg'
    },
    {
      name: 'Fleece Neck Gaiter',
      category: 'Clothing',
      temperature_range: { min: -30, max: 10 },
      image_url: 'https://example.com/neck-gaiter.jpg'
    },
    {
      name: 'Solar Shower',
      category: 'Outdoor Gear',
      temperature_range: { min: 15, max: 45 },
      image_url: 'https://example.com/solar-shower.jpg'
    },
    {
      name: 'Hand Warmers',
      category: 'Outdoor Gear',
      temperature_range: { min: -40, max: 0 },
      image_url: 'https://example.com/hand-warmers.jpg'
    },
    {
      name: 'Temperature Control Pillow',
      category: 'Electronics',
      temperature_range: { min: 15, max: 35 },
      image_url: 'https://example.com/smart-pillow.jpg'
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 