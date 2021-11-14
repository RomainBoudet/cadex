const db = require('../database');
const chalk = require('chalk');

class Names {

    id;
    names;
    createdDate;
    updatedDate;

    set created_date(val) {
        this.createdDate = val;
    }

    set updated_date(val) {
        this.updatedDate = val;
    }


    /**
     * @constructor
     */
    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    /**
     * Méthode chargé d'aller chercher toutes les informations relatives à tous les noms
     * @returns - tous les noms présent en BDD
     * @static - une méthode static
     * @async - une méthode asynchrone
     */
    static async findAll() {
        const {
            rows
        } = await db.query('SELECT * FROM names ORDER BY names.id ASC');

        if (!rows[0]) {
            return null;
        }
        console.log(chalk.yellow `les informations des ${rows.length} names ont été demandé !`);

        return rows.map((item) => new Names(item));
    }


    /**
     * Méthode chargé d'aller chercher les informations relatives à un nom passé en paramétre
     * @param id - un id d'un nom
     * @returns - les informations du names demandées
     * @static - une méthode static
     * @async - une méthode asynchrone
     */
    static async findOne(id) {


        const {
            rows,
        } = await db.query(
            'SELECT * FROM names WHERE names.id = $1;',
            [id]
        );

        if (!rows[0]) {
            return null;
        }

        console.log(chalk.yellow `le names id : ${id} a été demandé en BDD !`);

        return new Names(rows[0]);
    }


    /**
     * Méthode chargé d'aller insérer les informations relatives à un nom passé en paramétre
     * @param names - un nom
     * @returns - les informations du nom demandées
     * @async - une méthode asynchrone
     */
    async save() {
        const {
            rows,
        } = await db.query(
            `INSERT INTO names (names) VALUES ($1) RETURNING *;`,
            [this.names]
        );

        this.id = rows[0].id;
        this.createdDate = rows[0].created_date;
        console.log(chalk.yellow `le nom id ${this.id} a été inséré à la date du ${this.createdDate} !`);
        return new Names(rows[0]);

    }



    /**
     * Méthode chargé d'aller mettre à jour les informations relatives à un nom passé en paramétre
     * @param names - In nom a modifier
     * @param id - l'identifiant d'un nom
     * @returns - les informations du nom mises à jour
     * @async - une méthode asynchrone
     */
    async update() {
        const {
            rows,
        } = await db.query(
            `UPDATE names SET names = $1, updated_date = now() WHERE id = $2 RETURNING *;`,
            [this.names, this.id]
        );
        this.updatedDate = rows[0].updated_date;
        console.log(chalk.yellow `le nom id : ${this.id} a été mise à jour le ${this.updatedDate} !`);
        return new Names(rows[0]);

    }
    /**
     * Méthode chargé d'aller supprimer un nom passé en paramétre
     * @param id - l'id d'un nom
     * @async - une méthode asynchrone
     */
    async delete() {
        const {
            rows
        } = await db.query('DELETE FROM names WHERE names.id = $1 RETURNING *;', [
            this.id,
        ]);
        console.log(chalk.yellow `le nom id ${this.id} a été supprimé !`);

        return new Names(rows[0]);
    }

}

module.exports = Names;