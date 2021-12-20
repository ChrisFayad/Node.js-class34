import app from '../app.js';
import supertest from 'supertest';

const request = supertest(app);

describe("POST /weather/:cityName", () => {
  describe("User give a valid city name", () => {
    test("Should get a status code of 200", async () => {
      const response = await request.post('/weather/Ede');

      expect(response.status).toBe(200);
    });
    test("Should specify json as the content type in the http header", async () => {
      const response = await request.post('/weather/Esch');

      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
    test("User get back city name", async () => {
      const response = await request.post('/weather/Amsterdam');

      expect(response.body.weatherText).toContain('Amsterdam');
    });
    test("User get back temperature", async () => {
      const response = await request.post('/weather/Bruges');

      expect(response.body.weatherText).toContain('.');
    });
  });
});

describe("User did't give a city name", () => {
  test("Should return a 404 status code", async () => {
    const response = await request.post('/weather/');

    expect(response.statusCode).toBe(404);
  });
});

describe("User give an invalid city name", () => {
  it("Should return a error message", async () => {
    const response = await request.post('/weather/dfghd');

    expect(response.body.weatherText).toContain('not found');
  });
});