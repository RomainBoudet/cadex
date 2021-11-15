const db = require('../database');
const chalk = require('chalk');

class Cadex{

  id;
  cadex;
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
   * Méthode chargé d'aller chercher toutes les informations relatives à tous les cadex
   * @returns - tous les cadex présent en BDD
   * @static - une méthode static
   * @async - une méthode asynchrone
   */
  static async findAll() {
    const {
      rows
    } = await db.query('SELECT * FROM cadex ORDER BY cadex.id ASC');

    if (!rows[0]) {
     return null;
    }
    /* console.log(chalk.yellow
      `les informations des ${rows.length} cadex ont été demandé !`
    ); */

    return rows.map((cadex) => new Cadex(cadex));
  }


  /**
   * Méthode chargé d'aller chercher les informations relatives à un cadex passé en paramétre
   * @param cadex - un cadex
   * @returns - les informations du cadex demandées
   * @static - une méthode static
   * @async - une méthode asynchrone
   */
  static async findOne(cadex) {
    const {
      rows,
    } = await db.query(
      'SELECT * FROM cadex WHERE cadex.cadex = $1;',
      [cadex]
    );

    if (!rows[0]) {
        return null;
    }

    /* console.log(chalk.yellow
        `le cadex : ${cadex} a été demandé en BDD !`
    ); */

    return new Cadex(rows[0]);
  }


  /**
   * Méthode chargé d'aller insérer les informations relatives à un cadex passé en paramétre
   * @param cadex - un cadex
   * @returns - les informations du cadex demandées
   * @async - une méthode asynchrone
   */
  async save() {
    const {
      rows,
    } = await db.query(
      `INSERT INTO cadex (cadex) VALUES ($1) RETURNING *;`,
      [this.cadex]
    );

    this.id = rows[0].id;
    this.createdDate = rows[0].created_date;
    /* console.log(chalk.yellow
        `le cadex id ${this.id} a été inséré à la date du ${this.createdDate} !`
    ); */
    return new Cadex(rows[0]);

  }



  /**
   * Méthode chargé d'aller mettre à jour les informations relatives à un cadex passé en paramétre
   * @param cadex - In cadex a modifier
   * @param id - l'identifiant d'un cadex
   * @returns - les informations du cadex mises à jour
   * @async - une méthode asynchrone
   */
  async update() {
    const {
      rows,
    } = await db.query(
      `UPDATE cadex SET cadex = $1, updated_date = now() WHERE id = $2 RETURNING *;`,
      [this.cadex, this.id]
    );
    this.updatedDate = rows[0].updated_date;
    console.log(chalk.yellow
      `le cadex id : ${this.id} a été mise à jour le ${this.updatedDate} !`
    );
    return new Cadex(rows[0]);

  }
  /**
   * Méthode chargé d'aller supprimer un cadex passé en paramétre
   * @param id - l'id d'un cadex
   * @async - une méthode asynchrone
   */
  async delete() {
    const {
      rows
    } = await db.query('DELETE FROM cadex WHERE cadex.id = $1 RETURNING *;', [
      this.id,
    ]);
    console.log(chalk.yellow
        `le cadex id ${this.id} a été supprimé !`);

    return new Cadex(rows[0]);
  }

}

module.exports = Cadex;