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
    
    `npm run dev-wp`
1. Open [localhost:8080](http://localhost:8080) in your browser

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

