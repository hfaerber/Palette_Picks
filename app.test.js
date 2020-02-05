const request = require('supertest');
const app = require('./app.js');

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

describe('Server', () => {

  beforeEach(async () => {
    await database.seed.run();
  });

  describe('GET /api/v1/projects', () => {
    it('should return a 200 and all projects', async () => {
      const expectedProjects = await database('projects').select();
      const response = await request(app).get('/api/v1/projects');
      const projects = response.body;
      expect(response.status).toBe(200);
      expect(projects.projects[0].name).toEqual(expectedProjects[0].name );
    });
  });

  describe('GET /api/v1/palettes/:id', () => {
    it('should return a 200 and single palette', async () => {
      const expectedPalette = await database('palettes').first();
      const { id } = expectedPalette;
      const response = await request(app).get(`/api/v1/palettes/${id}`);
      const result = response.body;
      expect(response.status).toBe(200);
      expect(result.name).toEqual(expectedPalette.name);
    });

    it('should return a 404 if palette does not exist in DB', async () => {
      const invalidId = -11;
      const response = await request(app).get(`/api/v1/palettes/${invalidId}`);
      expect(response.status).toBe(404);
      expect(response.body.error).toEqual(`Could not find palette with an id of ${invalidId}`);
    })
  })
})
