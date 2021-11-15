const db = require('../database');
const chalk = require('chalk');

class Adjectives{

  id;
  adjectives;
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
   * Méthode chargé d'aller chercher toutes les informations relatives à tous les adjectifs
   * @returns - tous les adjectifs présent en BDD
   * @static - une méthode static
   * @async - une méthode asynchrone
   */
  static async findAll() {
    const {
      rows
    } = await db.query('SELECT * FROM adjectives ORDER BY adjectives.id ASC');

    if (!rows[0]) {
     return null;
    }
    /* console.log(chalk.yellow
      `les informations des ${rows.length} adjectives ont été demandé !`
    ); */

    return rows.map((adjectives) => new Adjectives(adjectives));
  }


  /**
   * Méthode chargé d'aller chercher les informations relatives à un adjectif passé en paramétre
   * @param adjectives - un adjectif
   * @returns - les informations du adjectif demandées
   * @static - une méthode static
   * @async - une méthode asynchrone
   */
   static async findOne(adjectives) {
    const {
      rows,
    } = await db.query(
      'SELECT * FROM adjectives WHERE adjectives.adjectives = $1;',
      [adjectives]
    );

    if (!rows[0]) {
        return null;
    }

    /* console.log(chalk.yellow
        `l'adjectif : ${adjectives} a été demandé en BDD !`
    ); */

    return new Adjectives(rows[0]);
  }


  /**
   * Méthode chargé d'aller insérer les informations relatives à un adjectif passé en paramétre
   * @param adjectives - un adjectif
   * @returns - les informations du adjectif demandées
   * @async - une méthode asynchrone
   */
  async save() {
    const {
      rows,
    } = await db.query(
      `INSERT INTO adjectives (adjectives) VALUES ($1) RETURNING *;`,
      [this.adjectives]
    );

    this.id = rows[0].id;
    this.createdDate = rows[0].created_date;
    console.log(chalk.yellow
        `le adjectif id ${this.id} a été inséré à la date du ${this.createdDate} !`
    );
    return new Adjectives(rows[0]);

  }



  /**
   * Méthode chargé d'aller mettre à jour les informations relatives à un adjectif passé en paramétre
   * @param adjectives - In adjectif a modifier
   * @param id - l'identifiant d'un adjectif
   * @returns - les informations du adjectif mises à jour
   * @async - une méthode asynchrone
   */
  async update() {
    const {
      rows,
    } = await db.query(
      `UPDATE adjectives SET adjectives = $1, updated_date = now() WHERE id = $2 RETURNING *;`,
      [this.adjectives, this.id]
    );
    this.updatedDate = rows[0].updated_date;
    console.log(chalk.yellow
      `le adjectif id : ${this.id} a été mise à jour le ${this.updatedDate} !`
    );
    return new Adjectives(rows[0]);

  }
  /**
   * Méthode chargé d'aller supprimer un adjectif passé en paramétre
   * @param id - l'id d'un adjectif
   * @async - une méthode asynchrone
   */
  async delete() {
    const {
      rows
    } = await db.query('DELETE FROM adjectives WHERE adjectives.id = $1 RETURNING *;', [
      this.id,
    ]);
    console.log(chalk.yellow
        `le adjectif id ${this.id} a été supprimé !`);

    return new Adjectives(rows[0]);
  }

}

module.exports = Adjectives;