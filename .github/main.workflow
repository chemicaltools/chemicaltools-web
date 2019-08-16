workflow "Build and deploy on push" {
  on = "push"
  resolves = ["Deploy to GitHub Pages"]
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
  uses = "docker://vgaidarji/docker-android-cordova:latest@sha256:50de9debcbac3bdf9d662113673c0c639641da4b1ac12e72ad1a3a93fb2d98a3"
  needs = ["yarn build"]
  runs = "npm"
  args = "run cordova-prepare"
}

action "yarn cordova-build-android" {
  uses = "docker://vgaidarji/docker-android-cordova:latest@sha256:50de9debcbac3bdf9d662113673c0c639641da4b1ac12e72ad1a3a93fb2d98a3"
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
  needs = ["yarn exec semantic-release"]
  env = {
    FOLDER = "dist"
    BRANCH = "gh-pages"
  }
  secrets = ["ACCESS_TOKEN"]
}

action "yarn exec semantic-release" {
  uses = "Borales/actions-yarn@master"
  needs = ["Filters for GitHub Actions"]
  args = "exec semantic-release"
  secrets = ["GH_TOKEN", "NPM_TOKEN"]
}
