const request = require('supertest');
const { app } = require('../../index');
const News = require('../../src/controllers/news');

describe('News Endpoints', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('POST /news', () => {
    it('should create a new news item for a match', async () => {
      const response = await request(server)
        .post('/news')
        .send({
          title: 'Match Postponed',
          description: 'Due to heavy rain, the match between GT vs RCB has been postponed.',
          matchId: 1
        })
        .set('Accept', 'application/json');

      expect(response.status).toBe(201);
    });

    it('should create a new news item for a tour', async () => {
      const response = await request(server)
        .post('/news')
        .send({
          title: 'Tour Announcement',
          description: 'The Indian Premier League, 2023 will start on April 9, 2023.',
          tourId: 1 
        })
        .set('Accept', 'application/json');

      expect(response.status).toBe(201);
    });

    it('should return 400 if title is missing', async () => {
      const response = await request(server)
        .post('/news')
        .send({
          description: 'This should fail because title is missing.',
          matchId: 1
        })
        .set('Accept', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Title, description, and either matchId or tourId are required');
    });

    it('should return 400 if description is missing', async () => {
      const response = await request(server)
        .post('/news')
        .send({
          title: 'Incomplete News Item',
          matchId: 1
        })
        .set('Accept', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Title, description, and either matchId or tourId are required');
    });

    it('should return 400 if both matchId and tourId are missing', async () => {
      const response = await request(server)
        .post('/news')
        .send({
          title: 'Incomplete News Item',
          description: 'This should fail because both matchId and tourId are missing.'
        })
        .set('Accept', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Title, description, and either matchId or tourId are required');
    });

    it('should return 404 if matchId provided does not exist', async () => {
      const response = await request(server)
        .post('/news')
        .send({
          title: 'Invalid Match ID',
          description: 'This should fail because matchId does not exist.',
          matchId: 9999 //Assuming 9999 does not exist
        })
        .set('Accept', 'application/json');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Match not found');
    });

    it('should return 404 if tourId provided does not exist', async () => {
      const response = await request(server)
        .post('/news')
        .send({
          title: 'Invalid Tour ID',
          description: 'This should fail because tourId does not exist.',
          tourId: 9999 //Assuming 9999 does not exist
        })
        .set('Accept', 'application/json');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Tour not found');
    });


    it('should return 500 when encountering a database error', async () => {
    
        // Mock the function to throw an error
        News.createNews = () => {
          throw new Error('Database connection error');
        };
    
        const matchId = 1;
        const response = await request(server)
          .post(`/news`)
          .set('Accept', 'application/json');
    
        expect(response.status).toBe(500);
   
      });
    
  });

  describe('GET /news/match/:matchId', () => {
    it('should fetch news for a specific match', async () => {
      const matchId = 1;
      const response = await request(server)
        .get(`/news/match/${matchId}`)
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);

    });

    it('should return 404 if news not found for a specific match', async () => {
      const matchId = 9999; //Assuming 9999 does not exist

      const response = await request(server)
        .get(`/news/match/${matchId}`)
        .set('Accept', 'application/json');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'No news found for the specified match ID');
    });

    it('should return 500 when encountering a database error', async () => {
    
        // Mock the function to throw an error
        News.getNewsByMatchId = () => {
          throw new Error('Database connection error');
        };
    
        const matchId = 1;
        const response = await request(server)
          .get(`/news/match/${matchId}`)
          .set('Accept', 'application/json');
    
        expect(response.status).toBe(500);
   
      });
    
  });

  describe('GET /news/tour/:tourId', () => {
    it('should fetch news for a specific tour', async () => {
      const tourId = 1; 

      const response = await request(server)
        .get(`/news/tour/${tourId}`)
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);

    });

    it('should return 404 if news not found for a specific tour', async () => {
      const tourId = 9999; //Assuming 9999 does not exist
      const response = await request(server)
        .get(`/news/tour/${tourId}`)
        .set('Accept', 'application/json');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'No news found for the specified tour ID');
    });

    it('should return 500 when encountering a database error', async () => {
    
        // Mock the function to throw an error
        News.getNewsByTourId = () => {
          throw new Error('Database connection error');
        };
    
        const tourId = 1;
        const response = await request(server)
          .get(`/news/tour/${tourId}`)
          .set('Accept', 'application/json');
    
        expect(response.status).toBe(500);
   
      });
  });

  describe('GET /news/sport/:sportId', () => {
    it('should fetch news for a specific sport', async () => {
      const sportId = 1; 
      const response = await request(server)
        .get(`/news/sport/${sportId}`)
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);

    });

    it('should return 404 if news not found for a specific sport', async () => {
      const sportId = 9999; //Assuming 9999 does not exist 

      const response = await request(server)
        .get(`/news/sport/${sportId}`)
        .set('Accept', 'application/json');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'No news found for the specified sport ID');
    });

    it('should return 500 when encountering a database error', async () => {
    
        // Mock the function to throw an error
        News.getNewsBySportId = () => {
          throw new Error('Database connection error');
        };
    
        const sportId = 1;
        const response = await request(server)
          .get(`/news/sport/${sportId}`)
          .set('Accept', 'application/json');
    
        expect(response.status).toBe(500);
   
      });
  });
});
