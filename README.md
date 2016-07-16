# SumoQs

## Stack

* [Express.js](http://expressjs.com/) node.js framework
* [Nunjucks](https://mozilla.github.io/nunjucks) templating engine
* [Sequelize.js](https://github.com/sequelize/sequelize) ORM for MySQL
* [Docker](docker.com) for development and deployment


## How to setup and run

> __Prerequisites__

> You need a docker machine setup, up and running for development

1. Checkout

2. Run `goat` binary at the project root

  ```
  $ ./goat
  ```

3. Open the docker-machine ip address in the browser to see the app running


To view debug logs from the docker container running node app, open a new terminal and run:

```
$ docker-compose logs -f web
```


> The [goat](https://github.com/nithin-bose/goat) file watcher uses config from `goat.yml` and starts up the docker containers needed for development using `docker-compose`. See the `docker-compose.yml` for more details.


## Deployment setup

Deployment scripts and configs are in the deploy folder and the `deploy.sh` script should be run from there.

> This setup is for deploying the dockerized app on Marathon running on a DC/OS cluster. Assumes you have `dcos` cli installed and configured.

Usage: `./deploy.sh env init|update tag`

  - env - can be `staging` or `production`. See marathon configs in `/deploy` directory
  - tag - can be `latest` or a release tag like `1.2.0`

```
# Create a new marathon app on staging
./deploy.sh staging init latest

# Update a existing marathon app on staging
./deploy.sh staging update latest
```

Docker hub image: [jinmatt/sumoqs](https://hub.docker.com/r/jinmatt/sumoqs/)

### App Configs

`env` variables are used for runtime configurations:

* `ADMIN_PASS` - The dashboard login access password can be set using this env variable

* `SESSION_SECRET` - This env variable is used to set secret key for generating signed secure cookies for session management for guest users coming on the website

> See `docker-compose.yml` to change these in development, and `staging.json` or `production.json` in `/deploy` for deployments.

> More app init configurations can be managed or added in `/config`. By default the app starts with the init config `default.json`
