# flw-validation
This is a simple validation API for flutterwave test found here https://bit.ly/39rDlaF

## Dependencies
 - Express - The framework for the server
 - Cors - To allow cross-origin request for testing
 - Joi - For preliminary validation
 - lodash.get - For getting data from an object

# Running the project
The project is built using NodeJS. You should install the dependencies, 
then you can now run the project

```bash
npm install
npm start 
```

You should see

> FLW Test App running on PORT ${PORT} 

There are two endpoints, 

#### GET /  - Homepage endpoint 

#### POST /validate-rule : Rule validation endpoint

# Running the test
The project has some few test to check if the endpoints are
returning the expected data. The test suite is ran using Jest. 

```bash
npm run test
```
