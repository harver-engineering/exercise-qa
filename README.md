Harver QA Exercise
========================

This exercise assesses API testing skills.

## Background

Harver's new Candidate API has been developed and is almost ready to be released!
But does it live up to Harver's immpeccable quality standards? Your mission is to find out...

## Prequisites

You'll need **Node.JS** + **NPM** installed to setup and run the server.

## Setup

First time run the following command:

`npm ci`

To start the server:

`npm start`

You can now access the API at: [http://localhost:3000](http://localhost:3000)

The API specification (how it should work) is detailed in `api.yml`. You can also view the auto-generated documentation
at [docs/api.html](file:docs/api.html).

## Tasks

1. Timebox yourself to 1 hour to find as many defects in the API as you can. Please share the defects you find in a document or spreadsheet.
2. Automate your work! Write passing automated tests for positive scenarios. *Tip!*, we recommend
[Behaviorial API Tester (Bat)](https://github.com/harver-engineering/bat) and you can run this with `npm test`
3. Write automated tests that demonstrate the defects you have found in the system. That means that these tests should deliberately fail.

Please return your completed solution by zipping up this directory and sharing with us the resulting zip file.

## Notes

* The database is mocked in memory. Restart the server to reset the data.
* Some of the API endpoints require [Basic Authentication](https://swagger.io/docs/specification/authentication/basic-authentication/).
  The username is: `tester` and the password is: `iloveqa`.
* We've included the boilerplate code to write Bat feature files, for your convenience.
* We would normally encourage static code analysis to help look for bugs, but for the purpose of this
  exercise, the `server.js` is deliberately obfuscated.