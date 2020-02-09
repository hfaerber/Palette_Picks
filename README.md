# Palette Picks
## Mod 4 Paired Project
### Dev Team
[Cameron MacRae](https://github.com/cammac60)  
[Heather Faerber](https://github.com/hfaerber)  

This back end application provides a RESTful API server with endpoints to allow data retrieval, removal, and manipulation.

This server is used in our front end application [Palette Picker](https://github.com/hfaerber/Palette_Picker).  Here, users can create projects and color palettes that can be added, removed and updated using this back end server.

## Setup
- Clone this repo and run npm install
- Run the server by using npm start

The server will run on `http://localhost:3000`.

**Heroku Deployment:** `https://palette-picks.herokuapp.com/api/v1/projects`

## Endpoints  

| Purpose | URL | Verb | Request Body | Sample Success Response |
|----|----|----|----|----|
| Get all projects |`/api/v1/projects`| GET | N/A | `{projects: [{}, {}, ...]}`   [See example](#all_projects) |
| Get all palettes for a given project |`/api/v1/projects/:id/palettes`| GET | N/A | `{palettes: [{}, {}, ...]}` [See example](#all_palettes_by_project) |
| Get specific project |`/api/v1/projects/:id`| GET | N/A | `{}`    [See example](#one_project) |
| Get specific palette |`/api/v1/palettes/:id`| GET | N/A | `{}`  [See example](#one_palette) |
| Post a project |`/api/v1/projects`| POST | `{ name: <String> }` | `{ id: <Number> }` [See example](#post_project) |
| Post a palette |`/projects/:id/palettes`| POST | `{ name: <String>, color_one: <String>, color_two: <String>, color_three: <String>, color_four: <String>, color_five: <String> }` | `{ id: <Number> }` [See example](#post_palette) |
| Delete a project |`/api/v1/projects/:id`| DELETE | N/A | `Project with id 3595 has been removed successfully` [See example](#delete_project) |
| Delete a palette |`/palettes/:id'| DELETE | N/A | `Palette with id 7283 has been removed successfully` [See example](#delete_palette) |
| Update a project name |`/api/v1/projects/:id`| PATCH | `{ name: <String> }` | `{ id: <Number> }`    [See example](#update_project) |
| Update a palette name |`/api/v1/palettes/:id`| PATCH | `{ name: <String> }` | `{ id: <Number> }`    [See example](#update_palette) |

### <a name="all_projects"></a> GET all projects
Path: `/api/v1/projects`
Sample Response:
`{ projects:
   [ { id: 35,
       name: 'Sample Project One',
       created_at: '2020-02-05T00:52:52.258Z',
       updated_at: '2020-02-05T00:52:52.258Z' },
     { id: 36,
       name: 'Sample Project Two',
       created_at: '2020-02-05T00:52:52.261Z',
       updated_at: '2020-02-05T00:52:52.261Z' } ] }`

### <a name="all_palettes_by_project"></a> GET all palettes by project
Path: `/api/v1/projects/:id/palettes`
Sample Response:
`{ palettes:
   [ { id: 6384,
       name: 'Sample Palette one',
       color_one: '#F7D951',
       color_two: '#75B1FF',
       color_three: '#985EEE',
       color_four: '#5ED49B',
       color_five: '#44638F',
       projects_id: 3230,
       created_at: 2020-02-08T00:59:46.352Z,
       updated_at: 2020-02-08T00:59:46.352Z },
     { id: 6385,
       name: 'Sample Palette two',
       color_one: '#DC5551',
       color_two: '#F2AD00',
       color_three: '#6CA131',
       color_four: '#4B5DC6',
       color_five: '#1F0E95',
       projects_id: 3230,
       created_at: 2020-02-08T00:59:46.352Z,
       updated_at: 2020-02-08T00:59:46.352Z } ] }`

### <a name="one_project"></a> GET specific project
Path: `/api/v1/projects/:id`
Sample Response:
`{ id: 3320,
  name: 'Sample Project One',
  created_at: 2020-02-08T01:01:18.691Z,
  updated_at: 2020-02-08T01:01:18.691Z }`

### <a name="one_palette"></a> GET specific palette
Path: `/api/v1/palettes/:id`
Sample Response:
`{ id: 181,
  name: 'Sample Palette one',
  color_one: '#F7D951',
  color_two: '#75B1FF',
  color_three: '#985EEE',
  color_four: '#5ED49B',
  color_five: '#44638F',
  projects_id: 91,
  created_at: '2020-02-05T01:49:59.421Z',
  updated_at: '2020-02-05T01:49:59.421Z' }`

### <a name="post_project"></a> POST a project
Path: `/api/v1/projects`
Sample Request Body:
`{ name: 'Test Project' }`
Sample Response:
`{ id: 3416 }`

### <a name="post_palette"></a> POST a palette
Path: `/api/v1/projects/:id/palettes`
Sample Request Body:
`{
  name: 'new palette',
  color_one: '#111111',
  color_two: '#222222',
  color_three: '#333333',
  color_four: '#444444',
  color_five: '#555555'
}`
Sample Response:
`{ id: 6845 }`

### <a name="delete_project"></a> DELETE specific project
Path: `/api/v1/projects/:id`
Sample Response:
`Project with id 3595 has been removed successfully`

### <a name="delete_palette"></a> DELETE specific palette
Path: `/api/v1/palettes/:id`
Sample Response:
`Palette with id 7283 has been removed successfully`

### <a name="update_project"></a> PATCH (update) project name
Path: `/api/v1/projects/:id`
Sample Request Body:
`{ name: 'Updated Project Name' }`
Sample Response:
`{ id: 3701 }`

### <a name="update_palette"></a> PATCH (update) palette name
Path: `/api/v1/palettes/:id`
Sample Request Body:
`{ name: 'New and improved palette name' }`
Sample Response:
`{ id: 7319 }`
