import express from "express";
import fetch from 'node-fetch';
import { keys } from './sources/keys.js';

const app = express();

app.use(express.json());

app.post('/weather/:cityName', async (req, res) => {
  const apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather?';
  const cityName = `q=${req.params.cityName}`;
  const units = `&units=metric`;
  const apiKey = `&appid=${keys.API_KEY}`;
  try {
    const fetch_res = await fetch(`${apiEndpoint}${cityName}${units}${apiKey}`);
    if (fetch_res) {
      const jsonData = await fetch_res.json();
      res.json({ weatherText: `${jsonData.name}, ${jsonData.main.temp}` });
    }
  } catch (error) {
    res.json({ weatherText: 'City is not found!' });
  }
});

export default app;