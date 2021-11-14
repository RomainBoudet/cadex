---------------------------------------------------------------------------------
--                    Script Postgres BBD CADEX 
---------------------------------------------------------------------------------

-- on encadre tout ça d'une transaction.
BEGIN;

-- suppression de messages en NOTICES (pour les remettre => SET client_min_messages TO default;)

  SET client_min_messages TO warning;


-- un domaine pour les différentes parties du cadex = mini 2 caractéres sans espaces autour
-- On refuse les caractéres spéciaux dans la base de donnée !

-- Pour rappel :
-- ~	Matches regular expression, case sensitive
-- ~*	Matches regular expression, case insensitive	

  CREATE DOMAIN text_valid AS text 
    CHECK (
        char_length(trim(both from VALUE)) >= 2
    )
    CHECK (
        VALUE ~* '[^<>{}_*+$%#()=@&~/\\[\]|]*$'
    );

-- un domaine pour les cadex = mini 10 caractéres sans espaces autour
-- On refuse toujours les caractéres spéciaux dans la base de donnée !


    CREATE DOMAIN long_text_valid AS text 
    CHECK (

        char_length(trim(both from VALUE)) >= 10
    )
    CHECK (
        VALUE ~* '[^<>{}_*+$%#()=@&~/\\[\]|]*$'
    );

------------------------------------------------------------
-- Table: cadex
------------------------------------------------------------
CREATE TABLE cadex (
    id                  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cadex               long_text_valid UNIQUE NOT NULL,
    created_date        timestamptz NOT NULL DEFAULT now(),
	updated_date        timestamptz,
	CHECK (created_date < updated_date)

);

------------------------------------------------------------
-- Table: names
------------------------------------------------------------
CREATE TABLE names (
    id                  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    names               text_valid UNIQUE NOT NULL,
    created_date        timestamptz NOT NULL DEFAULT now(),
	updated_date        timestamptz,
	CHECK (created_date < updated_date)
);

------------------------------------------------------------
-- Table: adjectives
------------------------------------------------------------
CREATE TABLE adjectives (
    id                  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    adjectives          text_valid UNIQUE NOT NULL,
    created_date        timestamptz NOT NULL DEFAULT now(),
	updated_date        timestamptz,
	CHECK (created_date < updated_date)
);

------------------------------------------------------------
-- Table: verbs
------------------------------------------------------------
CREATE TABLE verbs (
    id                  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    verbs               text_valid UNIQUE NOT NULL,
    created_date        timestamptz NOT NULL DEFAULT now(),
	updated_date        timestamptz,
	CHECK (created_date < updated_date)
);

------------------------------------------------------------
-- Table: complements
------------------------------------------------------------
CREATE TABLE complements (
    id                  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    complements          text_valid UNIQUE NOT NULL,
    created_date        timestamptz NOT NULL DEFAULT now(),
	updated_date        timestamptz,
	CHECK (created_date < updated_date)
);


COMMIT;