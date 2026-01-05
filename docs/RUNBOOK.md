# Runbook

Essential info about the app

## Developing

Install dependencies:

```sh
npm install --legacy-peer-deps
```

(this project was created before peer dependencies were enforced)

### Iterating

1. Rebuild styles as they change:
  
    `npm run watch:styles`
1. Rebuild code and serve all static files:
    
    `npm start`
1. Open [localhost:5173](http://localhost:5173) in your browser

#### Bundler

Webpack v5 - slow and old, but it works
Vite - good, using it now
Parcel - fails to load images from css urls, fails to build JS at all

### Quality checks

Run these before pushing to main

```sh
npm run lint:fix
```

```sh
npm run test
```


## Deploying

Static files are hosted on cloudflare pages

**To deploy:**

- Push a commit to the main branch
- Or merge a pull request into the main branch

The [GitHub workflow](../.github/workflows/deploy.cloudflare.yml) will automatically build the static files and deploy them.

## Monitoring

There is a regular check that ensures the site is showing an element rendered by react.

As a side effect, it ensures the static files are cached in an AU/NZ region.

https://oceania.grafana.net/a/grafana-synthetic-monitoring-app/checks

(ask if you need access)

