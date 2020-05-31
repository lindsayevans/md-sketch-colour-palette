# Release process

How to build & publish this package to NPM.

## Pre-release versions

1. Update version in `package.json` to include pre-release, e.g. `1.2.3-rc1`
2. Run `npm publish --tag next`

## Release version

1. Update version in `package.json`
2. Run `npm publish`
