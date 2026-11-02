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

// Declared explicitly because their sources may produce no nodes, and Gatsby
// can't infer a type it has never seen:
// - DiscordJson: content/jobs/discord.json, written by scripts/discord-jobs.js,
//   may be an empty array.
// - MeetupEvent: nothing sources these since gatsby-source-meetup was removed.
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

    type MeetupEventFeatured_photo {
      photo_link: String
    }

    type MeetupEvent implements Node @dontInfer {
      featured_photo: MeetupEventFeatured_photo
      local_date: String
      local_time: String
      duration: Float
      name: String
      plain_text_description: String
      short_link: String
    }
  `);
};
