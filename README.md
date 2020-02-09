# crud-api

## Pre-requisites

### Local Dev Environment
1. MySQL installed locally
1. MySQL Workbench / phpMyAdmin
1. Node.js
1. `.env` file with the following:
```
DB_HOST=localhost
DB_NAME=vanarts
DB_USER=root
DB_PASS=password
DB_PORT=3306
WEB_PORT=80
JWT_SECRET=ANUP
```

### Hosted Environment

1. The appropriate `.env` file. Similar to above but with the hosted MySQL DB credentials.
1. SQL script installed, as per file in the `./sql` directory of this project.

## Getting started

This sample app exposes an /auth endpoint and several other end points verbed against Contacts. 

Clone the repo, then run `npm install` to get the dependencies installed. Then run `npm start` or run in debug using vscode.

Try browsing to http://localhost/api-docs for swagger UI when running locally.
