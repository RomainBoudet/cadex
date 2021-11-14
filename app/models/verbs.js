const db = require('../database');
const chalk = require('chalk');

class Verbs{

  id;
  verbs;
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
   * Méthode chargé d'aller chercher toutes les informations relatives à tous les verbes
   * @returns - tous les verbes présent en BDD
   * @static - une méthode static
   * @async - une méthode asynchrone
   */
  static async findAll() {
    const {
      rows
    } = await db.query('SELECT * FROM verbs ORDER BY verbs.id ASC');

    if (!rows[0]) {
     return null;
    }
    console.log(chalk.yellow
      `les informations des ${rows.length} verbs ont été demandé !`
    );

    return rows.map((verbs) => new Verbs(verbs));
  }


  /**
   * Méthode chargé d'aller chercher les informations relatives à un verbe passé en paramétre
   * @param verbs - un verbs d'un verbe
   * @returns - les informations du verbs demandées
   * @static - une méthode static
   * @async - une méthode asynchrone
   */
  static async findOne(verbs) {


    const {
      rows,
    } = await db.query(
      'SELECT * FROM verbs WHERE verbs.verbs = $1;',
      [verbs]
    );

    if (!rows[0]) {
        return null;
    }

    console.log(chalk.yellow
        `le verb : ${verbs} a été demandé en BDD !`
    );

    return new Verbs(rows[0]);
  }


  /**
   * Méthode chargé d'aller insérer les informations relatives à un verbe passé en paramétre
   * @param verbs - un verbe
   * @returns - les informations du verbe demandées
   * @async - une méthode asynchrone
   */
  async save() {
    const {
      rows,
    } = await db.query(
      `INSERT INTO verbs (verbs) VALUES ($1) RETURNING *;`,
      [this.verbs]
    );

    this.id = rows[0].id;
    this.createdDate = rows[0].created_date;
    console.log(chalk.yellow
        `le verbe id ${this.id} a été inséré à la date du ${this.createdDate} !`
    );
    return new Verbs(rows[0]);

  }



  /**
   * Méthode chargé d'aller mettre à jour les informations relatives à un verbe passé en paramétre
   * @param verbs - In verbe a modifier
   * @param id - l'identifiant d'un verbe
   * @returns - les informations du verbe mises à jour
   * @async - une méthode asynchrone
   */
  async update() {
    const {
      rows,
    } = await db.query(
      `UPDATE verbs SET verbs = $1, updated_date = now() WHERE id = $2 RETURNING *;`,
      [this.verbs, this.id]
    );
    this.updatedDate = rows[0].updated_date;
    console.log(chalk.yellow
      `le verbe id : ${this.id} a été mise à jour le ${this.updatedDate} !`
    );
    return new Verbs(rows[0]);

  }
  /**
   * Méthode chargé d'aller supprimer un verbe passé en paramétre
   * @param id - l'id d'un verbe
   * @async - une méthode asynchrone
   */
  async delete() {
    const {
      rows
    } = await db.query('DELETE FROM verbs WHERE verbs.id = $1 RETURNING *;', [
      this.id,
    ]);
    console.log(chalk.yellow
        `le verbe id ${this.id} a été supprimé !`);

    return new Verbs(rows[0]);
  }

}

module.exports = Verbs;