# NewHaven.io Website

[![CircleCI](https://circleci.com/gh/a-trost/newhavenio.svg?style=svg)](https://circleci.com/gh/a-trost/newhavenio)
  [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
  [![Netlify Status](https://api.netlify.com/api/v1/badges/9fc179f1-e990-4301-a60f-4d0dedbcb593/deploy-status)](https://app.netlify.com/sites/fervent-kepler-18363b/deploys)


This site is an open source Gatsby site for the NewHaven.io community! We're a tech Meetup and Slack community in New Haven interested in bringing people together around and through technology.

## Contributing

### Getting Started

```bash
# Install dependencies
yarn install

# To develop
# This will run the Gatsby static site at localhost:8000 and Netlify cloud
# functions at localhost:9000. The Gatsby site is configured to proxy calls to
# cloud functions automatically to avoid CORS issues.
yarn develop

# To build
yarn build

# To test SSR (for Lighthouse etc.)
yarn ssr

# To format JS (precommit)
yarn format
```

### Pages

#### Content

All top-level routable pages should live in `src/pages/*`. Pages should be accessible from both the top nav and the footer.

Copy for pages should live in `content/pages/index.yaml` for maintainability and ease of auditing. Use your best judgment regarding what qualifies as copy (as opposed to minor labels, etc.). This is queried through GraphQL.

Assets for pages should also live in `content/images` and also be accessed via GraphQL.
