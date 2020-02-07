const sampleSeedData = require('../../../sampleData');

const createProject = async (knex, project) => {
  const projectId = await knex('projects').insert({
    name: project.name
  }, 'id');

  let palettesPromises = project.palettes.map(palette => {
    return createPalette(knex, {
      name: palette.name,
      color_one: palette.color_one,
      color_two: palette.color_two,
      color_three: palette.color_three,
      color_four: palette.color_four,
      color_five: palette.color_five,
      projects_id: projectId[0]
    })
  });

  return Promise.all(palettesPromises);
};

const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette);
};

exports.seed = async (knex) => {
  try {
    // await knex('palettes').del()
    // await knex('projects').del()

    let projectsPromises = sampleSeedData.map(project => {
      return createProject(knex, project);
    });

    return Promise.all(projectsPromises);
  } catch (error) {
    console.log(`Error seeding data: ${error}`)
  }
};
