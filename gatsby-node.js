const path = require('path');

exports.onCreateWebpackConfig = ({
  stage,
  getConfig,
  rules,
  loaders,
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

// Declared explicitly because these files may be empty arrays, and Gatsby can't
// infer a type it has never seen:
// - DiscordJson: content/jobs/discord.json, written by scripts/discord-jobs.js.
// - MeetupJson: content/events/meetup.json, written by scripts/meetup-events.js.
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type DiscordJson implements Node @dontInfer {
      jobId: String!
      source: String
      jobTitle: String!
      company: String
      location: String
      employmentType: String
      jobURL: String!
      postedOn: String!
      sharedOn: String
      description: String
    }

    type MeetupJson implements Node @dontInfer {
      name: String!
      local_date: String!
      local_time: String!
      duration: Float
      plain_text_description: String!
      short_link: String!
    }
  `);
};
