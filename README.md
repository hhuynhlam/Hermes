# Huynh Family

The Huynh Family social website.

---

## Prerequisites

1. [brew](http://brew.sh)
1. [mongodb](https://www.mongodb.com/download-center/v2/community)

### Ruby on Rails
1. [ruby](https://www.ruby-lang.org/en/documentation/installation/)

  ```sh
  brew install ruby
  ```

1. [rbenv](https://github.com/sstephenson/rbenv#installation)

  ```sh
  brew install rbenv
  ```

1. [bundler](https://bundler.io/)

  ```sh
  gem install bundler
  ```

1. [imagemagick](https://www.imagemagick.org/script/command-line-processing.php)

  ```sh
  brew install imagemagick
  ```

1. Create `.env` file for local development environment variables. Example:

  ```sh
  # Required
  MONGO_URL=mongodb://localhost:27017/huynhfamily

  # Optional
  AWS_ACCESS_KEY_ID=...
  AWS_SECRET_ACCESS_KEY=...
  AWS_S3_BUCKET=huynhfamily-production
  AWS_S3_HOST_ALIAS=s3-us-west-2.amazonaws.com/huynhfamily-production
  AWS_S3_REGION=us-west-2
  ```


### Node
1. [node](http://nodejs.org/)

  ```sh
  brew install node
  ```

1. [n](https://github.com/tj/n)

  ```sh
  npm install -g n
  ```

1. [yarn](https://yarnpkg.com/en/docs/getting-started)

  ```sh
  brew install yarn
  ```

---

## Setup
1. `git clone https://github.com/goatapp/goat.com`

### Front End
1. `n $(node -p 'require("./package.json").engines.node')`
1. `yarn install`

### Back End
1. `rbenv install $(cat .ruby-version) && rbenv global $(cat .ruby-version)`
1. `bundle`

---

## Workflow
1. Start MongoDB
  ```sh
  mongod
  ```

1. Start backend server
  ```sh
  bin/rails server
  ```

1. Start frontend server
  ```sh
  bin/webpack-dev-server
  ```

## Deployment
1. Setup remote SSH access to `dokku@45.33.40.30`
  https://github.com/dokku/dokku/blob/master/docs/deployment/user-management.md

1. Add production Git remote

  ```sh
  git remote add production dokku@45.33.40.30:huynhfamily
  ```

1. Push branch to remote

  ```sh
  git push -f production {LOCAL BRANCH}:master
  ```
