const path = require('path');

const SITE_URL = 'https://newhaven.io';
const SITE_URL_DEVELOPMENT = 'https://fervent-kepler-18363b.netlify.com';

module.exports = {
  siteTitle: 'New Haven.io',
  siteTitleShort: 'nh.io',
  siteDescription: 'Where tech happens in New Haven',
  siteUrl: SITE_URL,
  siteUrlDevelopment: SITE_URL_DEVELOPMENT,
  themeColor: '#FC6612',
  backgroundColor: '#fff',
  pathPrefix: null,
  logo: path.resolve(__dirname, 'src/images/icon.png'),
  // TODO: Fix this once we migrate
  imageUrl: `${SITE_URL_DEVELOPMENT}/social.png`,
  social: {
    twitter: 'newhavenio',
  },
};
