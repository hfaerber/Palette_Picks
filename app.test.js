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
    });
  });

  describe('POST /api/v1/projects/:id/palettes', () => {
    it('should return a 201 with the id of the newly created palette',
      async () => {
        const expectedProject = await database('projects').first();
        const { id } = expectedProject;
        const newPalette = {
          name: 'new palette',
          color_one: '#111111',
          color_two: '#222222',
          color_three: '#333333',
          color_four: '#444444',
          color_five: '#555555',
          projects_id: id
        };
        const response = await request(app).post
          (`/api/v1/projects/${id}/palettes`).send(newPalette);
        const palettes = await database('palettes').where('id', response.body.id);
        const palette = palettes[0];
        expect(response.status).toBe(201);
        expect(palette.name).toEqual(newPalette.name);
    });

    it('should return a 422 if properties are missing from request body',
      async () => {
        const expectedProject = await database('projects').first();
        const { id } = expectedProject;
        const newPalette = {
          color_one: '#111111',
          color_two: '#222222',
          color_three: '#333333',
          color_four: '#444444',
          color_five: '#555555',
          projects_id: id
        };
        const response = await request(app).post
          (`/api/v1/projects/${id}/palettes`).send(newPalette);
        expect(response.status).toBe(422);
        expect(response.body.error).toEqual('Expected body format is: { name: <String>, color_one: <String>, color_two: <String>, color_three: <String>, color_four: <String>, color_five: <String> }. You\'re missing the required "name" property.')
    });
  });

  describe('DELETE /api/v1/palettes/:id', () => {
    it('should return a 200 with a success message if delete is successful', async () => {
      const expectedPalette = await database('palettes').first();
      const { id } = expectedPalette;
      const response = await request(app).delete(`/api/v1/palettes/${id}`).send(`${id}`);
      const doesExist = await database('palettes').where('id', id);
      expect(response.status).toBe(200);
      expect(doesExist.length).toEqual(0);
    });

    it('should return a 404 with a not found error message if item to delete does not exist', async () => {
      const invalidId = -4;
      const response = await request(app).delete(`/api/v1/palettes/${invalidId}`).send(`${invalidId}`);
      expect(response.status).toBe(404);
      expect(response.body.error).toEqual(`Could not find palette with an id of ${invalidId}`)
    });
  });
});
