import Express from "express";

const app = Express();

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.use(Express.json());

app.post('/weather', (req, res) => {
  const cityName = req.body.cityName;
  res.send(cityName);
});

app.listen(3000, () => console.log('Server started on port 3000'));