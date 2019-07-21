workflow "Build and deploy on push" {
  on = "push"
  resolves = ["yarn exec semantic-release"]
}

action "yarn install" {
  uses = "Borales/actions-yarn@master"
  args = "install"
}

action "yarn build" {
  uses = "Borales/actions-yarn@master"
  needs = ["yarn install"]
  args = "build"
  env = {
    CI_COMMIT_MESSAGE = ""
    CI_REPO_OWNER = "njzjz"
    CI_REPO_NAME = "chemicaltools-web"
    CI = "github_actions"
  }
  secrets = ["BUNDLESIZE_GITHUB_TOKEN"]
}

action "yarn cordova-prepare" {
  uses = "docker://vgaidarji/docker-android-cordova:latest@sha256:203587ee5eef81c79e68490b2f743742e9d0c2e12a0ba07a0d4f4c37eed55950"
  needs = ["yarn build"]
  runs = "npm"
  args = "run cordova-prepare"
}

action "yarn cordova-build-android" {
  uses = "docker://vgaidarji/docker-android-cordova:latest@sha256:203587ee5eef81c79e68490b2f743742e9d0c2e12a0ba07a0d4f4c37eed55950"
  needs = ["yarn cordova-prepare"]
  runs = "npm"
  args = "run cordova-build-android"
}

action "yarn electron:build-all" {
  uses = "docker://electronuserland/electron-builder:wine@sha256:5bbb0ba3ed046f72f52125508104d9169559bf36f944402272cb9c1e8af5b1e3"
  needs = ["yarn cordova-build-android"]
  runs = "yarn"
  args = "electron:build-all"
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  needs = ["yarn electron:build-all"]
  args = "branch master"
}

action "Deploy to GitHub Pages" {
  uses = "JamesIves/github-pages-deploy-action@master"
  needs = ["Filters for GitHub Actions"]
  env = {
    FOLDER = "dist"
    BRANCH = "gh-pages"
  }
  secrets = ["ACCESS_TOKEN"]
}

action "yarn exec semantic-release" {
  uses = "Borales/actions-yarn@master"
  needs = ["Deploy to GitHub Pages"]
  args = "exec semantic-release"
  secrets = ["GH_TOKEN", "NPM_TOKEN"]
}
