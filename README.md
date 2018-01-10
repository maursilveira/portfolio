# Portfolio #

This project is my personal web portfolio, where I will present my work and projects I have worked on.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

**Git:**
To clone this project to a local repository, it is required using [Git](https://git-scm.com/). Follow instructions provided [here](https://git-scm.com/downloads) to install and configure Git.

**NPM:**    
To develop this project, it is required installing and running [NPM](https://www.npmjs.com/), and consequently [NodeJS](https://nodejs.org/en/). Follow instructions provided [here](https://nodejs.org/en/download/) to install and configure properly NodeJS and NPM in your machine.

**MySQL:**
Dynamic content is loaded from database to build the website and present projects information. Database used is simple MySQL, and it is possible to use any distribution or application that runs it (MariaDB, MAMP, WAMP, etc). There is a file into 'assets' folder that contains all tables and data exported from this database.

## Deployment

After project cloned and all prerequisites installed, it is necessary running the command below in the root directory to deploy properly all development dependencies of this project:

```
npm install
```

Grunt is implemented as a task runner for this project. Grunt tasks include: concatenation and js uglify; run sass; and autoprefixer, pixrem and cssnano through postcss. Grunt watch for changes in js and all scss files. In order to watch changes made in the files, run grunt inside the project folder by the command below:

```
grunt
```

Furthermore, it is necessary to import the database content to local application. It is possible to import it using PHPMyAdmin interface or via command line:

```
mysql -h localhost -u <user> -p <password> <database name> < db_portfolio.sql
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
