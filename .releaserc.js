// https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration


// @ts-check

'use strict'


const {execFileSync} = require('child_process')

const {homepage, name} = require('./package.json')


const {
  CI_PROJECT_URL,
  GIT_GPG_KEY_ID,
  GIT_GPG_KEYS,
  GITHUB_ACTIONS,
  GITLAB_CI,
  NPM_TOKEN,
} = process.env


const plugins = [[
  '@semantic-release/commit-analyzer', {
    preset: 'conventionalcommits',
    presetConfig: {
      releaseCommitMessageFormat: `chore(release): Release ${name} {{currentTag}}`,
    },
  },
], [
  '@semantic-release/release-notes-generator', {
    preset: 'conventionalcommits',
  },
], [
  '@semantic-release/changelog', {
    changelogTitle: '# Changelog',
  },
], [
  '@google/semantic-release-replace-plugin', {
    replacements: [{
      files:  ['CHANGELOG.md'],
      from: `${CI_PROJECT_URL}`,
      to: `${homepage.replace('#readme', '')}`,
    }],
  },
]]

if (NPM_TOKEN !== undefined) {
  plugins.push([
    '@semantic-release/npm',
  ])
}

if (GIT_GPG_KEY_ID !== undefined && GIT_GPG_KEYS !== undefined) {
  // This may or may not be the best place for this, but as long as the config
  // file allows arbitrary code execution, it's being taken advatange of to do a
  // little prep work.

  execFileSync('gpg', ['--import'], {
    input: Buffer.from(GIT_GPG_KEYS, 'base64').toString('ascii'),
  })

  execFileSync('git', ['config', 'commit.gpgsign', 'true'])
  execFileSync('git', ['config', 'user.signingkey', GIT_GPG_KEY_ID])

  plugins.push([
    '@semantic-release/git', {
      // @ts-ignore
      message: `chore(release): Release ${name} v\${nextRelease.version}`,
    },
  ])
}

if (GITLAB_CI !== undefined) {
  plugins.push([
    '@semantic-release/gitlab',
  ])
} else if (GITHUB_ACTIONS !== undefined) {
  plugins.push([
    '@semantic-release/github',
  ])
}


module.exports = {
  plugins,
}
