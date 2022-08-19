# HubDB-Demo

This is a simple API REST app using HubDB from Hubspot

## Setup

### 1. Environment variables

In order to running the project, first some environment variables are needed. For this, create a .env file in the root directory of the project with the following format:

```
PORT=5000
HUBSPOT_API_KEY=AAAA-AAA-AAA-AAA-AAA
HUBSPOT_CONTACTS_TABLE=table_test
```

Replace HUBSPOT_API_KEY and HUBSPOT_CONTACTS_TABLE with the hubspot api key and database table name, respectively. You can also change PORT if you want.

### 2. Install dependencies

To install dependencies, in the root directory, execute the following command:

```
npm i
```

### 3. Execution

In the root directory, in the terminal execute:

```
npm start
```

Make sure your localhost and port 5000 are free, otherwise the app will not execute.
Open your browser on [http://localhost:5000/](http://localhost:5000/)

If you changed the PORT env variable then your url must be http://localhost:PORT_NUMBER/
