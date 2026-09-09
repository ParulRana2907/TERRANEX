export const zones = [
  {
    zone_id: "Z101",
    name: "Tawang",
    district: "Tawang",
    state: "Arunachal Pradesh",

    latitude: 27.586,
    longitude: 91.859,

    risk_score: 82,
    risk_level: "HIGH",

    rainfall_1h: 18,
    rainfall_6h: 54,
    rainfall_24h: 86,

    forecast_rainfall: 105,
    soil_moisture: 71,

    slope: 34,
    elevation: 2800,

    population_exposed: 12000,
    villages_affected: 3,
    roads_affected: 5,
    hospitals_affected: 1,
    schools_affected: 3,

    top_factors: [
      {
        name: "Rainfall",
        contribution: 31,
      },
      {
        name: "Slope",
        contribution: 24,
      },
      {
        name: "Soil Moisture",
        contribution: 18,
      },
      {
        name: "Elevation",
        contribution: 12,
      },
    ],

    priority_score: 88,
  },

  {
    zone_id: "Z102",
    name: "Papum Pare",
    district: "Papum Pare",
    state: "Arunachal Pradesh",

    latitude: 27.102,
    longitude: 93.616,

    risk_score: 91,
    risk_level: "CRITICAL",

    rainfall_1h: 26,
    rainfall_6h: 72,
    rainfall_24h: 112,

    forecast_rainfall: 130,
    soil_moisture: 84,

    slope: 39,
    elevation: 1450,

    population_exposed: 18000,
    villages_affected: 5,
    roads_affected: 8,
    hospitals_affected: 2,
    schools_affected: 4,

    top_factors: [
      {
        name: "Rainfall",
        contribution: 35,
      },
      {
        name: "Soil Moisture",
        contribution: 25,
      },
      {
        name: "Slope",
        contribution: 22,
      },
      {
        name: "Elevation",
        contribution: 10,
      },
    ],

    priority_score: 96,
  },

  {
    zone_id: "Z103",
    name: "East Siang",
    district: "East Siang",
    state: "Arunachal Pradesh",

    latitude: 28.066,
    longitude: 95.327,

    risk_score: 64,
    risk_level: "MODERATE",

    rainfall_1h: 12,
    rainfall_6h: 38,
    rainfall_24h: 62,

    forecast_rainfall: 70,
    soil_moisture: 58,

    slope: 27,
    elevation: 155,

    population_exposed: 7500,
    villages_affected: 2,
    roads_affected: 3,
    hospitals_affected: 1,
    schools_affected: 2,

    top_factors: [
      {
        name: "Rainfall",
        contribution: 28,
      },
      {
        name: "Slope",
        contribution: 22,
      },
      {
        name: "Soil Moisture",
        contribution: 18,
      },
      {
        name: "Elevation",
        contribution: 9,
      },
    ],

    priority_score: 67,
  },

  {
    zone_id: "Z104",
    name: "West Kameng",
    district: "West Kameng",
    state: "Arunachal Pradesh",

    latitude: 27.264,
    longitude: 92.427,

    risk_score: 43,
    risk_level: "MODERATE",

    rainfall_1h: 8,
    rainfall_6h: 24,
    rainfall_24h: 42,

    forecast_rainfall: 48,
    soil_moisture: 45,

    slope: 21,
    elevation: 1800,

    population_exposed: 4200,
    villages_affected: 1,
    roads_affected: 2,
    hospitals_affected: 0,
    schools_affected: 1,

    top_factors: [
      {
        name: "Slope",
        contribution: 25,
      },
      {
        name: "Rainfall",
        contribution: 22,
      },
      {
        name: "Elevation",
        contribution: 15,
      },
      {
        name: "Soil Moisture",
        contribution: 12,
      },
    ],

    priority_score: 48,
  },
];