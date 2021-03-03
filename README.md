# ExpressAuth

# Website

#### URL: https://husbanx.herokuapp.com/

# Introduction

Express Auth is a Web Application for simple user authentication, built on the top of NodeJS Platform, which is an open-source JavaScript runtime based on V8 JavaScript Engine of Chrome. Express Auth uses a number of frameworks from NPM registry, some of the important ones are Express, Express Session, Mongoose, etc. It also uses the Bootstrap framework for frontend purposes.

Express Auth is a backend focused project, which uses Express, an fast, opinionated, minimalist framework for creating Web Applications and APIs running on NodeJS platform. Express Auth uses MongoDB as its database system, and uses Mongoose ODM for performing communication between the Web Application and the Database. 

The complete User Story of the Application is described below along with all the Languages, Frameworks, Tools and Technologies used in this Project.

# User Story

The complete user story of the Web Application can be described follows:

 * Users can register themselves by providing an Email and a Password.
 
 * After registering themselves Users can Login, and visit their Dashboard.
 
 * From their Dashboard, Users can change their Passwords.
 
 * Also, Users can delete their account from their respective Dashboards.


# Technologies Used

## Hosting

**Web Application:** The Web Application is hosted on Heroku PaaS, using a service called Heroku Dynos.

**Database:** The Application uses MongoDB Atlas which is a DaaS for running MongoDB on the Cloud, for fulfilling its database needs.

## Languages

The Web Application is written primarily using the following Languages:

* HTML
* CSS
* JavaScript (ES6+)

## Platform

**NodeJS:** The Web Application Server runs on NodeJS Platform, which is a JavaScript runtime powered by V8 JavaScript Engine of Google Chrome. Besides providing a JavaScript runtime, NodeJS comes with a bunch of useful modules, like ‘http’ which in turn is used by high level frameworks like Express for writing powerful Web Server in minimal lines of code.

## Frameworks

* **Bootstrap [5.0.0-B2]:** Bootstrap is the only frontend framework used in the Project. Bootstrap is a CSS framework for designing responsive, mobile-first frontends. It comes with a set of pre-built design templates which makes the development of the frontend fast and easy.

* **Express [^4.17.1]:** Express is the most fundamental backend framework used in the Project. It utilizes the lower level modules provided by NodeJS, and enables to write powerful backend code with minimal code. Express is responsible for handling all the incoming requests coming to the server, and responding with appropriate responses according to the business logic of the Web Application.

* **Mongoose [^5.11.15]:** Mongoose is the MongoDB Object Data Modeling, ODM for short. In this project every communication to the database (except persistent session storage) is done through the Mongoose ODM. From creating database connection to creating user schema and model, to saving, querying, updating and deleting documents in the database, everything is done using Mongoose.

* **Express Session [^1.17.1]:** Express Session is the middleware used in this Project for managing all the aspects of session and cookies. It is responsible for creating, updating and modifying the session files and setting their respective cookies to the client.

* **BcryptJS [^2.4.3]:** BcryptJS, as the name implies is the JavaScript library which provides bcrypt hashing functionality to the Web Application. It is responsible for salting, hashing and comparing the passwords for the users of the Web Application.

* **Connect MongoDB Session [^2.4.1]:** The default server side session storage, MemoryStore leaks memory under most conditions, and is not suitable for production. For this, Connect MongoDB Session, which is a MongoDB backed session storage is used for storing the session data of the Web Application.

* **Dotenv [^8.2.0]:** The Dotenv module is used to load environment variables from .env file to the process.env variable, so that it can be used by the Web Application for various purposes.

## Tools

* **cURL:** cURL is used for inspecting the response headers returned by the Web Server.

* **NPM:** The Node Package Manager is used to save, install and configure all the above frameworks (except Bootstrap) used in the Project.

* **Visual Studio Code:** VS Code is used as the default text editor for writing all the codes is the Project.

* **Firefox Developer Tools:** Firefox Developer Tools is used as the primary tool for testing, examining and debugging the CSS and Bootstrap parts used in the Project, for both desktop and mobile devices. 

* **Chrome DevTools:** Chrome DevTools is used as the secondary tool for testing, examining and debugging the CSS and Bootstrap parts used in the Project, for both desktop and mobile devices. It is especially used for live remote debugging on Android Device, straight from the Local Server running on the System.


**Thanks.**
