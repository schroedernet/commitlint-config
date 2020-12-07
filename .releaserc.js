// https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration


// @ts-check

'use strict'


const {execFileSync} = require('child_process')


const plugins = [[
  '@semantic-release/commit-analyzer',
  {},
], [
  '@semantic-release/release-notes-generator',
  {},
], [
  '@semantic-release/changelog', {
    changelogTitle: '# Changelog',
  },
]]

if (process.env.NPM_TOKEN !== undefined) {
  plugins.push([
    '@semantic-release/npm',
    {},
  ])
}

if (process.env.GIT_GPG_KEY_ID !== undefined && process.env.GIT_GPG_KEYS !== undefined) {
  // This may or may not be the best place for this, but as long as the config
  // file allows arbitrary code execution, it's being taken advatange of to do a
  // little prep work.

  execFileSync('gpg', ['--import'], {
    input: Buffer.from(process.env.GIT_GPG_KEYS, 'base64').toString('ascii'),
  })

  execFileSync('git', ['config', 'commit.gpgsign', 'true'])
  execFileSync('git', ['config', 'user.signingkey', process.env.GIT_GPG_KEY_ID])

  plugins.push([
    '@semantic-release/git', {
      message: 'chore(release): ${nextRelease.version}\n\n${nextRelease.notes}',
    },
  ])
}

if (process.env.GITLAB_CI !== undefined) {
  plugins.push([
    '@semantic-release/gitlab',
    {
      gitlabUrl: 'https://gitlab.schroedernet.software',
    },
  ])
} else if (process.env.GITHUB_ACTIONS !== undefined) {
  plugins.push([
    '@semnatic-release/github',
    {},
  ])
}


module.exports = {
  plugins,
}