require('dotenv').config();

const {
    expect
} = require('chai');
const chalk = require('chalk');

const db = require('../app/database');


const cadexFactory = require('../app/services/cadexFactory');
const Cadex = require('../app/models/cadex');
const Complements = require('../app/models/complements');
const Verbs = require('../app/models/verbs');
const Adjectives = require('../app/models/adjectives');
const Names = require('../app/models/names');






describe(chalk.magenta('Test de validation du service cadexFactory :'), function () {

    before(function () {


    });

    it('should send a valid object with name, complement, adjective, verb and glue methode without error property', function () {

        expect(cadexFactory.generate()).not.to.have.property('error');
    });

    it('should generate a valid object with name property', function () {

        expect(cadexFactory.generate()).to.have.property('name');
    });
    it('should generate a valid object with verb property', function () {

        expect(cadexFactory.generate()).to.have.property('verb');
    });
    it('should generate a valid object with complement property', function () {

        expect(cadexFactory.generate()).to.have.property('complement');
    });
    it('should generate a valid object with adjective property', function () {

        expect(cadexFactory.generate()).to.have.property('adjective');
    });

    it('should generate a valid cadex without error property', function () {

        expect(cadexFactory.generate().glue()).not.to.have.property('error');
    });

    it('should generate a valid cadex in string format', function () {

        expect(cadexFactory.generate().glue()).to.be.a('string');
    });


});

//! TEST DU MODEL CADEX 

describe(chalk.magenta('Test du Model Cadex :'), function () {

    let cadex;
    let oneCadex;
    let newCadex;

    before(async function () {

        const insertCadex = "INSERT INTO cadex (cadex) VALUES ($1) RETURNING *;"
        const newCadex1 = await db.query(insertCadex, ['la mairie de Neuilly-sur-Seine guilleret remet en question Yann']);
        newCadex = newCadex1.rows[0];
        cadex = await Cadex.findAll();
        oneCadex = await Cadex.findOne(newCadex.cadex);


    });

    after(async function () {

        await db.query("DELETE FROM cadex WHERE id = $1", [newCadex.id]);

    })

    describe('# findAll methode', function () {


        it('should fetch multiple instances of Cadex', function () {

            expect(cadex[0]).to.be.an.instanceOf(Cadex)
        });

        it("should have the property id", function () {

            expect(cadex[0]).to.have.property('id');
        })

        it("should have the property cadex", function () {

            expect(cadex[0]).to.have.property('cadex');

        })

        it("should not have the property error", function () {

            expect(cadex).not.to.have.property('error');

        })

    });


    describe('# findOne methode', function () {


        it('should fetch an instance of Cadex', function () {

            expect(oneCadex).to.be.an.instanceOf(Cadex)
        });

        it("should have the property id", function () {

            expect(oneCadex).to.have.property('id');
        })

        it("should have the property cadex", function () {

            expect(oneCadex).to.have.property('cadex');

        })

        it("should not have the property error", function () {

            expect(oneCadex).not.to.have.property('error');

        })

    });
});

//! TEST DU MODEL NAME 


describe(chalk.magenta('Test du Model Names :'), function () {

    let name;
    let oneName;
    let newName;

    before(async function () {

        const insertName = "INSERT INTO names (names) VALUES ($1) RETURNING *;"
        const newName1 = await db.query(insertName, ['Yann']);
        newName = newName1.rows[0];
        name = await Names.findAll();
        oneName = await Names.findOne(newName.names);


    });

    after(async function () {

        await db.query("DELETE FROM names WHERE id = $1", [newName.id]);

    })

    describe('# findAll methode', function () {


        it('should fetch multiple instances of Names', function () {

            expect(name[0]).to.be.an.instanceOf(Names)
        });

        it("should have the property id", function () {

            expect(name[0]).to.have.property('id');
        })

        it("should have the property name", function () {

            expect(name[0]).to.have.property('names');

        })

        it("should not have the property error", function () {

            expect(name).not.to.have.property('error');

        })

    });


    describe('# findOne methode', function () {


        it('should fetch an instance of Names', function () {

            expect(oneName).to.be.an.instanceOf(Names)
        });

        it("should have the property id", function () {

            expect(oneName).to.have.property('id');
        })

        it("should have the property names", function () {

            expect(oneName).to.have.property('names');

        })

        it("should not have the property error", function () {

            expect(oneName).not.to.have.property('error');

        })

    });
});



//! TEST DU MODEL VERBS 


describe(chalk.magenta('Test du Model Verbs :'), function () {

    let verb;
    let oneVerb;
    let newVerb;

    before(async function () {

        const insertVerb = "INSERT INTO verbs (verbs) VALUES ($1) RETURNING *;"
        const newVerb1 = await db.query(insertVerb, ['anime']);
        newVerb = newVerb1.rows[0];
        verb = await Verbs.findAll();
        oneVerb = await Verbs.findOne(newVerb.verbs);


    });

    after(async function () {

        await db.query("DELETE FROM verbs WHERE id = $1", [newVerb.id]);

    })

    describe('# findAll methode', function () {


        it('should fetch multiple instances of Verbs', function () {

            expect(verb[0]).to.be.an.instanceOf(Verbs)
        });

        it("should have the property id", function () {

            expect(verb[0]).to.have.property('id');
        })

        it("should have the property verbs", function () {

            expect(verb[0]).to.have.property('verbs');

        })

        it("should not have the property error", function () {

            expect(verb).not.to.have.property('error');

        })

    });


    describe('# findOne methode', function () {


        it('should fetch an instance of Verbs', function () {

            expect(oneVerb).to.be.an.instanceOf(Verbs)
        });

        it("should have the property id", function () {

            expect(oneVerb).to.have.property('id');
        })

        it("should have the property verbs", function () {

            expect(oneVerb).to.have.property('verbs');

        })

        it("should not have the property error", function () {

            expect(oneVerb).not.to.have.property('error');

        })

    });
});



//! TEST DU MODEL COMPLEMENTS 


describe(chalk.magenta('Test du Model Complements :'), function () {

    let complement;
    let oneComplement;
    let newComplement;

    before(async function () {

        const insertComplement = "INSERT INTO complements (complements) VALUES ($1) RETURNING *;"
        const newComplement1 = await db.query(insertComplement, ['anime']);
        newComplement = newComplement1.rows[0];
        complement = await Complements.findAll();
        oneComplement = await Complements.findOne(newComplement.complements);


    });

    after(async function () {

        await db.query("DELETE FROM complements WHERE id = $1", [newComplement.id]);

    })

    describe('# findAll methode', function () {


        it('should fetch multiple instances of Complements', function () {

            expect(complement[0]).to.be.an.instanceOf(Complements)
        });

        it("should have the property id", function () {

            expect(complement[0]).to.have.property('id');
        })

        it("should have the property complements", function () {

            expect(complement[0]).to.have.property('complements');

        })

        it("should not have the property error", function () {

            expect(complement).not.to.have.property('error');

        })

    });


    describe('# findOne methode', function () {


        it('should fetch an instance of Complements', function () {

            expect(oneComplement).to.be.an.instanceOf(Complements)
        });

        it("should have the property id", function () {

            expect(oneComplement).to.have.property('id');
        })

        it("should have the property complements", function () {

            expect(oneComplement).to.have.property('complements');

        })

        it("should not have the property error", function () {

            expect(oneComplement).not.to.have.property('error');

        })

    });
});


//! TEST DU MODEL ADJECTIVES 

describe(chalk.magenta('Test du Model Adjectives :'), function () {

    let adjective;
    let oneAdjective;
    let newAdjective;

    before(async function () {

        const insertAdjective = "INSERT INTO adjectives (adjectives) VALUES ($1) RETURNING *;"
        const newAdjective1 = await db.query(insertAdjective, ['bleu turquoise']);
        newAdjective = newAdjective1.rows[0];
        adjective = await Adjectives.findAll();
        oneAdjective = await Adjectives.findOne(newAdjective.adjectives);


    });

    after(async function () {

        await db.query("DELETE FROM adjectives WHERE id = $1", [newAdjective.id]);

    })

    describe('# findAll methode', function () {


        it('should fetch multiple instances of Adjectives', function () {

            expect(adjective[0]).to.be.an.instanceOf(Adjectives)
        });

        it("should have the property id", function () {

            expect(adjective[0]).to.have.property('id');
        })

        it("should have the property adjectives", function () {

            expect(adjective[0]).to.have.property('adjectives');

        })

        it("should not have the property error", function () {

            expect(adjective).not.to.have.property('error');

        })

    });


    describe('# findOne methode', function () {


        it('should fetch an instance of Adjectives', function () {

            expect(oneAdjective).to.be.an.instanceOf(Adjectives)
        });

        it("should have the property id", function () {

            expect(oneAdjective).to.have.property('id');
        })

        it("should have the property adjectives", function () {

            expect(oneAdjective).to.have.property('adjectives');

        })

        it("should not have the property error", function () {

            expect(oneAdjective).not.to.have.property('error');

        })

    });
});