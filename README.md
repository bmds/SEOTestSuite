# SEO test suite

Basic test suite for checking if a site passes minimum SEO requirements, built in Jest because reasons.

## Requirements
* Node >= 8.x
* Yarn
* Chrome >= 59

## Instructions
The test suite is run with `yarn test` which will run the suite against the default URL (http://example.com);
To run against a custom site __https://github.com__ for example you would use `SITE=https://github.com yarn test`.

The suite doesn't currently cope with redirects which you will need to take in to account.

## Roadmap
* Finish off the other tests
* Add a docker file to cope with the environment stuff
* Cope with redirects when testing a page
