const db = require('../database');
const chalk = require('chalk');

class Complements{

  id;
  complements;
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
   * Méthode chargé d'aller chercher toutes les informations relatives à tous les compléments
   * @returns - tous les compléments présent en BDD
   * @static - une méthode static
   * @async - une méthode asynchrone
   */
  static async findAll() {
    const {
      rows
    } = await db.query('SELECT * FROM complements ORDER BY complements.id ASC');

    if (!rows[0]) {
     return null;
    }
    console.log(chalk.yellow
      `les informations des ${rows.length} complements ont été demandé !`
    );

    return rows.map((complements) => new Complements(complements));
  }


  /**
   * Méthode chargé d'aller chercher les informations relatives à un complément passé en paramétre
   * @param complements - un id d'un complément
   * @returns - les informations du complements demandées
   * @static - une méthode static
   * @async - une méthode asynchrone
   */
  static async findOne(complements) {
    const {
      rows,
    } = await db.query(
      'SELECT * FROM complements WHERE complements.complements = $1;',
      [complements]
    );

    if (!rows[0]) {
        return null;
    }

    console.log(chalk.yellow
        `le complements : ${complements} a été demandé en BDD !`
    );

    return new Complements(rows[0]);
  }


  /**
   * Méthode chargé d'aller insérer les informations relatives à un complément passé en paramétre
   * @param complements - un complément
   * @returns - les informations du complément demandées
   * @async - une méthode asynchrone
   */
  async save() {
    const {
      rows,
    } = await db.query(
      `INSERT INTO complements (complements) VALUES ($1) RETURNING *;`,
      [this.complements]
    );

    this.id = rows[0].id;
    this.createdDate = rows[0].created_date;
    console.log(chalk.yellow
        `le complément id ${this.id} a été inséré à la date du ${this.createdDate} !`
    );
    return new Complements(rows[0]);

  }



  /**
   * Méthode chargé d'aller mettre à jour les informations relatives à un complément passé en paramétre
   * @param complements - In complément a modifier
   * @param id - l'identifiant d'un complément
   * @returns - les informations du complément mises à jour
   * @async - une méthode asynchrone
   */
  async update() {
    const {
      rows,
    } = await db.query(
      `UPDATE complements SET complements = $1, updated_date = now() WHERE id = $2 RETURNING *;`,
      [this.complements, this.id]
    );
    this.updatedDate = rows[0].updated_date;
    console.log(chalk.yellow
      `le complément id : ${this.id} a été mise à jour le ${this.updatedDate} !`
    );
    return new Complements(rows[0]);

  }
  /**
   * Méthode chargé d'aller supprimer un complément passé en paramétre
   * @param id - l'id d'un complément
   * @async - une méthode asynchrone
   */
  async delete() {
    const {
      rows
    } = await db.query('DELETE FROM complements WHERE complements.id = $1 RETURNING *;', [
      this.id,
    ]);
    console.log(chalk.yellow
        `le complément id ${this.id} a été supprimé !`);

    return new Complements(rows[0]);
  }

}

module.exports = Complements;