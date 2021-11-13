require('dotenv').config({
    path: `${__dirname}/../.env`
});

const chalk = require('chalk');

const db = require('../app/database');

const data = require('./parts.json');

/**
 *Exécute un commande shell et la retourne comme une promesse pour être "awaité".
 * @param cmd {string}
 * @return {Promise<string>}
 */
function execShellCommand(cmd) {
    const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(chalk.bold.red `${error}`);
            }
            resolve(stdout ? console.log(chalk.bold.green `${stdout}`) : console.log(chalk.bold.red `${stderr}`));
        });
    });
}


/**
 * Permet de construire et de seeder la base avec un minimum de verbes, adjectifs, complément et noms
 */
const seeding = async () => {

    console.time(chalk.yellow `Génération de la fonction seeding`);

    //! On fait place neuve ! En ligne de commande on supprime la BDD et on la recreer avant de seeder, pour s'assurer qu'elle est vierge.

    console.log(chalk.bold.blue `début dropdb - createdb`);

    await execShellCommand("dropdb --if-exists cadex && createdb cadex && psql cadex -f script_postgres.sql");

    console.log(chalk.bold.blue `Fin dropdb - createdb. On a une BDD vierge.`);

    //! Import des noms

    console.log(chalk.bold.hex('#29F319')
        `Début de l'import des noms`);

    const namesInsert = "INSERT INTO names (names) VALUES ($1);";
    for (const name of data.names) {
        console.log(chalk.hex('#29F319')
            `Import du nom: ${name}`);
        await db.query(namesInsert, [name]);

    }

    console.log(chalk.bold.hex('#29F319')
        `Fin de l'import des noms`);


    //! Import des adjectifs

    console.log(chalk.bold.hex('#29F319')
        `Début de l'import des adjectifs`);

    const adjectivesInsert = "INSERT INTO adjectives (adjectives) VALUES ($1);";
    for (const adjective of data.adjectives) {
        console.log(chalk.hex('#29F319')
            `Import du nom: ${adjective}`);
        await db.query(adjectivesInsert, [adjective]);

    }

    console.log(chalk.bold.hex('#29F319')
        `Fin de l'import des adjectifs`);




    //! Import des verbes

    console.log(chalk.bold.hex('#29F319')
        `Début de l'import des verbes`);

    const verbsInsert = "INSERT INTO verbs (verbs) VALUES ($1);";
    for (const verb of data.verbs) {
        console.log(chalk.hex('#29F319')
            `Import du nom: ${verb}`);
        await db.query(verbsInsert, [verb]);

    }

    console.log(chalk.bold.hex('#29F319')
        `Fin de l'import des verbes`);



    //! Import des compléments

    console.log(chalk.bold.hex('#29F319')
        `Début de l'import des compléments`);

    const complementsInsert = "INSERT INTO complements (complements) VALUES ($1);";
    for (const complement of data.complements) {
        console.log(chalk.hex('#29F319')
            `Import du nom: ${complement}`);
        await db.query(complementsInsert, [complement]);

    }

    console.log(chalk.bold.hex('#29F319')
        `Fin de l'import des compléments`);

    console.timeEnd(chalk.yellow `Génération de la fonction seeding`);

};

seeding();