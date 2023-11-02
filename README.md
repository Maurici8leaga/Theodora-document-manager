# Theodora Document Manager

It is a page in which it consists of managing documents, where the user can; create, update, delete and view PDF, TXT or Word documents. This page is intended to meet the requirements requested by the Theodora company to apply for a job as a frontend developer.

### Get Started

The first thing to do is open the terminal of your code editor of your choice and once there you will have to run following comand:

```sh
   yarn install
```

This command will installs the necessary packages to run the app, after that you can run the next one which is;

```sh
   yarn run start
```

Which will run on the 3000 port of your browser, then open http://localhost:3000 to view it in your browser.

### API

To run the API you will have to open another terminal in your code editor, then you will have to run the following comand:

```sh
    npx json-server -p 3500 -w Api/db.json
```

The number of port is up to, but you need to make sure that the port is other than port 3000. After that, this comand will run a fake API with json-server. The fake data will saved in the db.json file that is in the Api folder at the beginning of the project.

Once the previous command is executed, you will be requested for username and password which those are;

```sh
   username: admin
   password: admin12345
```

These parameters are default, that means there are no others than these.

## About

### UI

The UI was built with; React, react-dom, react-router-dom, react-redux, @reduxjs/toolkit, axios, Bootstrap, react-icons, @cyntler/react-doc-viewer .

### API

The API was built with json-server.
