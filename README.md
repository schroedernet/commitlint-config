# Schroedernet commitlint configuration <!-- omit in toc -->

Opinionated configuration for [commitlint](https://commitlint.config.js)

- [Usage](#usage)
- [Overview](#overview)
- [License](#license)


## Usage

1. Install as development dependency
   - `yarn add -D @schroedernet/commitlint-config`
2. Add to `extends` array in `commitlint.config.js`
   - `{extends: ['@schroedernet/commitlint-config']}`


## Overview

This configuration is very similar to
[`@commitlint/config-conventional`](https://www.npmjs.com/package/@commitlint/config-conventional),
with the following exceptions:

- Subject must be sentence-case
- Scope is required


## License

This repository is licensed under the same terms as commitlint itself, [the MIT
license](/LICENSE.md).
