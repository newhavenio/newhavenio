const path = require('path');

module.exports = {
  siteTitle: 'New Haven.io',
  siteTitleShort: 'nh.io',
  siteDescription: 'Where tech happens in New Haven',
  siteUrl: 'https://newhaven.io',
  themeColor: '#FC6612',
  backgroundColor: '#fff',
  pathPrefix: null,
  logo: path.resolve(__dirname, 'src/images/icon.png'),
  imageUrl: path.resolve(__dirname, 'static/social.png'),
  social: {
    twitter: 'newhavenio',
  },
};
