
### GET `/api/v1/projects`

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

### GET `/api/v1/palettes/:id`
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

### POST `/api/v1/projects/:id/palettes`
Sample Response:
`{ id: 553 }`

### POST `/api/v1/projects`
Sample Response:


### PATCH `/api/v1/projects/:id`

### PATCH `/api/v1/palettes/:id`

### DELETE `/api/v1/projects/:id`

### DELETE `/api/v1/palettes/:id`
