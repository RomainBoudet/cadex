# Welcome to this Cadex API


## Description
### This REST API can generate french cadavre exquis in JSON format and you can also insert some names, verbs, complements, or adjectives to the database and generate new "cadex" with it !
If you want to learn more about cadavre exquis : [cadavre exquis](https://fr.wikipedia.org/wiki/Cadavre_exquis)

### Stack :
   * Back-end JavaScript runtime environment : Node.js
   * Framework :Express
   * SGBDR : Postgres

##### Mains npm packages 
   * npm packages for documentation : express-swagger-generator
   * npm packages for test : mocha, chai
   * npm security package : helmet, express-rate-limit, validator


### Install

(*You need to have installed [postgres](https://www.postgresql.org/docs/14/tutorial-install.html) and [node.js](https://nodejs.org/en/download/) in your machine*)
(*you might need to temporarily modify the postgres configuration file to switch peer to trust one the first line in => /etc/postgresql/14/main/pg_hba.conf*)

* 1. Clone this [repository](https://github.com/RomainBoudet/cadex)
* 2. Make file .env has the same place as the file .env.example. Fill it with the port number of your choice and your posgres password.
* 3. Lunch in command line in the cadex folder : npm install
* 4. Lunch in command line in the cadex folder : npm run seed (you now have a new database named cadex with data in it). CTRL + c if you need to exit.
* 5. Lunch in command line in the cadex folder : npm test (fiew test are done).
* 6. Lunch in command line in the cadex folder : npm start
* 7. In your browser, go to http://localhost:yourPortnumber/api/v1/cadex


### Add data in database

 You can add verb, complement, adjective and name in JSON or urlencoded format in post request to http://localhost:/api/v1/cadex

You can also add verb, complement, adjective and name in urlencoded format from your browser => try :'http://localhost:4000/api/v1/cadex?name=Alfred%20Dupont&verb=licencie&complement=un%20poney%20Shetland'

For more technical information you can have a look on the swagger documentation : http://localhost:yourPortNumber/api-docs when the API is running.

##### This api is online, you can [try it](http://thedev.fr/api/v1/cadex) ! 