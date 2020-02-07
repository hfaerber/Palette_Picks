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

  describe('POST /api/v1/projects', () => {
    it('Should return a 201 status and the project id', async () => {
      const newProject = {name: 'Test Project'};
      const response = await request(app).post('/api/v1/projects').send(newProject);
      const projects = await database('projects').where('id', response.body.id);
      const project = projects[0];
      expect(response.status).toBe(201);
      expect(project.name).toEqual(newProject.name);
    });

    it('Should return a 422 status and an error message if a name property is not included in the request body', async () => {
      const response = await request(app).post('/api/v1/projects').send({});
      expect(response.status).toBe(422);
      expect(response.body.error).toEqual('Expected body format {name: <String>}. You\'re missing the required name property');
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

  describe('DELETE /api/v1/projects/:id', () => {
    it('should return a 200 with a success message if delete is successful', async () => {
      const expectedProject = await database('projects').first();
      const { id } = expectedProject;
      const response = await request(app).delete(`/api/v1/projects/${id}`).send(`${id}`);
      const doesExist = await database('projects').where('id', id);
      expect(response.status).toBe(200);
      expect(doesExist.length).toEqual(0);
    });

    it('should return a 404 with a not found error message if item to delete does not exist', async () => {
      const invalidId = -5;
      const response = await request(app).delete(`/api/v1/projects/${invalidId}`).send(`${invalidId}`);
      expect(response.status).toBe(404);
      expect(response.body.error).toEqual(`Could not find project with an id of ${invalidId}`);
    });
  });

  describe('PATCH /api/v1/projects/:id', () => {
    it('should return a 200 with a success message when project name is updated', async () => {
      const correctionBody = { name: 'Updated Project Name' };
      const expectedProject = await database('projects').first();
      const { id } = expectedProject;
      const response = await request(app).patch(`/api/v1/projects/${id}`).send(correctionBody);
      const updatedProject = await database('projects').where('id', id);
      expect(response.status).toBe(200);
      expect(response.body.id).toEqual(id);
      expect(updatedProject[0].name).toEqual(correctionBody.name);
    });

    it('should return a 404 with a not found error message if item to update does not exist', async () => {
      const correctionBody = { name: 'Updated Project Name' };
      const invalidId = -6;
      const response = await request(app).patch(`/api/v1/projects/${invalidId}`).send(correctionBody);
      expect(response.status).toBe(404);
      expect(response.body.error).toEqual(`Could not find project with an id of ${invalidId}`);
    });

    it('should return a 422 with an error message if info to update is invalid property', async () => {
      const correctionBody = { id: 'Updated Project Name' };
      const expectedProject = await database('projects').first();
      const { id } = expectedProject;
      const response = await request(app).patch(`/api/v1/projects/${id}`).send(correctionBody);
      expect(response.status).toBe(422);
      expect(response.body.error).toEqual('Expected body format is: { name: <String> }. You must send only the required "name" property.');
    });
  });

  describe('PATCH /api/v1/palettes/:id', () => {
    it('should return a 200 with a success message when palette name is updated', async () => {
      const correctionBody = { name: 'New and improved palette name' };
      const expectedPalette = await database('palettes').first();
      const { id } = expectedPalette;
      const response = await request(app).patch(`/api/v1/palettes/${id}`).send(correctionBody);
      const updatedPalette = await database('palettes').where('id', id);
      expect(response.status).toBe(200);
      expect(response.body.id).toEqual(id);
      expect(updatedPalette[0].name).toEqual(correctionBody.name);
    });

    it('should return a 404 with a not found message if palette to update does not exist', async () => {
      const correctionBody = { name: 'New and improved palette name' };
      const invalidId = -7;
      const response = await request(app).patch(`/api/v1/palettes/${invalidId}`).send(correctionBody);
      expect(response.status).toBe(404);
      expect(response.body.error).toEqual(`Could not find palette with an id of ${invalidId}`);
    });

    it('should return a 422 with an error message if info to update is invalid property', async () => {
      const correctionBody = { color_one: 'New and improved palette name' };
      const expectedPalette = await database('palettes').first();
      const { id } = expectedPalette;
      const response = await request(app).patch(`/api/v1/palettes/${id}`).send(correctionBody);
      expect(response.status).toBe(422);
      expect(response.body.error).toEqual('Expected body format is: { name: <String> }. You must send only the required "name" property.');
    });
  });

});
