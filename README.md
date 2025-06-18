# 🌦️ Weather-Based Product Recommendation App

Welcome to the **Weather-Based Product Recommendation** challenge! 🚀  
This is a **Next.js + Prisma** project where you will integrate a **weather API**, query a database, and display relevant products based on the temperature.  

## 📌 Challenge Overview  

Your task is to:  
✅ Fetch **real-time weather data** from a public API.  
✅ Query the database to **find products matching the temperature**.  
✅ Build a **frontend UI** to display both:  
   - **Weather forecast details** (temperature, etc.).  
   - **Recommended products** based on the weather.  

Parts of this exercise are **purposefully vague** to encourage **creative problem-solving**.  
Showcase your **best coding practices**, and feel free to address any inefficiencies you find! 🎯  

---

## 🚀 Getting Started  

### 1️⃣ **Install Dependencies**  
```bash
npm install
```

### 2️⃣ **Set Up the Database**  
Make sure **PostgreSQL** is running, then execute:  

1️⃣ **Run Prisma migrations**  
```bash
npx prisma migrate dev --name add_products
```

2️⃣ **Seed the database with sample products**  
```bash
npx prisma db seed
```

⚠️ **Important:**  
- **Do NOT modify** the Prisma schema (`schema.prisma`), migrations, or seed files.  
- Your task is to work **with the existing data** and build the necessary functionality.  

### 4️⃣ **Start the Development Server**  
```bash
npm run dev
```  
Then, open **[http://localhost:3000](http://localhost:3000)** in your browser.  

---

## 🛠️ Project Structure  

```
/prisma            # Prisma schema & database seed files  
/pages/api         # API routes (Next.js backend)  
/pages/index.tsx   # Main frontend page  
/components        # Reusable UI components  
```

---

## 📂 Database Schema (Read-Only)  

Each **product** in the database has the following structure:  

| Column              | Type    | Description |
|---------------------|---------|-------------|
| `id`               | UUID    | Unique identifier |
| `name`             | String  | Product name |
| `category`         | String  | Category (e.g., "Clothing", "Electronics") |
| `temperature_range` | JSON    | Defines min/max temperature for the product |
| `image_url`        | String  | URL for product image |

🔍 **Example Product Entry**:  
```json
{
  "id": "uuid-123",
  "name": "Waterproof Jacket",
  "category": "Clothing",
  "temperature_range": { "min": 0, "max": 20 },
  "image_url": "https://example.com/jacket.jpg"
}
```

---

## 🌎 External API Integration  

You need to fetch **weather forecast data** from [https://www.weather.gov/documentation/services-web-api](https://www.weather.gov/documentation/services-web-api).

---

## 🎯 Requirements  

### 1️⃣ **Database Query (Read-Only)**  
- Retrieve products where the **current temperature** is **within** the `temperature_range` (min/max).  

### 2️⃣ **API Integration**  
- Fetch weather data for a **user-provided city name**.  
- Extract and display:  
  ✅ **Temperature 🌡️**  
  ✅ **Weather description ☀️☁️🌧️**  
  ✅ **Any other relevant weather data.**

### 3️⃣ **Frontend UI**  
- Create an interface where users can:  
  ✅ **Enter a city name** to fetch weather.  
  ✅ **See weather details** and a list of **matching products**.  

---

## ✨ Bonus Points  

🏆 Implement **caching** to reduce redundant API calls.  
🎨 Add a **loading state** while fetching data.  
📱 Make the UI **mobile-friendly** and polished.  

---

## 📢 Final Notes  

🔹 Be **creative** – this is an **open-ended challenge**!  
🔹 Showcase **scalability, performance, and clean architecture**.  
🔹 If you find problems or inefficiencies, **feel free to fix them!**  

👨‍💻 **Good luck!** We’re excited to see your solution! 🚀🔥  

