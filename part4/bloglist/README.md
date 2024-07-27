# Fullstack open Bloglist

## Environment:

For this project you need a .env file at the root of the project

The env file should have the following variables set:

- PORT : Port the application will be running on
- MONGODB_URI : The url to the mongodb database, can be locally hosted or external
- TEST_MONGODB_URI : Same as previous but for the database that is used when running tests
- SECRET : Secret used to sign jwt access tokens, use a secure, long, randomly generated string